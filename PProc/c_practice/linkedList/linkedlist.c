#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "linkedlist.h"

linkedlist * linkedlistNew(size_t item_size) {
  linkedlist *ll;
  ll = malloc(sizeof(linkedlist));
  if (ll == NULL) {
    return NULL;
  }
  ll->head = NULL;
  ll->item_size = item_size;
  ll->items = 0;
  return ll;
}

int linkedlistLen(linkedlist *ll) {
  return ll->items;
}

bool linkedlistEmpty(linkedlist *ll) {
  return ll->items == 0;
}

bool linkedlistAdd(linkedlist *ll, void *item, int index) {
  if (index < 0 || index > ll->items) {
    return false;
  }

  struct node *new_elem;
  new_elem = malloc(sizeof(struct node));
  if (new_elem == NULL) {
    return false;
  }

  new_elem->data = malloc(ll->item_size);
  if (new_elem->data == NULL) {
    free(new_elem);
    return false;
  }

  memcpy(new_elem->data, item, ll->item_size);

  if (ll->head == NULL) {
    ll->head = new_elem;
    new_elem->next = NULL;
    ll->items++;
    return true;
  }

  struct node *n, *p;
  n = ll->head;
  p = NULL;
  for (int i = 0; i < index; i++) {
    p = n;
    n = n->next;
  }
  if (p != NULL) {
    p->next = new_elem;
  }
  new_elem->next = n;
  ll->items++;

  return true;
}

void linkedlistGet(linkedlist *ll, int index, void *target) {
  if (index < 0 || index > ll->items - 1) return;
  struct node *n = ll->head;
  for (int i = 0; i < index; i++) {
      n = n->next;
  }
  memcpy(target, n->data, ll->item_size);
}

void linkedlistPop(linkedlist *ll, int index, void *target) {
  linkedlistGet(ll, index, target);
  linkedlistDelete(ll, index);
}

void linkedlistDelete(linkedlist *ll, int index) {
  if (index < 0 || index > ll->items - 1) return;
  struct node *n, *p;
  n = ll->head;
  p = NULL;
  if (index == 0) {
      ll->head = ll->head->next;
      free(n->data);
      free(n);
      ll->items--;
      return;
  }

  for (int i = 0; i < index; i++) {
    p = n;
    n = n->next;
  }
  p->next = n->next;
  free(n->data);
  free(n);
  ll->items--;
}


void linkedlistFree(linkedlist *ll) {
  struct node *node, *n;
  node = ll->head;
  while (node != NULL) {
    n = node->next;
    free(node->data);
    free(node);
    node = n;
  }
  free(ll);
}
