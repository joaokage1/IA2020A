const qtdeTurnosPorProfissional = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3 , 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8 ,8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10]

const tamanhoPopulacao = 200
const numeroDeGeracoes = 1000
const opcaoRoletaOuTorneio = 1
const tamanhoTorneio = 20
const taxaCruzamento = 0.7
const taxaMutacao = 0.1
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
                valor:1
            },
            profissional2: {
                posicoes: [],
                maximoAparicoes: 5,
                valor:2
            },
            profissional3: {
                posicoes: [],
                maximoAparicoes: 6,
                valor:3
            },
            profissional4: {
                posicoes: [],
                maximoAparicoes: 6,
                valor:4
            },
            profissional5: {
                posicoes: [],
                maximoAparicoes: 5,
                valor:5
            },
            profissional6: {
                posicoes: [],
                maximoAparicoes: 5,
                valor:6
            },
            profissional7: {
                posicoes: [],
                maximoAparicoes: 6,
                valor:7
            },
            profissional8: {
                posicoes: [],
                maximoAparicoes: 6,
                valor:8
            },
            profissional9: {
                posicoes: [],
                maximoAparicoes: 6,
                valor:9
            },
            profissional10: {
                posicoes: [],
                maximoAparicoes: 6,
                valor:10
            },
        }

        this.inicialiarEscalas(turnosAleatorios)
    }

    inicialiarEscalas(turnosAleatorios) {
        for(let i = 0; i < this.escalas.length; i = i + 1)
        {
            this.escalas[i] = new Array(2)
        }

        for(let i = 0; i<21; i = i + 1)
        {
            for(let j = 0;j < 2; j = j + 1)
            {
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

        
        for(let i = 0; i < 21; i = i + 1)
        {
            for(let j = 0;j<2;j = j + 1)
            {
                this.posicaoEscalasPorProfissional["profissional"+this.escalas[i][j]].posicoes.push(i)
            }
        }
    }

    calcularAptdao()
    {
        this.aptidao = 300
        this.definirPosicoes()

        //PARA TODOS - INTERVALOS DE 3 TURNOS
        for(let i = 1; i <= 10;i = i + 1)
        {
            let resultado = true
            for(let j = 1; j < this.posicaoEscalasPorProfissional["profissional"+i].posicoes.length; j = j + 1)
            {
                let c = (this.posicaoEscalasPorProfissional["profissional"+i].posicoes[j]) - (this.posicaoEscalasPorProfissional["profissional"+i].posicoes[j-1]+1)
                if(c<3)
                {
                    resultado = false
                    break;
                }
            }

            if(resultado)
            {
                this.aptidao = this.aptidao + 10
 
            } 
            else
            {
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

        let resultado = false
        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional1.posicoes.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional1.posicoes[i] - (this.posicaoEscalasPorProfissional.profissional1.posicoes[i-1]+1)
            if(c>=6)
            {
                //PROFISSIONAL 1 TEM 6 FOLGAS
                this.aptidao = this.aptidao + 10
                resultado = true
                break;
            }
        }
        if(this.posicaoEscalasPorProfissional.profissional1.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.aptidao = this.aptidao - 5
        }
        resultado = false 

        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional2.posicoes.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional2.posicoes[i] - (this.posicaoEscalasPorProfissional.profissional2.posicoes[i-1]+1)
            if(c>=6)
            {
                //PROFISSIONAL 2 TEM 6 FOLGAS
                this.aptidao = this.aptidao + 10
                resultado = true
                break;
            }
        }
        if(this.posicaoEscalasPorProfissional.profissional2.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.aptidao = this.aptidao - 5
        }
        resultado = false 

        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional5.posicoes.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional5.posicoes[i] - (this.posicaoEscalasPorProfissional.profissional5.posicoes[i-1]+1)
            if(c>=5)
            {
                //PROFISSIONAL 5 TEM 5 FOLGAS
                this.aptidao = this.aptidao + 10
                resultado = true
                break;
            }
        }
        if(this.posicaoEscalasPorProfissional.profissional5.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.aptidao = this.aptidao - 5
        }
        resultado = false 

        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional6.posicoes.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional6.posicoes[i] - (this.posicaoEscalasPorProfissional.profissional6.posicoes[i-1]+1)
            if(c>=5)
            {
                //PROFISSIONAL 6 TEM 5 FOLGAS
                this.aptidao = this.aptidao + 10
                resultado = true
                break;
            }
        }
        if(this.posicaoEscalasPorProfissional.profissional6.posicoes.length == 1)
        {
            this.aptidao = this.aptidao + 10
        }
        else if(!resultado)
        {
            this.aptidao = this.aptidao - 5
        }
    }

    mutacao()
    {
        this.definirPosicoes()
        for(let i = 0;i<21;i=i+1)
        {
            for(let j=0;j<2;j=j+1)
            {
                let numeroAleatorio = Math.random()

                if(numeroAleatorio<=taxaMutacao)
                {
                    let mutacao = 1 + Math.floor(Math.random() * 10)
                
                    let index = this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].posicoes.findIndex(function (escala){
                        if(i == escala){
                            return true
                        }
                    })
                    this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].posicoes.splice(index,1)

                    if(j==1)
                    {
                        while(this.posicaoEscalasPorProfissional['profissional'+mutacao].posicoes.length >= this.posicaoEscalasPorProfissional['profissional'+mutacao].maximoAparicoes || 
                                this.escalas[i][0] == mutacao)
                        {
                            mutacao = 1 + Math.floor(Math.random() * 10)
                        }
                    }
                    else
                    {
                        while(this.posicaoEscalasPorProfissional['profissional'+mutacao].posicoes.length >= this.posicaoEscalasPorProfissional['profissional'+mutacao].maximoAparicoes)
                        {
                            mutacao = 1 + Math.floor(Math.random() * 10)
                        }
                    }
                    this.escalas[i][j] = mutacao
                    this.definirPosicoes()
                }
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


