---
layout: note
title: "Single Leg Control"
date: 2025-12-27
excerpt: "Robotics is a rapidly growing field which is expanding its applications in diverse fields such as manufacturing industries, transportation, agriculture, etc. Among the various types of robots, legged robots have gained a special position in research and practical applications due to their ability to move in uneven environments and to simulate the locomotion behavior of humans and animals."
---

Robotics is a rapidly growing field which is expanding its applications in diverse fields such as manufacturing industries, transportation, agriculture, etc. Among the various types of robots, legged robots have gained a special position in research and practical applications due to their ability to move in uneven environments and to simulate the locomotion behavior of humans and animals.
The first step in building a legged robot is to build and control a single leg. As Raibert says in his book [Legged Robots that Balance](https://www.google.com/books/edition/Legged_Robots_that_Balance/EXRiBnQ37RwC?hl=en&gbpv=0), extending the results of a single leg robot to a bipedal robot, quadrupedal robot or a robot with more legs is feasible with the concept of virtual legs.
To this end, in this project, we will focus on controlling a single leg robot. The robot has two degrees of freedom with one motor for its hip and another for controlling the motion of the knee. You can read about different theoretical and practical aspects of this project in the following notes:
- [Finding a mathematical model for the leg](mathematical-modeling-of-a-single-leg-robot)
- [Studying about different control methods used in literature](2dof-robot-control-literature)
- [Choosing a controller and test it on the mathematical model in Simulink](single-leg-robot-numerical-model)
- [Testing the controller with physics simulators](single-leg-robot-simulations)
- [Testing the controller on the actual leg](single-leg-robot-controller-real-world-implementation)