import java.io.*;

public class Main {

	public static void main(String[] args) throws IOException {
		String inFname, outFname;
		if (args.length == 2) {
			inFname = args[0];
			outFname = args[1];
		} else if (args.length == 1) {
			inFname = args[0];
			outFname = "output.txt";
		} else {
			inFname = "input.txt";
			outFname = "output.txt";			
		}
		
		try (
			BufferedReader in = new BufferedReader(new FileReader(inFname));
			BufferedWriter out = new BufferedWriter(new FileWriter(outFname)) ;	
		) {
			OrderProcessor p = new OrderProcessor(in, out);
			p.Run();
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
			System.out.println("\nUtilizare:\n\tMain input-file output-file\n");
			System.out.println("Daca e specificat un sigur fisier, este de intrare. Daca nu e specificat niciunul folosim input.txt si output.txt din directorul curent.");
		} 
	}

}
