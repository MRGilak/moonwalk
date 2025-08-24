---
layout: note
title: "Asymptotic Notation"
date: 2025-08-19
excerpt: "Asymptotic notation is a way to compare the efficiency of algorithms by describing their running time in terms of the input size, independent of specific implementation details."
---

#algorithm #computer-science 
Running time of two different algorithms cannot be compared directly as a measure of their efficiency, because running time depends on a lot of factors, including the speed of the computer, the programming language, the compiler, etc. Therefore, to compare the efficiency of algorithms, some notations are defined.

# Big-Theta $\Theta$ Notation 
Imagine that the running time of an algorithm is $6n^2 + 10 n + 15$. Using big theta notation, we say this algorithm's running time is $\Theta (n^2)$. More precisely, when we say that a particular running time is $\Theta (f(n))$, we're saying that once $n$ gets large enough, the running time is at least $k_1 \cdot f(n)$ and at most $k_2 \cdot f(n)$ for some constants $k_1$ and $k_2$. 
When we use big-$\Theta$ notation, we're saying that we have an _**asymptotically tight bound**_ on the running time. _Asymptotically_ because it matters for only large values of $n$. _Tight bound_ because we've nailed the running time to within a constant factor above and below.

A few things should be taken into account here:
1. The base of the $log$ function doesn't matter if the running time is logarithmic. For example, you can say an algorithm has a running time of $\Theta (log_a\ n)$ instead of $\Theta (log_b\ n)$, because
		$$
			log_a\ n = \frac{\log_b\ n}{log_b\ a}
		$$
2. Here's a list of functions in asymptotic notation that we often encounter when analyzing algorithms, ordered by slowest to fastest growing:
	1. $\Theta(1)$
	2. $\Theta(\log_2 n)$
	3. $\Theta(n)$
	4. $\Theta(n \log_2 n)$
	5. $\Theta(n^2)$
	6. $\Theta(n^2 \log_2 n)$
	7. $\Theta(n^3)$
	8. $\Theta(2^n)$
	9. $\Theta(n!)$
# Big-O $O$ notation
If a running time is $O(f(n))$, then for large enough $n$, the running time is at most $k \cdot f(n)$ for some constant $k$. In other words big-O notation gives only an asymptotic upper bound, and not an asymptotically tight bound.
# Big-Omega $\Omega$ notation
If a running time is $\Omega(f(n))$, then for large enough $n$, the running time is at least $k \cdot f(n)$ for some constant $k$. Big-Omega notation gives only an asymptotic lower bound.

$\Theta (f(n))$ automatically implies both $O (f(n))$ and $\Omega (f(n))$.

To read more about algorithms, continue here to learn about [selection sort](/notes/Computer Science/Algorithms/Selection Sort/).

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation)