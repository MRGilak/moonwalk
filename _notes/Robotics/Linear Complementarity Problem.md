---
layout: note
title: "Linear Complementarity Problem"
date: 2025-09-09
excerpt: "The linear complementarity problem seeks vectors that satisfy certain constraints. It involves a matrix and vector, with conditions including non-negativity and complementarity."
---

The linear complementarity problem can be stated as follows:
>[! problem]
>Given a real matrix $M$ and vector $q$, the linear complementarity problem $LCP(q, M)$ seeks vectors $z$ and $w$ which satisfy the following constraints:
>- $w, z \geq 0$
>- $z^T w = 0$ or equivalently $\sum_i w_i z_i = 0$. This is called the complementarity condition, since it implies that for every $i$, at most one of $w_i$ and $z_i$ can be positive.
>- $w = Mz + q$

A sufficient condition for existence and uniqueness of a solution to this problem is that $M$ be symmetric positive-definite.
The vector $w$ is usually a slack variable, meaning the problem can also be stated as
- $Mz + q \geq 0$
- $z \geq 0$
- $z^T (Mz + q) = 0$ (the complementarity condition)
Finding the solution to the LCP can also be associated with minimizing the quadratic function $f(z) = z^T (Mz + q)$ subject to constraints $Mz + q \geq 0$ and $z \geq 0$.


Sources:
1. [Wikipedia](https://en.wikipedia.org/wiki/Linear_complementarity_problem)