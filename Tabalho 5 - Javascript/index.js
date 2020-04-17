const MIN = -10
const MAX = 12

let melhorGlobal = 1
let melhorGeracao = 0
let vetorPopulacao = []
let melhoresPorGeracao = []
let melhorCromossomoArray = []
let melhorCromossomo = null
let mostrarX =[], mostrarY= [], mostrarZ = []
let mensagem       = document.getElementById("mensagem");
let metodo         = document.getElementById("metodos");
let elitismo       = document.getElementById("elitismo");
let crossover      = document.getElementById("crossover");
let tamPop         = document.getElementById("tampop");
let qtdGeracoes    = document.getElementById("qtdgeracoes");
let tamElitismo    = document.getElementById("tamelitismo");
let taxaCrossover  = document.getElementById("taxacrossover");
let taxaMut        = document.getElementById("taxamutacao");
let botao_iniciar  = document.getElementById("btn_init");
let tamTorneio     = document.getElementById("tamtorneio");

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

let performanceAlg

class Cromossomo{
    constructor(x, y) {
        this.variaveis = {x, y}
        this.vlFunc = this.func(x, y)
        this.aptidao = this.calulaAptidao()
    }

    func(x, y){
        return 15 + (Math.pow((x-3), 2) / 2) + (Math.pow((y-3), 2) / 2) - (2 * (Math.sin((4*x)-3) + Math.sin((4*y)-3)))
    }

    calulaAptidao(){
        return Math.round(Math.pow((1/this.vlFunc * 1000), 2))       
    }
}

function getRandomArbitrary() {
    return Math.random() * (MAX - MIN) + MIN;
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


function iniciarAG(){  
    inicializaVariaveis()
    let timeStart = performance.now();
    geraPrimeiraPopulacao()
    vetorPopulacao.sort(function(a, b) {
        return b.aptidao - a.aptidao
    }); 

    melhoresPorGeracao.push(vetorPopulacao[0].aptidao)
    for(let j = 1; j <= TAM_GERACAO; j++){
        vetorPopulacao = criaNovaGeracao()   
        vetorPopulacao.forEach(function(cromossomo){
            mostrarX.push(cromossomo.variaveis.x)
            mostrarY.push(cromossomo.variaveis.y)
            mostrarZ.push(cromossomo.vlFunc)
        })

        if(vetorPopulacao[0].aptidao > melhorGlobal){
            console.log('Nova melhor aptidao encontrada! Geração', j, vetorPopulacao[0])
            melhorCromossomo = vetorPopulacao[0]
            melhorGlobal = melhorCromossomo.aptidao
            melhorGeracao = j
        }  
        melhoresPorGeracao.push(vetorPopulacao[0].aptidao) 
        
    }  
    let timeEnd = performance.now();
    performanceAlg = timeEnd - timeStart;
    melhorCromossomoArray.push(melhorCromossomo)
    plotChart()
    plot3DChart()
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
            vetorPopulacao.forEach((cromossomo) => {
                pontuacaoGeracao = pontuacaoGeracao + cromossomo.aptidao
            });
            pais = roleta(pontuacaoGeracao)
        }
        
        if(Math.ceil(Math.random() * 100) <= TAXA_CRUZAMENTO){
            if(TIPO_CROSSOVER == 1){
                filhos = crossOverRadCliff(pais.pai1, pais.pai2)
            }else if (TIPO_CROSSOVER == 2){
                filhos = crossOverWright(pais.pai1, pais.pai2)
                if(filhos == null){
                    continue;
                }
            }
            if(Math.ceil(Math.random() * 100) <= TAXA_MUTACAO){
                filhos.filho1 = mutacao(filhos.filho1)
            }
            if(Math.ceil(Math.random() * 100) <= TAXA_MUTACAO){
                filhos.filho2 = mutacao(filhos.filho2)
            }           
        }else{
            filhos.filho1 = pais.pai1
            filhos.filho2 = pais.pai2
        }

        if((TAM_POPULACAO - novaGeracao.length) >= 2)
        {
            if(novaGeracao.indexOf(filhos.filho1)<0)
            {
                novaGeracao.push(filhos.filho1)
            }

            if(novaGeracao.indexOf(filhos.filho2)<0)
            {
                novaGeracao.push(filhos.filho2)
            }
        }
        else
        {
            let numeroSorteio = Math.floor(Math.random() * 2);
            if(numeroSorteio == 0 && novaGeracao.indexOf(filhos.filho1)<0)
            {
                novaGeracao.push(filhos.filho1)
            }
            else if(numeroSorteio == 1 && novaGeracao.indexOf(filhos.filho2)<0)
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
        pai1: paiSorteado[0], 
        pai2: paiSorteado[1]
    }
}

function geraPrimeiraPopulacao(){
    for(let i = 0; i < TAM_POPULACAO; i++){
        vetorPopulacao[i] = new Cromossomo(getRandomArbitrary(), getRandomArbitrary())
    }
}

const crossOverRadCliff = (pai1, pai2) => {
    const beta = Math.random() 
    const x1 = (beta * pai1.variaveis.x) + ((1 - beta) * pai2.variaveis.x)
    const y1 = (beta * pai1.variaveis.y) + ((1 - beta) * pai2.variaveis.y)
    const x2 = ((1 - beta) * pai1.variaveis.x) + (beta * pai2.variaveis.x)
    const y2 = ((1 - beta) * pai1.variaveis.y) + (beta * pai2.variaveis.y)

    let filhos = {
        filho1 : new Cromossomo(x1, y1),
        filho2 : new Cromossomo(x2, y2)
    }

    return filhos
}

const crossOverWright = (pai1, pai2) => {
 
    const x1 = (0.5 * pai1.variaveis.x) + (0.5 * pai2.variaveis.x)
    const y1 = (0.5 * pai1.variaveis.y) + (0.5 * pai2.variaveis.y)
    const x2 = (1.5 * pai1.variaveis.x) - (0.5 * pai2.variaveis.x)
    const y2 = (1.5 * pai1.variaveis.y) - (0.5 * pai2.variaveis.y)
    const x3 = (-0.5 * pai1.variaveis.x) + (1.5 * pai2.variaveis.x)
    const y3 = (-0.5 * pai1.variaveis.y) + (1.5 * pai2.variaveis.y)

    let filhos = []

    if(x1 >= MIN && x1 <= MAX){
        if(y1 >= MIN && y1 <= MAX){
            filhos.push(new Cromossomo(x1, y1))
        }
    }

    if(x2 >= MIN && x2 <= MAX){
        if(y2 >= MIN && y2 <= MAX){
            filhos.push(new Cromossomo(x2, y2))
        }
    }

    if(x3 >= MIN && x3 <= MAX){
        if(y3 >= MIN && y3 <= MAX){
            filhos.push(new Cromossomo(x3, y3))
        }
    }
    if(filhos.length < 2 ){
        return null
    }else{
        filhos.sort(function(a, b) {
            return b.aptidao - a.aptidao
        });    
    }

    let retorno = {
        filho1 : filhos[0],
        filho2 : filhos[1]
    }

    return retorno
}

function mutacao(cromossomo){
    const geneMutado = Math.floor(Math.random() * 2)
    let mutado

    if(geneMutado == 0){
        mutado = new Cromossomo(getRandomArbitrary(), cromossomo.variaveis.y)
    }else if(geneMutado == 1){
        mutado = new Cromossomo(cromossomo.variaveis.x, getRandomArbitrary())
    }
    return mutado
}

function init(){
    mensagem.innerHTML = 'Aguarde...Encontrando mínimo da função'
    setTimeout(function() {
        iniciarAG()
        setTimeout(function() {
            mensagem.innerHTML = `Mínimo encontrado com sucesso! <br> Valor da função: ${melhorCromossomo.vlFunc}<br> Valor de X: ${melhorCromossomo.variaveis.x} <br> Valor de Y: ${melhorCromossomo.variaveis.y}<br> Geração: ${melhorGeracao}<br> Tempo de execução: ${performanceAlg}ms`
        }, 100);
    }, 100);
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
        TAM_TORNEIO = 4
    }
    else if (tamTorneio.options[tamTorneio.selectedIndex].value == "trinta"){
        TAM_TORNEIO = 30
    }
    else if (tamTorneio.options[tamTorneio.selectedIndex].value == "cinquenta"){
        TAM_TORNEIO = 100
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

    // Select do tam da populacao ///////////////
    if (tamPop.options[tamPop.selectedIndex].value == "ccinquenta"){
        TAM_POPULACAO = 10
    }
    else if (tamPop.options[tamPop.selectedIndex].value == "trezentos"){
        TAM_POPULACAO = 100
    }
    else if (tamPop.options[tamPop.selectedIndex].value == "qcinquenta"){
        TAM_POPULACAO = 1000
    }

    // Select da qtd de geracoes ///////////////
    if (qtdGeracoes.options[qtdGeracoes.selectedIndex].value == "cem"){
        TAM_GERACAO = 50
    }
    else if (qtdGeracoes.options[qtdGeracoes.selectedIndex].value == "duzentas"){
        TAM_GERACAO = 100
    }
    else if (qtdGeracoes.options[qtdGeracoes.selectedIndex].value == "quinhentas"){
        TAM_GERACAO = 300
    }

    // Select do tam do elitismo ///////////////
    if (tamElitismo.options[tamElitismo.selectedIndex].value == "dois"){
        TAM_ELITISMO = 2
    }
    else if (tamElitismo.options[tamElitismo.selectedIndex].value == "cinco"){
        TAM_ELITISMO = 10
    }
    else if (tamElitismo.options[tamElitismo.selectedIndex].value == "dez"){
        TAM_ELITISMO = 20
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
    vetorPopulacao = []
    mostrarX =[]
    mostrarY= [] 
    mostrarZ = []
    melhoresPorGeracao = []
    melhorCromossomoArray = []
    melhorCromossomo = null
    melhorGlobal = 1
    melhorGeracao = 0
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
        }
    },15);
}

function getData(i) {
    return melhoresPorGeracao[i];
} 

function plot3DChart(){
    var data = []
    data.push({
        opacity: 0.9,
        type: "scatter3d",
        name: `Individuos gerados`,
        x: mostrarX.map((cromossomo) => cromossomo),
        y: mostrarY.map((cromossomo) => cromossomo),
        z: mostrarZ.map((cromossomo) => cromossomo),
        mode: "markers",
        marker: {
          size: 10,
        },
      })

    data.push({
        opacity: 0.9,
        type: "scatter3d",
        name: `Melhor Individuo`,
        x: melhorCromossomoArray.map((cromossomo) => cromossomo.variaveis.x),
        y: melhorCromossomoArray.map((cromossomo) => cromossomo.variaveis.y),
        z: melhorCromossomoArray.map((cromossomo) => cromossomo.vlFunc),
        mode: "markers",
        marker: {
          size: 10,
        },
      })

      var layout = {
        scene: {
          xaxis: { range: [MIN, MAX] },
          yaxis: { range: [MIN, MAX] },
          zaxis: { range: [0, 100] },
        },
        height: 750,
      }
      Plotly.newPlot("chart3d", data, layout)
}

