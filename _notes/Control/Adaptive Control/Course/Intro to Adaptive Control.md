---
layout: note
title: "Intro to Adaptive Control"
date: 2025-08-12
excerpt: "In the pursuit of control, a complex challenge emerges: how to achieve stability and performance when the system model is incomplete, imprecise, or even time-varying. Can adaptive control rise to the occasion and overcome the limitations of"
---

This note is closely related to [Adaptive Control](/notes/Control/Adaptive Control/Adaptive Control/).
Control is used for these purposes:
- Closed-loop Stability
- Closed-loop Robustness
- Tracking a Reference Signal
- Good Transient Behavior
- Rejecting or Mitigating Disturbance Effects
- Mitigating Noise Effects
The challenge is that the system model is often incomplete or unprecise. This could be because the actual model of the system is either unavailable or too complicated to be used. It could also be that the actual model is time-varying, has unmodeled dynamics or the disturbances aren't known.
![Pasted image 20250803183924.png](/assets/Control/Adaptive Control/Course/Pasted image 20250803183924.png)