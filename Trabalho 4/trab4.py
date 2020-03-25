import math
import numpy as np
import matplotlib.pyplot as plt
import ctypes
import xlrd
from mpl_toolkits.mplot3d import axes3d
from random import randint

# ------------------------------------------------------------------
#        VARIAVEIS
# ------------------------------------------------------------------
loc = (r"C:\Danilo\IA2020A\Trabalho 4\planilha_cidades.xlsx")
qtdCidades = 21
tamCromossomo = 20
tamPopulacaoInicial = 20
tamPopulacao = 20
tamTorneio = 10
listaAptidaoPopulacao = []
cidades = []
populacao = []
populacaoInicial = []

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

def crossOverPMX(pai1, pai2):
    filho2 = pai1.cromossomo
    filho1 = pai2.cromossomo

    aux = 0
    indicesFilho1 = []
    indicesFilho2 = []
    corte1 = randint(1,18)
    corte2 = randint(corte1, 19)
    slice_object = slice(corte1, corte2) 

    selecao1 = pai1.cromossomo[slice_object]
    selecao2 = pai2.cromossomo[slice_object]

    for i in range(20):
        if(i >= corte1 and i < corte2):
            filho2[i] = selecao2[i-corte1]
            filho1[i] = selecao1[i-corte1]        
        else:
            if(filho1[i] in selecao1):
                indicesFilho1.append(i)
            if(filho2[i] in selecao2):
                indicesFilho2.append(i)

    for i in range(len(indicesFilho1)):
        aux = filho1[indicesFilho1[i]]
        filho1[indicesFilho1[i]] = filho2[indicesFilho2[i]]
        filho2[indicesFilho2[i]] = aux

    return [filho1, filho2] #retorna somente as rotas dos filhos (não é um objeto cromossomo)


# ------------------------------------------------------------------

def cidadesMaisProximas(idC):
    c = cidades[idC]
    menoresDistancias = []  
    distOrdenadas = []

    distOrdenadas = sorted(c.distanciasCidade)
    distOrdenadas.sort()


    menoresDistancias.append(c.distanciasCidade.index(distOrdenadas[1]))

    menoresDistancias.append(c.distanciasCidade.index(distOrdenadas[2]))

    menoresDistancias.append(c.distanciasCidade.index(distOrdenadas[3]))

    print(menoresDistancias)
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
                cidMaisProximas = cidadesMaisProximas(idCidade)
                if (crom.cromossomo[j] == cidMaisProximas[0]
                    or crom.cromossomo[j] == cidMaisProximas[1]
                    or crom.cromossomo[j] == cidMaisProximas[2]):
                    aptidao += 1
                else:
                    aptidao -= 1
        populacao.cromossomos[i].aptidao = aptidao

# ------------------------------------------------------------------

def roleta(populacaoInicial, tamElitismo):
    tamPop = populacaoInicial.tamPopulacao
    listaCromossomoProbabilidade = []
    selecionados = []
    somaAptidao = 0
    for i in range (tamPop - 1):
        somaAptidao = somaAptidao + populacaoInicial.cromossomos[i].aptidao
    for i in range (tamPop - 1):
        probRoleta = populacaoInicial.cromossomos[i].aptidao / somaAptidao
        listaCromossomoProbabilidade.append(populacaoInicial.cromossomos[i])
        listaCromossomoProbabilidade.append(probRoleta)
    while (len(selecionados) + tamElitismo < tamPop):
        sorteioSelecionado = np.random.random_sample()
        j = 0
        for i in range (1,len(listaCromossomoProbabilidade), 2):
            j = j + listaCromossomoProbabilidade[i]
            if j >= sorteioSelecionado:
                selecionados.append(listaCromossomoProbabilidade[i -1])
                break
    return selecionados

# ------------------------------------------------------------------

def mutacao(cromossomo):
    aux = 0
    ponto1 = math.ceil(np.random.random_sample() * 19)
    ponto2 = math.ceil(np.random.random_sample() * 19)  
    while (ponto2 == ponto1):  
        ponto2 = math.ceil(np.random.random_sample() * 19)
    
    aux = cromossomo.cromossomo[ponto1]
    cromossomo.cromossomo[ponto1] = cromossomo.cromossomo[ponto2]
    cromossomo.cromossomo[ponto2] = aux
    return cromossomo.cromossomo

# ------------------------------------------------------------------

def torneio():
    participantesTorneio = []
    sugestao = 0
    selecionados = []
    for i in range(tamTorneio):
        sugestao = math.floor(np.random.random_sample() * tamPopulacaoInicial)# primeiro participante

        while (participantesTorneio.index(populacaoInicial[sugestao]) >= 0): # garante que nenhum participante nao vai repetir
            sugestao = math.floor(np.random.random_sample() * tamPopulacaoInicial)
        
        participantesTorneio.append(populacaoInicial[sugestao])
    
    participantesTorneio.sort()  # ordena por aptidao para pegar os dois melhores

    selecionados.append(participantesTorneio[0])
    selecionados.append(participantesTorneio[1])
    
    return selecionados

# ------------------------------------------------------------------

def novaGeracaoPorTorneio(Populacao, tamElitismo, tamTorneio, pontoCorte):
    tamPop = Populacao.tamPopulacao
    novaPopulacao = PopulacaoIntermediaria(tamPop)
    existentes = 0

    if tamElitismo > 0:
        for i in range(tamElitismo):
            existentes = existentes + 1
            elite = Populacao.cromossomos[tamPop -1 - i]
            #print("Elite: ", elite)
            novaPopulacao.addCromossomo(elite)
    
    while (existentes < tamPop):
        filho1 = Cromossomo(Populacao.cromossomos[0].tamCromossomo)
        filho2 = Cromossomo(Populacao.cromossomos[0].tamCromossomo)
        pais = selecaoTorneio(Populacao, tamTorneio)
        genesFilhos = []
        if (np.random.random_sample() <= taxaCrossover):
            genesFilhos = crossover(Populacao, pais,pontoCorte)
            filho1.setGenes(genesFilhos[0])
            filho2.setGenes(genesFilhos[1])
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
        else :
            filho1.setGenes(pais[0].cromossomo)
            filho2.setGenes(pais[1].cromossomo)
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
    if (Populacao.tamPopulacao < novaPopulacao.tamPopulacao):
        novaPopulacao.cromossomos.remove(novaPopulacao.tamPopulacao - 1)
    mutacao(novaPopulacao)
    return novaPopulacao

# ------------------------------------------------------------------

def novaGeracaoPorRoleta(Populacao, tamElitismo, pontoCorte):
    tamPop = Populacao.tamPopulacao
    novaPopulacao = PopulacaoIntermediaria(tamPop)
    existentes = 0
    if tamElitismo > 0:
        for i in range(tamElitismo):
            existentes = existentes + 1
            elite = Populacao.cromossomos[tamPop -1 - i]
            #print("Elite: ", elite)
            novaPopulacao.addCromossomo(elite)
    
    pais = selecaoRoleta(Populacao, tamElitismo)
    i = 0
    while (existentes < tamPop):
        filho1 = Cromossomo(Populacao.cromossomos[0].tamCromossomo)
        filho2 = Cromossomo(Populacao.cromossomos[0].tamCromossomo)
        genesFilhos = []
        if (np.random.random_sample() <= taxaCrossover):
            paisCrossover = []
            paisCrossover.append(pais[i])
            paisCrossover.append(pais[i+1])
            genesFilhos = crossover(Populacao, paisCrossover,pontoCorte)
            filho1.setGenes(genesFilhos[0])
            filho2.setGenes(genesFilhos[1])
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
            i = i + 2
        else :
            filho1.setGenes(pais[i].cromossomo)
            filho2.setGenes(pais[i + 1].cromossomo)
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
            i = i + 2
    if (Populacao.tamPopulacao < novaPopulacao.tamPopulacao):
        novaPopulacao.cromossomos.remove(novaPopulacao.tamPopulacao - 1)
    mutacao(novaPopulacao)
    return novaPopulacao

# abre a planilha 
wb = xlrd.open_workbook(loc)         
planilha = wb.sheet_by_index(0)  

criaCidades()
qtdCidades = 20
#print(cidades)
populacao = PopulacaoInicial(tamPopulacaoInicial, tamCromossomo)
calculaAptidao(populacao)
print(populacao)


