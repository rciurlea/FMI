import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;

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
			String[] words = line.trim().split("\\s+");
			int[] numbers = new int[words.length];
			for (int i = 0; i < words.length; i++) {
				numbers[i] = Integer.parseInt(words[i]);
			}

			int[] res = mergeSort(numbers);
			for (int a: res) {
				System.out.println(a);
			}
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
			System.out.println("\nUtilizare:\n\tMain input-file\n");
			System.out.println("Daca nu e specificat niciun fisier de intrare folosim input.txt din directorul curent.");
		} catch (IOException e) {
			System.out.println("Formatul fisierului de intrare nu este corect");
		} 		
	}
	
	private static int[] mergeSort(int[] a) {
		if (a.length == 1) return a;
		return merge(mergeSort(Arrays.copyOfRange(a, 0, a.length/2)), mergeSort(Arrays.copyOfRange(a, a.length/2, a.length)));
	}
	
	private static int[] merge(int[] a, int[] b) {
		if (a.length == 0) return b;
		if (b.length == 0) return a;
		int[] result = new int[a.length+b.length];
		int ia = 0, ib = 0;
		for (int i = 0; i < a.length + b.length; i++) {
			if (ia < a.length && (ib >= b.length || a[ia] <= b[ib])) {
				result[i] = a[ia];
				ia++;
			} else {
				result[i] = b[ib];
				ib++;
			}
		}
		return result;
	}

}
