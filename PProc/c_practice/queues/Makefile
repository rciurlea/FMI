CC=clang
CFLAGS=-g -O0 -Werror

stack: main.c queue.c queue.h
	$(CC) $(CFLAGS) -o queue main.c queue.c

clean:
	rm queue
	rm -rf queue.dSYM
