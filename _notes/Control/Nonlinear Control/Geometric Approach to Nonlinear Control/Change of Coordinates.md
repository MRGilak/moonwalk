---
layout: note
title: "Change of Coordinates"
date: 2026-04-02
excerpt: "#Control #NonlinearControl"
---

#Control #NonlinearControl 
In the geometric approach to nonlinear control, we are mainly looking for an appropriate change of coordinates $z = \Phi (x)$ with the hope that the representation of the system in this new coordinate system might be simpler and it might highlight some features of the system that were previously difficult to realize.
We consider the function $\Phi(x) : \mathbb{R}^n \to \mathbb{R}^n$ to be a _diffeomorphism_. This means that the function has two primary features. First, it is reversible and $\Phi^{-1} (z)$ exists everywhere. Second, $\Phi$ is smooth with regards to $x$ and its derivatives exist. The condition for the first derivative existing is that the Jacobian matrix $\frac{\partial \Phi}{\partial x}$ be reversible everywhere.
These conditions ensure that whatever feature we observe in the transformed coordinates do also exist in the original coordinates. For example, if the system in uncontrollable in the new coordinates, the original system is uncontrollable as well.

Consider the following system:
$$
	\begin{cases}
		\dot{x} = f(x) + \sum_{i = 1}^{m} g_i (x) u_i \\
		y = h(x)
	\end{cases}
$$
If we do the change of coordinates $z = \Phi (x)$, we will get
$$
	\begin{cases}
		\dot{z} = \frac{\text{d}}{\text{d} t} \left( \Phi(x) \right) =
		\frac{\partial \Phi}{\partial x} \frac{\text{d} x}{\text{d} t} =
		\frac{\partial \Phi}{\partial x} \left( f(x) + \sum_{i = 1}^{m} g_i (x) u_i \right) =
		\underbrace{\frac{\partial \Phi}{\partial x} f(x) |_{x = \Phi^{-1} (z)}}_{\bar{f} (z)} + 
		\sum_{i = 1}^{m} \underbrace{\frac{\partial \Phi}{\partial x} g_i (x) |_{x = \Phi^{-1} (z)}}_{\bar{g}_i (z)} u_i
		\\
		y = h(x) = h(\Phi^{-1} (z)) = \bar{h} (z)
	\end{cases}
$$
a