package testTrab2.util;

import java.util.Comparator;

import testTrab2.model.Cromossomo;

/**
 * @author j_vgo
 *
 */
@SuppressWarnings("rawtypes")
public class ComparatorPopulationUtil implements Comparator{

	@Override
	public int compare(Object o1, Object o2) {
		return ((Cromossomo)o1).getAptidao().compareTo(((Cromossomo)o2).getAptidao());
	}

}
