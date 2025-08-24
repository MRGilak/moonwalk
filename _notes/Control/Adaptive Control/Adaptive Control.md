---
layout: note
title: "Adaptive Control"
date: 2025-07-13
excerpt: "In the pursuit of precision, adaptive control systems have emerged to tackle the unpredictable, where parameters shift like sand beneath our feet. But what secrets lie within the two main categories of indirect and direct methods, and how d"
---

Adaptive control is a field of control that concerns systems with time-varying parameters. Adaptive Control alongside Robust Control were introduced to deal with uncertainties in the system model.

# Categories
Adaptive control systems can be mainly categorized into two main groups:
- __Indirect__ methods which estimate the system parameters (using methods like RLS, projection algorithm and ...) and then use that information to change the controller parameters. Famous indirect methods include STR, ...
- __Direct__ methods which estimate the controller parameters directly. Famous direct methods include direct STR, model reference adaptive controllers ([MRAC](/notes/Control/Adaptive Control/MRAC/MRAC/)), model free adaptive control ([MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/)) and ...
a