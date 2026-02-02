---
layout: page
title: Inverse Optimal Control
---

This page includes explanations related to our inverse optimal control paper in ICCIA 2025.

# Model-Free Inverse Optimal Control via Dynamic Linearization

**Authors:** Mohammadreza Gilak, Raziyeh Mehraban, Behzad Ahi, Mohammad Saleh Tavazoei  
**Venue:** 11th International Conference on Control, Instrumentation and Automation (ICCIA), 2025

---

### Overview

Inverse optimal control asks a subtle question:  
*Given observed system behavior, what cost function makes that behavior optimal?*

In this work, we focus on linear quadratic regulators (LQRs) when the system dynamics are unknown. We propose a model-free, data-driven framework that recovers the state cost matrix directly from measured state and input trajectories—without requiring knowledge of the system matrices.

The core idea is to combine two powerful tools:

- **Dynamic linearization** from model-free adaptive control, which constructs an exact data-based representation of the system along its trajectories.
- **Sliding-window inverse optimal control**, which estimates the underlying cost function using short segments of data.

By reformulating the system into an extended state-space form and applying inverse optimal control locally over moving windows, we iteratively refine the estimated cost matrix. A simple filtering step then stabilizes the estimate over time.

For full technical details, proofs, and simulations, please refer to the published paper [here](https://ieeexplore.ieee.org/document/11285957/).

You can cite this work as

Gilak, M., Mehraban, R., Ahi, B., & Tavazoei, M. S. (2025, November). Model-Free Inverse Optimal Control Based on Dynamic Linearization. In 2025 11th International Conference on Control, Instrumentation and Automation (ICCIA) (pp. 1-6). IEEE.

