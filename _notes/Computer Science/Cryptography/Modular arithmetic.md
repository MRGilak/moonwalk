---
layout: note
title: "Modular arithmetic"
date: 2025-08-23
excerpt: "In a world without division, modular arithmetic reigns supreme, where remainders hold the secrets to cryptic codes and the Euclidean Algorithm uncovers hidden patterns in the realm of integers. But what lies at the heart of this mysterious "
---

#cryptography #computer-science 
When we divide two integers, we have an equation that looks like this:
$$
\frac{A}{B} = Q\ remainder\ R
$$
$A$ is called the dividend, $B$ is the divisor, $Q$ is the quotient and $R$ is the remainder.
Sometimes we are only interested in the remainder. This is why the modulo operator is defined:
$$
A\ mod\ B = R
$$
A property of the modulo operator is:
$$
A\ mod\ B = (A + BK)\ mod\ B
$$
Another way of writing that would be
$$
A \equiv A+BK\ (mod\ B)
$$
or $A$ is __congruent__ to $A + BK$ modulo $B$.
Some other properties of the modulo operator are:
$$
(A + B)\ mod\ C = (A\ mod\ C + B\ mod\ C)\ mod\ C
$$
$$
(A * B)\ mod\ C = (A\ mod\ C * B\ mod\ C)\ mod\ C
$$
$$
A^B \ mod\ C = ((A\ mod\ C)^B)\ mod\ C
$$
In modular arithmetic there is no division. Instead, a modular inverse is defined. The modular inverse of $A$ ($mod\ C$) is $A^{-1}$ if 
$$
(A * A^{-1})\ mod\ C = 1
$$
# Euclidean Algorithm
Recall that the Greatest Common Divisor (GCD) of two integers A and B is the largest integer that divides both A and B.
The Euclidean Algorithm is a technique for quickly finding the GCD of two integers.
The algorithm for finding GCD(A,B) is as follows:
- If $A = 0$ then $GCD (A, B) = B$, since the $GCD (0, B) = B$, and we can stop.  
- If $B = 0$ then $GCD(A, B) = A$, since the $GCD (A, 0) = A,$ and we can stop.  
- Write $A$ in quotient remainder form $(A = B⋅Q + R)$
- Find $GCD(B, R)$ using the Euclidean Algorithm since $GCD(A, B) = GCD(B, R)$.

Sources:
1. [Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography).