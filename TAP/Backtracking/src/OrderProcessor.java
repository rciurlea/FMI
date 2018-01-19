import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.HashMap;
import java.util.HashSet;

public class OrderProcessor {
	private BufferedReader in;
	private BufferedWriter out;
	private HashMap<String, Integer> order;
	private ArrayList<String> products;
	private HashMap<String, Integer> stocks;
	private HashSet<String> stores;
	private int minSplitLen;
	private ArrayList<String> bestSplit;
	
	public OrderProcessor(BufferedReader in, BufferedWriter out) {
		this.in = in;
		this.out = out;
		this.order = new HashMap<String, Integer>();
		this.products = new ArrayList<String>();
		this.stocks = new HashMap<String, Integer>();
		this.stores = new HashSet<String>();
	}
		
	private void LoadData() throws IOException {
        String line;
        boolean readingOrder = true;
        while ((line = in.readLine()) != null) {
            if (line.startsWith("-")) { 
            		if (line.endsWith("stocuri")) {
            			readingOrder = false;
            		}
            } else {
            		String[] words = line.split(" ");
	            	if (readingOrder) {
	            		order.put(words[0], Integer.parseInt(words[1]));
	            	} else {
	            		String[] components = words[0].split("/");
	            		stores.add(components[1]);
	            		stocks.put(words[0], Integer.parseInt(words[1]));
	            	}
            }
        }
        products = new ArrayList<String>(order.keySet());
	}
	
	public void Run() throws IOException {
		LoadData();
		System.out.println(products);
		System.out.println(stores);
		System.out.println(order);
		
		minSplitLen = stores.size();
		ArrayList<String> initial = new ArrayList<String>();
		Split(initial, 10);
		
		Formatter f = new Formatter(out);
		int i = 0;
		for (String p: products) {
			System.out.printf("%s x %d -> %s\n", p, order.get(p), bestSplit.get(i));
			f.format("%s x %d -> %s\n", p, order.get(p), bestSplit.get(i));
			i++;
		}
		f.close();
	}
	
	private void Split(ArrayList<String> partial, int maxFragments) {
		if (partial.size() > maxFragments) return;
		if (partial.size() == order.size()) {
			HashSet<String> unique = new HashSet<String>();
			unique.addAll(partial);
			if (unique.size() < minSplitLen) {
				minSplitLen = unique.size();
				bestSplit = partial;
			}
			return;
		}
		String currentProd = products.get(partial.size());
		for (String s: stores) {
			int stock = stocks.getOrDefault(currentProd + "/" + s, 0);
			if (stock >= order.get(currentProd)) {
				ArrayList<String> new_partial = new ArrayList<String>(partial);
				new_partial.add(s);
				Split(new_partial, maxFragments);
			}
		}
	}
}
