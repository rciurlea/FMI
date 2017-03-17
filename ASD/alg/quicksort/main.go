package main

import "fmt"

func main() {
	v := []int{1, 12, 5, 26, 7, 14, 3, 7, 2}
	quickSort(v, 0, len(v)-1)
	fmt.Println(v)
}

func quickSort(v []int, start, end int) {
	if start < end {
		pivot := partition(v, start, end)
		quickSort(v, start, pivot-1)
		quickSort(v, pivot+1, end)
	}
}

func partition(v []int, start, end int) int {
	x := v[end]
	i := start - 1
	for j := start; j < end; j++ {
		if v[j] <= x {
			i++
			v[i], v[j] = v[j], v[i]
		}
	}
	v[i+1], v[end] = v[end], v[i+1]
	return i + 1
}
