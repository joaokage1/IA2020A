const target = getTargets();
const entrada = getEntrada();

let botao_iniciar  = document.getElementById("btn_init");
let radios = document.getElementsByName('criterio');
let tx_aprendizagem = document.getElementById('tx_aprendizagem');
let n_ciclos = document.getElementById('n_ciclos');

const amostras = entrada.length;
const entradas = entrada[0].length;
const numClasses = target.length;
const limiar = 0.0;
const erroTolerado = 0.1;

let numeroCiclos = 0;
let paradaPorCiclo_ = false;
let taxaAprendizagem = 0.01;

const v = new Array(entradas);
const v0 = new Array(numClasses);

const yin = new Array(numClasses);
const y = new Array(numClasses);

let vetorCiclos = [];
let vetorErros = [];
let erro = 10;
let ciclo = 0;

function init() {
  let vetor = getCanvasNumber().flat();

  vetor = vetor.toString();
  vetor = vetor.replace(/\*/g, -1);
  vetor = vetor.replace(/\#/g, 1);

  vetor = vetor.split(',');

  retornarNumero(vetor, 0.01, false, 4)
}

function retornarNumero(pixels, taxa, paradaPorCiclo, ciclos) {
  numeroCiclos = ciclos;
  taxaAprendizagem = taxa;
  paradaPorCiclo_ = paradaPorCiclo

  identificarNumero(pixels);

  const target_ = y;
  let posicao = -1;
  let reconhecido = false;

  for (let i = 0; i < target_.length; i = i + 1) {
    if(reconhecido  && target_[i] == 1) {
      reconhecido = false;
      break;
    }

    if (target_[i] == 1) {
      reconhecido = true;
      posicao = i;
    }
  }

  let numero = reconhecido ? posicao + 1 : 'Não reconhecido';
  if (numero == 10) {
    numero = 0;
  }

  console.log(numero);

  return numero;
}

function treinamento() {
  configIA()
  for (let i = 0; i < entradas; i = i + 1) {
    for (let j = 0;j < numClasses; j = j + 1) {
      if (j==0) {
        v[i]=new Array(numClasses);
      }
  
      v[i][j] = Math.random() * (0.1 - (-0.1)) + (-0.1);
    }
  }
  
  for (let i = 0; i < numClasses; i = i + 1) {
    v0[i] = Math.random() * (0.1 - (-0.1)) + (-0.1);
  }
  
  while (paradaPorCiclo_ ? numeroCiclos > ciclo : erro > erroTolerado) {
    ciclo = ciclo + 1;
    erro = 0;
  
    for (let i = 0; i < amostras; i = i + 1) {
      xaux = entrada[i]
      for (let m = 0; m < numClasses; m = m + 1) {
        let soma = 0;
  
        for (let n = 0; n < entradas; n = n + 1) {
          soma = soma + xaux[n] * v[n][m];
        }
  
        yin[m] = soma + v0[m];
      }
  
      for (let j = 0; j < numClasses; j = j + 1) {
        if(yin[j] >= limiar) {
          y[j] = 1.0
        } else {
          y[j] = -1.0;
        }
      }
  
      for(let j = 0; j < numClasses; j = j + 1) {
        erro = erro + 0.5 * ( Math.pow( target[j][i] - y[j] ,2) )
      }
  
      vanterior = v;
  
      for (let m = 0; m < entradas;m = m + 1) {
        for (let n = 0; n < numClasses; n = n + 1) {
          v[m][n] = vanterior[m][n] + taxaAprendizagem * ( target[n][i] - y[n]) * xaux[m];
        }
      } 
  
      v0anterior = v0;
  
      for (let j = 0;j < numClasses; j = j + 1) {
        v0[j] = v0anterior[j] + taxaAprendizagem * (target[j][i] - y[j]);
      }
    }
    
    vetorCiclos.push(ciclo);
    vetorErros.push(erro);
  }

  return {vetorErros, vetorCiclos}
}

function identificarNumero(vetorNumero) {
  for (let i = 0; i < numClasses; i = i + 1) {
    let soma = 0;

    for (let j = 0; j < entradas; j = j + 1) {
      soma = soma + vetorNumero[j]*v[j][i];
      yin[i] = soma + v0[i];
    }
  } 

  for (let i = 0; i < numClasses; i = i + 1) {
    if (yin[i] >= limiar){
      y[i] = 1.0;
    } else {
      y[i] = -1.0;
    }
  }
}

function configIA(){
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      paradaPorCiclo_ = radios[i].value == 1 ? true : false
      break;
    }
  }
  taxaAprendizagem =  tx_aprendizagem.value
  numeroCiclos = n_ciclos.value
}
