---
layout: note
title: "Four-Element Model of a Transistor"
date: 2026-03-12
excerpt: "A transistor can be modeled using four key elements: transconductance, input resistance, output resistance, and feedback resistance."
---

#Electronics 

We would like to have a simple four-element model of our transistor as well. This model can be used to simplify and give intuition to our analysis.
We saw the first element of this model, which was the transconductance.
![four-element-model-1st.jpg](/assets/Electronics/four-element-model-1st.jpg)
The next element we would like to model is the input resistance.
![400](/assets/Electronics/four-element-model-2nd.jpg)
Note that $v_{\pi}$ shows the _AC_ part of $V_{BE}$ or the _input_ to our system. We can write

$$
	\frac{1}{r_{\pi}} = \frac{\text{d} I_B}{\text{d} V_{BE}} = \frac{\text{d} \frac{I_C}{\beta}}{\text{d} V_{BE}} =
	 \frac{1}{\beta} \frac{\text{d} I_C}{\text{d} V_{BE}} =
	 \frac{1}{\beta} g_m \Rightarrow
	 r_{\pi} = \beta \frac{1}{g_m} .
$$

Because this will be used later as well, we define

$$
	r_m = \frac{1}{g_m} .
$$

Now we have

$$
	r_{\pi} = \beta r_m .
$$

The next step is to calculate the output resistance $r_o$.
![400](/assets/Electronics/four-element model.jpg)
To calculate $r_o$, we apply zero input ($v_{\pi} = 0$) and apply a voltage to the output. This means that we add an AC part to $V_{CE}$ (For now, ignore $r_{\mu}$ in the figure above). We have

$$
	I_C = I_s e^{\frac{V_{BE}}{V_T}} (1 + \frac{V_{CE}}{V_T}) \Rightarrow
	\frac{1}{r_o} = \frac{\partial I_C}{\partial V_{CE}} = \underbrace{I_s e^{\frac{V_{BE}}{V_T}}}_{I_C} \frac{1}{V_A} = \frac{I_C}{V_A} \Rightarrow
	r_o = \frac{V_A}{I_C} . 
$$

This relation is meaningful. We wanted to calculate the effect of changing the output. The effect of changing $V_{CE}$ is a change in the width of the base-collector depletion region, which was modeled with the Early effect. This is why $V_A$ has appeared in the relation.
The final step is to calculate the effect of the output on the input, which is represented with $r_{\mu}$ in the figure above.

$$
	\frac{1}{r_{\mu}} = \frac{\partial I_B}{\partial V_{CE}} = \frac{\partial \frac{I_C}{\beta}}{\partial V_{CE}} = 
	\frac{1}{\beta} \frac{\partial I_C}{\partial V_{CE}} \Rightarrow
	r_{\mu} = \beta r_o .
$$

In reality, $r_o$ and $r_{\mu}$ are both very large. This is why they are often neglected.
Two other effects remain. One effect is the resistance in the collector. The electrons that are collected by the collector have to go through the collector itself and there they face a resistance. This resistance is modeled in series with the collector and is very important, especially in high frequencies. However, for now we can ignore it, because we do often have a large resistor at the collector anyway.
There is also another physical resistance, which is the base resistance. As we saw, on their way to the collector, some electrons are recombined with holes in the base. These holes have to be replaced by the base current. Again, this resistor is important, especially in high frequencies. However, because we usually have a source resistance $R_s$ in series with that anyway, we often ignore this resistance as well.

Continue learning about electronics [here](/notes/Electronics/Biasing the Transistor/).