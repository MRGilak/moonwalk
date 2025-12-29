---
layout: note
title: "Single Leg Robot Simulations"
date: 2025-12-27
excerpt: "Single leg robot simulations were conducted using various tools, including MATLAB and Pybullet. These simulations tested the robots dynamics and control systems."
---

#Robotics #Single_Leg_Project #Control 

Several simulations have been conducted in different simulators:
- Verifying the numerical model obtained in [here](/notes/Robotics/Single Leg Project/Mathematical Modeling of a Single Leg Robot/) via symbolic simulation in MATLAB
- Testing a simple model of the leg using Simscape
- Simulating the whole system in Pybullet
- Simulating the system in Isaac Sim for more realistic results
# Numerical Model in MATLAB

The dynamics of the system were derived [here](/notes/Robotics/Single Leg Project/Mathematical Modeling of a Single Leg Robot/). MATLAB symbolic toolbox was used to convert the dynamics to _.m_ functions. These functions take the current state of the system along with applied torques as input and simulate the system for one timestep. They can be used in a _for_ loop can simulate the whole system. You can take a look at the simulation and the code behind it on [Github]().

A simple demo of this simulation is shown below:

[symbolic demo.mp4](/assets/Robotics/Single Leg Project/symbolic demo.gif)

# Simple Model in Simscape

# Pybullet Simulator
The SLIP controller was implemented in Pybullet simulator. A demo is shown below:

(#todo: add a note for the SLIP controller)

[Pybullet Demo.mp4](/assets/Robotics/Single Leg Project/Pybullet Demo.gif)

# Isaac Sim Simulator
The SLIP controller was implemented in Isaac Sim for better accuracy. A demo of this simulation is shown below:

[Isaac Demo.mp4](/assets/Robotics/Single Leg Project/Isaac Demo.gif)
