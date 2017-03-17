#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#include "stack.h"

stack * stackNew(size_t item_size) {
  stack *s;
  s = malloc(sizeof(stack));
  if (s == NULL) {
    return NULL;
  }
  s->item_size = item_size;
  s->head = NULL;
  s->items = 0;
  return s;
}

bool stackEmpty(stack *s) {
  return s->head == NULL;
}

int stackLen(stack *s) {
  return s->items;
}

bool stackPush(stack *s, void *item) {
  struct node *new_head;
  new_head = malloc(sizeof(struct node));
  if (new_head == NULL) {
    return false;
  }

  new_head->data = malloc(s->item_size);
  if (new_head->data == NULL) {
    free(new_head);
    return false;
  }

  memcpy(new_head->data, item, s->item_size);
  if (stackEmpty(s)) {
    s->head = new_head;
    new_head->next = NULL;
  } else {
    new_head->next = s->head;
    s->head = new_head;
  }
  s->items++;

  return true;
}

void stackPop(stack *s, void *target) {
  struct node *head;
  head = s->head;
  memcpy(target, head->data, s->item_size);
  s->head = head->next;
  free(head->data);
  free(head);
  s->items--;
}

void stackFree(stack *s) {
  struct node *n, *next;
  n = s->head;
  while (n != NULL) {
    next = n->next;
    free(n);
    n = next;
  }
  free(s);
}
