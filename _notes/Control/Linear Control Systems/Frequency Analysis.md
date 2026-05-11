---
layout: note
title: "Frequency Analysis"
date: 2026-03-05
excerpt: "Frequency analysis studies how linear systems respond to sinusoidal inputs. The output is a sinusoidal signal with the same frequency, but altered amplitude and phase."
---

#Control #LinearControlSystems 

Frequency analysis is the part of the linear control systems course with which I've had the most problems in the past, but over time, I actually got to like it more than I expected.
To put simply, it can be shown, using partial fraction expansion, that when a sinusoid input is applied to a linear system, the output (in the steady-state) will also be a sinusoidal signal of the same frequency. The only thing that changes is the amplitude and the phase of the sinusoid signal. This change in amplitude and phase depends on the frequency of the input signal. 
To find the change in amplitude and phase we can simply use the transfer function of the system; however, a method that can be used on a real system is just applying inputs of different frequencies and observe the output.
One important thing to note here is that we are assuming that all the effects due to the system dynamics itself is going to die out eventually. Basically, we are assuming the system is stable. In the general case, we cannot expect to see a sinusoid output just because the input was a sinusoidal signal.
First, we can start with the definition of the Laplace transform;

$$
	\mathcal{L} \{ f(t) \} = \int_{- \infty}^{\infty} f(t) e^{-st} \text{d} t ,
$$

and the definition of Fourier transform of a signal:

$$
	\mathcal{F} \{ f(t) \} = \int_{- \infty}^{\infty} f(t) e^{- j \omega} \text{d} t
$$

We can see that for $\sigma = 0$ ($s = \sigma + j \omega$), we get the Fourier transform of a signal. Therefore, we can set $j \omega$ instead of $s$ in the transfer function of a system to analyze its frequency properties.
To analyze any system, it is sufficient to learn about four basic systems:
- Constant gain: 

	$$
		G(j \omega) = K
	$$

- Pole or zero at the origin: 

	$$
		G(j \omega) = \frac{1}{j \omega} \quad \text{or} \quad G(j \omega) = j \omega
	$$ 

- Real pole or zero: 

	$$
		G(j \omega) = \frac{1}{j \omega + 1} \quad \text{or} \quad G(j \omega) = j \omega + 1
	$$

- Complex conjugate poles or zeros

	$$
		G(j \omega) = \frac{\omega_n^2}{(j \omega)^2 + 2 \zeta (j \omega) + \omega_n^2}
	$$

One of the most basic and useful diagrams is the