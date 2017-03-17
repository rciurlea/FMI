#include <stdio.h>
#include <stdlib.h>

int isPrime(int x) {
  if (x < 2) return 0;
  for (int i = 2; i <= x / 2; i++) {
    if (x % i == 0) return 0;
  }
  return 1;
}

int main(void) {
  int n;
  printf("Introdu un numar intreg intre 1 si 50000: ");
  scanf("%d", &n);
  if (n < 1 || n > 50000) {
    printf("Invata sa citesti.\n");
    exit(1);
  }

  char f1_path[256], f2_path[256];
  FILE *f1, *f2;
  printf("Introdu numele primului fisier: ");
  scanf("%s", f1_path);
  printf("Introdu numele celui de-al doilea fisier: ");
  scanf("%s", f2_path);

  // pasul 1, pun numere in f1
  f1 = fopen(f1_path, "w+");
  if (f1 == NULL) {
    perror("f1 open");
    exit(1);
  }
  for (int i = 1; i <= n; i++) {
    fprintf(f1, "%d ", i);
  }
  fclose(f1);

  // pasul 2, numere prime in f2
  f1 = fopen(f1_path, "r");
  if (f1 == NULL) {
    perror("f1 open");
    exit(1);
  }

  f2 = fopen(f2_path, "w+");
  if (f1 == NULL) {
    perror("f2 open");
    exit(1);
  }

  while (1) {
    int x;
    int retval;
    retval = fscanf(f1, "%d ", &x);
    if (retval == 0 || retval == EOF) break;
    if (isPrime(x)) fprintf(f2, "%d ", x);
  }
  fclose(f1);
  fclose(f2);

  return 0;
}
