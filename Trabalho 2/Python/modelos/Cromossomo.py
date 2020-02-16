import numpy as np

class Cromossomo:

    def __init__(self, tamGenes):
        self.genes = np.random.randint(2, size=tamGenes)
        self.aptidao = 0

    def createNewCromossomo(self, tamGenes):
        self.genes = np.random.randint(2, size=tamGenes)
        self.aptidao = 0
    
    def getGenes(self):
        return self.genes

    def getAptidao(self):
        return self.aptidao

    def setGenes(self, genes):
        self.genes = genes
    
    def setAptidao(self, aptidao):
        self.aptidao = aptidao