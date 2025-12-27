---
layout: note
title: "Single Leg Robot Simulations"
date: 2025-12-27
excerpt: "#Robotics #Single_Leg_Project #Control"
---

#Robotics #Single_Leg_Project #Control 
Several simulations have been conducted in different simulators:
- Verifying the numerical model obtained in [here](mathematical-modeling-of-a-single-leg-robot) via symbolic simulation in MATLAB
- Testing a simple model of the leg using Simscape
- Simulating the whole system in Pybullet
- Simulating the system in Isaac Sim for more realistic results
# Numerical Model in MATLAB
The dynamics of the system were derived [here](mathematical-modeling-of-a-single-leg-robot). MATLAB symbolic toolbox was used to convert the dynamics to _.m_ functions. These functions take the current state of the system along with applied torques as input and simulate the system for one timestep. They can be used in a _for_ loop can simulate the whole system.
(#todo: add the codes to a public Github repo)
A simple demo of this simulation is shown below:
[symbolic demo.mp4](/assets/Robotics/Single Leg Project/symbolic demo.mp4)
# Simple Model in Simscape

# Pybullet Simulator
The SLIP controller was implemented in Pybullet simulator. A demo is shown below:
(#todo: add a note for the SLIP controller)
[Pybullet Demo.mp4](/assets/Robotics/Single Leg Project/Pybullet Demo.mp4)
# Isaac Sim Simulator
The SLIP controller was implemented in Isaac Sim for better accuracy. A demo of this simulation is shown below:
[Isaac Demo.mp4](/assets/Robotics/Single Leg Project/Isaac Demo.mp4)