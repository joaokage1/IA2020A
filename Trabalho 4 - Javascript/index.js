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

//const TAM_GERACAO    = 100
//const TAXA_MUTACAO   = 30      //(%)
//const TAXA_CRUZAMENTO= 80      //(%)
//const TAM_POPULACAO  = 150
//const TORNEIO_ROLETA = 1       //---> 1 = Torneio                        ---> 2 = Roleta
//const TAM_TORNEIO    = 30
//const ELITISMO       = true
//const TAM_ELITISMO   = 10
//const TIPO_CROSSOVER = 1       //---> 1 = Partially Matched Crossover    ---> 2 = Cycle Crossover        ---> 3 = Cross Over em Ordem
//const TIPO_MUTACAO   = 2       //---> 1 = Mutação por Inversão           ---> 2 = Mutação de dois pontos

let mensagem       = document.getElementById("mensagem");
let metodo         = document.getElementById("metodos");
let elitismo       = document.getElementById("elitismo");
let crossover      = document.getElementById("crossover");
let mutacao        = document.getElementById("mutacao");
let tamPop         = document.getElementById("tampop");
let qtdGeracoes    = document.getElementById("qtdgeracoes");
let tamElitismo    = document.getElementById("tamelitismo");
let taxaCrossover  = document.getElementById("taxacrossover");
let taxaMut        = document.getElementById("taxamutacao");
let botao_iniciar  = document.getElementById("btn_init");
let botao_ver_mapa = document.getElementById("btn_show_map");
let tamTorneio     = document.getElementById("tamtorneio");
botao_ver_mapa.disabled = true

let vetorPopulacao = []
let melhoresPorGeracao = []
let melhorCromossomo = null
let melhorGlobal = 5000
let TORNEIO_ROLETA = 1
let ELITISMO = true
let TIPO_CROSSOVER = 1
let TIPO_MUTACAO = 1
let TAM_GERACAO = 100
let TAM_POPULACAO  = 150
let TAM_ELITISMO   = 10
let TAXA_MUTACAO   = 30
let TAXA_CRUZAMENTO= 80
let TAM_TORNEIO    = 30

let url_maps = 'https://www.google.com/maps/dir'
let array_ulr_cidades = [
    '/Uberaba,+MG',
    '/Uberl%C3%A2ndia,+MG',
    '/Arax%C3%A1,+MG',
    '/Patos+de+Minas,+Minas+Gerais',
    '/Patroc%C3%ADnio,+MG,+38740-000',
    '/Monte+Carmelo,+Minas+Gerais,+38500-000',
    '/Araguari,+MG',
    '/Ituiutaba,+MG',
    '/38140-000,+Prata+-+MG',
    '/Frutal,+MG,+38200-000',
    '/Concei%C3%A7%C3%A3o+das+Alagoas,+MG,+38120-000',
    '/Campo+Florido,+MG,+38130-000',
    '/38170-000,+Perdizes+-+MG',
    '/38175-000,+Santa+Juliana+-+MG',
    '/38160-000,+Nova+Ponte+-+MG',
    '/Delta,+Minas+Gerais',
    '/38110-000,+%C3%81gua+Comprida+-+MG',
    '/38190-000,+Sacramento+-+MG',
    '/38195-000,+Conquista+-+MG',
    '/Comendador+Gomes,+MG,+38250-000'
]

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
        return Math.round(Math.pow((1/this.totalKM * 100000), 2))       
    }
}

function init(){
    mensagem.innerHTML = 'Aguarde...Gerando Rota'
    setTimeout(function() {
        iniciarAG()
        setTimeout(function() {
            mensagem.innerHTML = `Rota Gerada com sucesso!`
        }, 100);
    }, 100);
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

const torneio = () => {
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
    
    let pais = {
        pai1 : participantesTorneio[0],
        pai2 : participantesTorneio[1]
    }

    return pais
}

function inicializaVariaveis(){
    // Select do metodo selecao /////////////////
    if (metodo.options[metodo.selectedIndex].value == "torneio"){
        TORNEIO_ROLETA = 1
    }
    else if (metodo.options[metodo.selectedIndex].value == "roleta"){
        TORNEIO_ROLETA = 2
    }

    // Select do tam do torneio /////////////////
    if (tamTorneio.options[tamTorneio.selectedIndex].value == "dez"){
        TAM_TORNEIO = 10
    }
    else if (tamTorneio.options[tamTorneio.selectedIndex].value == "trinta"){
        TAM_TORNEIO = 30
    }
    else if (tamTorneio.options[tamTorneio.selectedIndex].value == "cinquenta"){
        TAM_TORNEIO = 50
    }

    

    // Select do elitismo ///////////////////////
    if (elitismo.options[elitismo.selectedIndex].value == "sim"){
        ELITISMO = true
    }
    else if (elitismo.options[elitismo.selectedIndex].value == "nao"){
        ELITISMO = false
    }

    // Select do crossover /////////////////////
    if (crossover.options[crossover.selectedIndex].value == "pmx"){
        TIPO_CROSSOVER = 1
    }
    else if (crossover.options[crossover.selectedIndex].value == "cx"){
        TIPO_CROSSOVER = 2
    }
    else if (crossover.options[crossover.selectedIndex].value == "order"){
        TIPO_CROSSOVER = 3
    }

    // Select da mutacao //////////////////////
    if (mutacao.options[mutacao.selectedIndex].value == "inv"){
        TIPO_MUTACAO = 1
    }
    else if (mutacao.options[mutacao.selectedIndex].value == "doisp"){
        TIPO_MUTACAO = 2
    }
    // Select do tam da populacao ///////////////
    if (tamPop.options[tamPop.selectedIndex].value == "ccinquenta"){
        TAM_POPULACAO = 150
    }
    else if (tamPop.options[tamPop.selectedIndex].value == "trezentos"){
        TAM_POPULACAO = 300
    }
    else if (tamPop.options[tamPop.selectedIndex].value == "qcinquenta"){
        TAM_POPULACAO = 450
    }

    // Select da qtd de geracoes ///////////////
    if (qtdGeracoes.options[qtdGeracoes.selectedIndex].value == "cem"){
        TAM_GERACAO = 100
    }
    else if (qtdGeracoes.options[qtdGeracoes.selectedIndex].value == "duzentas"){
        TAM_GERACAO = 200
    }
    else if (qtdGeracoes.options[qtdGeracoes.selectedIndex].value == "quinhentas"){
        TAM_GERACAO = 500
    }

    // Select do tam do elitismo ///////////////
    if (tamElitismo.options[tamElitismo.selectedIndex].value == "dois"){
        TAM_ELITISMO = 2
    }
    else if (tamElitismo.options[tamElitismo.selectedIndex].value == "cinco"){
        TAM_ELITISMO = 5
    }
    else if (tamElitismo.options[tamElitismo.selectedIndex].value == "dez"){
        TAM_ELITISMO = 10
    }

    // Select da taxa de crossover //////////////
    if (taxaCrossover.options[taxaCrossover.selectedIndex].value == "cinquenta"){
        TAXA_CRUZAMENTO = 50
    }
    else if (taxaCrossover.options[taxaCrossover.selectedIndex].value == "sessentacinco"){
        TAXA_CRUZAMENTO = 65
    }
    else if (taxaCrossover.options[taxaCrossover.selectedIndex].value == "oitenta"){
        TAXA_CRUZAMENTO = 80
    }

    // Select da taxa de mutacao ///////////////
    if (taxaMut.options[taxaMut.selectedIndex].value == "cinco"){
        TAXA_MUTACAO = 5
    }
    else if (taxaMut.options[taxaMut.selectedIndex].value == "dez"){
        TAXA_MUTACAO = 10
    }
    else if (taxaMut.options[taxaMut.selectedIndex].value == "trinta"){
        TAXA_MUTACAO = 30
    }

    botao_iniciar.disabled  = true
    botao_ver_mapa.disabled = true
    vetorPopulacao = []
    melhoresPorGeracao = []
    melhorCromossomo = null
    melhorGlobal = 5000
    melhoresPorGeracao.push(0)
}

function iniciarAG(){  
    inicializaVariaveis()
    geraPrimeiraPopulacao()
    vetorPopulacao.sort(function(a, b) {
        return b.aptidao - a.aptidao
    }); 

    melhoresPorGeracao.push(vetorPopulacao[0].aptidao)
    for(let j = 1; j <= TAM_GERACAO; j++){
        vetorPopulacao = criaNovaGeracao()   
        if(vetorPopulacao[0].totalKM < melhorGlobal){
            console.log('Nova melhor aptidao encontrada! Geração', j, vetorPopulacao[0].totalKM)
            melhorCromossomo = vetorPopulacao[0]
            melhorGlobal = melhorCromossomo.totalKM
        }  
        melhoresPorGeracao.push(vetorPopulacao[0].aptidao) 
    }   
    mostraCidadesRota(melhorCromossomo)
    setDataInTable(melhorCromossomo)
    plotChart()
}

function showRouteInMaps(){
    let url = url_maps
    for(let i = 0; i < 21; i++){
        url = url + array_ulr_cidades[melhorCromossomo.rota[i]]
    }
    window.open(url)
}

const criaNovaGeracao = () => {
    let novaGeracao = []
  
    if(ELITISMO){
        let auxElite = 0
        while(novaGeracao.length < TAM_ELITISMO){
            novaGeracao.push(vetorPopulacao[auxElite])
            auxElite++
        }
    }  
    while(novaGeracao.length < vetorPopulacao.length){
        let filhos = {}
        let pais

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
            if(TIPO_CROSSOVER == 1){
                filhos = crossOverPMX(pais.pai1, pais.pai2)
            }else if(TIPO_CROSSOVER == 2){
                filhos = crossOverCX(pais.pai1, pais.pai2)
            }else if(TIPO_CROSSOVER == 3){
                filhos = crossOverEmOrdem(pais.pai1, pais.pai2)
            }
                   
            if(Math.ceil(Math.random() * 100) <= TAXA_MUTACAO){
                if(TIPO_MUTACAO == 1)
                {
                    filhos.filho1 = mutacaoInversao(filhos.filho1)
                }
                else if(TIPO_MUTACAO == 2)
                {
                    filhos.filho1 = mutacaoDoisPontos(filhos.filho1)
                }
            }
            if(Math.ceil(Math.random() * 100) <= TAXA_MUTACAO){
                if(TIPO_MUTACAO == 1)
                {
                    filhos.filho2 = mutacaoInversao(filhos.filho2)
                }
                else if(TIPO_MUTACAO == 2)
                {
                    filhos.filho2 = mutacaoDoisPontos(filhos.filho2)
                }
            }
           
        }else{
            filhos.filho1 = pais.pai1
            filhos.filho2 = pais.pai2
        }

        if((TAM_POPULACAO - novaGeracao.length) >= 2)
        {
            novaGeracao.push(filhos.filho1)
            novaGeracao.push(filhos.filho2)
        }
        else
        {
            let numeroSorteio = Math.floor(Math.random() * 2);
            if(numeroSorteio == 0)
            {
                novaGeracao.push(filhos.filho1)
            }
            else if(numeroSorteio == 1)
            {
                novaGeracao.push(filhos.filho2)
            }
        }
    }

    novaGeracao.sort(function(a, b) {
        return b.aptidao - a.aptidao
    });    

    return novaGeracao
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

const crossOverPMX = (pai1, pai2) => {
    let filho2 = pai1.rota.slice()
    let filho1 = pai2.rota.slice()
    let aux = null
    let indicesFilho1 = [], indicesFilho2 = []

    let corte1 = Math.floor(Math.random() * (19 - 1 + 1) + 1);
    let corte2 = Math.floor(Math.random() * (20 - (corte1+1) + 1) + (corte1+1));
    let selecao1 = pai1.rota.slice(corte1, corte2)
    let selecao2 = pai2.rota.slice(corte1, corte2)

    for(let i = 0; i < 20; i++){
        if(i >= corte1 && i < corte2){
            filho2[i] = selecao2[i-corte1]
            filho1[i] = selecao1[i-corte1]        
        }else{
            if(selecao1.indexOf(filho1[i]) != -1){
                indicesFilho1.push(i)
            }
            if(selecao2.indexOf(filho2[i]) != -1){
                indicesFilho2.push(i)
            }
        }
    }

    for(let i = 0; i < indicesFilho1.length; i++){
        aux = filho1[indicesFilho1[i]]
        filho1[indicesFilho1[i]] = filho2[indicesFilho2[i]]
        filho2[indicesFilho2[i]] = aux
    }

    let filhos = {
        filho1 : new Cromossomo(filho1),
        filho2 : new Cromossomo(filho2)
    }

    return filhos
}

function crossOverEmOrdem(pai1, pai2)
{
    const rota1 = pai1.rota.slice(1,20)
    const rota2 = pai2.rota.slice(1,20)

    const rotaFilho1 = pai1.rota.slice(1,20)
    const rotaFilho2 = pai2.rota.slice(1,20)

    let vetorAux1 = []
    let vetorAux2 = []

    for(let i = 0;i < 19; i = i + 1)
    {
        const aleatorio = Math.floor(Math.random() * 2)
        
        if(aleatorio == 0)
        {
            vetorAux1.push({posicao: rota2.indexOf(rota1[i]), valor: rota1[i]})
            vetorAux2.push({posicao: rota1.indexOf(rota2[i]), valor: rota2[i]})
   
            rotaFilho1[i] = null
            rotaFilho2[i] = null
        }
    }

    vetorAux1.sort(function(a, b) {
        return a.posicao - b.posicao;
    });

    vetorAux2.sort(function(a, b) {
        return a.posicao - b.posicao;
    });

    let j = 0
    let k = 0

    vetorAux1 = Object.values(vetorAux1)
    vetorAux2 = Object.values(vetorAux2)

    for(let i = 0;i<19;i=i+1)
    {
        if(!rotaFilho1[i])
        {
            rotaFilho1[i] = vetorAux1[j].valor
            j=j+1
        }

        if(!rotaFilho2[i])
        {
            rotaFilho2[i] = vetorAux2[k].valor
            k=k+1
        }
    }

    rotaFilho1.unshift(0)
    rotaFilho2.unshift(0)

    rotaFilho1.push(0)
    rotaFilho2.push(0)

    return {
        filho1: new Cromossomo(rotaFilho1),
        filho2: new Cromossomo(rotaFilho2)
    }
}

const mutacaoDoisPontos = (cromossomo) => {
    let aux
    let ponto1 = Math.ceil(Math.random() * 19); 
    let ponto2 = Math.ceil(Math.random() * 19);  
    while (ponto2 == ponto1) {  
        ponto2 = Math.ceil(Math.random() * 19);
    }
    aux = cromossomo.rota[ponto1]
    cromossomo.rota[ponto1] = cromossomo.rota[ponto2]
    cromossomo.rota[ponto2] = aux

    let retorno = new Cromossomo(cromossomo.rota)

    return retorno
}

function mutacaoInversao(cromossomo){
    const rota = cromossomo.rota

    let corte1 = Math.floor(Math.random() * (19 - 1 + 1) + 1);
    let corte2 = Math.floor(Math.random() * (20 - (corte1+1) + 1) + (corte1+1));
    
    let aux = cromossomo.rota.slice(corte1, corte2)
  
    aux.reverse()

    for(let i = corte1, j = 0; i<corte2;i=i+1,j=j+1)
    {
        rota[i] = aux[j]
    }

    return new Cromossomo(rota)
}

function mutacaoPermutacao(cromossomo){
    const rota = cromossomo.rota

    let corte1 = Math.floor(Math.random() * (19 - 1 + 1) + 1);
    let corte2 = Math.floor(Math.random() * (20 - (corte1+1) + 1) + (corte1+1));
    
    let aux = cromossomo.rota.slice(corte1, corte2)
 
    for(let i = 0;i < aux.length;i=i+1)
    {
        let ponto = Math.floor(Math.random() * aux.length)

        let aux2 = aux[i]
        aux[i] = aux[ponto]
        aux[ponto] = aux2
    }

    for(let i = corte1, j = 0; i<corte2;i=i+1,j=j+1)
    {
        rota[i] = aux[j]
    }
    
    return new Cromossomo(rota)
}

function mostraCidadesRota(cromossomo){
    console.log('------------MELHOR ROTA ENCONTRADA---------------')
    for(let i = 0; i < 20; i++){
        let cidadeAtual = cromossomo.rota[i], proxCidade = cromossomo.rota[i+1]
        console.log(Object.values(regiao[cidadeAtual])[0], cidadeAtual, 'para', Object.values(regiao[proxCidade])[0], proxCidade, Object.values(regiao[cidadeAtual])[proxCidade+1],'km')
    }
}

const crossOverCX = (pai1, pai2) => {
    let rota1 = pai1.rota.slice()
    let rota2 = pai2.rota.slice()

    let ciclo1 = getCycle(rota1, rota2)
    let ciclo2 = getCycle(rota2, rota1)

    let filho1 = geraNovaRotaCX(ciclo1, rota1, rota2)
    let filho2 = geraNovaRotaCX(ciclo2, rota2, rota1)

    let filhos = {
        filho1 : new Cromossomo(filho1),
        filho2 : new Cromossomo(filho2)
    }
    
    return filhos
}

function geraNovaRotaCX(ciclo, rota1, rota2){
    let rotaFilho = []

    for(let i = 1; i < 20; i++){
        if(ciclo.indexOf(rota1[i]) != -1){
            rotaFilho.push(rota1[i])
        }else{
            rotaFilho.push(rota2[i])
        }
    }
    rotaFilho.unshift(0)
    rotaFilho = rotaFilho.concat(0)
    return rotaFilho
}

function getCycle(rota1, rota2){
    let ciclo = []
    let elemento, indice = 1

    ciclo.push(rota1[indice])
    while(1){
        elemento = rota2[rota1.indexOf(rota1[indice])]       
        indice = rota1.indexOf(elemento)
        if(elemento == rota1[1]) break;
        ciclo.push(elemento)
    }
    return ciclo
}

function getData(i) {
    return melhoresPorGeracao[i];
} 

function setDataInTable(cromossomo){
    var table = document.getElementById("body");
    var tabela = document.getElementById("tabela");
    rotaFinal  = vetorPopulacao[0];
    console.log(tabela.rows.length)
    for(let k = tabela.rows.length-1; k > 0; k--){
        tabela.deleteRow(k)
    }

    for(let i = 0; i < 21; i++){
        var newRow = table.insertRow(table.rows.length);
        for(j = 0; j < 3; j++){
            var newCell = newRow.insertCell(j);

            if(i == 20){
                switch (j){
                    case 0 : newCell.innerHTML = '<strong> Total </strong>' ; break;
                    case 1 : newCell.innerHTML = ' ';   break;
                    case 2 : newCell.innerHTML = '<strong>' + cromossomo.totalKM + ' km </strong>' ; break 
                }
                
            }else{
                let cidadeAtual = cromossomo.rota[i], proxCidade = cromossomo.rota[i+1]

                if(j == 0){
                    newCell.innerHTML = Object.values(regiao[cidadeAtual])[0]    
                }
                else if(j == 1){
                    newCell.innerHTML = Object.values(regiao[proxCidade])[0]   
                }
                else{
                    newCell.innerHTML = Object.values(regiao[cidadeAtual])[proxCidade+1] + ' km'
                }  
            }
        }             
    }            
}

function plotChart(){
    var layout = {
    title: {
        text:'Aptidão x Geração',
        font: {
            family: 'Gravitas One, monospace',
            size: 18,
            color: '#ea6f09'
        },
        xref: 'paper',
        x: 0.05,
    },
    xaxis: {
        title: {
            text: 'Gerações',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#ea6f09'
            }
        },
    },
    yaxis: {
        title: {
            text: 'Melhor Aptidão',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#ea6f09'
            }
        }
    },
     plot_bgcolor: '#d0d3d8',
    };
    
    for(let i = 0; i < TAM_GERACAO; i++){
        Plotly.newPlot("chart", [{
            x: [i],
            y: [getData(i)],
            type: 'line'
        }], layout);
    }
    var cnt = 0;
    var interval = setInterval(function(){
        Plotly.extendTraces('chart',{ x:[[cnt]], y:[[getData(cnt)]] }, [0]);
        cnt++;
        if(cnt >= TAM_GERACAO){
            clearInterval(interval);
            botao_iniciar.disabled  = false
            botao_ver_mapa.disabled = false
        }
    },15);
}