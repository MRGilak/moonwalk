---
layout: note
title: "Discrete Systems Analysis"
date: 2026-03-30
excerpt: "Discrete systems analysis involves tools for designing digital controllers. Difference equations model discrete-time systems, describing the relationship between past and current inputs and outputs."
---

#Control #SignalControlSystems 

This note is primarily based on chapter 4 of  the book _Digital Control of Dynamic Systems_ by Franklin, Powell, and Workman.

In this note, we are going to learn about some tools necessary for analysis of discrete-time systems. In designing a digital controller, we wish to calculate a control input for the plant as a function of the error and previous control inputs:

$$
	u_k = f (e_0, \cdots, e_k, u_0, \cdots, u{k - 1}) .
$$

For now, instead of this general case, let's assume the case where the function $f$ is linear in its inputs and we use only a finite number of past $e$ 's and $u$ 's:

$$
	u_k = - a_1 u_{k - 1} - a_2 u_{k - 2} - \cdots - a_n u_{k - n} + b_0 e_k + b_1 e_{k - 1} + \cdots + b_m e_{k - m} .
$$

This is called a _linear recurrence equation_ or _difference equation_. The reason behind it is actually pretty cool. Much like how _differential equations_ have derivatives of different orders in them, this equation can be written in a way to have different orders of _differences_, which are defined as

$$
	\begin{align}
		\nabla u_k &= u_k - u_{k - 1} \\
		\nabla^2 u_k &= \nabla u_k - \nabla u_{k - 1} \\
		\nabla^n u_k &= \nabla^{n - 1} u_k - \nabla^{n - 1} u_{k - 1}
	\end{align}   
$$

the inputs can be written based on these differences as

$$
	\begin{align}
		u_k = u_k \\
		u_{k - 1} = u_k - \nabla u_k \\
		u_{k - 2} = u_k - 2 \nabla u_k + \nabla^2 u_k
	\end{align}
$$

This gives the name _difference equations_, but this form is rarely used in practice.

# Solving Difference Equations
Let's say we have a (linear) difference equation and we want to find its solutions. As an example, we consider

$$
	u_k = u_{k - 1} + u_{k - 2} .
$$

We guess the general form of the solution as $u(k) = A z^k$, much like we guess an answer $e^{st}$ for the continuous case. We substitute it in the original equation to get

$$
	A z^k = A z^{k - 1} + A z^{k - 2} .
$$

Simplifying this results in

$$
	1 = z^{-1} + z^{-2} \Rightarrow z^2 = z + 1 \Rightarrow z_{1, 2} = \frac{1}{2} \pm \frac{\sqrt{5}}{2} .
$$

Given two initial conditions, we can find $A_1$ and $A_2$ in $u(k) = A_1 z_1^k + A_2 z_2^k $. The equation we got by substituting $u (k) = z^k$ ($z^2 - z - 1 = 0$) is called the _characteristic equation_ of the difference equation. If _any_ solution of the characteristic equation is outside the unit circle, the corresponding difference equation is _unstable_ in the sense that its solution can grow without bound for some finite initial value.

# z-Transform
If a signal has discrete values $e_0 , e_1 , e_2 , \cdots$, its _z-transform_ is defined as the function

$$
	E(z) = \mathcal{Z} \{ e(k) \} = \sum_{k = - \infty}^{\infty} e_k z^{-k} .
$$

(We will talk about the region of convergence later). 
Let's take the _trapezoid rule_ as an example:

$$
	u_k = u_{k - 1} + \frac{T}{2} (e_k + e_{k - 1}) .
$$

This rule approximates the area under a curve with a trapezoid (instead of the forward or backward rectangle used in Euler's method). We have

$$
	U(z) = \sum_{k = - \infty}^{\infty} u_k z^{-k} .
$$

Now let's substitute $u_k$ from the original difference equation to get

$$
	\sum_{k = - \infty}^{\infty} u_k z^{-k} = 
	\sum_{k = - \infty}^{\infty} u_{k - 1} z^{-k} +
	\frac{T}{2} \left( \sum_{k = - \infty}^{\infty} e_k z^{-k} + \sum_{k = - \infty}^{\infty} e_{k - 1} z^{-k} \right) .
$$

In the first summation on the right, we use $k - 1 = j$ to get

$$
	\sum_{k = - \infty}^{\infty} u_{k - 1} z^{-k} = 
	\sum_{k = - \infty}^{\infty} u_j z^{- (j + 1)} = 
	z^{-1} \sum_{k = - \infty}^{\infty} u_j z^{-j} = 
	z^{-1} U(z) .
$$

Similarly, doing this for the last term on the right side, we get

$$
	U(z) = z^{-1} U(z) + \frac{T}{2} \left[ E(z) + z^{-1} E(z) \right] .
$$

Solving this we get

$$
	U(z) = \frac{T}{2} \frac{1 + z^{-1}}{1 - z^{-1}} E(z) .
$$

We can define the ratio of the transforms of the output and input as the _transfer function_:

$$
	H(z) = \frac{U(z)}{E(z)} = \frac{T}{2} \frac{1 + z^{-1}}{1 - z^{-1}} .
$$

A transfer function is a fraction of two polynomials in $z$. Similar to the continuous case, poles and zeros are defined for discrete transfer functions.
It is easy to see that $z^{-1}$ implements a delay of one sample time. This can also easily be proved by deriving the transfer function for the difference equation $u_k = e_{k - 1}$.

# Canonical Forms
Discrete transfer functions can also be represented by block diagrams. To reduce a discrete transfer function to a block diagram, we take a look at two canonical forms.

## Control Canonical Form
We have

$$
	U(z) = H(z) E(z) = \frac{b(z)}{a(z)} E(z) = b(z) \zeta, \quad E(z) = a(z) \zeta .
$$

Let's consider only the second-order case. It is easy to generalize the result.

$$
	(z^2 + a_1 z + a_2) \zeta = e , \quad (b_0 z^2 + b_1 z + b_2) \zeta = u .
$$

From this we get

$$
	z^2 \zeta = e - a_1 z \zeta - a_2 \zeta \Rightarrow 
	\zeta (k + 2) = e(k) - a_1 \zeta(k + 1) - a_2 \zeta (k) .
$$

We can now name these our states:

$$
	\begin{align}
		x_1 (k) &= \zeta (k + 1) , \quad x_2 (k) = \zeta (k) \\
		x_1 (k + 1) &= \zeta (k + 2) = e(k) - a_1 x_1 (k) - a_2 x_2 (k) \\
		x_2 (k + 1) &= x_1 (k)
	\end{align}
$$

This can be written in state-space form as

$$
	\begin{align}
		x(k + 1) = A x (k) + B e(k) \\
		u(k) = C x (k) + D e(k)
	\end{align}
$$

with

$$
	A = \begin{bmatrix}
	-a_1 & - a_2 \\ 1 & 0
	\end{bmatrix}
	, \quad
	B = \begin{bmatrix}
	1 \\ 0
	\end{bmatrix}
	, \quad
	C = \begin{bmatrix}
	b_1 - 
	\end{bmatrix}
$$

a