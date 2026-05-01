---
layout: note
title: "Steady-state Behavior of Linear Systems"
date: 2026-03-03
excerpt: "#Control #LinearControlSystems"
---

#Control #LinearControlSystems 
We learned how to represent a linear system using differential equations and transfer functions [here](linear-control-systems). We also learned about first-order and second-order linear systems and their transient characteristics [here](first-and-second-order-systems). In this note, we are going to learn about the steady-state behavior of a linear system.
Perhaps the most important theorem in this regard is the _final value theorem_, which states that if a system is stable and has a final, constant value, this value can be found by
$$
x_{ss} = \lim_{t \to \infty} x(t) = \lim_{s \to 0} s X(s)
$$
TODO: add a block diagram of the closed-loop system here.
Consider a closed-loop system with $C (s)$ as the controller and $G (s)$ as the system. The relation between the reference and the output, also called _complementary sensitivity_ is defined as
$$
	\frac{Y(s)}{R(s)} = \frac{C(s) G(s)}{1 + C(s)G(s)}
$$
and _sensitivity_ is defined as
$$
	\frac{E(s)}{R(s)} = \frac{1}{1 + C(s)G(s)}
$$
To find the steady-state error of the system to different inputs, we define
- _position-error constant_: 
	$$
		K_p = \lim_{s \to 0} C(s) G(s)
	$$
- _velocity constant_:
	$$
		K_v = \lim_{s \to 0} s C(s) G(s)
	$$
- _acceleration constant_:
	$$
		K_a = \lim_{s \to 0} s^2 C(s) G(s)
	$$
Now let's find the steady-state error to some basic inputs:
- step input:
	We use the final value theorem.
	$$
		\begin{align}
			e_{ss} = \lim_{s \to 0} s E(s) = \lim_{s \to 0} s \cdot \frac{1}{1 + C(s)G(s)} \cdot \underbrace{R(s)}_{\frac{1}{s}} = 
			\lim_{s \to 0} \frac{1}{1 + C(s)G(s)} = \frac{1}{1 + \lim_{s \to 0} C(s)G(s)} = \frac{1}{1 + K_p}
		\end{align}
	$$
- ramp input:
	$$
		\begin{align}
			e_{ss} = \lim_{s \to 0} s E(s) = \lim_{s \to 0} s \cdot \frac{1}{1 + C(s)G(s)} \cdot \underbrace{R(s)}_{\frac{1}{s^2}} = 
			\lim_{s \to 0} \frac{1}{s + s C(s) G(s)} = \frac{1}{0 + \lim_{s \to 0} s C(s) G(s)} = \frac{1}{K_v}
		\end{align}
	$$
- parabola input:
	$$
		\begin{align}
			e_{ss} = \lim_{s \to 0} s E(s) = \lim_{s \to 0} s \cdot \frac{1}{1 + C(s)G(s)} \cdot \underbrace{R(s)}_{\frac{1}{s^3}} = 
			\lim_{s \to 0} \frac{1}{s^2 + s^2 C(s) G(s)} = \frac{1}{0 + \lim_{s \to 0} s^2 C(s) G(s)} = \frac{1}{K_a}
		\end{align}
	$$
Systems that have a finite $K_p$ are called _type 0_ and have a non-zero steady-state error to a step input. A system with a finite $K_v$ is called _type 1_ and has a non-zero steady-state error to a ramp input. A system with a finite $K_a$ is called _type 2_ and has a non-zero steady-state error to a parabola input.

TODO: Add the Ruth-Hurwitz table

To read more about linear control systems, you can take a look at [First and Second-order Systems](first-and-second-order-systems) or [Root Locus](root-locus).