---
layout: note
title: "Bipolar Transistors"
date: 2026-03-12
excerpt: "Bipolar transistors consist of two PN junctions, forming an N-P-N structure. They operate by controlling the flow of electrons between the emitter and collector."
---

#Electronics 

Now let's put two PN junctions together to form _N-P-N_.  
![transistor.jpg](/assets/Electronics/transistor.jpg)
We make the left PN junction (base-emitter) forward-biased and the right PN junction (base-collector) reverse-biased. We're going to see what happens in this structure.
First, the base-emitter junction is forward-biased. This means that the free electrons in emitter are _emitted_ to the base because of the drift we discussed in [Biased PN Junction](/notes/Electronics/Biased PN Junction/) (basically, the equilibrium of the PN junction is broken by the applied external field). When these electrons arrive at the base, they start to move toward the collector because of diffusion. To put simply, there are a lot of free negative charges at the emitter side (left side of the image) and they tend to diffuse until equilibrium is reached ($\frac{\text{d} e}{\text{d} x} = 0$). When these charges arrive at the base-collector junction, they face a strong electric field (because the base-collector junction is reverse-biased) and they are driven to the _collector_. This also explains the names _emitter_ and _collector_. Electrons are emitted by the _emitter_ and collected by the _collector_. Note that although we have reverse-biased the base-collector junction, the simple built-in field was also enough to collect the electrons.
Almost all electrons that go through this process actually make it to the collector in a good transistor. This is why we often use the approximation $I_C \approx I_E$. Those electrons that don't make it are _recombined_ with the holes in the base along their way. Therefore, we technically have

$$
	I_C = \alpha I_E , \quad \alpha < 1, \quad \alpha \approx 1 .
$$

Note that the holes in the base are not going to finish, because the current in the base replaces those holes!

$$
	I_E = I_B + I_C
$$

We would ideally like to have $I_E = I_C$. Therefore, we usually choose a _this_ base for our transistor so that the electrons don't see a lot of holes they can recombine with in their way. Base width is usually in the order of a micron ($10^{-6} \text{m}$).
In addition to

$$
	\alpha = \frac{I_C}{I_E} ,
$$

we also define $\beta$

$$
	\beta = \frac{I_C}{I_B} .
$$

We have

$$
	I_E = I_C + I_B \Rightarrow \frac{I_C}{\alpha} = I_c + \frac{I_C}{\beta} \rightarrow
	\frac{1}{\alpha} = 1 + \frac{1}{\beta} \Rightarrow
	\frac{1}{\beta} = \frac{1}{\alpha} - 1 = \frac{1 - \alpha}{\alpha} \Rightarrow
	\beta = \frac{\alpha}{1 - \alpha} .
$$

One phenomenon that we have not considered yet is _back injection_. Basically, while electrons go from the emitter to the base, there are also some holes that go from the base to the emitter. The movement of these holes comprises part of the current as well. Because we do not like this effect, we normally choose the _doping_ of the base to be much higher than that of the base. This will result in most of the current being due to the movement of the electrons. This is also why the emitter is represented with a $N^{+}$ to indicate its rich impurity.

Continue learning about electronics [here](/notes/Electronics/Characteristics of a Transistor/).