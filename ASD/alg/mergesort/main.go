package main

import "fmt"

func main() {
	v := []int{1, 12, 5, 26, 7, 14, 3, 7, 2}
	v = mergeSort(v)
	fmt.Println(v)
}

func mergeSort(v []int) []int {
	if len(v) == 1 {
		return v
	}
	return merge(mergeSort(v[0:len(v)/2]), mergeSort(v[len(v)/2+1:]))
}

func merge(v1, v2 []int) []int {
	ans := make([]int, 1)
	i := 0
	j := 0
	for i < len(v1) && j < len(v2) {
		if v1[i] < v2[j] {
			ans = append(ans, v1[i])
			i++
		} else {
			ans = append(ans, v2[j])
			j++
		}
	}
	if i == len(v1) {
		for j < len(v2) {
			ans = append(ans, v2[j])
			j++
		}
	} else {
		for i < len(v1) {
			ans = append(ans, v1[j])
			i++
		}
	}
	return ans
}
