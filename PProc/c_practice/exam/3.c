#include <stdio.h>

float a[5][5] = {
  {1, 2, 3, 4, 5},
  {6, 7, 8, 9, 10},
  {11, 12, 13, 14, 15},
  {16, 17, 19, 18, 20},
  {21, 22, 23, 24, 25}
};

float m(float *a, int dim, int line, int col) {
  return a[(line - 1) * dim + (col - 1)];
}

void printSum(float *a, int d) {
  for (int i = 1; i <= d / 2; i++) {
    float s = 0;
    for (int j = i; j <= d - i + 1; j++)
      s += m(a,d,i,j) + m(a,d,d - i + 1,j);
    for (int j = i + 1; j <= d - i; j++)
      s += m(a,d,j,i) + m(a,d,j,d - i + 1);
    printf("s%d: %f\n", i, s);
  }
  if (d % 2 == 1)
    printf("s%d: %f\n", d / 2 + 1, m(a,d,d / 2 + 1,d / 2 + 1));
}

int main(void) {
  printSum((float *)a, 5);
  return 0;
}
