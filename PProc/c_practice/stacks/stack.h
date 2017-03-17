/* Stiva poate contine orice tip de element, toate elementele au aceeasi
 * marime.
 */

#include <stdbool.h>
#include <stdlib.h>

struct node {
  struct node *next;
  void *data;
};

typedef struct stack {
  struct node *head;
  size_t item_size;
  int items;
} stack;

// Aloca o stiva noua.
// item_size - marimea datelor continute in Stiva
// returneaza un pointer la stiva sau NULL in caz de eroare
stack * stackNew(size_t item_size);

// Verifica daca stiva s e goala
bool stackEmpty(stack *s);

// Retuneaza lungimea stivei s
int stackLen(stack *s);

// Adauga date in stiva s
// item - pointer la date. stackPush salveaza (copiaza) datele
bool stackPush(stack *s, void *item);

// Scoate un element din stiva s si il pune in target
void stackPop(stack *s, void *target);

// Distruge stiva s. Elibereaza toata memoria alocata.
void stackFree(stack *s);
