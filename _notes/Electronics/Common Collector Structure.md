---
layout: note
title: "Common Collector Structure"
date: 2026-03-25
excerpt: "The common collector structure has a gain close to 1 and high input resistance."
---

#Electronics 

Until now, we have mostly seen structures in which there is a resistor in the collector side of the resistor ($R_C$), the emitter is connected to the ground node, and the output of the system is taken from the collector node as well. We have seen how to bias (and turn on) the transistor by either fixing the base current (in [here](/notes/Electronics/Fixing the Base Current/)) or fixing the collector current (in [here](/notes/Electronics/Fixing the Collector Current/)). This structure is known as _common emitter_. In this note, we are going to look at structures in which the collector is just connected to $V_{cc}$ and there is a resistor in the emitter instead. The output is also taken from the emitter node. This structure is known as _common collector_.
Again, we can use the two strategies of fixing the base current or the collector current in this structure as well.
Let's first fix the base current. We consider typical values of $I_C = 1 \text{mA}$, $\beta = 100$ and $V_{cc} = 5 \text{V}$. 
![350](/assets/Electronics/common collector-base current fix.jpg)
Let's go for $V_E = 2.5 \text{V}$ to get an almost maximum swing.

$$
	R_E = \frac{V_E}{I_E} = \frac{2.5}{1} = 2.5 \text{k} \Omega , 
	V_B = V_E + 0.7 = 3.2
$$

$$
	R_B = \frac{V_{cc} - V_B}{I_B} = \frac{5 - 3.2}{0.01} = \frac{1.8}{0.01} = 180 \text{k} \Omega
$$

Now let's design a common collector structure by fixing the collector current this time.
![400](/assets/Electronics/common collector-collector current fix.jpg)
We go with the same $V_E = 2.5 \text{V}$, which gives $V_B = 3.2 \text{V}$. The only difference that this time instead of calculating $R_B$, we have to select $R_1$ and $R_2$. We select $R_1 + R_2 = 50 \text{k} \Omega$ to ensure their current is significantly larger than the current of the base. To get $V_B = 3.2 \text{V}$, we choose

$$
	R_1 = 18 \text{k} \Omega, R_2 = 32 \text{k} \Omega .
$$

Let's take a look at the AC equivalent circuit of these two structures:
![400](/assets/Electronics/common collector-AC equivalent.jpg)
In this figure, $R'$ can represent either $R_B$ or $R_1 \parallel R_2$ . Either way we assume we can ignore it or that we consider the Thevenin equivalent of $R'$ and $R_s$ instead of $R_s$. Therefore, we get the following _hybrid pi_ model:
![500](/assets/Electronics/common collector-four element model.jpg)
Also, if we want to consider the transistor's output resistance $r_o$, we know that it is parallel with $R_E$ and we can modify $R_E$ in the figure above to consider that as well.
The current that passes through $R_s$ and $r_{\pi}$ is $\frac{v_{\pi}}{r_{\pi}}$. The current passing through $R_E$ is $\frac{v_{\pi}}{r_{\pi}} + g_m v_{\pi}$. We write the _KVL_ starting at $v_i$ and going through $R_s$ and $r_{\pi}$ and finally $R_E$:

$$
	- v_i + R_s \frac{v_{\pi}}{r_{\pi}} + r_{\pi} \frac{v_{\pi}}{r_{\pi}} + v_o = 0 . 
$$

We now use the relation below to get $v_{\pi}$:

$$
	v_o = R_E (\frac{v_{\pi}}{r_{\pi}} + g_m v_{\pi}) \Rightarrow
	v_{\pi} = \frac{v_o}{R_E (\frac{1}{r_{\pi}} + g_m)} .
$$

We use this relation to simplify our KVL:

$$
	\begin{align}
		- v_i + (\frac{R_s}{r_{\pi}} + 1) (\frac{v_o}{R_E (\frac{1}{r_{\pi}} + g_m)}) + v_o = 0 \Rightarrow
		v_o (1 + \frac{R_s + r_{\pi}}{R_E (\underbrace{g_m r_{\pi}}_{\beta} + 1)}) = v_i \Rightarrow \\
		\frac{v_o}{v_i} = \frac{R_E (\beta + 1)}{R_s + r_{\pi} + R_E (\beta + 1)} \Rightarrow
		A_v = \frac{v_o}{v_i} = \frac{R_E}{\frac{R_s + r_{\pi}}{\beta} + R_E} .
	\end{align}
$$

Therefore, if we have

$$
	R_E >> \frac{R_s}{\beta} + \underbrace{\frac{r_{\pi}}{\beta}}_{r_m} ,
$$

we can expect $A_v \approx 1$.
This is an advantage of the common collector structure compared to common emitter structures. The gain is almost constant. The only thing varying in this gain is $r_m$, which does change when $I_C$ changes, but $r_m$ is itself really small compared to $R_E$. This means that the gain does not change much and the system acts fairly linearly.
In a common emitter structure on the other hand, gain is calculated from $g_m R_C$, and $g_m$ changes with varying input. This makes the system's behavior nonlinear, especially compared to common collector structures.
The small gain condition for this structure is $g_m R_E >> 1$ or $R_E >> \frac{1}{g_m}$. 
Now let's calculate the input and output resistance in this structure.
![200](/assets/Electronics/common_collector_input_resistance_1.jpg)
By deriving the relation between $v$ and $i$, we can calculate the input resistance. For that, we plot the hybrid pi model.
![500](/assets/Electronics/common_collector_input_resistance_2.jpg)
We write _KVL_ again.

$$
	- v + i r_{\pi} + R_E ( i + g_m v_{\pi} i ) \Rightarrow 
	\frac{v}{i} = r_{\pi} + R_E ( 1 + g_m r_{\pi} ) = 
	r_{\pi} + R_E + \underbrace{g_m r_{\pi}}_{\beta} R_E =
	r_{\pi} + \underbrace{(\beta + 1)}_{\approx \beta} R_E = 
	\beta R_E + r_{\pi} 
$$

Let's see a typical common collector structure now and calculate its input resistance.
![300](/assets/Electronics/common_collector_input_resistance_3.jpg)
We use for example $R_1 = 14.4 \text{k} \Omega$ and $R_2 = 25.6 \text{k} \Omega$. The AC equivalent circuit is given below.
![400](/assets/Electronics/common_collector_input_resistance_4.jpg)
The $252.5 \text{k} \Omega$ resistor is the $\beta R_E + r_{\pi} = 100 (2.5 \text{k}) + 2.5 \text{k}$ that we just calculated. We can see that the input resistance, which is what the source would see is actually $252.5 \text{k} \Omega$ in parallel with $25.6 \parallel 14.4 \approx 10 \text{k} \Omega$. This is bad, because the resulting input resistance would actually be very small. Small input resistance is not desirable. Consider, for example, an input source that has a large resistance itself (this is often the case). If we have a load that has a small resistance, like the figure below, most of the voltage is actually devoted to $R_s$ and not on the load.
![250](/assets/Electronics/source_loading_no_buffer.jpg)
If we could instead use a common collector structure and _buffer_ the load, we could make the source see a much larger resistance instead. Larger resistance means more voltage dedicated to the load and also less current drawn from the source. The good thing about this is that we already saw that the common collector structure has a gain close to $1$, so the load _sees_ the voltage it wanted to see anyway!
To ensure a larger input resistance, we can fix the base current instead of the collector current. 
![300](/assets/Electronics/common_collector_fixed_base_current.jpg)
We can choose

$$
	R_B = \frac{5 - 3.2}{0.01} = 180 \text{k} \Omega .
$$

This resistance in parallel with the $252.5 \text{k} \Omega$ input resistance of the transistor is actually a good large resistance.
Now let's calculate the output resistance of the common collector structure. We turn off the input source and put a voltage source in the output and calculate the current that is drawn. 
![300](/assets/Electronics/common_collector_output_resistance_1.jpg)
We can see that the output resistance is $r_o \parallel R_E$, so we just have to calculate $r_o$. For that, we put the voltage source like this
![250](/assets/Electronics/common_collector_output_resistance_2.jpg)
Again, we use the hybrid pi model to calculate the resistance.
![400](/assets/Electronics/common_collector_output_resistance_3.jpg)
We write _KVL_ starting from $R_s$ and going through $r_{\pi}$ and finally the voltage source:

$$
	\frac{v_{\pi}}{r_{\pi}} R_s + v_{\pi} + v = 0 \Rightarrow
	v_{\pi} = - \frac{v}{1 + \frac{R_s}{r_{\pi}}} .
$$

Now we write _KCL_:

$$
	\frac{v_{\pi}}{r_{\pi}} + g_m v_{\pi} + i = 0 \Rightarrow
	( \frac{1}{r_{\pi}} + g_m ) ( - \frac{v}{1 + \frac{R_s}{r_{\pi}}} ) = - i \Rightarrow
	\frac{v}{i} = \frac{1 + \frac{R_s}{r_{\pi}}}{\frac{1}{r_{\pi}} + g_m} = 
	\frac{r_{\pi} + R_s}{\underbrace{1 + \underbrace{g_m r_{\pi}}_{\beta}}_{\approx \beta}}
$$

At the end, we should note that an _ideal buffer_ would have a _gain of exactly $1$_, _infinite input resistance_ and _zero output resistance_. While the common collector structure does not meet any of these conditions exactly, it does come close. Its gain is almost $1$. Its input resistance can be large and its output resistance is really small. All of these point to the conclusion that the common collector structure is a really good buffer. That is in fact true and the common collector is often used as a buffer in electronic circuits.

Continue with learning about the common base structure [here](/notes/Electronics/Common Base Structure/).