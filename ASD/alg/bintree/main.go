package main

import "fmt"

type node struct {
	key         int
	left, right *node
}

func main() {
	tree := node{14, nil, nil}
	insert(&tree, &node{26, nil, nil})
	insert(&tree, &node{7, nil, nil})
	insert(&tree, &node{12, nil, nil})
	insert(&tree, &node{3, nil, nil})
	insert(&tree, &node{2, nil, nil})
	insert(&tree, &node{7, nil, nil})
	insert(&tree, &node{5, nil, nil})
	insert(&tree, &node{1, nil, nil})
	printInOrder(&tree)
}

func insert(target, n *node) {
	if n.key < target.key {
		if target.left == nil {
			target.left = n
		} else {
			insert(target.left, n)
		}
	} else {
		if target.right == nil {
			target.right = n
		} else {
			insert(target.right, n)
		}
	}
}

func printInOrder(tree *node) {
	if tree == nil {
		return
	}
	printInOrder(tree.left)
	fmt.Println(tree.key)
	printInOrder(tree.right)
}
