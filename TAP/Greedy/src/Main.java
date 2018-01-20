import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class Main {

	public static void main(String[] args) {
		String inFname;
		if (args.length == 1) {
			inFname = args[0];
		} else {
			inFname = "input.txt";
		}
		
		try (
			BufferedReader in = new BufferedReader(new FileReader(inFname));	
		) {
			String line = in.readLine();
			String[] nodeNames = line.trim().split("\\s+");
			UnidirectionalGraph g = new UnidirectionalGraph(nodeNames);
			while ((line = in.readLine()) != null) {
				String[] words = line.trim().split("\\s+");
				if (words.length != 3) break;
				int weight = Integer.parseInt(words[2]);
				g.addEdge(words[0], words[1], weight);
			}
			g.printMSTPrim();
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
			System.out.println("\nUtilizare:\n\tMain input-file\n");
			System.out.println("Daca nu e specificat niciun fisier de intrare folosim input.txt din directorul curent.");
		} catch (IOException e) {
			System.out.println("Formatul fisierului de intrare nu este corect");
		} 		
	}
}