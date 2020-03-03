const qtdeTurnosPorProfissional = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3 , 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,
5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8 ,8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10]


const tamanhoPopulacao = 5
const numeroDeGeracoes = 5
const opcaoRoletaOuTorneio = 1
const tamanhoTorneio = 2
const taxaCruzamento = 0.7
const taxaMutacao = 0.2
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
        this.posicaoEscalasPorProfissional = {
            profissional1: [],
            profissional2: [],
            profissional3: [],
            profissional4: [],
            profissional5: [],
            profissional6: [],
            profissional7: [],
            profissional8: [],
            profissional9: [],
            profissional10: []
        }

        this.inicialiarEscalas(turnosAleatorios)
        this.calcularAptdao()
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

    calcularAptdao()
    {
        this.aptidao = 0
        for(let i = 0; i < 21; i = i + 1)
        {
            for(let j = 0;j<2;j = j + 1)
            {
                this.posicaoEscalasPorProfissional["profissional"+this.escalas[i][j]].push(i)
            }
        }

        //PARA TODOS
        for(let i = 1; i <= 10;i = i + 1)
        {
            // console.log("profissional"+i)
            // console.log("-------------------------------------------------------------")
            let resultado = true
            for(let j = 1; j < this.posicaoEscalasPorProfissional["profissional"+i].length; j = j + 1)
            {
                let c = (this.posicaoEscalasPorProfissional["profissional"+i][j]) - (this.posicaoEscalasPorProfissional["profissional"+i][j-1]+1)
                if(c<3)
                {
                    resultado = false
                }
            }

            if(resultado)
            {
                //console.log("ESTA CERTO!")
                this.aptidao = this.aptidao + 10
            } 
            //console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
        }

        //
        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional1.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional1[i] - (this.posicaoEscalasPorProfissional.profissional1[i-1]+1)
            if(c>=6)
            {
                //console.log("PROFISSIONAL 1 TEM 6 FOLGAS")
                this.aptidao = this.aptidao + 10
                break;
            }
        }

        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional2.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional2[i] - (this.posicaoEscalasPorProfissional.profissional2[i-1]+1)
            if(c>=6)
            {
                //console.log("PROFISSIONAL 2 TEM 6 FOLGAS")
                this.aptidao = this.aptidao + 10
                break;
            }
        }

        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional5.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional5[i] - (this.posicaoEscalasPorProfissional.profissional5[i-1]+1)
            if(c>=5)
            {
                //console.log("PROFISSIONAL 5 TEM 5 FOLGAS")
                this.aptidao = this.aptidao + 10
                break;
            }
        }

        for(let i = 1;i<this.posicaoEscalasPorProfissional.profissional6.length;i=i+1)
        {
            let c = this.posicaoEscalasPorProfissional.profissional6[i] - (this.posicaoEscalasPorProfissional.profissional6[i-1]+1)
            if(c>=5)
            {
                //console.log("PROFISSIONAL 6 TEM 5 FOLGAS")
                this.aptidao = this.aptidao + 10
                break;
            }
        }
        //console.log("APTIDAO: "+this.aptidao)
    }

    mutacaoInversao()
    {
        let inicioEscala = Math.floor(Math.random() * 21)
        if(inicioEscala == 20)
        {
            inicioEscala = inicioEscala - 1
        }
        let fimEscala = inicioEscala + Math.floor(Math.random() * (21-inicioEscala))

        let posicaoProfissional = Math.floor(Math.random() * 2) 

        let aux = []
        for(let i = inicioEscala;i<=fimEscala;i=i+1)
        {
            aux.push(this.escalas[fimEscala-i+inicioEscala][posicaoProfissional])
        }
      
        for(let i = inicioEscala;i<=fimEscala;i=i+1)
        {
            this.escalas[i][posicaoProfissional] = aux[i-inicioEscala]
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
                filho1.escalas[i][j] = cromossomo2.escalas[i][j]
                filho2.escalas[i][j] = cromossomo1.escalas[i][j]
            }
            else if(numeroSorteio == 1)
            {
                filho1.escalas[i][j] = cromossomo1.escalas[i][j]
                filho2.escalas[i][j] = cromossomo2.escalas[i][j]
            }
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

        //ordenar vetorPopupalcao
        vetorPopulacao.sort(function(a, b) {
            return b.aptidao - a.aptidao
        });
       
        melhoresDaGeracao.push(vetorPopulacao[0])
        console.log("GERACAO "+(z+1))
        console.log("MELHOR: "+vetorPopulacao[0].aptidao)
        console.log("-----------------------------------------")
    }
}

init()



