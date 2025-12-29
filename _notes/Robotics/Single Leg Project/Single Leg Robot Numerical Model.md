---
layout: note
title: "Single Leg Robot Numerical Model"
date: 2025-12-27
excerpt: "A numerical model for a single leg robot was developed using Lagrangian dynamics. The model simulates the legs motion, switching between different modes based on contact with the ground."
---

#Robotics #Modeling 
To obtain a numerical model for the robotic leg, Lagrangian dynamics were first written [here](/notes/Robotics/Single Leg Project/Mathematical Modeling of a Single Leg Robot/). The dynamics were then written in MATLAB to solve the equations symbolically. The final equations turned out to be much more complex than I initially assumed. The final equations of motion were then turned to several _.m_ functions to be later used for simulation.
## Final Dynamics 
After solving the Lagrangian dynamics equations, we obtain the final dynamics for $\ddot{q_1}$, $\ddot{q_2}$ and $\ddot{h}$, as well as their Lagrange multipliers $\lambda_h$, $\lambda_{q_1}$ and $\lambda_{q_2}$.

Assume the simulation is started with the leg slightly above the ground. At each sample time, we calculate $\ddot{q_1}$, $\ddot{q_2}$ and $\ddot{h}$ and integrate them to get $q_1$, $q_2$ and $h$. In the meanwhile, $\lambda_h$, $\lambda_{q_1}$ and $\lambda_{q_2}$ are zero.
>[!Note]
>Although $\lambda_h$, $\lambda_{q_1}$ and $\lambda_{q_2}$ are introduced as Lagrangian multipliers at first, but since the complementarity problem has to hold ($h \lambda_h = 0$, $q_1 \lambda_{q_1} = 0$ and $q_2 \lambda_{q_2} = 0$), they soon find a more intuitive meaning and that is $\lambda_h$ represents the upward force that the ground exerts to the tip of the foot, $\lambda_{q_1}$ is the force that the ground exerts to the hip and $\lambda_{q_2}$ is the force that the ground exerts to the knee, when they are in contact with the ground.

As soon as a part of the foot touches the ground, we have to switch our method of solving the problem. Let's say, for example, that the tip of the foot touches the ground at some point, i.e. $h = 0$. Since $h \lambda_h = 0$, we get $\dot{\lambda} h + \lambda \dot{h} = 0$ and since $\dot{\lambda} = 0$, we get $\dot{h} = 0$. Taking the derivative again yields $\ddot{h} = 0$. Therefore, basically, as soon as the foot touches the ground, we have to set $h = \dot{h} = \ddot{h} = 0$, and we cannot continue obtaining $h$ from integrating $\ddot{h}$ anymore. Instead, we have to keep solving for $\lambda_h$ with the conditions  $h = \dot{h} = \ddot{h} = 0$. At each time step, $\lambda$ has a new value. We continue this until at a moment, $\lambda_h$ becomes zero (or less that $\epsilon$ when implementing). That's when we switch back to calculating $\ddot{h}$ and integrating again. The intuition is that as soon as $\lambda_h$ becomes zero, there is no force acting on the foot, which means that we have jumped; therefore, we should switch to calculating our height instead of the force.

This switching logic has to be implemented for all three constraints, resulting in a program that switches between 8 different modes, based on what constraints are active. In MATLAB, I've created 8 different functions to implement this. Another function handles the switching between these 8 functions.
All of this results in a model of the 2DoF leg that works entirely in MATLAB. This might seem unnecessary, given the availability of many modern, more accurate simulators, but there are a few upsides that make this worth it, two of which being, the understanding that is gained from doing all of this and the speed at which the simulation can be run. This might later become useful when we want to train a learning model, such as an RL agent, for walking (learn about reinforcement learning [here](/notes/Computer Science/Reinforcement Learning/Reinforcement Learning/)). 

An image of the simulation is added below.

![Screenshot 2025-10-16 172529.png](/assets/Robotics/Single Leg Project/Screenshot 2025-10-16 172529.png)
