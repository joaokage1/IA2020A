import math
import numpy as np
import matplotlib.pyplot as plt
import ctypes
import xlrd
from mpl_toolkits.mplot3d import axes3d

#-------------------------------------------------------------------------
class Cromossomo:
    def __init__(self, numGenes):
        self.cromossomo = []
        self.cromossomo = np.random.randint(20, size=numGenes)
        self.aptidao = 0
        self.tamCromossomo = numGenes
    
    def setAptidao(self, aptidao):
        self.aptidao = aptidao

    def getAptidao(self):
        return self.aptidao

    def getTamCromossomo(self):
        return self.tamCromossomo
    
    def getGenes(self):
        return self.cromossomo
    
    def setGenes(self, genes):
        for i in range (self.tamCromossomo):
            self.cromossomo[i] = genes[i]
    
    def __repr__(self):
        return "<Cromossomo: %s> <Aptidao: %s> \n" % (self.cromossomo, self.aptidao)

#-------------------------------------------------------------------------

class Populacao:
    def __init__(self, tamPopulacao, numGenes):
        self.cromossomos = []
        for i in range (tamPopulacao):
            c = Cromossomo(numGenes)
            self.cromossomos.append(c)
        self.tamPopulacao = tamPopulacao
    
    def getTamPopulacao(self):
        return self.tamPopulacao

    def getCromossomos(self):
        return self.cromossomos
    
    def addCromossomo(self, Cromossomo):
        self.cromossomos.append(Cromossomo)

    def ordenaPopulacao(self):
        for i in range (0, len(self.cromossomos) * len(self.cromossomos), 1):
            for j in range (0, len(self.cromossomos) - 1, 1):
                if self.cromossomos[j].aptidao > self.cromossomos[j+1].aptidao:
                     aux = self.cromossomos[j]
                     self.cromossomos[j] = self.cromossomos[j + 1]
                     self.cromossomos[j + 1] = aux
    
    def __repr__(self):
        return "<Populacao: \n%s>" % (self.cromossomos)

#---------------------------------------------------------------------------

class Cidade:
    def __init__(self, id, nome):
        