---
layout: note
title: "Biasing the Transistor"
date: 2026-03-12
excerpt: "#Electronics"
---

#Electronics 
Now we want to finally use our transistor as an amplifier.
First thing we have to decide is how much current we would like to have in the collector. After choosing $I_C$, we use the relation below to determine the input:
$$
	I_C = I_s e^{\frac{V_{BE}}{V_T}} \Rightarrow e^{\frac{V_{BE}}{V_T}} = \frac{I_C}{I_s} \Rightarrow
	\frac{V_{BE}}{V_T} = \ln {\frac{I_C}{I_s}} \Rightarrow
	V_{BE} = V_T \ln {\frac{I_C}{I_s}} .
$$
We know $I_s$ from the datasheet of the transistor. By choosing a desired $I_C$, we get a $V_{BE}$. 
We might start by making the circuit below.
![400](/assets/Electronics/base voltage fix.jpg)
We are applying a DC + AC input to keep the transistor on. However, what ends up happening is this: as soon as the transistor is turned on, the current $I_C$ passes through $R_C$ and it generates heat and heats up the whole system. We saw in [Biased PN Junction](biased-pn-junction) that $I_S$ heavily depends on temperature. Therefore, the heating up of the circuit changes $I_s$ drastically, which in turn changes $I_C$. This leads to an even larger $I_C$ that heats up the whole circuit even more. This positive feedback loop does not allow us to use the transistor like this!
Therefore, it is important to remember that we _NEVER_ turn on a transistor by fixing $V_{BE}$.
The next solution that comes to mind is fixing the base current. We shall study this in [Fixing the Base Current](fixing-the-base-current).