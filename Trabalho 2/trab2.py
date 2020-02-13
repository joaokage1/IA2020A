# -*- coding: cp1252 -*-
import random
import math
import numpy as np
from random import randrange

tamCromossomo = 16
tamPopulacaoInicial  = 20
tamPopulacao = 5
qtdEras = 20
probCruzamento = 70
real1 = 0
real2 = 0
somaAvaliacoes = 0
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
    r = 0
    tamCromAux = tamCromossomo
    for w in populacaoInicial:
        tamCromAux = tamCromossomo
        r = 0
        for x in range(tamCromossomo):
            r = r + ((w[x])*(2^(tamCromAux-1)))
            tamCromAux -= 1
        real1 = inf1 + (((sup1 - inf1) / ((2^tamCromossomo) - 1)) * r)
        real2 = inf2 + (((sup2 - inf2) / ((2^tamCromossomo) - 1)) * r)
        listaReais1.append(real1)
        listaReais2.append(real2)

def calculaFitness():
    fx = 0
    for w in range(tamPopulacaoInicial):
        x1 = listaReais1[w]
        x2 = listaReais2[w]
        fx = 100 + 21.5 + (x1*math.sin(4*3.14*x1)) + x2*math.sin(20*3.14*x2)
        valoresFx.append(fx)
    valoresFx.sort()
    somaAvaliacoes = sum(valoresFx)
    print(somaAvaliacoes)


def metodoRoleta():
    

######### Chamada de funçoes ##########
geraPopulacao()
converteBinario()
calculaFitness()

print(populacaoInicial)
print(listaReais1)
print(listaReais2)
print(valoresFx)




