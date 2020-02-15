package testTrab2.run;

import testTrab2.model.Algoritimo;
import testTrab2.model.Populacao;

public class RunAG {
	public static void main(String[] args) {
		
		//taxa de crossover de 60%
        Algoritimo.setTaxaDeCrossover(0.6);
        //taxa de mutação de 3%
        Algoritimo.setTaxaDeMutacao(0.3);
        //elitismo
        boolean eltismo = true;
        //tamanho da população
        int tamPop = 100;
        //numero máximo de gerações
        int numMaxGeracoes = 10;
        
        int numGenes = 20;
        
        //cria a primeira população aleatérioa
        Populacao populacao = new Populacao(numGenes, tamPop);
        
        int geracao = 0;
        
        Algoritimo.converteBinario(numGenes, populacao);
        Algoritimo.calculaAptidao(populacao);
        
        System.out.println("Geração 0");
        for (int i = 0; i < tamPop; i++) {
			System.out.println(populacao.getCromossomos().get(i).toString());
		}
        
        while (geracao < numMaxGeracoes) {
        	populacao.setMelhorIndividuo(populacao.getCromossomos().get(tamPop-1));
        	geracao++;
        	System.out.println("Geração :" + geracao);
			populacao = Algoritimo.novaGeracaoPorTorneio(populacao, true);
			for (int i = 0; i < populacao.getTamPopulacao(); i++) {
				System.out.println(populacao.getCromossomos().get(i).toString());
			}
		}
    }
}
