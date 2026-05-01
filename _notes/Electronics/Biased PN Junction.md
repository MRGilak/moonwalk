---
layout: note
title: "Biased PN Junction"
date: 2026-03-12
excerpt: "#Electronics"
---

#Electronics 
What happens if we apply an external electric field to the PN junction using a battery?
If the external electric field is aligned with the _built-in electric field_ (the electric field due to the depletion region), the electric field's magnitude is just going to become larger and no current will be allowed (in reality, a small current does exist, but it suffices to just consider $I \approx 0$ here). This is called a _reverse-biased_ PN junction. We can imagine that in a reversed-bias situation, the depletion region becomes bigger.
If the external field is in the opposite direction of the built-in field however, we are going to see current passing through the junction. This is because the external field weaken the built-in field (their sum makes a smaller magnitude field) and the equilibrium is broken, hence allowing for charges to move between the two sides. This is called a _forward-biased_ PN junction. In a forward-biased PN junction, the depletion region shrinks. The current in this situation is equal to
$$
	I = I_B (e^{\frac{V}{V_T}} - 1) ,
$$
where $V$ is the applied external voltage and $V_T \approx 25 \text{mV}$. $I_s$ depends on the transistor. In integrated circuits it could be as small as an order of femtoamperes ($10^{-15}$) and in power electronics it could be as large as an order of milliamperes ($10^{-3}$). It depends on the area between the _P_ and _N_ parts of the PN junction. It also depends heavily on temperature (exponentially). The $-1$ in the equation above is usually small compared to the rest of the right-hand side and therefore is sometimes neglected.

Continue learning about electronics [here](bipolar-transistors).