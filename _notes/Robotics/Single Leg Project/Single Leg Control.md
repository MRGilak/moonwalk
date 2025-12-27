---
layout: note
title: "Single Leg Control"
date: 2025-12-27
excerpt: "Single leg control is a fundamental aspect of legged robotics. Controlling a single leg with multiple degrees of freedom is a key step in developing more complex legged robots."
---

Robotics is a rapidly growing field which is expanding its applications in diverse fields such as manufacturing industries, transportation, agriculture, etc. Among the various types of robots, legged robots have gained a special position in research and practical applications due to their ability to move in uneven environments and to simulate the locomotion behavior of humans and animals.
The first step in building a legged robot is to build and control a single leg. As Raibert says in his book [Legged Robots that Balance](https://www.google.com/books/edition/Legged_Robots_that_Balance/EXRiBnQ37RwC?hl=en&gbpv=0), extending the results of a single leg robot to a bipedal robot, quadrupedal robot or a robot with more legs is feasible with the concept of virtual legs.
To this end, in this project, we will focus on controlling a single leg robot. The robot has two degrees of freedom with one motor for its hip and another for controlling the motion of the knee. You can read about different theoretical and practical aspects of this project in the following notes:
- [Finding a mathematical model for the leg](/notes/Robotics/Single Leg Project/Mathematical Modeling of a Single Leg Robot/)
- [Studying about different control methods used in literature](/notes/Robotics/Single Leg Project/2DoF Robot Control Literature/)
- [Choosing a controller and test it on the mathematical model in Simulink](/notes/Robotics/Single Leg Project/Single Leg Robot Numerical Model/)
- [Testing the controller with physics simulators](/notes/Robotics/Single Leg Project/Single Leg Robot Simulations/)
- [Testing the controller on the actual leg](/notes/Robotics/Single Leg Project/Single Leg Robot Controller Real-world Implementation/)