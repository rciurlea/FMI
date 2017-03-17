CC=clang
CFLAGS=-g -O0 -Werror

stack: main.c stack.c stack.h
	$(CC) $(CFLAGS) -o stack main.c stack.c

clean:
	rm stack
	rm -rf stack.dSYM
