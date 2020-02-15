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
	
	/*The x1*/
	private Double x1;
	
	/*The x2*/
	private Double x2;
	
	/*The fx*/
	private Double fx;
	
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
	 * @param genes
	 */
	public Cromossomo(ArrayList<Integer> genes2) {
		this.genes = genes2;
		
		Random r = new Random();
		if (r.nextDouble() <= Algoritimo.getTaxaDeMutacao()) {
			int posAleatoria = r.nextInt(this.genes.size());
			for (int i = 0; i < posAleatoria; i++) {
				if (i + 1 == posAleatoria) {
					this.genes.remove(posAleatoria);
					this.genes.add(r.nextInt(2));
				}
			}
		}
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

	public Double getX1() {
		return x1;
	}

	public void setX1(Double x1) {
		this.x1 = x1;
	}

	public Double getX2() {
		return x2;
	}

	public void setX2(Double x2) {
		this.x2 = x2;
	}

	public Double getFx() {
		return fx;
	}

	public void setFx(Double fx) {
		this.fx = fx;
	}

	@Override
	public String toString() {
		return "Cromossomo [getGenes()=" + getGenes() + ", getAptidao()=" + getAptidao() + ", getX1()=" + String.format("%.2f",getX1())
				+ ", getX2()=" + String.format("%.2f", getX2()) + ", getFx()=" + String.format("%.2f",getFx()) + "]";
	}
}
