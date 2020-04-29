import os
import numpy as np
import random as rd
import matplotlib.pyplot as plt

print("\x1b[2J\x1b[1;1H")

os.chdir(r'C:\Users\j_vgo\Documents\GitHub\IA2020A\Trabalho 6 - Adaline\Python')#Colocar seu diretorio
entrada = np.loadtxt('entrada.txt')
(amostras,entradas) = np.shape(entrada)
target = np.loadtxt('target.csv', delimiter=',', skiprows=0)
(numClasses,targets) = np.shape(target)

#variaveis
limiar = 0.0
alfa = 0.01
erroTolerado = 0.1
v = np.zeros((entradas,numClasses))
v0 = [[0] for j in range(numClasses)]
vetor1 = []
vetor2 = []
yIn = np.zeros((numClasses,1))
y = np.zeros((numClasses,1))
erro = 10
ciclo = 0
for i in range(entradas):
    for j in range(numClasses):
        v[i][j] = rd.uniform(-0.1, 0.1)

for j in range(numClasses):
    v0[j] = rd.uniform(-0.1, 0.1)


#treinamento rede
while erro > erroTolerado:
    ciclo = ciclo + 1
    erro = 0
    for i in range(amostras):
        xaux = entrada[i,:]
        for m in range(numClasses):
            soma = 0
            for n in range(entradas):
                soma = soma + xaux[n] * v[n][m]
            yIn[m] = soma + v0[m]
        for j in range(numClasses):
            if(yIn[j] >= limiar):
                y[j] = 1.0
            else:
                y[j] = - 1.0
        for j in range(numClasses):
            erro = erro + 0.5*((target[j][i] - y[j])**2)
        
        vAnterior = v

        for m in range(entradas):
            for n in range(numClasses):
                v[m][n] = vAnterior[m][n] + alfa * ((target[n][i]) - y[n]) * xaux[m]
        
        v0Anterior = v0
        for j in range(numClasses):
            v0[j] = v0Anterior[j] + alfa * ((target[j][i]) - y[j])
    
    vetor1.append(ciclo)
    vetor2.append(erro)

    #plt.scatter(vetor1,vetor2, marker='*', color="blue")
    #plt.xlabel('ciclo')
    #plt.ylabel('erro')
    #plt.show()

xTeste = entrada[17,:]
for m in range(numClasses):
    soma = 0
    for n in range(entradas):
        soma = soma + xTeste[n]*v[n][m]
        yIn[m] = soma+v0[m]
print(yIn)
for j in range(numClasses):
    if (yIn[j]>=limiar) :
        y[j] = 1.0
    else :
        y[j] = -1.0
print(y)