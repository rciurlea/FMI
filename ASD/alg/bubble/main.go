package main

import "fmt"

func main() {
	v := []int{1, 12, 5, 26, 7, 14, 3, 7, 2}
	bubblesort(v)
	fmt.Println(v)
}

func bubblesort(v []int) {
	for j := len(v) - 1; j > 0; j-- {
		fmt.Println(v)
		for i := 0; i < j; i++ {
			if v[i] > v[i+1] {
				v[i], v[i+1] = v[i+1], v[i]
			}
		}
	}
}
