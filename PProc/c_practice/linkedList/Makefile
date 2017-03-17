CC=clang
CFLAGS=-g -O0 -Werror

stack: main.c linkedlist.c linkedlist.h
	$(CC) $(CFLAGS) -o linkedlist main.c linkedlist.c

clean:
	rm linkedlist
	rm -rf linkedlist.dSYM
