---
layout: note
title: "Multi-Stage AC-Coupled Amplifiers"
date: 2026-03-26
excerpt: "Multi-stage AC-coupled amplifiers consist of multiple amplifiers cascaded to achieve higher gain. They can be designed with or without buffers to increase gain and input resistance."
---

#Electronics 

We have learned about single-stage ac-coupled amplifiers in the previous notes (you can find the order of the notes in [this note](/notes/Electronics/Basics of Electronics/)). Now we want to use more amplifiers cascaded with each other in order to get a larger gain.
Let's start with a single amplifier first. We use a common emitter structure.
![500](/assets/Electronics/common_emitter_structure.jpg)
It is important to note here that we do not need to design for maximum swing in the first stage. We can instead use a large $R_c$ to get a better gain at this stage. Therefore, we choose $V_E = 2 \text{V}$ which gives

$$
	R_E = 2 \text{k} \Omega, \quad V_B = 2.7 \text{V} , \quad R_1 = 2.3 \text{k} \Omega , \quad R_2 = 2.7 \text{k} \Omega .
$$

We have assumed $I_c = 1 \text{mA}$ and $\beta = 100$. 
The AC equivalent circuit looks like below.
![400](/assets/Electronics/common_emitter_structure_AC_shifted.jpg)
In the below of the figure, we have replaced the source and the two resistors with their Thevenin equivalent. We can now calculate the gain at this stage.

$$
	\frac{v_o}{v_s} = - \frac{2.5 \text{k}}{\frac{2.5 \text{k}}{100} + \frac{5.5 \text{k}}{100}} \approx -31  \Rightarrow \frac{v_o}{v_i} = - \frac{6}{11} \times 31 \approx -15 .
$$

For the second stage, we want to design for maximum swing. We choose to fix the base current in this stage as it lets more swing. It also has a much larger input resistance. Our two-stage amplifier looks something like this now:
![600](/assets/Electronics/multi_stage_ac_coupled_amplifiers_1.jpg)
We can select $R_B$ to be

$$
	R_B = \frac{V_cc - V_B}{I_B} = \frac{5 - 0.7}{0.01} = 430 \text{k} \Omega .
$$

Now we draw AC equivalent circuit.
![600](/assets/Electronics/multi_stage_ac_coupled_amplifiers_2.jpg)
Again, we replace the first part with its Thevenin equivalent and we note that the $2.5 \text{k} \Omega$ and the $430 \text{k} \Omega$ resistors are in parallel which gives an equivalent resistance of almost $2.5 \text{k} \Omega$. Therefore, we have
![400](/assets/Electronics/multi_stage_ac_coupled_amplifiers_3.jpg)
The input resistance of $Q_2$ is $r_{\pi_2} = 2.5 \text{k} \Omega$. Therefore, for out first stage we have:
![400](/assets/Electronics/multi_stage_ac_coupled_amplifiers_4.jpg)
We can now calculate the gain as

$$
	\frac{v_{o_1}}{v_s} = - \frac{2.5 \text{k} \parallel 2.5 \text{k}}{\frac{2.5 \text{k}}{100} + \frac{5.5 \text{k}}{100}} \Rightarrow 
	A_{v_1} = \frac{v_{o_1}}{v_i} \approx - 7.5 .
$$

The gain of the second stage is simply

$$
	A_{v_2} = - g_{m_2} R_c = - 40 \text{m} \mho \times 2.4 \text{k} \Omega = - 96 .
$$

Therefore, the total gain of the two-stage amplifier is

$$
	A_v = A_{v_1} \times A_{v_2} = (- 7.5) \times (- 98) = -720 .
$$

This is a good gain, but there are a few things we could do to get an even better gain. First one is that we could fix the base current instead of the collector current in the first stage. This would help because of the large input resistance which would hugely increase the $\frac{6}{11}$ fraction to near $1$. However, more important than that, we could use buffers. If we use a buffer right after the input (before the first stage) and one right after the first stage (before the second stage), we would get a much better result. Let's take a look at that case.
![700](/assets/Electronics/multi_stage_ac_coupled_amplifiers_buffered_1.jpg)
We draw the AC equivalent circuit.
![700](/assets/Electronics/multi_stage_ac_coupled_amplifiers_buffered_2.jpg)
We simplify the parallel resistors wherever we can (one is not shown in the image, but $3 \text{k} \Omega$ in parallel to $430 \text{k} \Omega$ is almost $3 \text{k} \Omega$ as well). Now we have the following:
![500](/assets/Electronics/multi_stage_ac_coupled_amplifiers_buffered_3.jpg)
We simplify starting from the final transistor. The final structure is a common emitter and the input resistance is $r_{\pi} = 2.5 \text{k} \Omega$. The transistor before that is a common collector whose input resistance is then $r_{\pi} + \beta ( 3 \text{k} \parallel 2.5 \text{k}) \approx 132.5 \text{k} \Omega$. The stage before that is a common emitter again with an input resistance of $r_{\pi} = 2.5 \text{k} \Omega$. The resistance in the emitter of the first transistor is then $3 \text{k} \parallel 2.5 \text{k} \approx 1.1 \text{k} \Omega$. We can now calculate the gain.

$$
	\begin{align}
		A_{v_1} &= \frac{R_E}{R_E + \frac{r_{\pi}}{\beta} + \frac{R_s}{\beta}} = 
		\frac{1.1 \text{k}}{1.1 \text{k} + \frac{2.5 \text{k}}{100} + \frac{10 \text{k}}{100}} = 
		\frac{1.1}{1.1 + 0.025 + 0.1} = \frac{1.1}{1.225} \approx 0.9
		\\
		A_{v_2} &= - g_{m_2} \times ( R_{c_2} \parallel 132.5 \text{k} ) \approx - 40 \text{m} \mho \times 2.5 \text{k} \Omega =
		- 100 
		\\
		A_{v-3} &= \frac{3 \text{k} \parallel 2.5 \text{k}}{3 \text{k} \parallel 2.5 \text{k} + \frac{r_{\pi}}{\beta}} \approx \frac{1.3 \text{k}}{1.3 \text{k} + \frac{2.5 \text{k}}{100}} = \frac{1.3}{1.325} \approx 1
		\\
		A_{v_4} &= - g_{m_4} R_{c_4} = 40 \text{m} \mho \times 2.4 \text{k} \Omega = 
		- 96
		\\
		A_v &= A_{v_1} \cdot A_{v_2} \cdot A_{v_3} \cdot A_{v_4} =
		(0.9) (-100) (1) (-96) = -8640 
	\end{align}
	
$$

It is obvious that we have achieved a far larger gain by using buffers.

Continue with learning about the CASCODE structure [here](/notes/Electronics/CASCODE Structure/).