---
layout: note
title: "Characteristics of a Transistor"
date: 2026-03-12
excerpt: "A transistors characteristics are described by exponential functions. The $I_C-V_{BE}$ and $I_C-V_{CE}$ plots exhibit behaviors influenced by the Early effect."
---

#Electronics 

We have

$$
	I_E = I_{SE} e^{\frac{V_{BE}}{V_T}}	,
$$

and

$$
	I_C = \alpha I_E = \underbrace{\alpha I_{SE}}_{I_s} e^{\frac{V_{BE}}{V_T}} .
$$

Using this, we can plot the characteristics of the transistor.
![400](/assets/Electronics/Ic-Vbe.jpg)
![400](/assets/Electronics/Ic-Vce.jpg)
The $I_C - V_{BE}$ plot is pretty simple and is just the exponential function that we knew. The $I_C-V_{CE}$ plot shows _almost_ what we expect. For a constant $V_{BE}$ we expect a constant $I_C$, yet the actual plot is slightly above our expected behavior (the dotted line). This is because of something called the _Early effect_. Basically, as $V_{CE}$ is increased, the depletion region between the base and the collector is expanded and this shortens the length in which the electrons have to travel in the base. Less travelling distance means less chance of recombination, hence a larger collector current, which is what we see in the figure.
The Early effect introduces yet another thing that we have not seen in our model; hence, we would like to mitigate its effect. In order to do so, the doping of the collector is selected to be much less than that of the base. This _does not_ change the width of the depletion region, but it does shift the depletion region to be more in the collector side. This, in turn, means less depletion region in the base and less change in the base width due to change of width of the depletion region, which mitigates the Early effect.
For when we do want to include the early effect in the model, we can do so as

$$
	V_{CE} = I_s e^{\frac{V_{BE}}{V_T}} (1 + \frac{V_CE}{V_A}) ,
$$

in which $V_A$ is called the _Early voltage_.
Another effect that is seen in the figure is that if $V_{CE} < 0.2$, the transistor enters _saturation_. We usually don't like to work with transistors in their saturation region (at least not in a fundamentals of Electronics course). Anyway, the two equations below describe the saturation region:

$$
	I_C = \underbrace{I_s}_{\alpha I_{SE}} e^{\frac{V_{BE}}{V_T}} -
	I_{SE} e^{\frac{V_{BC}}{V_T}} ,
$$

$$
	I_E = I_{SE} e^{\frac{V_{BE}}{V_T}} - \alpha' I_{SC} e^{\frac{V_{BC}}{V_T}} .
$$

Continue learning about electronics [here](/notes/Electronics/Small Signal Model of a Transistor/).