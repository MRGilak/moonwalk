---
layout: note
title: "Linear Time-Delayed Systems"
date: 2025-10-16
excerpt: "Linear time-delayed systems have infinitely many eigenvalues. Their stability depends on parameters $A$, $A_d$, and $\tau$."
---

#Control #delay 
Consider the system
$$
	\dot{x} (t) = A x(t)
$$
We know from control theory that this system is stable, if the matrix $A$ is Hurwitz, i.e. all of its eigenvalues are in the left half of the complex plane.
Now, consider the system below:
$$
	\dot{x} = A x(t) + A_d x(t - \tau)
$$
Studying this system is not as straightforward. This system has infinitely many eigenvalues, and its stability depends on $A$, $A_d$ and $\tau$. This is called a linear time-delayed system.
There are several methods to handle these systems. One of the methods is using the [Lambert W function](/notes/Control/General Research in Control/Lambert W function/).