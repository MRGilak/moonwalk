---
layout: note
title: "Lambert W function"
date: 2025-10-16
excerpt: "The Lambert W function is used to study linear time-delayed systems. It helps analyze systems with infinitely many eigenvalues."
---

#Control #delay 
The Lambert W function is a strong mathematical tool that helps us study linear time-delayed systems.


Consider the system below:
$$
	\dot{x} = A x(t) + A_d x(t - \tau)
$$
Studying this system is not as straightforward. This system has infinitely many eigenvalues, and its stability depends on $A$, $A_d$ and $\tau$. This is called a linear time-delayed system.