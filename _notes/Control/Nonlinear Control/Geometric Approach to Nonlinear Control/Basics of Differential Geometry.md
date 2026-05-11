---
layout: note
title: "Basics of Differential Geometry"
date: 2026-04-02
excerpt: "Differential geometry studies vectors and covectors in nonlinear systems. It involves tangent and cotangent spaces, and concepts like Lie derivatives and brackets."
---

#Control #NonlinearControl 

In this note, I am going to go over the basics of differential geometry. I have not gone in detail anywhere and have tried to focus on giving intuition rather than dealing with the math right away. 
Linear Algebra is a prequisite to this note.

# Vectors and Covectors
In general, in nonlinear control we want to study and analyze the system of the form

$$
	\dot{x} = f(x) ,
$$

with $x$ usually in $\mathbb{R}^n$ (this can have exceptions, for example, when we work with _quaternions_). Therefore, $f (x)$ is a vector field. 
We generally think of _vectors_ as a direction in $n$-dimensional space. They are like little arrow pointing to different directions from the present point.
There are different interpretations of _covectors_, but the way I like to think about them is in junction with vectors. Mathematically, covectors are not $n \times 1$ matrices, but rather $1 \times n$. This means that the product of a vector $v$ and a covector $\omega$ can be calculated as

$$
	\omega \cdot v = < \omega , v > = 
	\begin{bmatrix}
		\omega_1 & \omega_2 & \cdots & \omega_n
	\end{bmatrix}
	\begin{bmatrix}
		v_1 \\ v_2 \\ \vdots \\ v_n
	\end{bmatrix}
	=
	\sum_{i = 1}^{n} \omega_i v_i .
$$

We can think of this operation as a covector acting on a vector ($\omega (x) (v)$). This is what I meant by thinking of covectors only in conjunction with vectors. A covector is then a mathematical tool that takes in a vector as passes out a scalar number, basically a _linear functional_.
Also, if we have a scalar function $\lambda (x) : \mathbb{R}^n \to \mathbb{R}^n$, the following is a covector:

$$
	\text{d} \lambda = \begin{bmatrix}
		\frac{\partial \lambda}{\partial x_1} &
		\frac{\partial \lambda}{\partial x_2} &
		\cdots &
		\frac{\partial \lambda}{\partial x_n}
	\end{bmatrix}
$$

# Tangent and Cotangent Spaces
A tangent space is the space spanned by all the direction you can possibly go at a given point. If $M$ is a manifold, then $T_x (M)$ is the tangent space of manifold $M$ at point $x$. For example, consider a circle with radius $1$ centered at the origin in 2D space.
At point $( 1 , 0 )$, the tangent space is the line $x = 1$, a vertical line touching the circle at point $(1 , 0)$.
Cotangent space $T_x^{\ast} (M)$ is the space of the linear functionals acting on the vectors in the tangent space at that point; therefore, the members of the cotangent space are covectors. 

# Lie Derivative
The _Lie derivative_ is defined as

$$
	L_f \lambda = \text{d} \lambda \cdot f = < \text{d} \lambda, f > = 
	\sum_{i = 1}^{n} \frac{\partial \lambda}{\partial x_i} f_i .
$$

The geometric intuition behind the Lie derivative is very interesting. It will also be very helpful for understanding some notions that we're going to see.
The Lie derivative is basically a _directional derivative_. Imagine we have a scalar function $\lambda$ and we want to see how it changes if we move in a specific direction. Now assume that the direction in which we are moving is defined by $\dot{x} = f(x)$, meaning we are moving on the integral curve of $f$. The Lie derivative helps us track the changes of $\lambda$ in this direction.
As an example, imagine a wind blowing in an area. At any point, the wind might be going in a different direction ($\dot{x} = f(x)$). Now assume there is a small leaf being blown around by this wind, and we want to see how the temperature ($\lambda (x)$) changes at the position of the leaf! Then we use the Lie derivative.
It is actually helpful to know that this intuition can actually be supported with math as well, because

$$
	L_f \lambda = \frac{\text{d}}{\text{d} t} \lambda (x(t)) = \frac{\text{d} \lambda}{\text{d} x} \frac{\text{d} x}{\text{d} t} = \text{d} \lambda \cdot \dot{x} = \text{d} \lambda \cdot f .
$$

For two vectors $f, g \in T_x (\mathbb{R}^n)$, the _Lie bracket_ is defined as

$$
	[ f , g ] = \frac{\partial g}{\partial x} f - \frac{\partial f}{\partial x} g .
$$

The intuition behind the Lie bracket is also useful. The Lie bracket shows the difference between taking two paths: one path is going with the flow of $f$, then with the flow of $g$ and the other path is going with the flow of $g$ first and then with $f$. Because $f$ and $g$ are not necessarily in a constant direction everywhere, taking these two paths might actually take us to different points in space. The Lie bracket measures this difference. 

For a covector $\omega (x) \in T_x^{\ast} (\mathbb{R}^n)$ and a vector $f(x) \in T_x (\mathbb{R}^n)$, the Lie derivative is defined as

$$
	L_f \omega = f^\top (x) (\frac{\partial \omega^\top}{\partial x})^\top + 
	\omega (x) \frac{\partial f}{\partial x} .
$$

As we learned before, this Lie derivative intends to find the rate of change of $\omega$ if we were to go with the flow defined by $f(x)$. The two terms in this summation point to two different phenomenons:
- The first term, $f^\top (x) (\frac{\partial \omega^\top}{\partial x})^\top$, shows the effect of the cotangent space changing as we move with the flow of $f$. Because we are moving, we get to new points in space and the cotangent space changes between these two points.
- The second term, $\omega (x) \frac{\partial f}{\partial x}$, shows the effect of the members of the tangent space changing as we move through space.
These two effects together comprise the entire change of the covector.

Continue learning nonlinear control with reading about [Change of Coordinates](/notes/Control/Nonlinear Control/Geometric Approach to Nonlinear Control/Change of Coordinates/).