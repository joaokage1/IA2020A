# -*- coding: cp1252 -*-
import math
import numpy as np

tamCromossomo = 4
tamPopulacaoInicial  = 6
tamPopulacao = 6
qtdEras = 20
probCruzamento = 0.7
real1 = 0
real2 = 0
somaAvaliacoes = 0
pai = 0
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
    for w in populacaoInicial:
        tamCromAux = tamCromossomo / 2
        r1 = 0
        r2 = 0
        for x in range(tamCromossomo/2):
            r1 = r1 + ((w[x])*(2^(tamCromAux-1)))
            tamCromAux -= 1
            print("--=--")
            print(w[x])
        real1 = inf1 + (((sup1 - inf1) / ((2^tamCromossomo) - 1)) * r1)
        tamCromAux = tamCromossomo / 2
        for y in range(tamCromossomo / 2):
            r2 = r2 + ((w[y + (tamCromossomo/2)])*(2^(tamCromAux-1)))
            tamCromAux -= 1
            print("--#--")
            print(w[y+(tamCromossomo / 2)])
            
        real2 = inf2 + (((sup2 - inf2) / ((2^tamCromossomo) - 1)) * r2)
        listaReais1.append(real1)
        listaReais2.append(real2)

def calculaFuncaoPrincipal(v1, v2):
    func = 100 + 21.5 + (v1*math.sin(4*3.14*v1)) + v2*math.sin(20*3.14*v2)
    return func

def calculaFitness():
    fx = 0
    for w in range(tamPopulacaoInicial):
        x1 = listaReais1[w]
        x2 = listaReais2[w]
        fx = calculaFuncaoPrincipal(x1, x2)
        valoresFx.append(fx)

def metodoRoleta():
    probRoleta = 0
    sorteioPai = 0
    cont = 0
    i = 0
    inidicesIndividuos = []
    individuos = []
    probabilidades = []
    somaAvaliacoes = sum(valoresFx)
    for w in range(tamPopulacaoInicial):
        probRoleta = valoresFx[w] / somaAvaliacoes
        probabilidades.append(probRoleta)
    print("-----")
    print(probabilidades)
    print("-----")
    for x in range(tamPopulacao):
        sorteioPai = np.random.random_sample()
        print("...........")
        print(sorteioPai)
        i = 0
        for y in range(tamPopulacaoInicial):
            i += probabilidades[y]
            if i >= sorteioPai:
                pai = y
                pais.append(pai)
                break
    print("-=-=-=-")
    print(pais)
    print("-=-=-=-")

def Cruzamento():
    sorteioCruzamento = 0
    
        

######### Chamada de funçoes ##########
geraPopulacao()
converteBinario()
calculaFitness()
metodoRoleta()
