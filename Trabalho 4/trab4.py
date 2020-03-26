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
loc = (r"C:\Users\Dinopc\Documents\GitHub\IA2020A\Trabalho 4\planilha_cidades.xlsx")
qtdCidades = 21
tamCromossomo = 20
tamElitismo = 4
tamPopulacaoInicial = 100
tamPopulacao = 20
tamTorneio = 10
taxaCrossover = 0.8
taxaMutacao = 0.05
aptidaoMax = 120
aptidao = 100
geracoes = 1000
geracaoAtual = 0
metodo = 0 #                 0 -> roleta / 1 -> torneio
elitismo = False
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


class PopulacaoInicial:
    def __init__(self, tamPopulacao, numGenes):
        self.cromossomos = []
        for i in range(tamPopulacao):
            c = Cromossomo(numGenes)
            self.cromossomos.append(c)
        self.tamPopulacao = tamPopulacao
        populacao = self.cromossomos

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


class Populacao:
    def __init__(self, tamPopulacao):
        self.cromossomos = []
        for i in range(tamPopulacao):
            c = Cromossomo(tamCromossomo)
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

def crossoverPMX(pai1, pai2):
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

def roleta(pontuacaoGeracao):
    valorBuscado = 0
    numSorteado1 = 0
    numSorteado2 = 0
    paiSorteado = []
    vencedores = []


    vetorPopulacaoCopia = sorted(populacao)  

    numSorteado1 = math.floor(np.random.random_sample() * pontuacaoGeracao)

    for i in range(len(vetorPopulacaoCopia)):
        valorBuscado = valorBuscado + vetorPopulacaoCopia[i].aptidao
        if(numSorteado1 <= valorBuscado):
            paiSorteado[0] = vetorPopulacaoCopia[i]
            break
            

    valorBuscado = 0
    numSorteado2 = math.floor(np.random.random_sample() * pontuacaoGeracao)
    while (numSorteado2 == numSorteado1): # garante que nenhum participante nao vai repetir
        numSorteado2 = math.floor(np.random.random_sample() * pontuacaoGeracao)
    

    for i in range(len(vetorPopulacaoCopia)):
        valorBuscado = valorBuscado + vetorPopulacaoCopia[i].aptidao
        if(numSorteado2 <= valorBuscado):
            paiSorteado[1] = vetorPopulacaoCopia[i]
            break
        
    vencedores.append(paiSorteado[0].cromossomo)
    vencedores.append(paiSorteado[1].cromossomo)

    return vencedores

# ------------------------------------------------------------------

def torneio():
    participantesTorneio = []
    sugestao = 0
    vencedoresTorneio = []
    for i in range(tamTorneio):
        sugestao = math.floor(np.random.random_sample() * tamPopulacao) #primeiro participante
        while (participantesTorneio.index(populacao[sugestao]) >= 0): #garante que nenhum participante nao vai repetir
            sugestao = math.floor(np.random.random_sample() * tamPopulacao)
        
        participantesTorneio.append(populacao[sugestao])
    

    participantesTorneio.sort()
    vencedoresTorneio.append(participantesTorneio[0])
    vencedoresTorneio.append(participantesTorneio[1])
    
    return vencedoresTorneio

# ------------------------------------------------------------------


# abre a planilha 
wb = xlrd.open_workbook(loc)         
planilha = wb.sheet_by_index(0)  


# ----- Rotina inicial ----------

# criaCidades()
# qtdCidades = 20
# populacaoInicial = PopulacaoInicial(tamPopulacaoInicial, tamCromossomo)
# calculaAptidao(populacaoInicial)


# while (geracaoAtual < geracoes):


# print(populacaoInicial)

populacaoInicial = PopulacaoInicial(tamPopulacaoInicial, tamCromossomo)
copia = sorted(populacao)

for j in range(geracoes):
    novaGeracao = []
    for i in range(int(tamPopulacao/2)):
        if(elitismo):
            if(i < tamElitismo):
                novaGeracao[i] = copia[i] #pega os 'i' melhores cromossomos da geracao anterior

        if(metodo == 1):

            pais = torneio()

        elif(metodo == 0):
            pontuacaoGeracao = 0 

            for j in populacao:
                pontuacaoGeracao = pontuacaoGeracao + j.aptidao

            pais = roleta(pontuacaoGeracao)
              
        if (math.ceil(np.random.random_sample() * 100) <= taxaCrossover):
            filhos = crossoverPMX(pais[0], pais[1])
            if(math.ceil(np.random.random_sample() * 100) <= taxaMutacao):
                filhos[0] = mutacao(filhos[0])
            
            if(math.ceil(np.random.random_sample() * 100) <= taxaMutacao):
                filhos[1] = mutacao(filhos[1])
            
            novaGeracao.append(filhos[0])
            novaGeracao.append(filhos[1])

        else:
            novaGeracao.append(pais[0])
            novaGeracao.append(pais[1])
        
    
    populacao = novaGeracao
    novaGeracao.sort()    

    if(novaGeracao[0].aptidao > melhorGlobal):
        melhorGlobal = novaGeracao[0].aptidao
          



