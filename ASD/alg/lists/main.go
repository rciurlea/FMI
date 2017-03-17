package main

import (
	"bytes"
	"fmt"
	"strconv"
)

type node struct {
	key  int
	next *node
}

func main() {
	l1 := newList([]int{1, 2, 4, 6, 7, 10})
	l2 := newList([]int{3, 7, 8, 12})
	fmt.Println("l1 =", l1)
	fmt.Println("l2 =", l2)
	l3 := merge(l1, l2)
	fmt.Println("l3 =", l3)
	fmt.Println("l1 =", l1)
	fmt.Println("l2 =", l2)
}

func newList(v []int) *node {
	if len(v) == 0 {
		return nil
	}
	head := new(node)
	p := head
	for i := 0; i < len(v); i++ {
		p.key = v[i]
		if i == len(v)-1 {
			p.next = nil
		} else {
			p.next = new(node)
			p = p.next
		}
	}
	return head
}

func (n *node) String() string {
	buf := new(bytes.Buffer)
	buf.WriteString("[")
	p := n
	for p != nil {
		buf.WriteString(strconv.Itoa(p.key))
		p = p.next
		if p != nil {
			buf.WriteString(", ")
		}
	}
	buf.WriteString("]")
	return buf.String()
}

func merge(l1, l2 *node) *node {
	if l1 == nil {
		return l2
	}
	if l2 == nil {
		return l1
	}

	var head, p *node
	if l1.key < l2.key {
		head = l1
		l1 = l1.next
	} else {
		head = l2
		l2 = l2.next
	}
	p = head

	for l1 != nil && l2 != nil {
		if l1.key < l2.key {
			p.next = l1
			l1 = l1.next
		} else {
			p.next = l2
			l2 = l2.next
		}
		p = p.next
	}

	if l1 == nil {
		p.next = l2
	} else {
		p.next = l1
	}

	return head
}
