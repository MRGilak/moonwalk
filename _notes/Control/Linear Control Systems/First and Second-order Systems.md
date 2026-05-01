---
layout: note
title: "First and Second-order Systems"
date: 2026-03-03
excerpt: "#Control #LinearControlSystems"
---

#Control #LinearControlSystems 
Assume we have a transfer function in the form
$$
	G(s) = \frac{B(s)}{A(s)}.
$$
The values of $s$ for which $B(s)) = 0$ are called the _zeros_ of the system. The values of $s$ for which $A(s) = 0$ are called the poles of the system. Since the Laplace transform of an impulse is $1$, the transfer function of a system is basically the Laplace transform of the impulse response of a system and the poles of the system define the signals contained in the impulse response.
Since the polynomials we work with often come from physics and have real meanings behind them, their coefficients are real numbers. Polynomials with real coefficients have either real roots or pairs of complex conjugate roots. Therefore, we can learn a lot about different types of systems by just learning about first-order and second-order systems.
A first-order system has the form
$$
	G(s) = \frac{1}{s + a},
$$
where $-a$ is now the _pole_ of the system. Time-domain representation of the impulse response of this system is
$$
	h(t) = e^{- a t}.
$$
The system decays, and is said to be stable, in the case of $a > 0$. In case of $a < 0$, the system is unstable and the impulse response grows infinitely. The time at which the impulse response is at $\frac{1}{e}$ of its initial value is called the _time constant_ of the system and in this case is $\tau = \frac{1}{a}$.
A second-order system is in the form
$$
	G(s) = \frac{\omega_n^2}{s^2 + 2 \zeta \omega_n s + \omega_n^2}
$$
, where $\zeta$ is the _damping ratio_ and $\omega_n$ is the _undamped natural frequency_. The poles of this system are at
$$
	s = - \sigma \pm j \omega_d
$$
with
$$
	\sigma = \zeta \omega_n , \quad \omega_d = \omega_n \sqrt{1 - \zeta^2},	
$$
where $\omega_d$ is called the _damped natural frequency_ of the system.
Basically, the poles are on a circle with radius $\omega_n$ and an angle of $\theta = \sin^{-1} \zeta$ calculated from the vertical axis in the counter-clockwise direction. The impulse response of this system is
$$
	h(t) = \omega_n e^{-\sigma t} \sin(\omega_d t).
$$
For $\zeta < 0$, the system is unstable. $\zeta = 0$ is an undamped response. $\zeta = 1$ is the _critically damped_ response, which is the fastest response that has no overshoot. Finally, $\zeta > 1$ indicates an overdamped system, meaning the poles are real and distinct.
Although the relation between the coefficients of the system and its behavior aren't very simple, some basic approximations can be used to solve for common time-domain specifications:
- _Rise time_ for a second-order system is approximately $\frac{1.6}{\omega_n}$. This is the time it takes for the response of the system to go from 10% of its final value to 90% of its final value. 
- _Settling time_ for a second-order system is approximately $\frac{4}{\zeta \omega_n}$. This is the time it takes for the response to settle in a $\pm 2$% its final value.
- _Overshoot_ of the system is approximately $e^{- \frac{\pi \zeta}{\sqrt{1 - \zeta^2}}}$. 
_Note_: We studied the case with no zeros. Generally, adding a zero to the system would make it faster with more overshoot. An additional pole would generally make the system slower, and a RHP zero would result in undershoot in the system response.