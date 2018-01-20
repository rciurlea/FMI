import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;

public class UnidirectionalGraph {
	String[] nodes;
	HashMap<String, Integer> edges;
	int longestEdge;

	public UnidirectionalGraph(String[] nodeNames) {
		nodes = nodeNames;
		longestEdge = 0;
		edges = new HashMap<String, Integer>();
	}

	public void addEdge(String n1, String n2, int weight) {
		edges.put(n1 + "," + n2, weight);
		edges.put(n2 + "," + n1, weight);
		if (weight > longestEdge) longestEdge = weight;
	}

	public void printMSTPrim() {
		HashSet<String> outside = new HashSet<String>(Arrays.asList(nodes));
		HashSet<String> inside = new HashSet<String>();
		outside.remove(nodes[0]);
		inside.add(nodes[0]);
		while (!outside.isEmpty()) {
			int minDist = longestEdge;
			String toAdd = "";
			String minEdge = "";
			for (String i: inside) {
				for (String j: outside) {
					if (edges.containsKey(i + "," + j) && edges.get(i + "," + j) < minDist) {
						minDist = edges.get(i + "," + j);
						minEdge = i + " - " + j;
						toAdd = j;
					}
				}
			}
			inside.add(toAdd);
			outside.remove(toAdd);
			System.out.println(minEdge);
		}
	}

}
