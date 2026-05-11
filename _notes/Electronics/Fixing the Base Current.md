---
layout: note
title: "Fixing the Base Current"
date: 2026-03-12
excerpt: "The base current can be fixed using a resistor. A non-ideal voltage source is modeled with a source resistor."
---

#Electronics 

So we concluded that we cannot fix the base-emitter voltage $V_{BE}$. Now consider the circuit below.
![300](/assets/Electronics/base current fix-1.jpg)
Assume the emitter is connected to the ground node. We want to have a collector current of let's say $I_C = 1 \text{mA}$. Also, let's assume a typical value of $100$ for the transistor's $\beta$. Therefore, the desired base current is $I_B = 0.01 \text{mA}$. By assuming $V_{BE_{on}} = 0.7$ we derive

$$
	R_B = \frac{V}{I} = \frac{V_{cc} - V_{BE_{on}}}{I_B} = \frac{5 - 0.7}{0.01} = 430 \text{k}\Omega
$$

This does give us $I_B = 0.01 \text{mA}$ and $I_C = 1 \text{mA}$ that we wanted, but what happens if $V_{BE_{on}} \neq 0.7$? This could be because of heating up of the circuit or any other reason. Then we'll have

$$
	I_B = \frac{5 - 0.6}{430} = \frac{4.4}{430} \Rightarrow
	I_C = \underbrace{100}_{\beta} \frac{4.4}{430} \approx 1.02 \text{mA} .
$$

We can see that this is only a $2$ % deviation from what we wanted, which is very much acceptable. 
We can now place a $R_C$ in the circuit and use our amplifier, but it is important to note that in order not to enter the saturation region, we should have $V_{CE} > 0.2$.
Now how do we apply the input to our circuit? If we just add an AC signal to the base, that would change $I_B$ and everything else! Here, we use a capacitor.
![300](/assets/Electronics/base current fix-2.jpg)
We know that in high frequencies, the capacitor acts as a _short circuit_, and it will be like there wasn't even anything there. We just have to choose the capacitor to be very large so that it doesn't act as a filter on our input.
Here, we get to know a very useful method to analyze our transistors and that is by plotting the _equivalent AC circuit_. This means that in this new figure, we only care about AC signals. Any signal that is fixed and does not change, does not have an AC part and thus will be represented as zero. Also, our capacitor acts as a short circuit in this AC equivalent circuit. The AC equivalent of the circuit above is shown below:
![300](/assets/Electronics/base current fix-AC equivalent.jpg)
It can be seen that now the input is directly applied to the system. 
What happens if we increase $v_{in}$? Increasing $v_{in}$ means increasing $V_{BE}$, because the emitter is connected to the ground. Increasing $V_{BE}$ increases $I_C$ and thus the voltage drop $R_C I_C$ increases. This reduces the output, because $v_o = V_{cc} - R_C I_C$. Therefore, the gain of this system is negative.
To calculate the gain of the system we can use its four-element model introduced [here](/notes/Electronics/Four-Element Model of a Transistor/). 
![600](/assets/Electronics/base current fix-four element model.jpg)
Note that because $R_B = 430 \text{k} \Omega$ is very large compared to $r_{\pi}$, we can approximately negect it in this model. We have

$$
	v_o = - g_m v_{\pi} R_C , \quad v_{\pi} = v_{in} \Rightarrow A_v = \frac{v_o}{v_{in}} = - g_m R_C 
$$

For typical values of $I_C = 1 \text{mA}$, $\beta = 100$, $g_m = 40 \text{m} \mho$, $R_C = 4 \text{k} \Omega$, we get $A_v = -160$. This is called the _intrinsic gain_ of this system and it is the highest possible gain we can get from it.
An important thing to note here is that the output cannot freely take any value. We know that $v_o$ cannot be higher than $V_{cc}$, because that's just what we get for $I_C = 0$. Also, $v_o$ cannot be less than $0.2 \text{V}$, because then the transistor would enter its saturation region. Therefore, the maximum peak-to-peak gain we can have in the output is $V_{cc} - 0.2$. We should consider this if we want to design for _maximum swing_. However, it should be noted that designing for maximum swing means sacrificing gain (because we would have to decrease $R_C$ to get the maximum swing). This is a trade-off that we shall see more of in the future.

# Source Resistor
In reality, the source itself isn't ideal. This can be modeled with a resistor in series with the input voltage source, called $R_s$. Considering this resistor, the AC equivalent circuit is shown below:
![300](/assets/Electronics/fix base current-source resistor-AC equivalent.jpg)
Also, the four-element model of the system is shown below:
![base current fix-source resistor-four element model.jpg](/assets/Electronics/base current fix-source resistor-four element model.jpg)
We can see that this time, $v_{\pi} \neq v_{in}$, but

$$
	v_{\pi} = \frac{r_{\pi}}{r_{\pi} + R_s} v_{in} \Rightarrow
	A_v = - \frac{R_c}{R_s + r_{\pi}} \underbrace{g_m r_{\pi}}_{\beta} = 
	- \frac{R_c}{\frac{R_s}{\beta} + \frac{r_{\pi}}{\beta}} =  
	- \frac{R_c}{\frac{R_s}{\beta} + r_m} .
$$

This is a formula we would like to remember, because we will encounter it later again. It can be summarized as

$$
	\text{gain} = - \frac{\text{resistors in the collector}}{\text{resistors in the emitter loop}} ,
$$

where the emitter loop is the loop starting from the emitter, going into the base, and then to the input source.

Continue learning about electronics [here](/notes/Electronics/Fixing the Collector Current/).