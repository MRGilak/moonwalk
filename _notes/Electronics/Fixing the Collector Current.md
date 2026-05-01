---
layout: note
title: "Fixing the Collector Current"
date: 2026-03-13
excerpt: "#Electronics"
---

#Electronics 
We learned a method to bias and turn on our transistor in [Fixing the Base Current](fixing-the-base-current). The problem with that method is that it is very device-dependent. Basically, if we change our device, its $\beta$ changes and therefore fixing $I_B$ does not lead to the same $I_C$ for every device. This means that the method is not _repeatable_. Different transistors of the same model might have different $\beta$s (in a range). In this note, we want to learn another useful method to bias the transistor that is less device-dependent.
Instead of fixing the base current, we would like to fix the collector current itself. Because we have $I_C \approx I_E$, we can fix the emitter current instead. If we place a resistor in the emitter, fixing the emitter current is equivalent to fixing the emitter voltage. Assuming a $V_{BE_{on}}$ for the device, we fix the base voltage $V_B$ instead. Note that this is different than the solution we rejected [here](biasing-the-transistor). Here, we are not fixing $V_{BE}$, but $V_B$ instead.
We can write
$$
	I_C \approx I_E = \frac{V_E}{R_E} = \frac{V_B - V_{BE_{on}}}{R_E} .
$$
Assuming $V_{BE_{on}} = 0.7 \text{V}$, $I_C = 1 \text{mA}$, and $V_{B} = 5 \text{V}$ we get
$$
	R_E = \frac{V_B - V_{BE_{on}}}{I_C} = \frac{5 - 0.7}{1} = 4.3 \text{k}\Omega .
$$
Now let's assume that $V_{BE_{on}}$ isn't indeed $0.7$, but $0.6$ instead. Then we get
$$
	I_c = \frac{V_B - V_{BE_{on}}}{R_E} - \frac{5 - 0.6}{4.3} = \frac{4.4}{4.3} \approx 1.02 \text{mA} , 
$$
which means that this configuration isn't much sensitive to changes in $I_s$, which is good. Also, we have not used $\beta$ anywhere, so this should be device-independent enough.
It is usually the case that we do not have a separate voltage source to keep $V_B$ where it needs to be. Therefore, we would like to use resistors to achieve the same effect with the one voltage source available in the system. This is an easy task. We just use the circuit below
![200](/assets/Electronics/collector current fix-base resistors.jpg)
But actually, the full system looks like this now:
![200](/assets/Electronics/collector current fix.jpg)
But we can see that $I_B$ is drawn from $I'$, which makes $V_B$ dependent on the device again (we have fixed the collector current $I_C$ and the base current $I_B$ depends on $\beta$ and $I_C$). This is undesirable. Therefore, we choose $R_1$ and $R_2$ in a way to ensure that $I_B$ is negligible compared to $I'$, for example $10$ times less. If we want to make $I_B$ even more negligible compared to $I'$, we need to have a larger current $I'$, which means more power consumed in $R_1$ and $R_2$. This is yet another trade-off in designing amplifiers (the other one we saw was gain vs. swing).
Let's say we have $V_{cc} = 10 \text{V}$ and we want $V_B = 5V$. Then with $V_{BE_{on}} = 0.7$ we have $V_E = 4.3 \text{V}$, $R_E = 4.3 \text{k} \Omega$, and $I_C = 1 \text{mA}$  as we showed before. Here is what our system looks like now:
![400](/assets/Electronics/collector current fix-before bypass capacitor.jpg)
Now let's take a look at the equivalent AC circuit:
![500](/assets/Electronics/collector current fix-AC.jpg)
We have chosen $R_1 = R_2 = 50 \text{k} \Omega$ to ensure $V_B = 5 \text{V}. The current passing through $R_1$ and $R_2$ is
$$
	I' = \frac{V_CC}{R_1 + R_2} = \frac{10}{100} = 0.1 \text{mA} .
$$
The base current is
$$
	I_B = \frac{I_c}{\beta} = \frac{1}{100} = 0.01 \text{mA} .
$$
Therefore, $I_B$ is indeed negligible compared to $I'$.
We can also take a look at the small signal model of our transistor:
![600](/assets/Electronics/collector current fix-small signal.jpg)
We replace the left part with the _Thevenen_ equivalent. We have assumed $R_s = 25 \text{k}\Omega$ in this problem whose effect can be neglected compared to the $1 \text{k}\Omega$ resistor (both in $V_{in}$ and in the equivalent resistor). The gain of our system is
$$
	A_v = - \frac{R_c}{R_E + \frac{r_{\pi}}{\beta} + \frac{R_s}{\beta}} .
$$
We can see that $R_E = 4.3 \text{k} \Omega$ really decreases the gain! This is because the resistor in the emitter draws a considerable portion of $v_{in}$ ($v_{in}$ has to split three ways among $R_s$, $r_{\pi}$ and $R_E$).
The solution lies in using another capacitor, called a _bypass_ capacitor. By putting such a capacitor in parallel with $R_E$, we basically short-circuit $R_E$ in AC mode and achieve a decent gain. The final circuit looks like this:
![500](/assets/Electronics/collector current fix-bypass capacitor.jpg)
With the same $\beta = 100$, $I_C = 1 \text{mA}$, $V_{BE_{on}} = 0.7$ and $V_{cc} = 5 \text{V}$, we explore several options:
- $V_E = 0.1 \text{V}$:
	$$
		R_E = 0.1 \text{k} \Omega , \quad  V_B = 0.1 + 0.7 = 0.8
	$$
	We are going with $R_1 + R_2 = 50 \text{k} \Omega$ in all cases to ensure that the current passing through them ($\frac{5 \text{V}}{50 \text{k} \Omega} = 0.1 \text{mA}$) is significantly more than that of the base ($I_B = \frac{I_C}{\beta} = \frac{1}{100} = 0.01 \text{mA}$).
	$$
		R_1 = 42 \text{k} \Omega , R_2 = 8 \text{k} \Omega
	$$
	Now what happens if $V_{BE_{on}}$ were actually $0.6 \text{V}$? Then we would have
	$$
		V_E = V_B - 0.6 = 0.8 - 0.6 = 0.2 \text{V} \Rightarrow I_C \approx I_E = \frac{V_E}{R_E} = \frac{0.2}{0.1} = 2 \text{mA}
	$$
	This is a $100$ % error compared to the $1 \text{mA}$ that we wanted. Therefore, maybe we shouldn't take $V_E$ to be so low. Note that this happened because $V_B$ itself is $0.8 \text{V}$ and a $0.1 \text{V}$ change in the value of $V_{BE_{on}}$ is indeed noticeable. 
- $V_E = 4 \text{V}$:
	 $$
		R_E = 4 \text{k} \Omega , \quad  V_B = 4 + 0.7 = 4.7
	$$
	Now if $V_{BE_{on}} = 0.6 \text{V}$, what happens?
	$$
		V_E = V_B - V_{BE_{on}} = 4.7 - 0.6 = 4.1 \text{V} \Rightarrow I_C \approx I_E = \frac{V_E}{R_E} = \frac{4.1}{4} = 1.025 \text{mA}
	$$
	But note that swing is very limited in this case. Because $V_{CE}$ cannot be less than $0.2 \text{V}$ (not to enter the saturation region) and we have $V_E = 4 \text{V}$, $V_C \geq 4.2 \text{V}$. We also know that $V_C < V_{cc} = 5 \text{V}$. This means that the allowable region for the output is $4.2-5 \text{V}$, which gives us only a $0.8 \text{V}$ peak-to-peak swing.
	This indicates that maybe we shouldn't select $V_E$ to be so large.
	All of these hint to a trade-off of _swing_ and _sensitivity_.
- $V_E = 1.5 \text{V}$: 
	Now we go with a moderate value for $V_E$.
	$$
		V_B = 2.2 \text{V} , \quad R_E = 1.5 \text{k} \Omega , \quad
		R_1 = 28 \text{k} \Omega , \quad R_2 = 22 \text{k} \Omega
	$$
	Now if we have $V_{BE_{on}} = 0.6 \text{V}$, we'll get
	$$
		V_E = V_B - V_{BE_{on}} = 2.2 - 0.6 = 1.6 \text{V} \Rightarrow
		I_c \approx I_E = \frac{1.6}{1.5} \approx 1.06 \text{mA} .
	$$
	We also have a swing interval of $1.7 - 5 \text{V}$, which is good.
Now how do we choose $R_C$? We know that $R_C$ experiences a $I_C = 1 \text{mA}$ current going through it. Therefore, we can't take $R_C = 100 \text{k} \Omega$ for example, because that would mean a $100 \text{V}$ voltage drop on $R_C$, which would push the transistor to saturation. Here, we again see a trade-off between _swing_ and _gain_.
Let's take $R_C = 3 \text{k} \Omega$ for example. 
![600](/assets/Electronics/collector current fix-example.jpg)
We can now calculate the gain of this system:
$$
	\frac{V_o}{V_s} = - \frac{3}{\frac{R_s}{\beta} + \frac{r_{\pi}}{\beta}} =
	- \frac{3}{\frac{0.8}{100} + \frac{2.5}{100}} \approx - 91 .
$$
And the gain from input to output is
$$
	\frac{V_o}{V_i} = \frac{v_o}{V_s} \times \frac{V_s}{V_i} \approx -91 \times 0.92 \approx - 83.7 .
$$
It is also useful to take a look at the input and output resistor of this system. The input resistor (the resistance seen from the input source) is
$$
	R_{in} = (R_1 \parallel R_2) \parallel r_{\pi} = 12.32 \parallel 2.5 \approx 2.1 \text{k} \Omega ,
$$
and the output resistor is
$$
	R_{out} = R_C \parallel r_o = 3 \text{k} \Omega \parallel 100 \text{k} \Omega \approx 3 \text{k} \Omega .
$$

Continue learning about electronics [here](common-collector-structure).