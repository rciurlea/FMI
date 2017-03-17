#include <stdio.h>
#include <stdlib.h>

int main(void) {
  int n;
  printf("Introdu numarul de numere: ");
  scanf("%d", &n);

  double *x = malloc(n * sizeof(double));
  for (int i = 0; i < n; i++) {
    if (i == 0) printf("Introdu primul numar: ");
    else printf("Introdu al %d-lea numar: ", i + 1);
    scanf("%lf", &x[i]);
  }

  int len = 1, max_len = 1, idx = 0, max_idx = 0;

  for (int i = 1; i < n; i++) {
    if (x[i] > x[i-1]) {
      len++;
    } else {
      idx = i;
      len = 1;
    }

    if (len > max_len) {
      max_len = len;
      max_idx = idx;
    }
  }

  printf("Cea mai lunga secventa crescatoare: ");
  for (int i = max_idx; i < max_idx + max_len; i++) {
    printf("%lf ", x[i]);
  }
  printf("\n");
  free(x);
  return 0;
}
