---
layout: note
title: "Common Base Structure"
date: 2026-03-26
excerpt: "#Electronics"
---

#Electronics 
In this note, we are going to learn about the common base structure. The AC equivalent circuit of this structure looks like this:
![500](/assets/Electronics/common_base_AC_equivalent.jpg)
The input goes into the emitter and the output is on the collector side. The intrinsic gain is the gain when $R_s = 0$. We can easily realize that the intrinsic gain is $g_m R_c$,, because the structure would be no different from the structure of a common emitter (imagine their hybrid pi models). The only difference is that this time, the gain is positive, meaning the circuit is non-inverting. Now how do we bias this structure?
![350](/assets/Electronics/common_base_bias_circuit.jpg)
The base voltage is fixed at a value $V_b$. The resistor $R_E$ is calculated such that it allows for the emitter (collector) current we desire.
_Note_: I think I might have missed something here. Because $R_E$ does appear in the bias circuit but not in the AC equivalent circuit, I guess there might have been a capacitor in parallel with $R_E$!
Let's calculate the gain of this structure. We use the hybrid pi model.
![400](/assets/Electronics/common_base_hybrid_pi.jpg)
A simple _KCL_ gives us
$$
	g_m v_{\pi} + \frac{v_{\pi}}{r_{\pi}} + \frac{v_i - (- v_{\pi})}{R_s} = 0 \Rightarrow
	v_{\pi} = - \frac{v_i \frac{1}{R_s}}{g_m + \frac{1}{r_{\pi}} + \farc{1}{R_s}} = 
	- \frac{v_i}{1 + g_m R_s + \frac{R_s}{r_{\pi}}} ,
$$
and we have
$$
	v_o = - g_m v_{\pi} R_c = \frac{v_i g_m R_c}{1 + g_m R_s + \frac{R_s}{r_{\pi}}} \Rightarrow
	A_v = \frac{v_o}{v_I} = \frac{R_c}{\frac{1}{g_m} + R_s + \frac{R_s}{\beta}} = 
	\frac{R_c}{r_m + R_s \underbrace{(1 + \frac{1}{\beta})}_{\approx 1}} = 
	\frac{R_c}{r_m + R_s} .
$$
We can see that $R_s$ has a very significant role in the gain. It actually drops the gain quite much!
Although we managed to solve for the gain using the _hybrid pi model_ we always used, it is actually better if we derive a second _equivalent_ hybrid pi model for the common base structure.
We start with our standard model.
![350](/assets/Electronics/common_base_new_hybrid_pi_1.jpg)
Next, we remove the current source from its place. Not to disturb the _KVL_ and _KCL_ equations, we replace it with two current sources as shown in the figure below.
![400](/assets/Electronics/common_base_new_hybrid_pi_2.jpg)
Now we note that the left current source is actually a current source whose current depends on the potential difference of its own two terminals. This is therefore simply a resistor.
![400](/assets/Electronics/common_base_new_hybrid_pi_3.jpg)
Now we just factorize the two resistors on the left to one resistor $r_e$:
$$
	r_e = r_{\pi} \parallel \frac{1}{g_m} = r_{\pi} \parallel r_m = 
	\beta r_m \parallel r_m = \alpha r_m \approx r_m .
$$
Therefore, the new hybrid pi model looks like this:
![500](/assets/Electronics/common_base_new_hybrid_pi_4.jpg)
We can see that
$$
	v_o = - g_m v R_c , \quad v = - \frac{r_e}{r_e + R_s} v_i \Rightarrow
	v_o = \frac{\overbrace{g_m r_e}^{\approx 1} R_c}{r_e + R_s} v_i =
	\frac{R_c}{r_e + R_s} v_i .
$$
Now let's calculate the output resistance of the common base structure,
![150](/assets/Electronics/common_base_output_resistance_1.jpg)
We use the standard hybrid pi model for this.
![500](/assets/Electronics/common_base_output_resistance_2.jpg)
We have
$$
	v_o = - i \frac{R_s r_{\pi}}{R_s + r_{\pi}} .
$$
Now we write _KVL_ and use the relation above:
$$
	- v + r_o (i - g_m v_{\pi}) - VV_{\pi} = 0 \Rightarrow
	v = r_o i - v_{\pi} (g_m r_o + 1) \Rightarrow
	v = r_o i + i \frac{R_s r_{\pi}}{R_s + r_{\pi}} (\underbrace{g_m r_o}_{>> 1} + 1) .
$$
Note that
$$
	g_m r_o = \frac{I_c}{V_T} \frac{V_A}{I_c} = \frac{V_A}{V_T} ,
$$
and because $V_A$ is usually in the order of $10 - 120 \text{V}$ and $V_T = 25 \text{mV}$, this fraction is definitely always much larger than $1$. Therefore, we get
$$
	R_o = \frac{v}{i} = r_o [ \frac{R_s + r_{\pi} + g_m R_s r_{\pi}}{R_s + r_{\pi}} ] = r_o [ \frac{\frac{R_S}{r_{\pi}} + 1 + g_m R_s}{\frac{R_s}{r_{\pi}} + 1} ] \approx
	r_o [ \frac{1 + g_m R_s}{1 + g_m \frac{R_s}{\beta}} ] .
$$
Finally, we know that the output resistance of the common base structure is
$$
	R_{out} = R_o \parallel R_c \approx R_c .
$$

Continue [here](multi-stage-ac-coupled-amplifiers) to learn about multi-stage amplifiers.