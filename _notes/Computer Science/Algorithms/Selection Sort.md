---
layout: note
title: "Selection Sort"
date: 2025-08-19
excerpt: "Selection sort is an algorithm that sorts arrays by repeatedly selecting the next-smallest element and swapping it into place. It has a running time of Θ(n^2) in all cases."
---

#algorithm #computer-science 
There are many different ways to sort an array. Here's a simple one, called _**selection sort**_:
1. Find the smallest element. Swap it with the first element.
2. Find the second-smallest element. Swap it with the second element.
3. Find the third-smallest element. Swap it with the third element.
4. Repeat finding the next-smallest element, and swapping it into the correct position until the array is sorted.
This algorithm is called selection sort because it repeatedly _selects_ the next-smallest element and swaps it into place.
When the first element is found and relocated, the remaining elements are called a _subarray_.
Below is the Python implementation of the selection sort algorithm.
```python
def findMinIndex(arr, start):
    min_idx = start
    for i in range(start + 1, len(arr)):
        if arr[i] < arr[min_idx]:
            min_idx = i
    return min_idx

def Swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]

def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = findMinIndex(arr, i)
        Swap(arr, i, min_idx)
```
Function `findMinIndex` finds the index of the minimum element in the remaining subarray and function `Swap` swaps the two elements of the array.

Running time of the `findMinIndex` is some constant times $\frac{n^2}{2} + \frac{n}{2}$, or $\Theta (n^2)$ in all cases. Running time of swap and the rest of the code is $\Theta (n)$ each. Therefore, the overall running time of the selection sort algorithm is $\Theta (n^2)$.

To continue learning about algorithms, continue [here](/notes/Computer Science/Algorithms/Insertion Sort/) to learn about insertion sort or [here](/notes/Computer Science/Algorithms/Recursive Algorithms/) to learn about recursive algorithms.

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/sorting)