using System;
using System.Reflection;

namespace cs {
    class TestRunner {
        public void Test_Constructor() {
            var A = new GenericSet<int>();
            Console.WriteLine("var A = new GenericSet<int>();");
            Console.WriteLine("A = " + A);
        }

        public void Test_Constructor_de_copiere() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(A);
            Console.WriteLine("var A = new GenericSet<int>(new int[]{1,2,3,4});");
            Console.WriteLine("var B = new GenericSet<int>(A);");
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            A -= 4;
            Console.WriteLine("A -= 4;");
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
        }

        public void Test_Constructor_de_initializare_din_vector() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            Console.WriteLine("var A = new GenericSet<int>(new int[]{1,2,3,4});");
            Console.WriteLine("A = " + A);
        }

        public void Test_Operator_de_conversie_implicita() {
            var A = new GenericSet<int>(3);
            Console.WriteLine("var A = new GenericSet<int>(3);");
            Console.WriteLine("A = " + A + "\n");
            GenericSet<int> B = 1;
            Console.WriteLine("GenericSet<int> B = 1;");
            Console.WriteLine("B = " + B + "\n");
            var C = new GenericSet<int>();
            Console.WriteLine("var C = new GenericSet<int>();");
            Console.WriteLine("C = " + C + "\n");
            C += 10;
            Console.WriteLine("C += 10;");
            Console.WriteLine("C = " + C);
            C += 11;
            Console.WriteLine("C += 11;");
            Console.WriteLine("C = " + C + "\n");
        }

        public void Test_Reuniune() {
            var A = new GenericSet<int>(new int[]{1,2,3});
            var B = new GenericSet<int>(new int[]{3,4,5});
            var C = new GenericSet<int>();
            var D = new GenericSet<int>(new int[]{9,10,11});
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("D = " + D);
            Console.WriteLine("A + A = " + (A + A));
            Console.WriteLine("A + B = " + (A + B));
            Console.WriteLine("A + C = " + (A + C));
            Console.WriteLine("A + D = " + (A + D));
        }
        public void Test_Intersectie() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(new int[]{3,4,5});
            var C = new GenericSet<int>();
            var D = new GenericSet<int>(new int[]{9,10,11});
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("D = " + D);
            Console.WriteLine("A * A = " + (A * A));
            Console.WriteLine("A * B = " + (A * B));
            Console.WriteLine("A * C = " + (A * C));
            Console.WriteLine("A * D = " + (A * D));
        }

        public void Test_Diferenta() {
            var A = new GenericSet<int>(new int[]{1,2,3});
            var B = new GenericSet<int>(new int[]{3,4,5});
            var C = new GenericSet<int>();
            var D = new GenericSet<int>(new int[]{9,10,11});
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("D = " + D);
            Console.WriteLine("A - A = " + (A - A));
            Console.WriteLine("A - B = " + (A - B));
            Console.WriteLine("A - C = " + (A - C));
            Console.WriteLine("A - D = " + (A - D));
        }

        public void Test_Incluziune() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(new int[]{3,1,2});
            var C = new GenericSet<int>();
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("A <= A = " + (A <= A));
            Console.WriteLine("A <= B = " + (A <= B));
            Console.WriteLine("B <= A = " + (B <= A));
            Console.WriteLine("A <= C = " + (A <= C));
            Console.WriteLine("C <= A = " + (C <= A));
        }

        public void Test_Incluziune_stricta() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(new int[]{3,1,2});
            var C = new GenericSet<int>();
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("A < A = " + (A < A));
            Console.WriteLine("A < B = " + (A < B));
            Console.WriteLine("B < A = " + (B < A));
            Console.WriteLine("A < C = " + (A < C));
            Console.WriteLine("C < A = " + (C < A));
        }

        public void Test_Incluziune_dual() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(new int[]{3,1,2});
            var C = new GenericSet<int>();
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("A >= A = " + (A >= A));
            Console.WriteLine("A >= B = " + (A >= B));
            Console.WriteLine("B >= A = " + (B >= A));
            Console.WriteLine("A >= C = " + (A >= C));
            Console.WriteLine("C >= A = " + (C >= A));
        }

        public void Test_Incluziune_stricta_dual() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(new int[]{3,1,2});
            var C = new GenericSet<int>();
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("A > A = " + (A > A));
            Console.WriteLine("A > B = " + (A > B));
            Console.WriteLine("B > A = " + (B > A));
            Console.WriteLine("A > C = " + (A > C));
            Console.WriteLine("C > A = " + (C > A));
        }

        public void Test_Operator_egalitate() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(new int[]{3,1,2,4});
            var C = new GenericSet<int>(new int[]{4,5,6});
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("A == A = " + (A == A));
            Console.WriteLine("A == B = " + (A == B));
            Console.WriteLine("A == C = " + (A == C));
        }

        public void Test_Operator_neegalitate() {
            var A = new GenericSet<int>(new int[]{1,2,3,4});
            var B = new GenericSet<int>(new int[]{3,1,2,4});
            var C = new GenericSet<int>(new int[]{4,5,6});
            Console.WriteLine("A = " + A);
            Console.WriteLine("B = " + B);
            Console.WriteLine("C = " + C);
            Console.WriteLine("A != A = " + (A != A));
            Console.WriteLine("A != B = " + (A != B));
            Console.WriteLine("A != C = " + (A != C));
        }

        public void Test_Adaugarea_unui_element() {
            var A = new GenericSet<int>();
            Console.WriteLine("A = " + A);
            A += 1; A += 2; A += 3; A += 5; A += 8;
            Console.WriteLine("A += 1; A += 2; A += 3; A += 5; A += 8;");
            Console.WriteLine("A = " + A);
        }

        public void Test_Extragerea_unui_element() {
            var A = new GenericSet<int>(new int[]{1,2,3,5,8});
            Console.WriteLine("A = " + A);
            A -= 8;
            Console.WriteLine("A -= 8;");
            Console.WriteLine("A = " + A);
            A -= 7;
            Console.WriteLine("A -= 7; (nu se intampla nimic daca elementul nu era in multime)");
            Console.WriteLine("A = " + A);
        }

        public void Run() {
            var methods = typeof(TestRunner).GetTypeInfo().GetMethods();
            foreach (var m in methods) {
                if (m.Name.StartsWith("Test")) {
                    Console.WriteLine("---" + String.Join(" ",m.Name.Substring(5).Split('_')));
                    m.Invoke(this, null);
                    Console.WriteLine("\n");
                }
            }
        }
    }
}
