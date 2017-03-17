package main

import "fmt"

func main() {
	v := []int{1, 2, 3, 7, 8, 11, 14, 16}
	fmt.Println(v)
	fmt.Println(search(v, 16))
}

func search(v []int, x int) bool {
	l := 0
	r := len(v) - 1
	for l <= r {
		mid := (l + r) / 2
		if v[mid] == x {
			return true
		}
		if v[mid] > x {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
	return false
}
