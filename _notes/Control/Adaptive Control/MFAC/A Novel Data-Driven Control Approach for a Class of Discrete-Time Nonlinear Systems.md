---
layout: note
title: "A Novel Data-Driven Control Approach for a Class of Discrete-Time Nonlinear Systems"
date: 2025-07-20
excerpt: "By introducing a novel constant and making two simple assumptions, a complex nonlinear system can be transformed into a linearizable form, enabling adaptive control with surprising simplicity. This breakthrough approach has far-reaching imp"
---

#AdaptiveControl #MFAC #IEEE #IEEE2011 
#IEEEControlSystemsTechnology 
>[!summary] Summary
>This paper introduces (and contributes to) [MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/).
>A general SISO nonlinear system is considered as:
>$$
> y(k+1)=f(y(k),...,y(k-n_y),u(k),...,u(k-n_u))
>$$
>A constant $L$ under the name _control input length constant of linearization_ has been introduced. Under two very simple assumptions (one of them being that the system has to be Lipschitz), an equivalent PFDL description is introduced:
>$$
>\Delta y(k+1) = \Phi^T(k) \Delta U(k)
>$$
>Parameter $\Phi$ is then estimated online and used for calculating the control input that minimizes a one-step-ahead cost function.
 
This paper introduces and contributes to [MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/), especially PFDL and CFDL.