package main

import "fmt"

func main() {
	v := []int{1, 12, 5, 26, 7, 14, 3, 7, 2}
	insertionSort(v)
	fmt.Println(v)
}

func insertionSort(v []int) {
	for i := 1; i < len(v); i++ {
		for j := i; v[j] < v[j-1]; j-- {
			v[j-1], v[j] = v[j], v[j-1]
		}
	}
}
