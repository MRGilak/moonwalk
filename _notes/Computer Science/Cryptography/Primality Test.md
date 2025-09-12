---
layout: note
title: "Primality Test"
date: 2025-08-23
excerpt: "A primality test determines whether a given number is prime or composite. Primality tests include trial division, the Sieve Algorithm, and probabilistic methods like the Fermat primality test."
---

#cryptography #computer-science 
To test whether a given number $n$ is prime or not, we can check all the integers from $1$ to $n - 1$ to see if $n$ is divisible to any of them. But to make this more efficient, we can think of it as this: a composite number can be thought of as $n = p_1 * p_2\ * ...$, where $p_i$ are prime numbers. The largest case for $p_i$ happens when there is only 2 of them and they are equal to each other, so it is sufficient to look through $1$ to  $\sqrt{n}$ to see if it is a prime number or not.

# The Sieve Algorithm
An old algorithm used for finding prime numbers is the __Sieve Algorithm__. It loops over all the numbers from $2$ to $\sqrt{n}$ and if it finds an unmarked number, it marks it as prime and eliminates all its multiples from the list. For example, let's say we want to find all the prime numbers up to $100$. We start from $2$. Since it's unmarked we mark it as prime and eliminate all of its multiples (even numbers) from the list. Now we go to the next unmarked number, which is $3$. Since it is unmarked, we mark it as a prime and eliminate all of its multiples (we can start the elimination from $3^2=9$, since there won't be any unmarked multiples before that. 

# The Prime Number Theorem
The asymptotic law of distribution of prime numbers states that the prime density, which is the number of primes smaller than $x$ divided by $x$ approaches $\frac{1}{ln (x)}$. This can be used to approximate the number of primes less than $x$ as $\frac{x}{ln (x)}$. This is the prime number theorem:
$$
lim_{x \rightarrow \infty} \frac{\Pi (x)}{\frac{x}{ln (x)}}= 1
$$
where $\Pi (x)$ is the actual number of primes less than $x$.

# Random Primality Test
Let's say we're given a number $N$ and we want to determine if it's a prime or not. The most basic approach would be to go through all the numbers between $2$ and $\sqrt{N}$ and check if $N$ is divisible by them. If we find a composite of $N$, then we can terminate the program.
A more logical approach would be to delete some numbers from the process of checking, kind of like the Sieve Algorithm. For example, we could check only odd numbers if $2$ is ruled out. Of course, the ideal step size would be to check only the prime numbers, but for that we would need to have a list of all prime numbers up to $\sqrt{N}$, which would take a lot of memory. Using the Sieve Algorithm to find all the prime numbers up to $\sqrt{N}$ and then using those prime numbers to check if $N$ is prime is a solution, but it is much more demanding than much more simpler approaches, like just checking the odd numbers.
This is where random primality test comes in. We pick a number $a$ between $2$ and $\sqrt{N}$. We check if it divides $N$, or if $a|N$. If yes, then we're certain that $N$ is a composite, not a prime. If not, we're not sure and we check more numbers. When the number of trials goes up more and more, we become more and more confident that a number is prime. Notice that if $N$ is prime, this method always correctly guesses that it is indeed prime; but if $N$ is a composite, there is a small chance of error $e$ that we mistakenly think it is a prime. This chance depends on the number of trials; therefore, the more numbers we try, the more confident we'll be. But this is still slower than what we want.

# Fermat's Primality Test
Fermat's little theorem can be basically written as
$$
p\ |\ a^p - a
$$
where $p$ is a prime number and $a$ is another integer. It can also be written as
$$
a^p \equiv a\ mod\ p
$$
or
$$
a^{p-1} \equiv 1\ mod\ p
$$

Using Fermat's little theorem, we can now understand Fermat's primality test. It can be stated as follows:
We're given a number $N$ and we want to check if it is a prime. We pick a random number $a$ between $2$ and $\sqrt{N}$. We first check this condition:
$$
GCD (a, N) = 1
$$
If not, we're certain that $N$ is a composite and our job is done. If yes, then we check this condition:
$$
a^{N-1}\ mod\ N = 1
$$
If not, then we're certain that $N$ is a composite, because if $N$ were indeed prime, the output should have been $1$. But what if the condition above holds? Can we then say that $N$ is definitely a prime? In other words, we know that for a prime number $p$ we must have $a^{p-1}\ mod\ p = 1$, but if this equation holds, can we be sure that $p$ is a prime?!
Well, the answer is no. There are some numbers called pseudo-primes, for example $511$. These are composite numbers, but there are certain $a$'s that we can choose that will output $1$ in the algorithm above. These $a$'s are called ___fools___.
Our strategy now can be to pick some other $a$'s in hope that we don't pick fools every time.
It has been proven that the number of fools divides the total size of the group we select from. This means at most half of the choices could be fools. So since $a$ is chosen randomly, the chance of finding a composite witness is at least $50 \%$. So by doing more and more trials, we can be almost sure that this method works.

To read more about primality tests, take a look at [AKS primality test](https://en.wikipedia.org/wiki/AKS_primality_test)or [Miller-Rabin primality test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test)
You can also take a look at [Introduction to Cryptography](/notes/Computer Science/Cryptography/Introduction to Cryptography/), [Ciphers](/notes/Computer Science/Cryptography/Ciphers/), [Modern Cryptography](/notes/Computer Science/Cryptography/Modern Cryptography/), [Modular arithmetic](/notes/Computer Science/Cryptography/Modular arithmetic/).

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography).