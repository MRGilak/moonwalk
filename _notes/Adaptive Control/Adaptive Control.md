---
layout: note
title: "Adaptive Control"
date: 2025-07-13
excerpt: "Adaptive control is a field of control that concerns systems with time-varying parameters. Adaptive Control alongside Robust Control were introduced to deal with uncertainties in the system model."
---

Adaptive control is a field of control that concerns systems with time-varying parameters. Adaptive Control alongside Robust Control were introduced to deal with uncertainties in the system model.

# Categories
Adaptive control systems can be mainly categorized into two main groups:
- __Indirect__ methods which estimate the system parameters (using methods like RLS, projection algorithm and ...) and then use that information to change the controller parameters. Famous indirect methods include STR, ...
- __Direct__ methods which estimate the controller parameters directly. Famous direct methods include direct STR, model reference adaptive controllers ([MRAC](/notes/Adaptive Control/MRAC/MRAC/)), model free adaptive control ([MFAC](/notes/Adaptive Control/MFAC/MFAC/)) and ...
a