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

const qtdeTurnosPorProfissional = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3 , 3, 3, 3, 3, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8 ,8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10]

    
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

let a = new Cromossomo(turnos56Aleatorio())
let b = new Cromossomo(turnos56Aleatorio())
console.log("A:")
console.log(a.escalas)
console.log("B:")
console.log(b.escalas)
console.log("--------------------------------------------------")

let retorno = crossoverUniforme(a,b)
console.log(retorno.filho1.escalas)
console.log(retorno.filho2.escalas)