#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "queue.h"

queue * queueNew(size_t item_size) {
  queue *q;
  q = malloc(sizeof(queue));
  if (q == NULL) {
    return NULL;
  }
  q->item_size = item_size;
  q->items = 0;
  q->head = NULL;
  q->tail = NULL;
  return q;
}

int queueLen(queue *q) {
  return q->items;
}

bool queueEmpty(queue *q) {
  return queueLen(q) == 0;
}

bool queuePush(queue *q, void *item) {
  struct node *new_tail;
  new_tail = malloc(sizeof(struct node));
  if (new_tail == NULL) {
    return false;
  }

  new_tail->data = malloc(q->item_size);
  if (new_tail->data == NULL) {
    free(new_tail);
    return false;
  }

  memcpy(new_tail->data, item, q->item_size);
  new_tail->next = NULL;
  if (queueEmpty(q)) {
    q->head = new_tail;
    q->tail = new_tail;
  } else {
    q->tail->next = new_tail;
    q->tail = new_tail;
  }
  q->items++;

  return true;
}

void queuePop(queue *q, void *target) {
  struct node *head;
  head = q->head;
  memcpy(target, head->data, q->item_size);
  q->head = head->next;
  free(head->data);
  free(head);
  q->items--;
}

void queueFree(queue *q) {
  struct node *n, *next;
  n = q->head;
  while (n != NULL) {
    next = n->next;
    free(n);
    n = next;
  }
  free(q);
}
