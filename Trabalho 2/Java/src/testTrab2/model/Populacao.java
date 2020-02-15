package testTrab2.model;

import java.util.ArrayList;
import java.util.Collections;

import testTrab2.util.ComparatorPopulationUtil;


/**
 * @author j_vgo
 *
 */
public class Populacao {
    
    /*The cromossomos*/
    private ArrayList<Cromossomo> cromossomos;
    
    /*The tamPopulacao*/
    private Integer tamPopulacao;

	
	/**
	 * Instantiate a new Populacao.java
	 * @param cromossomos
	 */
	public Populacao(ArrayList<Cromossomo> cromossomos) {
		this.cromossomos = cromossomos;
	}

	/**
	 * Instantiate a new Populacao.java
	 */
	public Populacao() {
	}
	
	/**
	 * Instantiate a new Populacao.java
	 * @param numGenes
	 */
	public Populacao(Integer tamGenes, Integer tamPopulacao) {
		this.cromossomos = new ArrayList<Cromossomo>();
		for (int i = 0; i < tamPopulacao; i++) {
			this.cromossomos.add(new Cromossomo(tamGenes));
		} 
	}

	public ArrayList<Cromossomo> getCromossomos() {
		return cromossomos;
	}

	public void setCromossomos(ArrayList<Cromossomo> cromossomos) {
		this.cromossomos = cromossomos;
	}

	public Integer getTamPopulacao() {
		return tamPopulacao;
	}

	public void setTamPopulacao(Integer tamPopulacao) {
		this.tamPopulacao = tamPopulacao;
	}
	
	/**
	 * @param cromossomo
	 */
	public void addCromossomo(Cromossomo cromossomo) {
		if (this.cromossomos == null) {
			this.cromossomos = new ArrayList<Cromossomo>();
		}
		this.cromossomos.add(cromossomo);
	}
	
	/**
	 * Ordena populacao
	 */
	@SuppressWarnings("unchecked")
	public void ordenaPopulacao() {
		
		if (this.cromossomos == null) {
			this.cromossomos = new ArrayList<Cromossomo>();
		}
		
		ComparatorPopulationUtil util = new ComparatorPopulationUtil();
		Collections.sort(cromossomos, util);
	}

	@Override
	public String toString() {
		return "Populacao [getCromossomos()=" + getCromossomos() + ", getTamPopulacao()=" + getTamPopulacao() + "]";
	}	
    
}
