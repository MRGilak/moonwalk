---
layout: note
title: "Model-Free Adaptive Resilient Control for Nonlinear CPSs With Aperiodic Jamming Attacks"
date: 2025-07-13
excerpt: "This paper proposes a model-free adaptive resilient control method for nonlinear Cyber-Physical Systems (CPSs) to counter aperiodic jamming attacks."
---

#MFAC #AdaptiveControl #CPS #DoS #IEEE
#IEEE2023
#IEEECybernetics

>[!summary] Summary
>This paper uses model free adaptive control ([MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/)) to deal with any nonlinear system and make a prediction $\hat{y}(t+1)$ . This prediction is then used and based on a cost function minimization, a control law is derived.
>In case of DoS attacks, both the system estimation and control law part change. The estimation is kept unchanged in absence of useful information and the control law is kept the same as well.
>>[!note] Note that the control input is not kept unchanged. Only the adaptation is stopped and the control law doesn't change.

This paper is based on [MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/).

![Pasted image 20250713115014.png](/assets/Control/Adaptive Control/MFAC/Pasted image 20250713115014.png)