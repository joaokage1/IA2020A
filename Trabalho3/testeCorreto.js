const qtdeTurnosPorProfissional = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3 , 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8 ,8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10]

const tamanhoPopulacao = 100
const numeroDeGeracoes = 1000
const opcaoRoletaOuTorneio = 1
const tamanhoTorneio = 10
const taxaCruzamento = 0.8
const taxaMutacao = 0.5
const elitismo = false
const tamanhoElitismo = 4

const melhoresDaGeracao=[]


let vetorPopulacao = []


function turnos56Aleatorio()
{
    let vetor = qtdeTurnosPorProfissional.slice()
    for(let i =0; i < vetor.length; i=i+1)
    {
        let posicao = Math.floor(Math.random() * 56)
        let copia = vetor[posicao]
        vetor[posicao] = vetor[i]
        vetor[i] = copia
    }

    return vetor
}
    
class Cromossomo
{
    constructor(turnosAleatorios) {
        this.escalas = new Array(21)
        this.aptidao = 0
        //MAXIMO 540 PONTOS
        //MINIMO 
        this.posicaoEscalasPorProfissional = {
            profissional1: {
                posicoes: [],
                maximoAparicoes: 5,
                resultado: true,
                valor:1
            },
            profissional2: {
                posicoes: [],
                maximoAparicoes: 5,
                resultado: true,
                valor:2
            },
            profissional3: {
                posicoes: [],
                maximoAparicoes: 6,
                resultado: true,
                valor:3
            },
            profissional4: {
                posicoes: [],
                maximoAparicoes: 6,
                resultado: true,
                valor:4
            },
            profissional5: {
                posicoes: [],
                maximoAparicoes: 5,
                resultado: true,
                valor:5
            },
            profissional6: {
                posicoes: [],
                maximoAparicoes: 5,
                resultado: true,
                valor:6
            },
            profissional7: {
                posicoes: [],
                maximoAparicoes: 6,
                resultado: true,
                valor:7
            },
            profissional8: {
                posicoes: [],
                maximoAparicoes: 6,
                resultado: true,
                valor:8
            },
            profissional9: {
                posicoes: [],
                maximoAparicoes: 6,
                resultado: true,
                valor:9
            },
            profissional10: {
                posicoes: [],
                maximoAparicoes: 6,
                resultado: true,
                valor:10
            },
        }

        this.inicialiarEscalas(turnosAleatorios)
    }

    inicialiarEscalas(turnosAleatorios) {
        for(let i = 0; i<21; i = i + 1)
        {
            for(let j = 0;j < 2; j = j + 1)
            {
                if(j == 0)
                {
                    this.escalas[i] = new Array(2)
                }

                let posicao = Math.floor(Math.random() * turnosAleatorios.length)
                if(j == 1)
                {
                    if(this.escalas[i][0] == turnosAleatorios[posicao])
                    {
                        posicao = Math.floor(Math.random() * turnosAleatorios.length)
                        while(this.escalas[i][0] == turnosAleatorios[posicao])
                        {
                            posicao = Math.floor(Math.random() * turnosAleatorios.length)
                        }
                    }
                }
                this.escalas[i][j] = turnosAleatorios[posicao]
                turnosAleatorios.splice(posicao,1)
            }
        }
    }

    definirPosicoes()
    {
        this.posicaoEscalasPorProfissional.profissional1.posicoes = []
        this.posicaoEscalasPorProfissional.profissional2.posicoes = []
        this.posicaoEscalasPorProfissional.profissional3.posicoes = []
        this.posicaoEscalasPorProfissional.profissional4.posicoes = []
        this.posicaoEscalasPorProfissional.profissional5.posicoes = []
        this.posicaoEscalasPorProfissional.profissional6.posicoes = []
        this.posicaoEscalasPorProfissional.profissional7.posicoes = []
        this.posicaoEscalasPorProfissional.profissional8.posicoes = []
        this.posicaoEscalasPorProfissional.profissional9.posicoes = []
        this.posicaoEscalasPorProfissional.profissional10.posicoes = []

        this.posicaoEscalasPorProfissional.profissional1.resultado = true
        this.posicaoEscalasPorProfissional.profissional2.resultado = true
        this.posicaoEscalasPorProfissional.profissional3.resultado = true
        this.posicaoEscalasPorProfissional.profissional4.resultado = true
        this.posicaoEscalasPorProfissional.profissional5.resultado = true
        this.posicaoEscalasPorProfissional.profissional6.resultado = true
        this.posicaoEscalasPorProfissional.profissional7.resultado = true
        this.posicaoEscalasPorProfissional.profissional8.resultado = true
        this.posicaoEscalasPorProfissional.profissional9.resultado = true
        this.posicaoEscalasPorProfissional.profissional10.resultado = true

        
        for(let i = 0; i < 21; i = i + 1)
        {
            for(let j = 0;j<2;j = j + 1)
            {
                this.posicaoEscalasPorProfissional["profissional"+this.escalas[i][j]].posicoes.push(i)
            }
        }
    }

    getProfissionalMenosTurnos()
    {
        let menor = Infinity 
        let index   
        for(let i = 1; i <= 10; i = i + 1)
        {
            if(this.posicaoEscalasPorProfissional["profissional"+i].posicoes.length < menor)
            {
                menor = this.posicaoEscalasPorProfissional["profissional"+i].posicoes.length
                index = i
            }

        }
        return index
    }

    aptdaoProfissional3Turnos(vetor)
    {
        let resultado = true
        for(let j = 1; j < vetor.length; j = j + 1)
        {
            let c = (vetor[j]) - (vetor[j-1]+1)
            if(c<3)
            {
                resultado = false
                break;
            }
        }
        return resultado
    }

    aptdaoProfissional6Turnos(vetor)
    {
        let resultado = false
        for(let i = 1;i<vetor.length;i=i+1)
        {
            let c = (vetor[i]) - (vetor[i-1]+1)
            if(c>=6)
            {
                resultado = true
                break;
            }
        }

        return resultado
    }

    aptdaoProfissional5Turnos(vetor)
    {
        let resultado = false
        for(let i = 1;i<vetor.length;i=i+1)
        {
            let c = (vetor[i]) - (vetor[i-1]+1)
            if(c>=5)
            {
                resultado = true
                break;
            }
        }

        return resultado
    }

    calcularAptdao()
    {
        this.aptidao = 300
        this.definirPosicoes()

        //PARA TODOS - INTERVALOS DE 3 TURNOS
        for(let i = 1; i <= 10;i = i + 1)
        {
            let resultado = this.aptdaoProfissional3Turnos(this.posicaoEscalasPorProfissional["profissional"+i].posicoes)
  
            if(resultado)
            {
                this.aptidao = this.aptidao + 10
            } 
            else
            {
                this.posicaoEscalasPorProfissional["profissional"+i].resultado = false
                this.aptidao = this.aptidao - 5
            }

            if(this.posicaoEscalasPorProfissional["profissional"+i].posicoes.length <= this.posicaoEscalasPorProfissional["profissional"+i].maximoAparicoes)
            {
                this.aptidao = this.aptidao + 10
            }
            else
            {
                this.aptidao = this.aptidao - 5
            }
        }

        let resultado = this.aptdaoProfissional6Turnos(this.posicaoEscalasPorProfissional.profissional1.posicoes)
   
        if(this.posicaoEscalasPorProfissional.profissional1.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }

        if(resultado)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.posicaoEscalasPorProfissional.profissional1.resultado = false
            this.aptidao = this.aptidao - 5
        }

        resultado =  this.aptdaoProfissional6Turnos(this.posicaoEscalasPorProfissional.profissional2.posicoes)

        if(this.posicaoEscalasPorProfissional.profissional2.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }

        if(resultado)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.posicaoEscalasPorProfissional.profissional2.resultado = false
            this.aptidao = this.aptidao - 5
        }



        resultado = this.aptdaoProfissional5Turnos(this.posicaoEscalasPorProfissional.profissional5.posicoes) 
        if(this.posicaoEscalasPorProfissional.profissional5.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }

        if(resultado)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.posicaoEscalasPorProfissional.profissional5.resultado = false
            this.aptidao = this.aptidao - 5
        }

        resultado = this.aptdaoProfissional5Turnos(this.posicaoEscalasPorProfissional.profissional6.posicoes)  
        if(this.posicaoEscalasPorProfissional.profissional6.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }

        if(resultado)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.posicaoEscalasPorProfissional.profissional6.resultado = false
            this.aptidao = this.aptidao - 5
        }
    }

    mutacao()
    {
        if(this.aptidao >= 460)
        {
            // console.log(this.posicaoEscalasPorProfissional)
            let index = 1
            for(index; index <= 10; index = index + 1)
            {
                
                if(!this.posicaoEscalasPorProfissional["profissional"+index].resultado)
                {
                    break
                }
            }
            // console.log("profissional"+index)
            

            if(index!= 11 && !this.posicaoEscalasPorProfissional["profissional"+index].resultado)
            {
                let indexErrado = -1;
                for(let i = 1;i < this.posicaoEscalasPorProfissional["profissional"+index].posicoes.length;i=i+1)
                {
                    let c = (this.posicaoEscalasPorProfissional["profissional"+index].posicoes[i]) - (this.posicaoEscalasPorProfissional["profissional"+index].posicoes[i-1]+1)
                    if(c<3)
                    {
                    
                        indexErrado = i
                        break
                    }
                }

                if(indexErrado == -1)
                {
                    if(this.posicaoEscalasPorProfissional["profissional"+index].valor == 1 || this.posicaoEscalasPorProfissional["profissional"+index].valor == 2)
                    {
                        for(let i = 1;i < this.posicaoEscalasPorProfissional["profissional"+index].posicoes.length;i=i+1)
                        {
                            let c = (this.posicaoEscalasPorProfissional["profissional"+index].posicoes[i]) - (this.posicaoEscalasPorProfissional["profissional"+index].posicoes[i-1]+1)
                            if(c<6)
                            {
                                indexErrado = i;
                                break
                            }
                        }
                    }
                    else if(this.posicaoEscalasPorProfissional["profissional"+index].valor == 5 || this.posicaoEscalasPorProfissional["profissional"+index].valor == 6)
                    {
                        for(let i = 1;i < this.posicaoEscalasPorProfissional["profissional"+index].posicoes.length;i=i+1)
                        {
                            let c = (this.posicaoEscalasPorProfissional["profissional"+index].posicoes[i]) - (this.posicaoEscalasPorProfissional["profissional"+index].posicoes[i-1]+1)
                            if(c<5)
                            {
                                indexErrado = i;
                                break
                            }
                        }
                    }
                }
                if(indexErrado != -1)
                {
                    let a  =  this.getProfissionalMenosTurnos()
                    let x  = this.posicaoEscalasPorProfissional["profissional"+index].posicoes[indexErrado]
                    let y2 = this.escalas[x][0] == this.posicaoEscalasPorProfissional["profissional"+index].valor ? 0 : 1
                    this.escalas[x][y2] = a

                    // console.log("profissional mens tur: profissional"+a)
                    // console.log("indez errado: "+indexErrado)
                    // console.log("indez errado: "+this.posicaoEscalasPorProfissional["profissional"+index].posicoes[indexErrado])
                    // console.log("APITDAOOOOOOOOOOOOOO:   "+this.aptidao)
          
                }
                this.calcularAptdao()
            }
        }

    }
}


function crossoverUniforme(cromossomo1, cromossomo2) {
    let filho1 = new Cromossomo(turnos56Aleatorio())
    let filho2 = new Cromossomo(turnos56Aleatorio())

    for(let i=0;i<21;i=i+1)
    {
        for(j=0;j<2;j=j+1)
        {
            let numeroSorteio = Math.floor(Math.random() * 2);
            if(numeroSorteio == 0)
            {
                let profissionalFilho1 = cromossomo2.escalas[i][j]
                let profissionalFilho2 = cromossomo1.escalas[i][j]
                if(j==1)
                {
                    while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes || 
                            filho1.escalas[i][0] == profissionalFilho1)
                    {
                        profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
                    }
                    while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes || 
                            filho2.escalas[i][0] == profissionalFilho2)
                    {
                        profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
                    }
                }
                else
                {
                    while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes)
                    {
                        profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
                    }
                    while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes)
                    {
                        profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
                    }
            
                }
                filho1.escalas[i][j] = profissionalFilho1
                filho2.escalas[i][j] = profissionalFilho2
            }
            else if(numeroSorteio == 1)
            {
                let profissionalFilho1 = cromossomo1.escalas[i][j]
                let profissionalFilho2 = cromossomo2.escalas[i][j]
                if(j==1)
                {
                    while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes || 
                            filho1.escalas[i][0] == profissionalFilho1)
                    {
                        profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
                    }
                    while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes || 
                            filho2.escalas[i][0] == profissionalFilho2)
                    {
                        profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
                    }
                }
                else
                {
                    while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes)
                    {
                        profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
                    }
                    while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes)
                    {
                        profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
                    }
            
                }
                filho1.escalas[i][j] = profissionalFilho1
                filho2.escalas[i][j] = profissionalFilho2
            }
            filho1.definirPosicoes()
            filho2.definirPosicoes()
        }
    }

    return {
        filho1,
        filho2
    }
}

function torneio() {
    let vetorPopulacaoCopia = vetorPopulacao.slice()

    //Tornar aleatorias as posições do vetorPopulacaoCopia
    for(let i =0; i < vetorPopulacaoCopia.length; i=i+1)
    {
        let posicao = Math.floor(Math.random() * vetorPopulacaoCopia.length)
        let copia = vetorPopulacaoCopia[posicao]
        vetorPopulacaoCopia[posicao] = vetorPopulacaoCopia[i]
        vetorPopulacaoCopia[i] = copia
    }

    let vetorParticipantesTorneio = []

    //Pegar os participantes do torneio
    for(let i=0; i<tamanhoTorneio;i=i+1)
    {
        let posicao = Math.floor(Math.random() * vetorPopulacaoCopia.length)
        vetorParticipantesTorneio.push(vetorPopulacaoCopia[posicao])
        vetorPopulacaoCopia.splice(posicao,1)

    }
    
    //Ordenar em ordem descrescente
    vetorParticipantesTorneio.sort(function(a, b) {
        return b.aptidao - a.aptidao
    });
    
    return{
        cromossomo1: vetorParticipantesTorneio[0],
        cromossomo2: vetorParticipantesTorneio[1]
    }
}


function init()
{
    for(let i =0; i < tamanhoPopulacao; i=i+1)
    {
        vetorPopulacao.push(new Cromossomo(turnos56Aleatorio()))
    }

     //ordenar vetorPopupalcao
     vetorPopulacao.sort(function(a, b) {
        return b.aptidao - a.aptidao
    });
   
    melhoresDaGeracao.push(vetorPopulacao[0])
    console.log("GERACAO "+0)
    console.log("MELHOR: "+vetorPopulacao[0].aptidao)
    console.log("-----------------------------------------")
    
    for(let z = 0;z < numeroDeGeracoes; z = z + 1)
    {
        let vetorFilhos = []
       
        while(vetorFilhos.length<vetorPopulacao.length)
        {
            if(elitismo){
                let auxElite = 0;
                while(vetorFilhos.length < tamanhoElitismo){
                    vetorFilhos.push(vetorPopulacao[auxElite])
                    auxElite++;
                }
            }
            let cromossomo1, cromossomo2
            if(opcaoRoletaOuTorneio == 1)
            {
                let resultadoTorneio = torneio()
                cromossomo1 = resultadoTorneio.cromossomo1
                cromossomo2 = resultadoTorneio.cromossomo2
            }

            let taxaSorteada = Math.random()
            taxaSorteada = Number(taxaSorteada.toFixed(4))
            
            let filho1, filho2
            if(taxaSorteada<=taxaCruzamento)
            {
                let resultadoCrossover = crossoverUniforme(cromossomo1,cromossomo2)

                filho1 = resultadoCrossover.filho1
                filho2 = resultadoCrossover.filho2
            }
            else
            {
                filho1 = cromossomo1
                filho2 = cromossomo2
            }
            if((vetorFilhos.length - vetorPopulacao.length) >= 2)
            {
                vetorFilhos.push(filho1)
                vetorFilhos.push(filho2)
            }
            else
            {
                let numeroSorteio = Math.floor(Math.random() * 2);
                if(numeroSorteio == 0)
                {
                    vetorFilhos.push(filho1)
                }
                else if(numeroSorteio == 1)
                {
                    vetorFilhos.push(filho2)
                }
            }
        }
        console.log("-----------------------------------------------------------------------------")
        vetorPopulacao = vetorFilhos.slice()
        for(let i = 0;i<vetorPopulacao.length;i=i+1)
        {
            vetorPopulacao[i].calcularAptdao()
            if(Math.random()  < taxaMutacao)
            {
                vetorPopulacao[i].mutacao()
            }
        }
        //ordenar vetorPopupalcao
        vetorPopulacao.sort(function(a, b) {
            return b.aptidao - a.aptidao
        });
       
        melhoresDaGeracao.push(vetorPopulacao[0])
        console.log("GERACAO "+(z+1))
        console.log("MELHOR: "+vetorPopulacao[0].aptidao)
        console.log("-----------------------------------------")
        if(vetorPopulacao[0].aptidao >= 540)
        {
            console.log(vetorPopulacao[0].escalas)
            console.log(vetorPopulacao[0].posicaoEscalasPorProfissional)
            console.log("ALOOOOOOOOOOOOOOOOO")
            break
        }
    }
}

init()