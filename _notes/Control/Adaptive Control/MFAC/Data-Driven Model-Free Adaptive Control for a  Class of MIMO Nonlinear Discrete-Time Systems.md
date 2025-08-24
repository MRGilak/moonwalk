---
layout: note
title: "Data-Driven Model-Free Adaptive Control for a  Class of MIMO Nonlinear Discrete-Time Systems"
date: 2025-07-20
excerpt: "A revolutionary approach to adaptive control is born, as a novel method transforms complex MIMO nonlinear systems into manageable counterparts, paving the way for unprecedented precision in real-time optimization. But what secrets lie withi"
---

#AdaptiveControl #MFAC #IEEE #IEEE2011 
#IEEEControlSystemsTechnology #MIMO
>[!summary] Summary
>This paper introduces (and contributes to) [MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/).
>A general MIMO nonlinear system is considered as:
>$$
> y(k+1)=f(y(k),...,y(k-n_y),u(k),...,u(k-n_u))
>$$
>Note that the length of the input and the output have to be the same ($p$). A constant $L$ under the name _control input length constant of linearization_ has been introduced. Under several simple assumptions, an equivalent PFDL description is introduced:
>$$
>\Delta y(k+1) = \bar{\Phi}^T(k) \bar{\Delta U(k)}
>$$
>Parameter $\Phi$ is then estimated online and used for calculating the control input that minimizes a one-step-ahead cost function.
 
This paper introduces and contributes to [MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/), especially PFDL and CFDL.