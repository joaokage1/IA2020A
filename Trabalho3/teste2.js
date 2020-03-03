let vetor = []
vetor.push([1,2])
vetor.push([5,6])
vetor.push([3,4])
vetor.push([7,8])
vetor.push([1,2])
vetor.push([9,10])
vetor.push([3,4])
vetor.push([7,8])
vetor.push([5,6])
vetor.push([9,10])
vetor.push([3,4])
vetor.push([1,2])
vetor.push([5,6])
vetor.push([9,10])
vetor.push([7,8])
vetor.push([1,2])
vetor.push([3,4])
vetor.push([9,10])
vetor.push([5,6])
vetor.push([1,2])
vetor.push([3,4])

class Cromossomo
{
    constructor() {
        this.escalas = vetor
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



let a = new Cromossomo()
a.calcularAptdao()
console.log(a.escalas)
console.log(a.posicaoEscalasPorProfissional)
console.log(a.aptidao)