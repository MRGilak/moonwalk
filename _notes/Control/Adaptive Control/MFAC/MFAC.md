---
layout: note
title: "MFAC"
date: 2026-03-02
excerpt: "MFAC is a data-driven approach to adaptive control using pseudo-partial derivatives. It builds a dynamical linearization model from I/O measurement data."
---

MFAC refers to model free adaptive control, which is is a data-driven approach to [adaptive control](/notes/Control/Adaptive Control/Adaptive Control/). The core idea stems from a concept called pseudo-partial derivative (PPD). Here is its introduction in.
>[!definition] Instead of identifying a more or less nonlinear model of a plant, an equivalent dynamical linearization model is built along the dynamic operation points of the closed-loop system using a new dynamic linearization technique with a novel concept called pseudo-partial derivative (PPD). The time-varying PPD could be estimated merely using the I/O measurement data of a controlled plant. The dynamic linearization techniques include the partial form dynamic linearization (PFDL), the compact form dynamic linearization (CFDL), and the full form dynamic linearization (FFDL).

>[!note] Note
>Model free adaptive control is closely related to [Data-driven Control](/notes/Control/Data-Driven Control/Data-driven Control/)