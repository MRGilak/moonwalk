---
layout: note
title: "Modern Cryptography"
date: 2025-08-23
excerpt: "Modern cryptography relies on mathematical concepts like prime factorization and modular arithmetic."
---

#cryptography #computer-science 
Modern cryptography is based on the fundamental theorem of arithmetic, which states that a number has one and exactly one prime factorization, for example $30 = 2 * 3 * 5$. 

# Public Key and Private Key
Around 1957, a new method of cryptography was introduced based on the idea of one-sided functions. These functions make it easy to go from one direction to the other, but very hard to go the opposite way (this will all make sense soon). This was all in attempt to circumvent the need for people to meet in order to share keys.
The key to finding a function that is easy in one direction and hard in the other is __Modular Arithmetic__ or __Clock Arithmetic__. Below is the Diffie-Hellman key exchange algorithm.
First, Alice and Bob agree on a modulus $m$ and a generator $g$. Let's say $g = 3$ and $m = 17$. Then Alice selects a private random number $a$, for example $a = 15$. Alice then calculates
$$
g^a\ mod\ m \equiv 3^{15}\ mod\ 17 = c
$$
She then sends this result, $c$, publicly to Bob. Then Bob selects his private random number $b$, let's say $b = 13$. He then calculates
$$
g^b\ mod\ m \equiv 3^{13}\ mod\ 17 = d
$$
He then sends $d$ publicly to Alice.  Alice can now use the relation below to find Bob's number:
$$
d^a\ mod\ m = (3^{13}\ mod\ 17)^{15}\ mod\ 17 = (3^{13})^{15}\ mod\ 17 = 10
$$
In this case $10$ is the shared secret. Bob can also yield the same result by doing
$$
c^b\ mod\ m = (3^{15}\ mod\ 17)^{13}\ mod\ 17 = (3^{15})^{13}\ mod\ 17 = 10
$$
Note that $c$ and $d$ are both public, but knowing only $g$, $m$, $c$, $d$, no one can't find $a$ and $b$.
This is the discrete logarithm problem. For large enough numbers, it is practically secure. Note that usually a prime modulus is used, because it reduces the number of possible outputs. Nonprime moduli generally result in certain numbers way more than others.

# RSA Encryption
To introduce the RSA encryption, we first need to learn about a special type of one-way function, called the trapdoor one-way function. This is a function that is easy to compute in one direction, yet difficult to reverse, unless you have special information called the trapdoor.
Imagine Bob has a secret message, which is converted to a number, $m$. He first calculates
$$
m^e\ mod\ N = c
$$
where $e$ is a public exponent and $N$ is a random number. This calculation is easy to perform, but given $e$, $N$ and $c$ it is much more difficult to figure what $m$ was used, because we would have to resort to some form of trail and error.
Now all we need is a trap door. We need to have another exponent $d$, which can give;
$$
c^d\ mod\ N = m
$$
basically reversing the operation. Both operations together are
$$
(m^e\ mod\ N)^d\ mod\ N = m \Rightarrow m^{ed}\ mod\ N = m
$$
We need a way to construct $e$ and $d$ which is difficult to replicate! This is where prime factorization comes in, alongside an important theorem from Euler.
An important function that Euler defined was the $\Phi$ function, which measures the breakability of that number. Given a number $N$, $\Phi (N)$ counts the numbers less than or equal to $N$ that do not share a common factor with $N$. For example, if we want to calculate $\Phi (8)$, we list numbers $1$ through $8$ and count how many integers $8$ does not share a factor with, which in this case would be $4$: $1$, $3$, $5$ and $7$. Two important properties of the $\Phi$ function are:
- $\Phi (a*b) = \Phi (a) * \Phi (b)$
- $\Phi (P) = P-1$ if $P$ is a prime number.
If we know a number $N$ is the product of two prime numbers $P_1$ and $P_2$, hen using the properties above, we can write
$$
\Phi (N) = \Phi (P_1 * P_2) = \Phi (P_1) * \Phi (P_2) = (P_1 - 1) * (P_2 - 1)
$$
We now have a trapdoor for the $\Phi$ function. If you know the prime factorization of $N$, then $\Phi (N)$ is easy to compute, but without knowing that, it's a difficult task, especially if $N$ is a very large number. Now we turn to Euler's theorem:
$$
m^{\Phi(N)} \equiv 1\ mod\ N
$$
From this we conclude:
$$
m^{k\Phi(N)} \equiv 1\ mod\ N
$$
Multiplying both sides in $m$ results in
$$
m * m^{k\Phi(N)} \equiv m * 1\ mod\ N \Rightarrow m^{k\Phi(N) + 1} \equiv m\ mod\ N
$$
Notice that this is exactly what we were after. We can choose $ed = k \Phi (N) + 1$. Now, given $e$, it is easy to calculate $d$ only if the factorization of $N$ is known, meaning $d$ can be Alice's private key.
Let's see a simple example. Let's assume Bob has a message he converted into a number $m$ using a padding scheme. Alice generates her public and private keys as follows: First, she generates two random prime numbers, $p_1 = 53$ and $p_2 = 59$. She then calculates $n = p_1 * p_2 = 3127$. Then she calculates $\Phi (n)$, which is easy for her, since she knows the factorization of $n$.
$$
\Phi (n) = \Phi (3127) = \Phi (53 * 59) = \Phi (53) * \Phi (59) = 52 * 58 = 3016 
$$
She now takes a small public exponent $e$ with the condition that it must be an odd number that does not share a factor with $\Phi (n)$, for example $e = 3$. Finally, she finds the value of her private exponent $d$, which in this case is
$$
d = \frac{(2 * 3016) + 1}{3} = 2011
$$
She now hides everything except the value of $n$ and $e$, which make her public key. She sends these to Bob. Bob calculates:
$$
m^e\ mod\ N=c
$$
He sends $c$ back to Alice. Alice now easily computes
$$
c^d\ mod\ N = m
$$
No one else with $c$, $n$ and $e$ can figure out $m$, unless they know $\Phi (n)$. If $n$ is sufficiently large, calculating $\Phi (n)$ is practically impossible, unless you know its prime factorization.

Some stuff from modular arithmetic were used in this note. You can read more about modular arithmetic [here](/notes/Computer Science/Cryptography/Modular arithmetic/).
We have also said a few times that two random prime numbers must be chosen, and they better be as large as possible. But how do we know if a large number is prime or not? Read more about primality test [here](/notes/Computer Science/Cryptography/Primality Test/).
If new to this field, you can start with [Introduction to Cryptography](/notes/Computer Science/Cryptography/Introduction to Cryptography/).

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography).