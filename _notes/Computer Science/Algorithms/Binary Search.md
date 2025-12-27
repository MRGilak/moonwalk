---
layout: note
title: "Binary Search"
date: 2025-08-19
excerpt: "Binary search is an algorithm for finding an item in a sorted list. It works by repeatedly dividing the list in half until the item is found."
---

#algorithm #computer-science 
Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.
An example of this algorithm can be used when you're trying to find a number that someone else has in mind. You take a guess and they tell you if the goal number is higher or lower. Here is the general process of the algorithm:
1. Let $min = 1$ and $max = n$.
2. Guess the average of $min$ and $max$, rounded down so that it is an integer.
3. If you guessed the number, stop. You found it!
4. If the guess was too low, set $min$ to be one larger than the guess.
5. If the guess was too high, set $max$ to be one smaller than the guess.
6. Go back to step two.
Here is a Python implementation of the algorithm above:
```python
def binary_search(arr, goal):
    low = 1
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == goal:
            return arr[mid]
        elif arr[mid] < goal:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

While finding a number in a sorted array of length $n$ using _linear search_ takes at most $n$ guesses, using _binary search_ needs at most $log_2 \ n + 1$ guesses. If $n$ is not a power of $2$ you can use the closest power of $2$ that is less than $n$ instead. For example, for an array of length $1000$, the closest power of $2$ that is less than $1000$ is $512 = 2^9$; therefore, at most $9 + 1 = 10$ guesses are needed.

Continue reading about algorithms by learning about [asymptotic notation](/notes/Computer Science/Algorithms/Asymptotic Notation/), [selection sort](/notes/Computer Science/Algorithms/Selection Sort/) or [recursive algorithms](/notes/Computer Science/Algorithms/Recursive Algorithms/).

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)