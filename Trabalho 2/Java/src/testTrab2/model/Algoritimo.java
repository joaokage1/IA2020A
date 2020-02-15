package testTrab2.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

/**
 * @author j_vgo
 *
 */
public class Algoritimo {
	
	/*The taxaDeCrossover*/
	private static Double taxaDeCrossover;
    
    /*The taxaDeMutacao*/
    private static Double taxaDeMutacao;
    
    /*The reais1*/
    private static ArrayList<Double> reais1;
    
    /*The reais2*/
    private static ArrayList<Double> reais2;
    
    /*The inf1*/
    private static Double inf1 = -3.1;
    
    /*The sup1*/
    private static Double sup1 = 12.1;
    
    /*The inf2*/
    private static Double inf2 = 4.1;
    
    /*The sup2*/
    private static Double sup2 = 5.8 ;
    
    public static Populacao novaGeracaoPorTorneio(Populacao populacao, boolean elitismo) {
        Random r = new Random();
        
        //nova população do mesmo tamanho da antiga
        Populacao novaPopulacao = new Populacao();
        novaPopulacao.setTamPopulacao(populacao.getTamPopulacao());

        //se tiver elitismo, mantém o melhor indivíduo da geração atual
        if (elitismo) {
        	//adiciona os filhos na nova geração
            if (novaPopulacao.getTamPopulacao()%2 == 0) {
            	novaPopulacao.addCromossomo(populacao.getMelhorIndividuo());
            	novaPopulacao.addCromossomo(populacao.getCromossomos().get(populacao.getTamPopulacao()-2));
			}else {
				novaPopulacao.addCromossomo(populacao.getMelhorIndividuo());
			}
        }

        //insere novos indivíduos na nova população, até atingir o tamanho máximo
        while (novaPopulacao.getCromossomos().size() < novaPopulacao.getTamPopulacao()) {
            //seleciona os 2 pais por torneio
            ArrayList<Cromossomo> pais = selecaoTorneio(populacao);

            ArrayList<Cromossomo> filhos = new ArrayList<Cromossomo>();

            //verifica a taxa de crossover, se sim realiza o crossover, se não, mantém os pais selecionados para a próxima geração
            if (r.nextDouble() <= taxaDeCrossover) {
                filhos = crossover(pais.get(1), pais.get(0));
            } else {
            	Cromossomo filho1 = new Cromossomo(pais.get(0).getGenes());
            	Cromossomo filho2 = new Cromossomo(pais.get(1).getGenes());
                filhos.add(filho1);
                filhos.add(filho2);
            }
            
            novaPopulacao.addCromossomo(filhos.get(0));
            novaPopulacao.addCromossomo(filhos.get(1));
        }
        converteBinario(populacao.getCromossomos().get(0).getGenes().size(), novaPopulacao);
        calculaAptidao(novaPopulacao);

        //ordena a nova população
        novaPopulacao.ordenaPopulacao();
        return novaPopulacao;
    }
    
    public static ArrayList<Cromossomo> crossover(Cromossomo individuo1, Cromossomo individuo2) {

        //sorteia o ponto de corte
        int pontoCorte1 = individuo1.getGenes().size()/2;
        //int pontoCorte2 = r.nextInt((individuo1.getGenes().size()/2) -2) + individuo1.getGenes().size()/2;

        ArrayList<Cromossomo> filhos = new ArrayList<Cromossomo>();
        
        //pega os genes dos pais
        ArrayList<Integer> genePai1 = individuo1.getGenes();
        ArrayList<Integer> genePai2 = individuo2.getGenes();

        ArrayList<Integer> geneFilho1 = new ArrayList<Integer>();
        ArrayList<Integer> geneFilho2 = new ArrayList<Integer>();;

        //realiza o corte
        for (int i = 0; i < pontoCorte1; i++) {
			geneFilho1.add(genePai1.get(i));
		}
        for (int i = pontoCorte1; i < genePai2.size(); i++) {
			geneFilho1.add(genePai2.get(i));
		}
        
        for (int i = 0; i < pontoCorte1; i++) {
        	geneFilho2.add(genePai2.get(i));
		}
        for (int i = pontoCorte1; i < genePai1.size(); i++) {
        	geneFilho2.add(genePai1.get(i));
		}

        //cria o novo indivíduo com os genes dos pais
        filhos.add(new Cromossomo(geneFilho1));
        filhos.add(new Cromossomo(geneFilho2));

        return filhos;
    }
    
    public static ArrayList<Cromossomo> selecaoTorneio(Populacao populacao) {
        Random r = new Random();
        Populacao populacaoIntermediaria = new Populacao();

        //seleciona 3 indivíduos aleatóriamente na população
        populacaoIntermediaria.addCromossomo(populacao.getCromossomos().get(r.nextInt(populacao.getTamPopulacao())));
        populacaoIntermediaria.addCromossomo(populacao.getCromossomos().get(r.nextInt(populacao.getTamPopulacao())));
        populacaoIntermediaria.addCromossomo(populacao.getCromossomos().get(r.nextInt(populacao.getTamPopulacao())));

        //ordena a população
        populacaoIntermediaria.ordenaPopulacao();

        ArrayList<Cromossomo> pais = new ArrayList<Cromossomo>();

        //seleciona os 2 melhores deste população
        pais.add(populacaoIntermediaria.getCromossomos().get(2));
        pais.add(populacaoIntermediaria.getCromossomos().get(1));

        return pais;
    }
    
    public static void converteBinario(Integer tamGenes, Populacao populacao) {
    	Double r1 = 0.0;
    	Double r2 = 0.0;
    	reais1 = new ArrayList<Double>();
    	reais2 = new ArrayList<Double>();
    	Integer tamGeneAux = tamGenes;
    	for (int i = 0; i < populacao.getTamPopulacao(); i++) {
    		for (int j = 0; j < (Integer)tamGenes/2; j++) {
    			r1 = r1 + (populacao.getCromossomos().get(i).getGenes().get(j))*(Math.pow(2, (tamGeneAux-1)));
        		tamGeneAux -= 1;
			}
    		reais1.add(inf1 + (((sup1 - inf1) / ((Math.pow(2,tamGenes)) - 1)) * r1));
    		tamGeneAux = tamGenes/2;
    		for (int j = (Integer)tamGenes/2; j < tamGenes; j++) {
    			r2 = r2 + (populacao.getCromossomos().get(i).getGenes().get(j))*(Math.pow(2, (tamGeneAux-1)));
        		tamGeneAux -= 1;
			}
    		reais2.add(inf2 + (((sup2 - inf2) / ((Math.pow(2,tamGenes)) - 1)) * r1));
    		r2 = 0.0;
    		r1 = 0.0;
    		tamGeneAux = tamGenes;
		}
    }
    
    public static void calculaAptidao(Populacao populacao) {
    	ArrayList<Double> valoresFx = new ArrayList<Double>();
    	for (int i = 0; i < populacao.getTamPopulacao(); i++) {
			Double x1 = reais1.get(i);
			Double x2 = reais2.get(i);
			Double fx = 21.5 + (x1*Math.sin(4*Math.PI*x1)) + (x2*Math.sin(20*Math.PI*x2));
			populacao.getCromossomos().get(i).setFx(fx);
			populacao.getCromossomos().get(i).setX1(x1);
			populacao.getCromossomos().get(i).setX2(x2);
			valoresFx.add(fx);
		}
    	
    	Collections.sort(valoresFx);
    	Integer aptidao = 0;
    	for (int i = 0; i < populacao.getTamPopulacao(); i++) {
			aptidao++;
			for (int j = 0; j < valoresFx.size(); j++) {
				if (populacao.getCromossomos().get(j).getFx() == valoresFx.get(i)) {
					populacao.getCromossomos().get(j).setAptidao(aptidao);
				}
			}
		}
    	
    	populacao.ordenaPopulacao();
    }
    
    public static double getTaxaDeCrossover() {
        return taxaDeCrossover;
    }

    public static void setTaxaDeCrossover(double taxaDeCrossover) {
        Algoritimo.taxaDeCrossover = taxaDeCrossover;
    }

    public static double getTaxaDeMutacao() {
        return taxaDeMutacao;
    }

    public static void setTaxaDeMutacao(double taxaDeMutacao) {
        Algoritimo.taxaDeMutacao = taxaDeMutacao;
    }

    
}