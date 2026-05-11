---
layout: note
title: "Linear Control Systems"
date: 2026-03-30
excerpt: "Linear control systems are based on differential equations, either Ordinary Differential Equations (ODEs) or Partial Differential Equations (PDEs)."
---

#Control #LinearControlSystems

Before getting started, I have to state that by _linear control systems_ I am generally referring to the materials of the linear control systems course, which cover _continuous-time_ systems. Studying discrete-time systems will be in another series of notes, which you can find [here](/notes/Control/Digital Control Systems/Digital Control Systems/).
This series of notes is based primarily on chapter 2 of 'Digital Control of Dynamic Systems' by Franklin, Powell, and Workman, but I have included my personal thoughts and ideas in them as well.
# Differential Equations
Study of linear control systems begins with differential equations. This is what I've always loved about control theory. Physics promises to describe _everything_ in the world by a set of differential equations (well, maybe not everything, but at least everything I, as an engineer, know of physics). These differential equations are either Ordinary Differential Equations (ODEs) or Partial Differential Equations (PDEs). Control theory on the other hand, promises to find the best possible input to the system given a description of it in the form of differential equations. It's like control theory is just what naturally had to come after physics. I know that this is rather a bold statement, but I like to think about this field like this.
Although PDEs have been dealt with in control literature, but most of the focus has been on systems of ODEs. That's also what we more commonly face in many real-world problems. Given a set of ODEs of any order, we can turn them into a set of first-order ODEs. In the case of linear systems, the result can then be stated as

$$
	\begin{align}
		\dot{x} (t) = A(t) x(t) + B(t) u(t) , \\
		y(t) = C(t) x(t) + D(t) u(t) ,
	\end{align}
$$

where $x(t) \in \mathbb{R}^n$ is the vector of states. $u(t) \in \mathbb{R}^m$ is the vector of inputs and $y(t) \in \mathbb{R}^p$ is the vector of outputs. This is called the _state-space form_ of a system. The same system can also be stated in a _transfer function_ form by using the properties of Laplace transform.

$$
	G(s) = \frac{Y(s)}{U(s)} = C (sI - A)^{-1} B + D
$$

Finding the response of the system to an arbitrary input is now easy. The input is converted from time-domain $u(t)$ to Laplace domain $U(s)$. The output in the Laplace domain is calculated as $Y(s) = G(X) U(S)$, and finally, the output in the time domain $y(t)$ is calculated via Laplace inverse. The Laplace domain equivalent of some of the most common inputs are

$$
	\begin{align}
		u(t) &= A \quad (\text{step input}) \Rightarrow U(s) = \frac{A}{s} \\
		u(t) &= B \quad (\text{ramp input}) \Rightarrow U(s) = \frac{B}{s^2} \\
		u(t) &= C \sin (\omega t) \quad (\text{Sinusoid input}) \Rightarrow U(s) = \frac{C \omega}{s^2 + \omega^2}
	\end{align}
$$

# Block Diagrams
It is customary to show systems and the connections among them in a _block diagram_. A block diagram can be turned into a _Singal Flow Graph (SFG)_. Mason's formula can then be used to find the input-output relationship between any arbitrary input and output port.
TODO: Add Mason's formula

Learn more about control systems by reading about [First and Second-order Systems](/notes/Control/Linear Control Systems/First and Second-order Systems/) or [Steady-state Behavior of Linear Systems](/notes/Control/Linear Control Systems/Steady-state Behavior of Linear Systems/).