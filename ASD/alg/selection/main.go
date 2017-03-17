package main

import "fmt"

func main() {
	v := []int{1, 12, 5, 26, 7, 14, 3, 7, 2}
	selectionsort(v)
	fmt.Println(v)
}

func selectionsort(v []int) {
	for i := 0; i < len(v)-1; i++ {
		minIdx := i
		for j := i + 1; j < len(v); j++ {
			if v[minIdx] > v[j] {
				minIdx = j
			}
		}
		v[i], v[minIdx] = v[minIdx], v[i]
	}
}
