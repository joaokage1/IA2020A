const qtdeTurnosPorProfissional = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3 , 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8 ,8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10]

const tamanhoPopulacao = 5
const numeroDeGeracoes = 5
const opcaoRoletaOuTorneio = 1
const tamanhoTorneio = 2
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
                maximoAparicoes: 5
            },
            profissional2: {
                posicoes: [],
                maximoAparicoes: 5
            },
            profissional3: {
                posicoes: [],
                maximoAparicoes: 6
            },
            profissional4: {
                posicoes: [],
                maximoAparicoes: 6
            },
            profissional5: {
                posicoes: [],
                maximoAparicoes: 5
            },
            profissional6: {
                posicoes: [],
                maximoAparicoes: 5
            },
            profissional7: {
                posicoes: [],
                maximoAparicoes: 6
            },
            profissional8: {
                posicoes: [],
                maximoAparicoes: 6
            },
            profissional9: {
                posicoes: [],
                maximoAparicoes: 6
            },
            profissional10: {
                posicoes: [],
                maximoAparicoes: 6
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
        if(!resultado)
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
        if(!resultado)
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
        if(!resultado)
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
        if(!resultado)
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
                    console.log('profissional'+this.escalas[i][j])
                    let index = this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].posicoes.findIndex(function (escala){
                        if(i == escala){
                            return true
                        }
                    })
                    this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].posicoes.splice(index,1)

                    if(j==1)
                    {
                        while(this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].posicoes.length > this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].maximoAparicoes || 
                                this.escalas[i][0] == mutacao)
                        {
                            mutacao = 1 + Math.floor(Math.random() * 10)
                        }
                    }
                    else
                    {
                        while(this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].posicoes.length > this.posicaoEscalasPorProfissional['profissional'+this.escalas[i][j]].maximoAparicoes)
                        {
                            mutacao = 1 + Math.floor(Math.random() * 10)
                        }
                    }
                    this.escalas[i][j] = mutacao
                }
            }
        }
    }
}

let a = new Cromossomo(turnos56Aleatorio())

a.definirPosicoes()
console.log(a.posicaoEscalasPorProfissional)
a.mutacao()
a.definirPosicoes()
console.log(a.posicaoEscalasPorProfissional)

