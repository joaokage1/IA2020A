# -*- coding: cp1252 -*-
import math
import numpy as np

tamCromossomo = int(input('Digite o tamanho do cromossomo: '))
tamPopulacaoInicial = int(input('Digite o tamanho da populacao inicial base: '))
tamPopulacao = int(input('Digite o tamanho da populacao: '))
qtdEras = int(input('Digite a quantidade de geracoes: '))
probCruzamento = float(input('Digite a probabilidade de cruzamento (0.0 a 1.0): '))
real1 = 0
real2 = 0
somaAvaliacoes = 0
pai = 0
contGeral = 0
filhos = []
pais = []
listaReais1 = []
listaReais2 = []
populacaoInicial = []
populacao = []
valoresFx = []
inf1 = -3.1
sup1 = 12.1
inf2 = 4.1
sup2 = 5.8
probabilidadeMutacao = float(input('Digite a probabilidade de mutacao (0.0 a 1.0): '))

def geraCromossomo():
    cromossomo = []
    cromossomo = np.random.randint(2, size=tamCromossomo)
    return cromossomo

def geraPopulacao():
    crom = []
    for w in range(tamPopulacaoInicial):
        crom = geraCromossomo()
        populacaoInicial.append(crom)
        
def converteBinario():
    pop = []
    if contGeral == 0:
        pop = populacaoInicial
    else:
        pop = populacao
    r1 = 0
    r2 = 0
    metade = tamCromossomo // 2
    for w in pop:
        tamCromAux = tamCromossomo 
        r1 = 0
        r2 = 0
        #print("Cromossomo: ", w)
        for x in range(metade):
            #print("Cromossomo[x]: ", w[x])
            r1 = r1 + ((w[x])*(pow(2, tamCromAux - 1)))
            #print("r1 atual: ", r1)
            tamCromAux -= 1
        real1 = inf1 + (((sup1 - inf1) / (pow(2, tamCromossomo) - 1)) * r1)
        #print("Valor x1: ", real1)
        tamCromAux = metade
        for y in range(metade):
            #print("Cromossomo[y + (metade)]: ", w[y + (metade)])
            r2 = r2 + ((w[y + (metade)])*(pow(2, tamCromAux - 1)))
            #print("r2 atual: ", r2)
            tamCromAux -= 1
            real2 = inf2 + (((sup2 - inf2) / (pow(2, tamCromossomo) - 1)) * r2)
        #print("Valor x2: ", real2)
        listaReais1.append(real1)
        listaReais2.append(real2)
        
def calculaFuncaoPrincipal(v1, v2):
    func = 21.5 + (v1*math.sin(4*math.pi*v1)) + v2*math.sin(20*math.pi*v2)
    return func

def calculaFitness():
    fx = 0
    tamPop = 0
    
    if contGeral == 0:
        tamPop = tamPopulacaoInicial
    else:
        tamPop = tamPopulacao
        
    for w in range(tamPop):
        x1 = listaReais1[w]
        x2 = listaReais2[w]
        fx = calculaFuncaoPrincipal(x1, x2)
        valoresFx.append(fx)
        
def metodoRoleta():
    probRoleta = 0
    sorteioPai = 0
    i = 0
    probabilidades = []
    somaAvaliacoes = sum(valoresFx)
    tamPop = 0
    if contGeral == 0:
        tamPop = tamPopulacaoInicial
    else:
        tamPop = tamPopulacao
        
    for w in range(tamPop):
        probRoleta = valoresFx[w] / somaAvaliacoes
        probabilidades.append(probRoleta)
    while len(pais) < tamPopulacao:
        sorteioPai = np.random.random_sample()
        i = 0
        for y in range(tamPop):
            i += probabilidades[y]
            if i >= sorteioPai:
                pai = y
                if pais.count(pai) == 0:
                    pais.append(pai)
                    populacao.append(populacaoInicial[y])
                break

def cruzamento():
    sorteioCruzamento = 0
    cont = 0
    pontoCorte = 0
    cromossomoAux1 = []
    cromossomoAux2 = []
    cromossomoAux3 = []
    cromossomoAux4 = []
    paiAux1 = 0
    paiAux2 = 0
    while cont < tamPopulacao:
        sorteioCruzamento = np.random.random_sample()
        cromossomoAux3 = []
        cromossomoAux4 = []
        if sorteioCruzamento <= probCruzamento:
            paiAux1 = pais[cont]
            paiAux2 = pais[cont + 1]
            pontoCorte = np.random.randint(1, tamCromossomo)
            
            cromossomoAux1 = populacaoInicial[paiAux1]
            cromossomoAux2 = populacaoInicial[paiAux2]
            
            cromossomoAux3 = np.concatenate((cromossomoAux1[:pontoCorte], cromossomoAux2[pontoCorte:]), axis = None)
            cromossomoAux4 = np.concatenate((cromossomoAux2[:pontoCorte], cromossomoAux1[pontoCorte:]), axis = None)

            populacao[cont] = cromossomoAux3
            populacao[cont+1] = cromossomoAux4
        cont = cont + 2

def mutacao():
        probMut = np.random.random_sample()
        #print("Probabilidade mutação: ", probMut)
        if (probMut <= probabilidadeMutacao):
            posicaoCromossomoMutacao = np.random.randint(0, tamPopulacao - 1)
            posicaoGeneMutacao = np.random.randint(0, tamCromossomo - 1)
            cromossomoMutar = populacao[posicaoCromossomoMutacao]
            #print("Posicao: ", posicaoCromossomoMutacao)
            #print("Cromossomo original: ",cromossomoMutar)
            #print("Gene: ", posicaoGeneMutacao)
            cromossomoAux = cromossomoMutar
            if(cromossomoAux[posicaoGeneMutacao] == 0):
                cromossomoAux[posicaoGeneMutacao] = 1
            else:
                cromossomoAux[posicaoGeneMutacao] = 0
            #print("Cromossomo mutado: ",cromossomoAux)
            populacao[posicaoCromossomoMutacao] = cromossomoAux
            #print("Populacao com novo cromossomo: ", populacao)
            
######### Main ##########
geraPopulacao()
geracao = 0
for i in range (tamPopulacaoInicial):
    print(populacaoInicial[i])
while (geracao <= qtdEras):
    print("GERAÇÃO :", geracao)
    converteBinario()
    calculaFitness()
    metodoRoleta()
    cruzamento()
    mutacao()
    for i in range (tamPopulacao):
        print("CROMOSSOMO: ", populacao[i])
    geracao = geracao + 1
