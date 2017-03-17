#include <stdio.h>

#include "stack.h"

int main(void) {
  stack *s = stackNew(sizeof(int));

  for (int i = 0; i < 1000; i++) {
    stackPush(s, &i);
  }

  int sum = 0;

  for (int i = 0; i < 1000; i++) {
    int d;
    stackPop(s, &d);
    sum += d;
  }

  printf("sum=%d stackSize=%d\n", sum, stackLen(s));

  stackFree(s);
  return 0;
}
