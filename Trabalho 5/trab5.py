import math
import numpy as np
import matplotlib.pyplot as plt
import ctypes
from mpl_toolkits.mplot3d import axes3d

# -- Variaveis -- #
inf1 = -10
sup1 = 12
valoresFx = []
listaReais1 = []
listaReais2 = []
aptidaoGeral = 0
valoresAptidao = []
valoresFxMostrar = []
geracoesMostrar = []
x1Mostrar = []
x2Mostrar = []

xG = []
yG = []
zG = []

#-------------------------------------------------------------------------
class Cromossomo:
    def __init__(self, numGenes):
        self.cromossomo = []
        #self.cromossomo = np.random.randint(2, size=numGenes)
        self.aptidao = 0
        self.x1= 0.0
        self.x2= 0.0
        self.fx= 0.0
        self.tamCromossomo = numGenes
        for i in range(self.tamCromossomo - 1):
            self.cromossomo[i] = inf1 + (np.random.random_sample() * (sup1 - inf1))
    
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


# -- Funcoes -- #

def Mbox(title, text, style):
    return ctypes.windll.user32.MessageBoxW(0, text, title, style)

# def converteBinario(tamGenes, Populacao): 
#     r1 = 0.0
#     r2 = 0.0
#     tamGeneAux = tamGenes
#     for i in range (Populacao.tamPopulacao):
#         for j in range (tamGenes // 2):
#             r1 = r1 + (Populacao.cromossomos[i].cromossomo[j])*(math.pow(2, (tamGeneAux-1)))
#             tamGeneAux = tamGeneAux - 1
#         listaReais1.append(inf1 + (((sup1 - inf1) / ((math.pow(2,tamGenes)) - 1)) * r1))
#         tamGeneAux = tamGenes 
#         for j in range (tamGenes // 2):
#             r2 = r2 + (Populacao.cromossomos[i].cromossomo[j])*(math.pow(2, (tamGeneAux-1)))
#             tamGeneAux = tamGeneAux - 1
#         listaReais2.append(inf1 + (((sup1 - inf1) / ((math.pow(2,tamGenes)) - 1)) * r2))
#         r1 = 0.0
#         r2 = 0.0
#         tamGeneAux = tamGenes

def calculaAptidao(Populacao):
    i = 0
    j = 0
    while (i < Populacao.tamPopulacao):
        if (i == 0):
            i += 1
        else:
            for j in range(len(Populacao.cromossomos[i])):
                x1 = Populacao.cromossomos[i - 1].cromossomo[j]
                x2 = Populacao.cromossomos[i].cromossomo[j]
                fx = 15 + (math.pow(x1-3, 2)/2) + (math.pow(x2-3, 2)/2) - (2 * (math.sin((4*x1)-3) + math.sin((4*x2)-3)))   
                valoresFx.append(fx)
                Populacao.cromossomos[i].setAptidao(fx)
            i += 2

def calculaAptidaoCromossomo(v_cromossomo):
    i =0
    while i < len(v_cromossomo):
        if (i == 0):
            i += 1
        else:
            x1 = v_cromossomo[i - 1]
            x2 = v_cromossomo[i]
            fx = 15 + (math.pow(x1-3, 2)/2) + (math.pow(x2-3, 2)/2) - (2 * (math.sin((4*x1)-3) + math.sin((4*x2)-3)))   
            i += 2
    return fx

def mutacao(Cromossomo):
    vairMutar = np.random.random_sample()
    if vairMutar <= taxaMutacao:
        posicaoMutar = np.random.randint(Cromossomo.tamCromossomo - 1)     
        Cromossomo.cromossomo[posicaoMutar] = inf1 + (np.random.random_sample() * (sup1 - inf1))
        

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

def crossoverRadcliff(cromossomosCrossOver):
    filhos = []
    geneFilho1 = []
    geneFilho2 = []
    
    genePai1 = cromossomosCrossOver[0].cromossomo
    genePai2 = cromossomosCrossOver[1].cromossomo

    beta = 0
    xa = 0
    xb = 0
    xa_novo = 0
    xb_novo = 0

    for i in range(genePai1):
        beta = np.np.random.random_sample()
        xa = genePai1[i]
        xb = genePai2[i]
        xa_novo = (beta*xa) + ((1 - beta)*xb)
        xb_novo = ((1-beta)*xa) + (beta*xb)
        geneFilho1.append(xa_novo)
        geneFilho2.append(xb_novo)

    
    filhos.append(geneFilho1)
    filhos.append(geneFilho2)
    return filhos

def crossoverWright(cromossomosCrossOver):
    filhos = []
    geneFilho1 = []
    geneFilho2 = []
    geneFilho3 = []
    aptidoes = []
    
    genePai1 = cromossomosCrossOver[0].cromossomo
    genePai2 = cromossomosCrossOver[1].cromossomo

    xa = 0
    xb = 0
    xa_novo = 0
    xb_novo = 0
    xc_novo = 0

     
    
    for i in range(genePai1):
        xa = genePai1[i]
        xb = genePai2[i]
        xa_novo = (0.5 * xa) + (0.5 * xb)
        xb_novo = (1.5 * xa) - (0.5 * xb)
        xc_novo = (-0.5 * xa) + (1.5 * xb)
        geneFilho1.append(xa_novo)
        geneFilho2.append(xb_novo)
        geneFilho3.append(xc_novo)
    
    ## VERIFICAR CROMOSSOMO VALIDO (GENES DENTRO DO RANGE)
    if (geneFilho1[0] > inf1 or geneFilho1[1] < sup1):
        filhos.append(geneFilho1)
    if (geneFilho2[0] > inf1 or geneFilho2[1] < sup1):
        filhos.append(geneFilho2)
    if (geneFilho3[0] > inf1 or geneFilho3[1] < sup1):
        filhos.append(geneFilho3)
    
    ## SELECIONAR POR APTIDAO SE APENAS 1 OU OS 3 FILHOS SAO VALIDOS
    if (len(filhos) == 1 or len(filhos) == 3):
        filhos.clear()
        geneFilho1.append(calculaAptidaoCromossomo(geneFilho1))
        geneFilho2.append(calculaAptidaoCromossomo(geneFilho2))
        geneFilho3.append(calculaAptidaoCromossomo(geneFilho3))
        if (geneFilho1[2] > geneFilho2[2] and geneFilho1[2] > geneFilho3[2]):
            filhos.append(geneFilho1)
        if (geneFilho2[2] > geneFilho1[2] and geneFilho2[2] > geneFilho1[2]):
            filhos.append(geneFilho2)
        if (geneFilho3[2] > geneFilho2[2] and geneFilho3[2] > geneFilho1[2]):
            filhos.pop(0)
            filhos.append(geneFilho3)
        return filhos

    ## JA ACHOU OS 2 FILHOS
    if (len(filhos) == 2):
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
            mutacao(filho1)
            mutacao(filho2)
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
        else :
            filho1.setGenes(pais[0].cromossomo)
            filho2.setGenes(pais[1].cromossomo)
            mutacao(filho1)
            mutacao(filho2)
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
    if (Populacao.tamPopulacao < novaPopulacao.tamPopulacao):
        novaPopulacao.cromossomos.remove(novaPopulacao.tamPopulacao - 1)
    return novaPopulacao    

def plotGrafico2D():
    plt.title("Valores x1, x2 e Valores Fx")
    plt.grid(True)
    for i in range(len(zG)):
        plt.plot(i, xG[i],        marker= 'o', linestyle='-', color ='green')
        plt.plot(i, yG[i],        marker= 'o', linestyle='-', color ='red',)
        plt.plot(i, zG[i],        marker= 'o', linestyle='-', color ='black')
        plt.pause(0.05)    
    plt.show()

def plotGrafico2DV2():
    plt.title("Valores da Fx x Geracao")
    plt.grid(True)
    for i in range(len(valoresFxMostrar)):
        plt.plot(i,valoresFxMostrar[i],        marker= 'o', linestyle='-', color ='green')
        plt.pause(0.05)    
    plt.show()

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
            mutacao(filho1)
            mutacao(filho2)
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
            i = i + 2
        else :
            filho1.setGenes(pais[i].cromossomo)
            filho2.setGenes(pais[i + 1].cromossomo)
            mutacao(filho1)
            mutacao(filho2)
            novaPopulacao.addCromossomo(filho1)
            novaPopulacao.addCromossomo(filho2)
            existentes = existentes + 2
            i = i + 2
    if (Populacao.tamPopulacao < novaPopulacao.tamPopulacao):
        novaPopulacao.cromossomos.remove(novaPopulacao.tamPopulacao - 1)
    return novaPopulacao
def printGrafico3d():
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(xG, yG, zG, c='r', marker='o')
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('F(x1,x2)')
    ax.plot(xG, yG, zG)
    plt.show() 
# -- Execucao -- #
print("---------------------------------------------- AG Trabalho 2 ----------------------------------------------------\n\n")
print("----------------------------------------------  Parametros  -----------------------------------------------------")
geracoes = int(input("Digite numero de geracoes:"))
tamanhoPopulacao = int(input("Digite o tamanho da populacao:"))
tamanhoCromossomo = 2
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
index = 0
melhor = 0
geracaoTop = 0
if modoSelecao == 1:
    print("MODO TORNEIO")
    print("GERACAO 0")
    p = Populacao(tamanhoPopulacao, tamanhoCromossomo) 
    converteBinario(tamanhoCromossomo, p)
    calculaAptidao(p)
    p.ordenaPopulacao()
    print(p)
    print("\n Melhor da geracao: ", p.cromossomos[tamanhoPopulacao - 1], "\n")
    melhor = p.cromossomos[tamanhoPopulacao - 1]

    xG.append(round(p.cromossomos[tamanhoPopulacao - 1].x1, 3))
    yG.append(round(p.cromossomos[tamanhoPopulacao - 1].x2, 3))
    zG.append(round(p.cromossomos[tamanhoPopulacao - 1].fx, 3))

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
        if (melhor.fx < p.cromossomos[tamanhoPopulacao - 1].fx):
            melhor = p.cromossomos[tamanhoPopulacao - 1]
            geracaoTop = geracao
        while index < p.tamPopulacao:
            if index == p.tamPopulacao:
                index = 0
            valoresFxMostrar.append(p.cromossomos[index].fx)
            valoresAptidao.append(p.cromossomos[index].aptidao)
            x1Mostrar.append(p.cromossomos[index].x1)
            x2Mostrar.append(p.cromossomos[index].x2)
            geracoesMostrar.append(geracao)
            index = index + 1
        
  
        xG.append(round(p.cromossomos[tamanhoPopulacao - 1].x1, 3))
        yG.append(round(p.cromossomos[tamanhoPopulacao - 1].x2, 3))
        zG.append(round(p.cromossomos[tamanhoPopulacao - 1].fx, 3))

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

    melhor = p.cromossomos[tamanhoPopulacao - 1]
    xG.append(round(p.cromossomos[tamanhoPopulacao - 1].x1, 3))
    yG.append(round(p.cromossomos[tamanhoPopulacao - 1].x2, 3))
    zG.append(round(p.cromossomos[tamanhoPopulacao - 1].fx, 3))

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
        if (melhor.fx < p.cromossomos[tamanhoPopulacao - 1].fx):
            melhor = p.cromossomos[tamanhoPopulacao - 1]
            geracaoTop = geracao
        while index < p.tamPopulacao:
            if index == p.tamPopulacao:
                index = 0
            valoresFxMostrar.append(p.cromossomos[index].fx)
            valoresAptidao.append(p.cromossomos[index].aptidao)
            x1Mostrar.append(p.cromossomos[index].x1)
            x2Mostrar.append(p.cromossomos[index].x2)
            geracoesMostrar.append(geracao)
            index = index + 1
        
        xG.append(round(p.cromossomos[tamanhoPopulacao - 1].x1, 3))
        yG.append(round(p.cromossomos[tamanhoPopulacao - 1].x2, 3))
        zG.append(round(p.cromossomos[tamanhoPopulacao - 1].fx, 3))

        index = index + 1
        geracao = geracao + 1 

plotGrafico2D()
plotGrafico2DV2()  
printGrafico3d() 
Mbox('Resultado', "MELHOR CROMOSSOMO: " + str(melhor) + 
    "\nGeracao: " + str(geracaoTop) , 0)