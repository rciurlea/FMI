#include <stdbool.h>
#include <stdlib.h>

struct node {
  struct node *next;
  void *data;
};

typedef struct queue {
  size_t item_size;
  int items;
  struct node *head;    // de aici scot
  struct node *tail;    // aici bag
} queue;

queue * queueNew(size_t item_size);
int queueLen(queue *q);
bool queueEmpty(queue *q);
bool queuePush(queue *q, void *item);
void queuePop(queue *q, void *target);
void queueFree(queue *q);
