---
layout: note
title: "Insertion Sort"
date: 2025-08-19
excerpt: "In the world of sorting algorithms, one approach stands out for its simplicity and surprising efficiency, with a best-case performance that defies its overall time complexity. But how does insertion sorts clever slide operation make it all "
---

#algorithm #computer-science 
Assume there is an array that needs to be sorted and assume that it is already sorted to index $i$, meaning elements in indices $1$ though $i$ are sorted. The idea behind insertion sort is to start from index $i+1$ and compare the element in the current index to the elements in the sorted array and insert it wherever it fits. Then, continue with the next element. The element in the current index is called the _key_ and the operation used to find the appropriate place for the key in the sorted array is called _slide_. Below is a Python implementation of this algorithm.
```python
def slide(arr, key, end):
    # Finds the index where 'key' should be inserted in arr[0:end].
    # Returns the index.
    i = end - 1
    while i >= 0 and arr[i] > key:
        i -= 1
    return i + 1

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        pos = slide(arr, key, i)
        # Shift elements to make room for key
        for j in range(i, pos, -1):
            arr[j] = arr[j - 1]
        arr[pos] = key
```
The insertion sort it runs in $O(n^2)$ time. You cannot say that it runs in $\Theta(n^2)$ time in all cases, since the best case runs in $\Theta(n)$ time.

To continue learning about algorithms, read about [recursive algorithms](/notes/Computer Science/Algorithms/Recursive Algorithms/).

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/algorithms/insertion-sort/a/insertion-sort)