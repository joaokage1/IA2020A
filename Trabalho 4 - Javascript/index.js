const regiao = [//                          0             1              2               3                   4             5                   6               7             8          9                10                          11                12              13                  14            15             16                  17              18             19    
    { cidade: 'Uberaba',               uberaba: 0,   uberlandia: 108, araxa: 117, patos_de_minas: 251, patrocinio: 180, monte_carmelo: 150, araguari: 141, ituitaba: 245, prata: 149, frutal: 131, conceicao_das_alagoas: 65,  campo_florido: 73,  perdizes: 126, santa_juliana: 100, nova_ponte: 76,  delta: 34,  agua_comprida: 47,  sacramento: 80,  conquista: 61,  comendador_gomes: 138 },
    { cidade: 'Uberlândia',            uberaba: 108, uberlandia: 0,   araxa: 177, patos_de_minas: 221, patrocinio: 150, monte_carmelo: 108, araguari: 39,  ituitaba: 137, prata: 87,  frutal: 182, conceicao_das_alagoas: 166, campo_florido: 174, perdizes: 135, santa_juliana: 110, nova_ponte: 74,  delta: 141, agua_comprida: 148, sacramento: 158, conquista: 168, comendador_gomes: 150 },
    { cidade: 'Araxá',                 uberaba: 117, uberlandia: 177, araxa: 0,   patos_de_minas: 161, patrocinio: 107, monte_carmelo: 185, araguari: 210, ituitaba: 313, prata: 263, frutal: 251, conceicao_das_alagoas: 178, campo_florido: 187, perdizes: 56,  santa_juliana: 91,  nova_ponte: 110, delta: 142, agua_comprida: 160, sacramento: 86,  conquista: 116, comendador_gomes: 252 },
    { cidade: 'Patos de Minas',        uberaba: 251, uberlandia: 221, araxa: 161, patos_de_minas: 0,   patrocinio: 75,  monte_carmelo: 153, araguari: 219, ituitaba: 357, prata: 312, frutal: 405, conceicao_das_alagoas: 332, campo_florido: 341, perdizes: 139, santa_juliana: 188, nova_ponte: 180, delta: 296, agua_comprida: 314, sacramento: 251, conquista: 272, comendador_gomes: 375 },
    { cidade: 'Patrocínio',            uberaba: 180, uberlandia: 150, araxa: 107, patos_de_minas: 75,  patrocinio: 0,   monte_carmelo: 82,  araguari: 148, ituitaba: 286, prata: 241, frutal: 328, conceicao_das_alagoas: 256, campo_florido: 264, perdizes: 63,  santa_juliana: 111, nova_ponte: 109, delta: 220, agua_comprida: 238, sacramento: 151, conquista: 172, comendador_gomes: 304 },
    { cidade: 'Monte Carmelo',         uberaba: 150, uberlandia: 108, araxa: 185, patos_de_minas: 153, patrocinio: 82,  monte_carmelo: 0,   araguari: 100, ituitaba: 245, prata: 199, frutal: 290, conceicao_das_alagoas: 218, campo_florido: 227, perdizes: 140, santa_juliana: 118, nova_ponte: 72,  delta: 182, agua_comprida: 200, sacramento: 165, conquista: 186, comendador_gomes: 262 },
    { cidade: 'Araguari',              uberaba: 141, uberlandia: 39,  araxa: 210, patos_de_minas: 219, patrocinio: 148, monte_carmelo: 100, araguari: 0,   ituitaba: 171, prata: 125, frutal: 220, conceicao_das_alagoas: 198, campo_florido: 206, perdizes: 167, santa_juliana: 142, nova_ponte: 116, delta: 173, agua_comprida: 180, sacramento: 218, conquista: 200, comendador_gomes: 188 },
    { cidade: 'Ituiutaba',             uberaba: 245, uberlandia: 137, araxa: 313, patos_de_minas: 357, patrocinio: 286, monte_carmelo: 245, araguari: 171, ituitaba: 0,   prata: 103, frutal: 199, conceicao_das_alagoas: 209, campo_florido: 175, perdizes: 270, santa_juliana: 245, nova_ponte: 209, delta: 277, agua_comprida: 284, sacramento: 293, conquista: 304, comendador_gomes: 151 },
    { cidade: 'Prata',                 uberaba: 149, uberlandia: 87,  araxa: 263, patos_de_minas: 312, patrocinio: 241, monte_carmelo: 199, araguari: 125, ituitaba: 103, prata: 0,   frutal: 101, conceicao_das_alagoas: 111, campo_florido: 77,  perdizes: 225, santa_juliana: 200, nova_ponte: 164, delta: 177, agua_comprida: 184, sacramento: 222, conquista: 204, comendador_gomes: 69  },
    { cidade: 'Frutal',                uberaba: 131, uberlandia: 182, araxa: 251, patos_de_minas: 405, patrocinio: 328, monte_carmelo: 290, araguari: 220, ituitaba: 199, prata: 101, frutal: 0,   conceicao_das_alagoas: 75,  campo_florido: 76,  perdizes: 266, santa_juliana: 227, nova_ponte: 216, delta: 165, agua_comprida: 122, sacramento: 210, conquista: 192, comendador_gomes: 52  },
    { cidade: 'Conceição das Alagoas', uberaba: 65,  uberlandia: 166, araxa: 178, patos_de_minas: 332, patrocinio: 256, monte_carmelo: 218, araguari: 198, ituitaba: 209, prata: 111, frutal: 75,  conceicao_das_alagoas: 0,   campo_florido: 35,  perdizes: 193, santa_juliana: 168, nova_ponte: 144, delta: 93,  agua_comprida: 50,  sacramento: 141, conquista: 120, comendador_gomes: 100 },
    { cidade: 'Campo Florido',         uberaba: 73,  uberlandia: 174, araxa: 187, patos_de_minas: 341, patrocinio: 264, monte_carmelo: 227, araguari: 206, ituitaba: 175, prata: 77,  frutal: 76,  conceicao_das_alagoas: 35,  campo_florido: 0,   perdizes: 202, santa_juliana: 177, nova_ponte: 152, delta: 101, agua_comprida: 108, sacramento: 150, conquista: 128, comendador_gomes: 66  },
    { cidade: 'Perdizes',              uberaba: 126, uberlandia: 135, araxa: 56,  patos_de_minas: 139, patrocinio: 63,  monte_carmelo: 140, araguari: 167, ituitaba: 270, prata: 225, frutal: 266, conceicao_das_alagoas: 193, campo_florido: 202, perdizes: 0,   santa_juliana: 49,  nova_ponte: 68,  delta: 158, agua_comprida: 175, sacramento: 89,  conquista: 110, comendador_gomes: 267 },
    { cidade: 'Santa Juliana',         uberaba: 100, uberlandia: 110, araxa: 91,  patos_de_minas: 188, patrocinio: 111, monte_carmelo: 118, araguari: 142, ituitaba: 245, prata: 200, frutal: 227, conceicao_das_alagoas: 168, campo_florido: 177, perdizes: 49,  santa_juliana: 0,   nova_ponte: 43,  delta: 119, agua_comprida: 137, sacramento: 72,  conquista: 93,  comendador_gomes: 229 },
    { cidade: 'Nova Ponte',            uberaba: 76,  uberlandia: 74,  araxa: 110, patos_de_minas: 180, patrocinio: 109, monte_carmelo: 72,  araguari: 116, ituitaba: 209, prata: 164, frutal: 216, conceicao_das_alagoas: 144, campo_florido: 152, perdizes: 68,  santa_juliana: 43,  nova_ponte: 0,   delta: 107, agua_comprida: 125, sacramento: 91,  conquista: 112, comendador_gomes: 217 },
    { cidade: 'Delta',                 uberaba: 34,  uberlandia: 141, araxa: 142, patos_de_minas: 296, patrocinio: 220, monte_carmelo: 182, araguari: 173, ituitaba: 277, prata: 177, frutal: 165, conceicao_das_alagoas: 93,  campo_florido: 101, perdizes: 158, santa_juliana: 119, nova_ponte: 107, delta: 0,   agua_comprida: 74,  sacramento: 51,  conquista: 33,  comendador_gomes: 166 },
    { cidade: 'Água Comprida',         uberaba: 47,  uberlandia: 148, araxa: 160, patos_de_minas: 314, patrocinio: 238, monte_carmelo: 200, araguari: 180, ituitaba: 284, prata: 184, frutal: 122, conceicao_das_alagoas: 50,  campo_florido: 108, perdizes: 175, santa_juliana: 137, nova_ponte: 125, delta: 74,  agua_comprida: 0,   sacramento: 123, conquista: 101, comendador_gomes: 170 },
    { cidade: 'Sacramento',            uberaba: 80,  uberlandia: 158, araxa: 86,  patos_de_minas: 251, patrocinio: 151, monte_carmelo: 165, araguari: 218, ituitaba: 293, prata: 222, frutal: 210, conceicao_das_alagoas: 141, campo_florido: 150, perdizes: 89,  santa_juliana: 72,  nova_ponte: 91,  delta: 51,  agua_comprida: 123, sacramento: 0,   conquista: 24,  comendador_gomes: 211 },
    { cidade: 'Conquista',             uberaba: 61,  uberlandia: 168, araxa: 116, patos_de_minas: 272, patrocinio: 172, monte_carmelo: 186, araguari: 200, ituitaba: 304, prata: 204, frutal: 192, conceicao_das_alagoas: 120, campo_florido: 128, perdizes: 110, santa_juliana: 93,  nova_ponte: 112, delta: 33,  agua_comprida: 101, sacramento: 24,  conquista: 0,   comendador_gomes: 193 },
    { cidade: 'Comendador Gomes',      uberaba: 138, uberlandia: 150, araxa: 375, patos_de_minas: 375, patrocinio: 304, monte_carmelo: 262, araguari: 118, ituitaba: 151, prata: 69,  frutal: 52,  conceicao_das_alagoas: 100, campo_florido: 66,  perdizes: 267, santa_juliana: 229, nova_ponte: 217, delta: 166, agua_comprida: 170, sacramento: 211, conquista: 193, comendador_gomes: 0   }
]

const TAM_GERACAO    = 10000000
const TAXA_MUTACAO   = 30
const TAXA_CRUZAMENTO= 90
const TAM_POPULACAO  = 50
const TORNEIO_ROLETA = 2
const TAM_TORNEIO    = 10
const ELITISMO       = true
const TAM_ELITISMO   = 4

let melhorKM = 3000
vetorPopulacao = []
melhoresPorGeracao = []
let melhorGlobal = 10

  class Cromossomo{
    constructor(rota) {
        this.rota = rota
        this.totalKM = this.quilometragemRota(rota)
        this.aptidao = this.calulaAptidao()
    }

    quilometragemRota(rota){
        let quilometragem = 0
        let cidadeAtual, proxCidade
        //percorre a matriz p/ somar as km de cada cidade da rota
        for(let i = 0; i < 20; i++){
            cidadeAtual = rota[i], proxCidade = rota[i+1] + 1
            quilometragem = quilometragem + (Object.values(regiao[cidadeAtual])[proxCidade])
        }
        return quilometragem
    }

    calulaAptidao(){
        // gambiarra (inverso da KM)
        return Math.round(Math.pow((1/this.totalKM * 100000), 2))
        // rota.forEach(function (cidade, index)  {
        //     if(index < 20){
        //         quilometragem = (Object.values(regiao[rota[index]])[rota[index+1] + 1])
        //         KMOrdenada = Object.values(regiao[cidade]).splice(1)
        //         KMOrdenada.sort(function(a, b) {
        //             return a - b;
        //         });
        //         //cidades.push(rota[index])
        //         console.log('cidades passada', rota[index], 'opa', rota[index+1])
        //         //console.log(index, 'melhor km:', KMOrdenada[1], 'km pega pelo algoritmo:',quilometragem, 'sei la', rota[index], index)
        //     }            
        // });        
    }
}

function gerarRotaAleatoria(){
    let novaRota =[]
    while(novaRota.length < 19){
        novaRota.push(novaCidadeUnicaAleatoria(novaRota))
    }
    novaRota.unshift(0)
    return novaRota.concat(0)
}

function novaCidadeUnicaAleatoria(rota){
    var sugestao = Math.ceil(Math.random() * 19); 
    while (rota.indexOf(sugestao) >= 0) {  
        sugestao = Math.ceil(Math.random() * 19);
    }
    return sugestao
}

function torneio(){
    let participantesTorneio = []
    let sugestao 
    for (let i = 0; i < TAM_TORNEIO; i++){
        sugestao = Math.floor(Math.random() * TAM_POPULACAO)// primeiro participante
        while (participantesTorneio.indexOf(vetorPopulacao[sugestao]) >= 0){ // garante que nenhum participante nao vai repetir
            sugestao = Math.floor(Math.random() * TAM_POPULACAO)
        }
        participantesTorneio.push(vetorPopulacao[sugestao])
    }

    participantesTorneio.sort(function(a, b) { // ordena por aptidao para pegar os dois melhores
        return b.aptidao - a.aptidao
    });
    
    return {
        pai1: participantesTorneio[0],
        pai2: participantesTorneio[1]
    }
}

function init(){
    geraPrimeiraPopulacao()
    //console.log(vetorPopulacao)
    let copia = vetorPopulacao

    copia.sort(function(a, b) {
        return b.aptidao - a.aptidao
    });
    for(let j = 0; j < TAM_GERACAO; j++){
        // console.log('GERACAO', j)    
        // console.log(vetorPopulacao)
        let novaGeracao = []
        let pai1, pai2  
        for(let i = 0; i < TAM_POPULACAO/2; i++){
            if(ELITISMO){
                if(i < TAM_ELITISMO){
                    novaGeracao[i] = copia[i]//pega os 'i' melhores cromossomos da geracao anterior
                }
            }
            if(TORNEIO_ROLETA == 1){
                pais = torneio()
            }else if(TORNEIO_ROLETA == 2){
                let pontuacaoGeracao = 0 
                vetorPopulacao.forEach(cromossomo => {
                    pontuacaoGeracao = pontuacaoGeracao + cromossomo.aptidao
                });
                pais = roleta(pontuacaoGeracao)
            }            
            if(Math.ceil(Math.random() * 100) <= TAXA_CRUZAMENTO){
                let filhos = crossOverPMX(pais.pai1, pais.pai2)
                //console.log(j ,'filhos', filhos)
                if(Math.ceil(Math.random() * 100) <= TAXA_MUTACAO){
                    filhos.filho1 = mutacao(filhos.filho1)
                }
                if(Math.ceil(Math.random() * 100) <= TAXA_MUTACAO){
                    filhos.filho2 = mutacao(filhos.filho2)
                }
                novaGeracao.push(filhos.filho1)
                novaGeracao.push(filhos.filho2)
            }else{
                novaGeracao.push(pais.pai1)
                novaGeracao.push(pais.pai2)
            }
        }
        vetorPopulacao = novaGeracao
        novaGeracao.sort(function(a, b) {
            return b.aptidao - a.aptidao
        });      
        //console.log('fim geracao', vetorPopulacao)  
        //console.log(novaGeracao[0])
        //console.log('melhor aptidao', j, novaGeracao[0])
        if(novaGeracao[0].aptidao > melhorGlobal){
            melhorGlobal = novaGeracao[0].aptidao
            console.log('melhor aptidao', j, novaGeracao[0])
        }      
    } 

    
}

function roleta(pontuacaoGeracao){
    let valorBuscado = 0
    let paiSorteado = []

    let vetorPopulacaoCopia = vetorPopulacao.slice().sort(function(a, b) {
        return b.aptidao - a.aptidao
    });

    let numSorteado1 = Math.floor(Math.random() * pontuacaoGeracao)

    for(let i = 0; i < vetorPopulacaoCopia.length; i++){
        valorBuscado = valorBuscado + vetorPopulacaoCopia[i].aptidao
        if(numSorteado1 <= valorBuscado){
            paiSorteado[0] = vetorPopulacaoCopia[i]
            break
        }
    }

    valorBuscado = 0
    let numSorteado2 = Math.floor(Math.random() * pontuacaoGeracao)
    while (numSorteado2 == numSorteado1){ // garante que nenhum participante nao vai repetir
        numSorteado2 = Math.floor(Math.random() * pontuacaoGeracao)
    }

    for(let i = 0; i < vetorPopulacaoCopia.length; i++){
        valorBuscado = valorBuscado + vetorPopulacaoCopia[i].aptidao
        if(numSorteado2 <= valorBuscado){
            paiSorteado[1] = vetorPopulacaoCopia[i]
            break
        }
    }
    return {
        pai1: new Cromossomo(paiSorteado[0].rota), 
        pai2: new Cromossomo(paiSorteado[1].rota)
    }
}

function geraPrimeiraPopulacao(){
    for(let i = 0; i < TAM_POPULACAO; i++){
        vetorPopulacao[i] = new Cromossomo(gerarRotaAleatoria())
    }
}

init()
// let i = 0
//teste  = new Cromossomo([0, 6, 7, 8, 11, 19, 9, 10, 16, 5, 1, 13, 14, 12, 3, 4, 2, 17, 18, 15, 0])// melhor gerado
//teste  = new Cromossomo([0, 15, 18, 17, 13, 14, 12, 2, 4, 3, 5, 6, 1, 8, 19, 9, 10, 11, 16, 7, 0])// melhor que eu achei
// console.log(teste)
// while(1){
//     let novo = mutacao(teste)
//     if(novo.totalKM < 2000){
//         console.log(novo)
//     }
// }
// Cromossomo {
// aptidao: 0,
// rota: [
//     0,  6, 7,  8, 11, 19,  9,
//    10, 16, 5,  1, 13, 14, 12,
//     3,  4, 2, 17, 18, 15,  0
//  ],
//  totalKM: 1762
// while(1){
//     let vetorPopulacao = []
//     for(let i = 0; i < TAM_POPULACAO; i++){
//         vetorPopulacao[i] = new Cromossomo(gerarRotaAleatoria())
//     }

//     vetorPopulacao.sort(function(a, b) {
//         return a.totalKM - b.totalKM;
//     });   

//     if(teste.totalKM <  melhorKM){
//         melhorKM = teste.totalKM
//         console.log(teste)
//     }
// }
// teste = new Cromossomo(gerarRotaAleatoria())
// console.log(teste)
//teste.calulaAptidao(teste.rota)
//teste2 = new Cromossomo(gerarRotaAleatoria())
//let filhos = crossOverPMX(teste, teste2)


function crossOverPMX(pai1, pai2){
    let filho2 = pai1
    let filho1 = pai2
    let aux = null
    let indicesFilho1 = [], indicesFilho2 = []

    let corte1 = Math.floor(Math.random() * (19 - 1 + 1) + 1);
    let corte2 = Math.floor(Math.random() * (20 - (corte1+1) + 1) + (corte1+1));
    let selecao1 = pai1.rota.slice(corte1, corte2)
    let selecao2 = pai2.rota.slice(corte1, corte2)
    //console.log(corte1, corte2)

    for(let i = 0; i < 20; i++){
        if(i >= corte1 && i < corte2){
            filho2.rota[i] = selecao2[i-corte1]
            filho1.rota[i] = selecao1[i-corte1]        
        }else{
            if(selecao1.indexOf(filho1.rota[i]) != -1){
                indicesFilho1.push(i)
            }
            if(selecao2.indexOf(filho2.rota[i]) != -1){
                indicesFilho2.push(i)
            }
        }
    }

    for(let i = 0; i < indicesFilho1.length; i++){
        aux = filho1.rota[indicesFilho1[i]]
        filho1.rota[indicesFilho1[i]] = filho2.rota[indicesFilho2[i]]
        filho2.rota[indicesFilho2[i]] = aux
    }

    return {
        filho1: new Cromossomo(filho1.rota), 
        filho2: new Cromossomo(filho2.rota)
    }
}

function mutacao(cromossomo){
    let aux
    let ponto1 = Math.ceil(Math.random() * 19); 
    let ponto2 = Math.ceil(Math.random() * 19);  
    while (ponto2 == ponto1) {  
        ponto2 = Math.ceil(Math.random() * 19);
    }
    aux = cromossomo.rota[ponto1]
    cromossomo.rota[ponto1] = cromossomo.rota[ponto2]
    cromossomo.rota[ponto2] = aux
    return new Cromossomo(cromossomo.rota)
}

// console.log(teste.rota[3])
// console.log(regiao[teste.rota[3]])

// for(var i=0 in teste.rota[3]) {
//     console.log(teste[0][i]);
//   }


//console.log(Object.keys(regiao[5]))
// for(let i = 0; i < 20; i++){
//     let cidadeAtual = teste.rota[i], proxCidade = teste.rota[i+1]
//     console.log(Object.values(regiao[cidadeAtual])[proxCidade + 1])
//     // console.log(Object.values(regiao[cidadeAtual])[proxCidade])
//     //console.log(i, Object.values(regiao[teste.rota[i]])[0], Object.values(regiao[cidadeAtual])[proxCidade])
//     //console.log(i, Object.values(regiao[teste.rota[i]])[0], teste.rota[i], 'para', Object.values(regiao[teste.rota[i+1]])[0], teste.rota[i+1], Object.values(regiao[teste.rota[i]])[teste.rota[i+1]+1],'km')
// }
//console.log(Object.values(regiao[teste.rota[0]]))




// function crossoverUniforme(cromossomo1, cromossomo2) {
//     let filho1 = new Cromossomo(turnos56Aleatorio())
//     let filho2 = new Cromossomo(turnos56Aleatorio())

//     for(let i=0;i<21;i=i+1)
//     {
//         for(j=0;j<2;j=j+1)
//         {
//             let numeroSorteio = Math.floor(Math.random() * 2);
//             if(numeroSorteio == 0)
//             {
//                 let profissionalFilho1 = cromossomo2.escalas[i][j]
//                 let profissionalFilho2 = cromossomo1.escalas[i][j]
//                 if(j==1)
//                 {
//                     while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes || 
//                             filho1.escalas[i][0] == profissionalFilho1)
//                     {
//                         profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
//                     }
//                     while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes || 
//                             filho2.escalas[i][0] == profissionalFilho2)
//                     {
//                         profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
//                     }
//                 }
//                 else
//                 {
//                     while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes)
//                     {
//                         profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
//                     }
//                     while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes)
//                     {
//                         profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
//                     }
            
//                 }
//                 filho1.escalas[i][j] = profissionalFilho1
//                 filho2.escalas[i][j] = profissionalFilho2
//             }
//             else if(numeroSorteio == 1)
//             {
//                 let profissionalFilho1 = cromossomo1.escalas[i][j]
//                 let profissionalFilho2 = cromossomo2.escalas[i][j]
//                 if(j==1)
//                 {
//                     while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes || 
//                             filho1.escalas[i][0] == profissionalFilho1)
//                     {
//                         profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
//                     }
//                     while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes || 
//                             filho2.escalas[i][0] == profissionalFilho2)
//                     {
//                         profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
//                     }
//                 }
//                 else
//                 {
//                     while(filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].posicoes.length >= filho1.posicaoEscalasPorProfissional['profissional'+profissionalFilho1].maximoAparicoes)
//                     {
//                         profissionalFilho1 = 1 + Math.floor(Math.random() * 10)
//                     }
//                     while(filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].posicoes.length >= filho2.posicaoEscalasPorProfissional['profissional'+profissionalFilho2].maximoAparicoes)
//                     {
//                         profissionalFilho2 = 1 + Math.floor(Math.random() * 10)
//                     }
            
//                 }
//                 filho1.escalas[i][j] = profissionalFilho1
//                 filho2.escalas[i][j] = profissionalFilho2
//             }
//             filho1.definirPosicoes()
//             filho2.definirPosicoes()
//         }
//     }

//     return {
//         filho1,
//         filho2
//     }
// }

// function torneio() {

// }

// function roleta(pontuacaoGeracao){

// }

// async function init()
// {
//     achou = false
//     horarioFinal = null
//     melhoresDaGeracao=[]
//     melhorResultadoArray = []
//     geracaoEncontrada = 0

//     vetorPopulacao = []
//     for(let i =0; i < tamanhoPopulacao; i=i+1)
//     {
//         vetorPopulacao.push(new Cromossomo(turnos56Aleatorio()))
//         vetorPopulacao[i].calcularAptdao()
//     }

//      //ordenar vetorPopupalcao
//      vetorPopulacao.sort(function(a, b) {
//         return b.aptidao - a.aptidao
//     });
   
//     melhoresDaGeracao.push(vetorPopulacao[0])
//     console.log("GERACAO "+0)
//     console.log((vetorPopulacao[0].percentualAlcancado / 24) *100)
//     console.log("-----------------------------------------")
    
//     for(let z = 0;z < numeroDeGeracoes; z = z + 1)
//     {
//         aplicaAG(z)
//     }
//     if(achou){
//         plotChart()
//         setDataInTable()or
//     }
// }

// function aplicaAG(z){

// }

// function getData(i) {
//     return melhorResultadoArray[i];
// } 

// function setDataInTable(){
//     let count = 1
//     var table = document.getElementById("body");
//     var tabela = document.getElementById("tabela");

//     for(let k = tabela.rows.length-1; k > 0; k--){
//         tabela.deleteRow(k)
//     }

//     let profissa1, profissa2, dia

//     for(let i = 0; i < 7; i++){
//         count = count -1
//         var newRow = table.insertRow(table.rows.length);
//         for(j = 0; j <= 3; j++){
//             var newCell = newRow.insertCell(j);
//             if(j == 0){
//                 switch (i){
//                     case 0: dia = 'Domingo'; break;
//                     case 1: dia = 'Segunda'; break;
//                     case 2: dia = 'Terça'; break;
//                     case 3: dia = 'Quarta'; break;
//                     case 4: dia = 'Quinta'; break;
//                     case 5: dia = 'Sexta'; break;
//                     case 6: dia = 'Sábado'; break;
//                 }
//                 newCell.innerHTML = dia     
//             }else{      
//                 if(horarioFinal[count-1][0] == 1 || horarioFinal[count-1][0] == 2
//                    || horarioFinal[count-1][0] == 5 || horarioFinal[count-1][0] == 6){

//                     profissa1 = '<strong>'+horarioFinal[count-1][0]+'</strong>'
//                 }else{
//                     profissa1 = horarioFinal[count-1][0]
//                 }
//                 if(horarioFinal[count-1][1] == 1 || horarioFinal[count-1][1] == 2
//                     || horarioFinal[count-1][1] == 5 || horarioFinal[count-1][1] == 6){

//                     profissa2 = '<strong>'+horarioFinal[count-1][1]+'</strong>'
//                 }else{
//                     profissa2 = horarioFinal[count-1][1]
//                 }
//                 newCell.innerHTML = '[ ' + profissa1 + ', ' + profissa2 + ' ]'                   
//             }
//             count = count + 1
//         }            
//     }
// }

// function plotChart(){
//     var layout = {
//     title: {
//         text:'Apitdão x Geração',
//         font: {
//             family: 'Gravitas One, monospace',
//             size: 18,
//             color: '#ea6f09'
//         },
//         xref: 'paper',
//         x: 0.05,
//     },
//     xaxis: {
//         title: {
//             text: 'Gerações',
//             font: {
//                 family: 'Courier New, monospace',
//                 size: 18,
//                 color: '#ea6f09'
//             }
//         },
//     },
//     yaxis: {
//         title: {
//             text: 'Melhor Aptidão',
//             font: {
//                 family: 'Courier New, monospace',
//                 size: 18,
//                 color: '#ea6f09'
//             }
//         }
//     },
//      plot_bgcolor: '#d0d3d8',
//     };
    
//     for(let i = 0; i < geracaoEncontrada; i++){
//         Plotly.newPlot("chart", [{
//             x: [i],
//             y: [getData(i)],
//             type: 'line'
//         }], layout);
//     }
//     var cnt = 0;
//     var interval = setInterval(function(){
//         Plotly.extendTraces('chart',{x:[[cnt]], y:[[getData(cnt)]]}, [0]);
//         cnt++;
//         if(cnt >= geracaoEncontrada){
//             clearInterval(interval);
//         }
//     },15);
// }

// function EscondeElemento(id){
//     var elemento = document.getElementById(id); 
//     if(elemento.style.display == 'none') {
//         elemento.style.display = 'block'; 
//     } else{
//         elemento.style.display = 'none'; 
//     }
// }    

// function loadProgressBar(valor){
//     progressbar.style.setProperty('--progress', valor)
// }

// function maoi(){
//     for (let i = 0; i < 100; i++) {
//         setTimeout(function(){
//             progressbar.style.setProperty('--progress', i)
//         })
//     }
// }

// function disgraca(i){
//     setTimeout(function(){
//         progressbar.style.setProperty('--progress', i)
//     })
// }