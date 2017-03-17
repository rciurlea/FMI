#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "queue.h"

int main(void) {
  queue *q = queueNew(sizeof(int));

  for (int i = 0; i < 1000; i++) {
    queuePush(q, &i);
  }

  int sum = 0;

  for (int i = 0; i < 1000; i++) {
    int d;
    queuePop(q, &d);
    sum += d;
  }

  printf("sum=%d queueSize=%d\n", sum, queueLen(q));

  queueFree(q);

  return 0;
}
