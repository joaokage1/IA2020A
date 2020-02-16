# -*- coding: cp1252 -*-
import math
import numpy as np

tamCromossomo = 20
tamPopulacaoInicial  = 12
tamPopulacao = 8
qtdEras = 20
probCruzamento = 0.7
real1 = 0
real2 = 0
somaAvaliacoes = 0
pai = 0
filhos = []
pais = []
listaReais1 = []
listaReais2 = []
populacaoInicial = []
valoresFx = []
inf1 = -3.1
sup1 = 12.1
inf2 = 4.1
sup2 = 5.8    

def geraCromossomo():
    cromossomo = []
    cromossomo = np.random.randint(2, size=tamCromossomo)
    print(cromossomo)
    return cromossomo

def geraPopulacao():
    crom = []
    for w in range(tamPopulacaoInicial):
        crom = geraCromossomo()
        populacaoInicial.append(crom)
                

def converteBinario():
    r1 = 0
    r2 = 0
    tamCromAux = tamCromossomo
    metade = tamCromossomo // 2
    for w in populacaoInicial:
        tamCromAux = metade
        r1 = 0
        r2 = 0
        for x in range(metade):
            r1 = r1 + ((w[x])*(pow(2, tamCromAux - 1)))
            tamCromAux -= 1
        real1 = inf1 + (((sup1 - inf1) / (pow(2, tamCromossomo) - 1)) * r1)
        tamCromAux = metade
        for y in range(metade):
            r2 = r2 + ((w[y + (metade)])*(pow(2, tamCromAux - 1)))
            tamCromAux -= 1       
        real2 = inf2 + (((sup2 - inf2) / (pow(2, tamCromossomo) - 1)) * r2)
        listaReais1.append(real1)
        listaReais2.append(real2)

def calculaFuncaoPrincipal(v1, v2):
    func = 21.5 + (v1*math.sin(4*3.14*v1)) + v2*math.sin(20*3.14*v2)
    return func

def calculaFitness():
    fx = 0
    for w in range(tamPopulacaoInicial):
        x1 = listaReais1[w]
        x2 = listaReais2[w]
        fx = calculaFuncaoPrincipal(x1, x2)
        valoresFx.append(fx)
    print("``````````````")
    print(valoresFx)

def metodoRoleta():
    probRoleta = 0
    sorteioPai = 0
    i = 0
    probabilidades = []
    somaAvaliacoes = sum(valoresFx)
    for w in range(tamPopulacaoInicial):
        probRoleta = valoresFx[w] / somaAvaliacoes
        probabilidades.append(probRoleta)
    print("-----")
    print(probabilidades)
    print("-----")
    while len(pais) < tamPopulacao:
        sorteioPai = np.random.random_sample()
        print("...........")
        print(sorteioPai)
        i = 0
        for y in range(tamPopulacaoInicial):
            i += probabilidades[y]
            if i >= sorteioPai:
                pai = y
                if pais.count(pai) == 0:
                    pais.append(pai)
                break
    print("-=-=-=-")
    print(pais)
    print("-=-=-=-")

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
        if sorteioCruzamento < probCruzamento:
            paiAux1 = pais[cont]
            paiAux2 = pais[cont + 1]
            pontoCorte = np.random.randint(1, tamCromossomo)
            cromossomoAux1 = populacaoInicial[paiAux1]
            cromossomoAux2 = populacaoInicial[paiAux2]
            cromossomoAux3 = cromossomoAux1[ : pontoCorte] + cromossomoAux2[pontoCorte : ]
            cromossomoAux4 = cromossomoAux1[pontoCorte : ] + cromossomoAux2[ : pontoCorte]
        cont = cont + 2
        

######### Chamada de funçoes ##########
geraPopulacao()
converteBinario()
calculaFitness()
metodoRoleta()
cruzamento()