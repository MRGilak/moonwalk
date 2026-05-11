---
layout: note
title: "Root Locus"
date: 2026-03-03
excerpt: "The root locus method describes the behavior of polynomial roots when a coefficient is changed continuously. It is used in control theory to analyze closed-loop system stability."
---

#Control #LinearControlSystems 

In this note, I am going to explain the root locus method. I personally love the root locus method and I think it's one of the most beautiful techniques of linear control theory. The method itself isn't specific to control theory though; it describes the behavior of the roots of a polynomial when one of its coefficients is changed continuously. I will try to add some examples at the end and go through them to deepen the understanding.
First, we write the closed-loop system in the root locus form:

$$
	1 + K \frac{b(s)}{a(s)} = 0.
$$

In control theory we are usually interested in finding where the close-loop poles go when we change a design parameter; however, $K$ doesn't necessarily have to be a controller parameter and all that matters is writing the system in the form above.
The two cases of $K > 0$ and $K < 0$ are investigated separately, but are very similar. Let's start with the $K > 0$ case. Looking at the root locus form, we know that $\frac{b(s)}{a(s)}$ has to be negative for the equality to hold. This means that the phase of this fraction, has to be $180 \degree$. This is called the _phase condition_:

$$
	\angle \frac{b(s)}{a(s)} = 180 \degree + l 360 \degree,
$$

where $l$ can take any value.
Another condition is the _magnitude condition_, which states

$$
	| K | = \frac{1}{| \frac{b(s)}{a(s)} |} .
$$

Now we follow the steps below to sketch the root locus diagram ($n$ is the order of $a(s)$ and $m$ is the order of $b(s)$):
1. First, mark the open-loop poles with $\times$ and open-loop zeros with o. The loci depart from open-loop poles and arrive at open-loop zeros.
2. The part of the real axis that lies to the left of an odd number of poles and zeros is part of the loci.
3. We have to draw $n - m$ asymptotes. These asymptotes meet on the real line at

	$$
		\sigma = \frac{\sum p_i - \sum z_i}{n - m},
	$$

	and their angles are

	$$
		\phi_l = \frac{180 \degree + (l - 1) 360 \degree}{n - m}, \quad l = 1, 2, \cdots, n-m .
	$$

4. Departure angles from poles and arrival angles to the zeros are

	$$
		\begin{align}
			q \phi_{dep} = \sum \psi_i - \sum \phi_i - 180 \degree - l 360 \degree , \\
			q \psi_{arr} = \sum \phi_i - \sum \psi_i + 180 \degree + l 360 \degree ,
		\end{align}
	$$

	where $\psi_i$ is the angle of the line going from the $i_{th}$ pole to the pole or zero whose angle of departure or arrival we're computing. Similarly, $\phi_i$ is the angle from the $i_{th}$ zero.
5.  The points at which the imaginary axis is crossed can be calculated using the Ruth-Hurwitz table.
For the case of $K < 0$, we know that $\frac{b(s)}{a(s)}$ has to be positive, so the phase condition in this case would be that the phase of $\frac{b(s)}{a(s)}$ has to be $0 \degree$. This means everywhere we see $10 \degree$ in steps 3 and 4, we have to change them to $0 \degree$ as well. Also, in step 2, the part of the real axis that belongs to the loci is the part to the left of an even number of poles and zeros. 
Now, let's take a look at an example. Let's consider $C(s) G(s) = \frac{(s + 1) (s + 7)}{s (s + 2) (s + 5) (s + 10)^2}$ (I totally made this up myself).
We know that the part of the real axis between $-1$ and $0$ belongs to the loci, so the pole at the origin and the zero at $-1$ are already dealt with. We can also figure that the loci from the poles at $-2$ and $-5$ have to meet and somewhere along the line they have to break out of the real line. Also, for the two poles at $-10$, we know that one of them can go to the zero at $-7$ and the other to infinity (because the part to the left of these poles is indeed part of the loci). Without doing much analysis, we have dealt with most of the problem. Even one of the asymptotes were dealt with (the one starting at the pole at $-10$ and going to $- \infty$). Because $n - m = 3$, we must have three asymptotes and the other two are going to be $+ 60 \degree$ and $- 60 \degree$ according to step 3. That concludes the root locus, because we know exactly which two poles are going to converge to these asymptotes (the ones at $-2$ and $-5$). 
The root locus has also been plotted using MATLAB. The result is shown below.
![600](/assets/Control/Linear Control Systems/root_locus.jpg)

To read more about linear control systems, take a look at [Frequency Analysis](/notes/Control/Linear Control Systems/Frequency Analysis/) or [Steady-state Behavior of Linear Systems](/notes/Control/Linear Control Systems/Steady-state Behavior of Linear Systems/).