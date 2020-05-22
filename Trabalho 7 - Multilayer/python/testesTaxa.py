import numpy as np
import random as rd
import matplotlib.pyplot as plt
import os
from datetime import datetime

print("\x1b[2J\x1b[1;1H") 

os.chdir(r'/home/joaocarlosJC15/Joao/Faculdade/IA/IA2020A/Trabalho 7 - Multilayer/python/digitostreinamento')

vanterior=np.loadtxt('v - 2020-05-21 23:47:57.252202',delimiter=',',skiprows=0)
v0anterior=np.loadtxt('v0 - 2020-05-21 23:47:57.252202',delimiter=',',skiprows=0)
wanterior=np.loadtxt('w - 2020-05-21 23:47:57.252202',delimiter=',',skiprows=0)
w0anterior=np.loadtxt('w0 - 2020-05-21 23:47:57.252202',delimiter=',',skiprows=0)
t=np.loadtxt('target10.csv',delimiter=',',skiprows=0)

ampdigitos=50
vsai=10
amostras=ampdigitos*vsai
entradas=256
neur=200
limiar=0.0
alfa=0.005
errotolerado=0.5

k2='_'
k4='.txt'

aminicial=60
amtestedigitos=30
yteste=np.zeros((vsai,1))
cont=0
contcerto=0
ordem=np.zeros(amostras)

zin=np.zeros((1,neur))
target=np.zeros((vsai,1))

for m in range(10):
  k1=str(m)
  for n in range(amtestedigitos):
    k3a=n+aminicial
    k3=str(k3a)
    nome=k1+k2+k3+k4
    xteste=np.loadtxt(nome)

    for m2 in range(vsai):
      for n2 in range(neur):
        zin[0][n2]=np.dot(xteste, vanterior[:,n2])+v0anterior[0][n2]
      z=np.tanh(zin)
      yin=np.dot(z,wanterior)+w0anterior
      y=np.tanh(yin)

    for j in range(vsai):
      if y[0][j]>=limiar:
        y[0][j]=1.0
      else:
        y[0][j]=-1.0

    for j in range(vsai):
      yteste[j][0]=y[0][j]
    
    for j in range(vsai):
      target[j][0]=t[0][j]

    soma=np.sum(y-target)

    if soma==0:
      contcerto=contcerto+1

    cont=cont+1

taxa=contcerto/cont
print("A taxa é: ")
print(taxa)