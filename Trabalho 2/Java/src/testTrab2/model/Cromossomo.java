package testTrab2.model;

import java.util.ArrayList;
import java.util.Random;

/**
 * @author j_vgo
 *
 */
public class Cromossomo { 
	
	/*The genes*/
	private ArrayList<Integer> genes;
	
	/*The aptidao*/
	private Integer aptidao;
	
	/**
	 * Instantiate a new Cromossomo.java
	 */
	public Cromossomo() {
	}

	/**
	 * Instantiate a new Cromossomo.java
	 * @param genes
	 * @param aptidao
	 */
	public Cromossomo(ArrayList<Integer> genes, Integer aptidao) {
		this.genes = genes;
		this.aptidao = aptidao;
	}
	
	/**
	 * Instantiate a new Cromossomo.java
	 */
	public Cromossomo(Integer tamGenes) {
		this.genes = new ArrayList<Integer>();
		Random random = new Random();
		for (int i = 0; i < tamGenes; i++) {
			this.genes.add(random.nextInt(2));
		}
	}

	/**
	 * @return
	 */
	public ArrayList<Integer> getGenes() {
		return genes;
	}

	/**
	 * @param genes
	 */
	public void setGenes(ArrayList<Integer> genes) {
		this.genes = genes;
	}

	/**
	 * @return
	 */
	public Integer getAptidao() {
		return aptidao;
	}

	/**
	 * @param aptidao
	 */
	public void setAptidao(Integer aptidao) {
		this.aptidao = aptidao;
	}

	@Override
	public String toString() {
		return "Cromossomo [getGenes()=" + getGenes() + ", getAptidao()=" + getAptidao() + "]";
	}
}
