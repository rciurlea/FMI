#include <stdio.h>
#include <stdlib.h>

#include "linkedlist.h"

void printList(linkedlist *ll) {
  printf("[");
  struct node *n = ll->head;
  int len = linkedlistLen(ll);
  for (int i = 0; i < len; i++) {
    printf("%d", *((int *)n->data));
    if (i < len - 1) {
      printf(", ");
    }
    n = n->next;
  }
  printf("]\n");
}

int main(void) {
  linkedlist *l = linkedlistNew(sizeof(int));
  for (int i = 0; i < 10; i++) {
    linkedlistAdd(l, &i, linkedlistLen(l));
  }
  printList(l);
  int x = 100;
  linkedlistAdd(l, &x, 3);
  printList(l);
  linkedlistDelete(l, 3);
  printList(l);
  linkedlistDelete(l, 0);
  printList(l);
  linkedlistDelete(l, linkedlistLen(l)-1);
  printList(l);
  linkedlistPop(l, 2, &x);
  printf("popped %d\n", x);
  printList(l);
  linkedlistFree(l);

  return 0;
}
