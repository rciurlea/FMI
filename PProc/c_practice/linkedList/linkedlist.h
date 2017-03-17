#include <stdbool.h>
#include <stdlib.h>

struct node {
  struct node *next;
  void *data;
};

typedef struct linkedlist {
  size_t item_size;
  struct node *head;
  int items;
} linkedlist;

linkedlist * linkedlistNew(size_t item_size);
int linkedlistLen(linkedlist *ll);
bool linkedlistEmpty(linkedlist *ll);
bool linkedlistAdd(linkedlist *ll, void *item, int index);
void linkedlistGet(linkedlist *ll, int index, void *target);
void linkedlistPop(linkedlist *ll, int index, void *target);
void linkedlistDelete(linkedlist *ll, int index);
void linkedlistFree(linkedlist *ll);
