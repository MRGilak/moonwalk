---
layout: note
title: "Introduction to Digital Control"
date: 2026-03-30
excerpt: "Digital control systems use digital computers to implement controllers, which requires converting between analog and digital signals. Digital control primarily involves working with discrete signals."
---

#Control #SignalControlSystems 

This note is primarily based on chapter 3 of  the book _Digital Control of Dynamic Systems_ by Franklin, Powell, and Workman.

In today's world, most of the controllers are implemented on digital computers. Digital computers work on samples of data. This requires implementing a few additional parts, which we will study with more detail later. The output of the actual plant, which has continuous dynamics, goes through an _Analog to Digital converter_ (_A/D_). Then this value is subtracted from the reference signal and the discrete error signal is formed (if the reference is also continuous, that has to pass through an A/D as well). Then some process is done on this signal in the computer and a discrete output is generated. This signal then goes through a _Digital to Analog converter_ (_D/A_), which is typically a _Zero Order Hold_ (_ZOH_) and is applied to the actual plant.
Note that although the course is often called _digital control_, we mostly work with _discrete_ signals. This means that we rarely consider the effect of _quantization_, because today's processors have very high resolutions.

# Forward Euler Approximation
We know that the definition of derivative is

$$
	\dot{x} = \lim_{\delta t \to 0} \frac{\delta x}{\delta t} .
$$

One simple way to approximate continuous-time dynamics is to use the Euler's method:

$$
	x(k) \approx \frac{x (k + 1) - x(k)}{T} ,
$$

where

$$
	T = t_{k + 1} - T_{k}, \quad t_k = k T , \quad x(k) = x (t_k) , \quad x(k + 1) = x(t_{k + 1}) , k \ \text{is an integer} .
$$

Generally, sample rate should be faster than $30$ times the bandwidth of the _closed-loop_ system.

# Effect of Sampling
The most important impact of sampling is the delay that is caused by the _ZOH_. The input that is being calculated digitally is held constant between samples and then applied to the system. This creates, on average, a delay of $\frac{T}{2}$. The effect of this delay can be approximated using the _Pade_ formula. This formula approximates the delay as a first order dynamics with the same time constant as the delay. Therefore, here we have

$$
	G (s) = \frac{\frac{2}{T}}{s + \frac{2}{T}} .
$$

Alternatively, the effect of delay can be investigated in the frequency domain. A delay does not change the magnitude, but has a phase decrease of

$$
	\delta_{\phi} = - \frac{\omega T}{2} .
$$

# PID Control
In the continuous-time domain, a _Proportional-Integral-Derivative_ (_PID_) controller has three terms:

$$
	\begin{align}
		\text{proportional control}: & \quad u(t) = K e(t) \\
		\text{integral control}: & \quad u(t) = \frac{K}{T_I} \int_0^t e(\eta) \text{d} \eta \\
		\text{derivative control}: & \quad u(t) = K T_D \dot{e}(t)
	\end{align}
$$

Approximations can be used to derive the discrete-time equivalent of those control gains as

$$
	\begin{align}
		\text{proportional control}: & \quad u(k) = K e(k) \\
		\text{integral control}: & \quad u(k) = u(k - 1) + \frac{K}{T_I} T e(k) \\
		\text{derivative control}: & \quad u(k) = \frac{K T_D}{T} [ e(k) - e(k - 1) ]
	\end{align}
$$

However, approximating these three terms separately is not a good method! These terms are usually used together as

$$
	C(s) = \frac{U(s)}{E(s)} = K (1 + T_I \frac{1}{s} + T_D s) \Rightarrow
	\dot{u} = K ( \dot{e} + \frac{1}{T_I} e + T_D \ddot{e} ) .
$$

Now using Euler's method results in

$$
	u(k) = u(k - 1) + K [ ( 1 + \frac{T}{T_I} + \frac{T_D}{T} ) e(k) - (1 + 2 \frac{T_D}{T} ) e (k - 1) + \frac{T_D}{T} e (k - 2) ] .
$$

Again, the sampling rate should be at least $30$ times the bandwidth of the closed-loop system for this approximation to be good. Slower sampling generally leads to an increased overshoot compared to the continuous case. 
If that high of a sampling frequency is not possible, then we could at least tune the controller gains to get a better result.

You can continue learning about digital control systems [here](/notes/Control/Digital Control Systems/Discrete Systems Analysis/).