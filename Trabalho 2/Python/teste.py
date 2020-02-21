import math
import numpy as np
#-------------------------------------------------------------------------
class Cromossomo:
    def __init__(self, numGenes):
        self.cromossomo = []
        self.cromossomo = np.random.randint(2, size=numGenes)
        self.aptidao = 0
        self.x1= 0.0
        self.x2= 0.0
        self.fx= 0.0
        self.tamCromossomo = numGenes
    
    def setValoresFxX1X2(self, x1, x2, fx):
        self.x1= x1
        self.x2= x2
        self.fx= fx
    
    def setAptidao(self, aptidao):
        self.aptidao = aptidao

    def getX1(self):
        return self.x1

    def getX2(self):
        return self.x2

    def getFx(self):
        return self.fx

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
        return "<Cromossomo: %s> <Aptidao: %s> <X1: %s> <X2: %s> <Fx: %s> \n" % (self.cromossomo, self.aptidao, round(self.x1, 3), round(self.x2, 3), round(self.fx, 3))
#---------------------------------------------------------------------------

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

#-------------------------------------------------------------------------
class PopulacaoIntermediaria:
    def __init__(self, tamPopulacao):
        self.cromossomos = []
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

#Comecar a implementacao

# -- Variaveis -- #
inf1 = -3.1
sup1 = 12.1
inf2 = 4.1
sup2 = 5.8
valoresFx = []
listaReais1 = []
listaReais2 = []
aptidaoGeral = 0

# -- Funcoes -- #

def converteBinario(tamGenes, Populacao): 
    r1 = 0.0
    r2 = 0.0
    tamGeneAux = tamGenes
    for i in range (Populacao.tamPopulacao):
        for j in range (tamGenes // 2):
            r1 = r1 + (Populacao.cromossomos[i].cromossomo[j])*(math.pow(2, (tamGeneAux-1)))
            tamGeneAux = tamGeneAux - 1
        listaReais1.append(inf1 + (((sup1 - inf1) / ((math.pow(2,tamGenes)) - 1)) * r1))
        tamGeneAux = tamGenes // 2
        for j in range (tamGenes // 2, tamGenes - 1, 1):
            r2 = r2 + (Populacao.cromossomos[i].cromossomo[j])*(math.pow(2, (tamGeneAux-1)))
            tamGeneAux = tamGeneAux - 1
        listaReais2.append(inf2 + (((sup2 - inf2) / ((math.pow(2,tamGenes)) - 1)) * r2))
        r1 = 0.0
        r2 = 0.0
        tamGeneAux = tamGenes

def calculaAptidao(Populacao):
    for i in range (Populacao.tamPopulacao):
        x1 = listaReais1[i]
        x2 = listaReais2[i]
        fx = 21.5 + (x1*math.sin(4*math.pi*x1)) + (x2*math.sin(20*math.pi*x2))        
        valoresFx.append(fx)
        Populacao.cromossomos[i].setValoresFxX1X2(x1,x2,fx)
    
    valoresFx.sort()
    global aptidaoGeral
    for i in range (Populacao.tamPopulacao):
        aptidaoGeral = aptidaoGeral + 1
        for j in range (len(valoresFx)):
            if Populacao.cromossomos[j].fx == valoresFx[i]:
                Populacao.cromossomos[j].setAptidao(aptidaoGeral)

def mutacao(Populacao):
    for i in range (Populacao.tamPopulacao):
        vairMutar = np.random.random_sample()
        if vairMutar <= taxaMutacao:
            posicaoMutar = np.random.randint(Populacao.cromossomos[i].tamCromossomo - 1)
            if Populacao.cromossomos[i].cromossomo[posicaoMutar] == 1:
                Populacao.cromossomos[i].cromossomo[posicaoMutar] = 0
            else:
                Populacao.cromossomos[i].cromossomo[posicaoMutar] = 1

def selecaoTorneio(Populacao, tamTorneio):
    populacaoInter = PopulacaoIntermediaria(tamTorneio)
    for i in range (tamTorneio):
        posicaoSorteio = np.random.randint(Populacao.tamPopulacao - 1)
        cromossomoAdicionar = Populacao.cromossomos[posicaoSorteio]
        populacaoInter.addCromossomo(cromossomoAdicionar)
    
    populacaoInter.ordenaPopulacao
    #pegar os dois melhores
    pais = []
    pais.append(populacaoInter.cromossomos[tamTorneio - 2])
    pais.append(populacaoInter.cromossomos[tamTorneio - 1])
    return pais

def selecaoRoleta(Populacao, tamElitismo):
    listaCromossomoProbabilidade = []
    tamPop = Populacao.tamPopulacao
    pais = []
    somaFx = 0
    for i in range (tamPop - 1):
        somaFx = somaFx + Populacao.cromossomos[i].fx
    for i in range (tamPop - 1):
        probRoleta = Populacao.cromossomos[i].fx / somaFx
        listaCromossomoProbabilidade.append(Populacao.cromossomos[i])
        listaCromossomoProbabilidade.append(probRoleta)
    while (len(pais) + tamElitismo < tamPop):
        sorteioPai = np.random.random_sample()
        j = 0
        for i in range (1,len(listaCromossomoProbabilidade), 2):
            j = j + listaCromossomoProbabilidade[i]
            if j >= sorteioPai:
                pais.append(listaCromossomoProbabilidade[i -1])
                break
    return pais

def crossover (Populacao, cromossomosCrossOver, pontoCorte):
    filhos = []
    if pontoCorte == 2:
        genePai1 = cromossomosCrossOver[0].cromossomo
        genePai2 = cromossomosCrossOver[1].cromossomo

        geneFilho1 = []
        geneFilho2 = []

        numCorte = np.random.randint(Populacao.tamPopulacao - 1)
        while numCorte == Populacao.tamPopulacao - 1:
            numCorte = np.random.randint(Populacao.tamPopulacao - 1)
        for i in range (numCorte):
            geneFilho1.append(genePai1[i])
        for i in range (numCorte, len(genePai1), 1):
            geneFilho1.append(genePai2[i])
        for i in range (numCorte):
            geneFilho2.append(genePai2[i])
        for i in range (numCorte, len(genePai1), 1):
            geneFilho2.append(genePai1[i])
        
        filhos.append(geneFilho1)
        filhos.append(geneFilho2)
        return filhos
    if pontoCorte == 3:
        genePai1 = cromossomosCrossOver[0].cromossomo
        genePai2 = cromossomosCrossOver[1].cromossomo

        geneFilho1 = []
        geneFilho2 = []

        numCorte = len(cromossomosCrossOver[0].cromossomo) // 3
        for i in range (numCorte):
            geneFilho1.append(genePai1[i])
        for i in range (numCorte, len(genePai1) - numCorte, 1):
            geneFilho1.append(genePai2[i])
        for i in range (len(genePai1) - numCorte, len(genePai1), 1):
            geneFilho1.append(genePai1[i])
        for i in range (numCorte):
            geneFilho2.append(genePai2[i])
        for i in range (numCorte, len(genePai1) - numCorte, 1):
            geneFilho2.append(genePai1[i])
        for i in range (len(genePai1) - numCorte, len(genePai1), 1):
            geneFilho2.append(genePai2[i])
        filhos.append(geneFilho1)
        filhos.append(geneFilho2)
        return filhos

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

# -- Execucao -- #
print("---------------------------------------------- AG Trabalho 2 ----------------------------------------------------\n\n")
print("----------------------------------------------  Parametros  -----------------------------------------------------")
geracoes = int(input("Digite numero de geracoes:"))
tamanhoPopulacao = int(input("Digite o tamanho da populacao:"))
tamanhoCromossomo = int(input("Digite o tamanho do cromossomo:"))
modoSelecao = int(input("Digite o modo de selecao: \n1 - Torneio \n2 - Roleta \n"))

tamanhoTorneio = 0
if modoSelecao == 1:
    tamanhoTorneio = int(input("Digite o tamanho do torneio:"))

teraElitismo = int(input("Tera elitismo?: \n1 - Sim \n2 - Nao \n"))
tamanhoElitismo = 0
if teraElitismo == 1:
    tamanhoElitismo = int(input("Digite o tamanho do elitismo: \n"))

numerosDeCorte = int(input("Digite o numero de corte: \n2 (Um corte) \n3 (Dois cortes) \n"))

taxaMutacao = float(input("Digite a taxa de mutacao(0.0 a 1.0): "))
taxaCrossover = float(input("Digite a taxa de crossover(0.5 a 1.0): "))
print("\n\n---------------------------------------------- Comecando ----------------------------------------------------")

if modoSelecao == 1:
    print("MODO TORNEIO")
    print("GERACAO 0")
    p = Populacao(tamanhoPopulacao, tamanhoCromossomo) 
    converteBinario(tamanhoCromossomo, p)
    calculaAptidao(p)
    p.ordenaPopulacao()
    print(p)
    print("\n Melhor da geracao: ", p.cromossomos[tamanhoPopulacao - 1], "\n")
    geracao = 1
    while (geracao < geracoes):
        print("---------------------------- GERACAO ", geracao)
        listaReais1.clear()
        listaReais2.clear()
        valoresFx.clear()
        p = novaGeracaoPorTorneio(p,tamanhoElitismo,tamanhoTorneio,numerosDeCorte)
        converteBinario(tamanhoCromossomo, p)
        calculaAptidao(p)
        p.ordenaPopulacao()
        print(p)
        print("\n Melhor da geracao: ", p.cromossomos[tamanhoPopulacao - 1], "\n")
        geracao = geracao + 1

if modoSelecao == 2:
    print("MODO ROLETA")
    print("GERACAO 0")
    p = Populacao(tamanhoPopulacao, tamanhoCromossomo)
    converteBinario(tamanhoCromossomo, p)
    calculaAptidao(p) 
    p.ordenaPopulacao()
    print(p)
    print("\n Melhor da geracao: ", p.cromossomos[tamanhoPopulacao - 1], "\n")
    geracao = 1
    while (geracao < geracoes):
        print("---------------------------- GERACAO ", geracao)
        listaReais1.clear()
        listaReais2.clear()
        valoresFx.clear()
        p = novaGeracaoPorRoleta(p,tamanhoElitismo,numerosDeCorte)
        converteBinario(tamanhoCromossomo, p)
        calculaAptidao(p)
        p.ordenaPopulacao()
        print(p)
        print("\n Melhor da geracao: ", p.cromossomos[tamanhoPopulacao - 1], "\n")
        geracao = geracao + 1