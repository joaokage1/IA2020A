import math
import numpy as np
import matplotlib.pyplot as plt
import ctypes
import xlrd
from mpl_toolkits.mplot3d import axes3d


# ------------------------------------------------------------------
#        VARIAVEIS
# ------------------------------------------------------------------
loc = (r"C:\Users\Dinopc\Documents\GitHub\IA2020A\Trabalho 4\planilha_cidades.xlsx")
qtdCidades = 21
tamCromossomo = 20
tamPopulacaoInicial = 20
tamPopulacao = 20
listaAptidaoPopulacao = []
cidades = []

# ------------------------------------------------------------------
#        CLASSES
# ------------------------------------------------------------------


class Cromossomo:
    def __init__(self, numGenes):
        self.cromossomo = []
        self.cromossomo = np.random.choice(20, size=numGenes, replace=False)
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
        for i in range(self.tamCromossomo):
            self.cromossomo[i] = genes[i]

    def __repr__(self):
        return "<Cromossomo: %s> <Aptidao: %s> \n" % (self.cromossomo, self.aptidao)

# -------------------------------------------------------------------------


class Populacao:
    def __init__(self, tamPopulacao, numGenes):
        self.cromossomos = []
        for i in range(tamPopulacao):
            c = Cromossomo(numGenes)
            self.cromossomos.append(c)
        self.tamPopulacao = tamPopulacao

    def addCromossomo(self, Cromossomo):
        self.cromossomos.append(Cromossomo)

    def ordenaPopulacao(self):
        for i in range(0, len(self.cromossomos) * len(self.cromossomos), 1):
            for j in range(0, len(self.cromossomos) - 1, 1):
                if self.cromossomos[j].aptidao > self.cromossomos[j+1].aptidao:
                     aux = self.cromossomos[j]
                     self.cromossomos[j] = self.cromossomos[j + 1]
                     self.cromossomos[j + 1] = aux

    def __repr__(self):
        return "<Populacao: \n%s>" % (self.cromossomos)

# ---------------------------------------------------------------------------


class PopulacaoInicial:
    def __init__(self, tamPopulacao, numGenes):
        self.cromossomos = []
        for i in range(tamPopulacao):
            c = Cromossomo(numGenes)
            self.cromossomos.append(c)
        self.tamPopulacao= tamPopulacao

    def addCromossomo(self, Cromossomo):
        self.cromossomos.append(Cromossomo)

    def __repr__(self):
        return "<Populacao Inicial: \n%s>" % (self.cromossomos)

# ---------------------------------------------------------------------------


class Cidade:
    def __init__(self, idCid):
        self.idCidade = idCid
        self.nomeCidade = ""
        self.distanciasCidade = []

        # aponta para a primeira celula da planilha
        planilha.cell_value(0, 0)

        # percorre as linhas da tabela
        for i in range(planilha.nrows):

            # a primeira celula da tabela é vazia
            if (planilha.cell_value(i, 0) == ''):
                i = i
            else:
                if (self.idCidade == i):
                    for j in range(qtdCidades):
                        # guarda o vetor de distancias daquela cidade
                        self.distanciasCidade.append(planilha.cell_value(i, j))
                    self.nomeCidade = self.distanciasCidade[0]
                    self.distanciasCidade.pop(0)
                    break

    def __repr__(self):
        return "%s" % (self.distanciasCidade)


# ------------------------------------------------------------------
#        FUNCOES
# ------------------------------------------------------------------


def criaCidades():
    for i in range(qtdCidades):
        c = Cidade(i)
        cidades.append(c)
    cidades.pop(0) # Retira a cidade da posicao 0, que vinha nula

# ------------------------------------------------------------------


def cidadesMaisProxima(idC):
    c = cidades[idC]
    contMenorDistancia = 0
    menoresDistancias = []
    if (c.distanciasCidade[0] == 0.0):
        menoresDistancias[0] = c.distanciasCidade[1]
        menoresDistancias[1] = c.distanciasCidade[1]
        menoresDistancias[2] = c.distanciasCidade[1]
    else:
        menoresDistancias[0] = c.distanciasCidade[0]
        menoresDistancias[1] = c.distanciasCidade[0]
        menoresDistancias[2] = c.distanciasCidade[0]
                 
    for i in range(qtdCidades):
        if (i == 0 or i == 1):
            i = i
        else:
            if (c.distanciasCidade[i] == 0.0 or c.distanciasCidade[i-1] == 0.0):
                i = i 
            else:
                if (c.distanciasCidade[k] > c.distanciasCidade[k-1] 
                    and c.distanciasCidade[k-1] <= menoresDistancias[contMenorDistancia]
                    and menoresDistancias[contMenorDistancia] != menoresDistancias[contMenorDistancia - 1]):

                        menoresDistancias[contMenorDistancia] = c.distanciasCidade[k-1]
                        contMenorDistancia += 1
    print(menoresDistancias)
    print("-=-==-=-=-=-=-=")
    return menoresDistancias

# ------------------------------------------------------------------

def calculaAptidao(populacao):    
    cidMaisProximas = []
    for i in range(populacao.tamPopulacao):
        aptidao = 100
        crom = populacao.cromossomos[i]
        for j in range(crom.tamCromossomo):
            if(j == 0):
                j = j 
            else:
                idCidade = crom.cromossomo[j-1]
                cidMaisProximas = cidadesMaisProxima(idCidade)
                if (crom.cromossomo[j] == cidMaisProximas[0]):
                    aptidao += 1
                else:
                    aptidao -= 1
        populacao.cromossomos[i].aptidao = aptidao

# abre a planilha 
wb = xlrd.open_workbook(loc)         
planilha = wb.sheet_by_index(0)    
criaCidades()
qtdCidades = 20
#print(cidades)
populacao = PopulacaoInicial(tamPopulacaoInicial, tamCromossomo)
calculaAptidao(populacao)
#print(populacao)


