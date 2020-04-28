import os
import numpy as np
import random as rd
import matplotlib.pyplot as plt

print("\x1b[2J\x1b[1;1H")

os.chdir(r'C:\Users\j_vgo\Documents\GitHub\IA2020A\Trabalho 6 - Adaline')#Colocar seu diretorio
entrada = np.loadtxt('entrada.txt') #Falta copiar o arquivo do professor, tentar enxergar do vídeo rsrs
(amostras,entradas) = np.shape(entrada)

target = np.loadtxt('target.csv', delimiter=';', skiprows=0)#Falta copiar o arquivo do professor 2, tentar enxergar do vídeo rsrs
(numClasses,targets) = np.shape(target)

limiar = 0.0
alfa = 0.01
erroTolerado = 0.1
v = []
v0 = []
vetor1 = []
vetor2 = []
yIn = np.zeros((numClasses,1))
y = np.zeros((numClasses,1))

for i in range(entradas):
    for j in range(numClasses):
        v[i][j] = rd.uniform(-0.1, 0.1)

for j in range(numClasses):
    v0[j] = rd.uniform(-0.1, 0.1)

