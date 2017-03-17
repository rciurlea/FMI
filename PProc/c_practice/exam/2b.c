#include <stdio.h>

int f(int *x) {
  int n = *x;
  int ones = 0;
  while (n != 0) {
    if (n & 1) ones++;
    n >>= 1;
  }
  return ones;
}

int main(void) {
  int x = 15;     // 1111
  int y = 9;      // 101
  int z = 17857;  // 0100 0101 1100 0001
  printf("%d - %d\n", x, f(&x));
  printf("%d - %d\n", y, f(&y));
  printf("%d - %d\n", z, f(&z));
  return 0;
}
