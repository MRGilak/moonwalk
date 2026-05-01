---
layout: note
title: "Spring-Loaded Inverted Pendulum (SLIP)"
date: 2026-03-01
excerpt: "#Robotics #Single_Leg_Project #Control"
---

#Robotics #Single_Leg_Project #Control 
We know that the dynamics of legged robots are very complicated. Even considering just a single leg, the dynamics are very complex because of the hybrid nature of the dynamics, because the foot constantly makes and loses contact with the ground. Because of this, designing a controller with a proof of stability behind it is very difficult (although, not impossible). Engineers working on legged robots were looking for a simpler way to control these robots. This is where the idea of Single-Loaded Inverted Pendulum (SLIP) comes in.
In SLIP modelling, the entire robot is controlled in way to act as a mass-less spring attached to a mass. Such a system bounces up again after making contact with the ground and continues moving forward. This modelling comes from biology, because this mass-spring behavior is exactly what is observed in animals and humans running with high speeds.
To make the robot act as an SLIP, the two phases are considered as follows:
- Stance: When the foot is on the ground, it has to act as a spring. Therefore, a desired spring length $l_{\text{des}}$ is considered. Using forward kinematics, the length of the virtual spring that connects the hip to the foot is calculated as $l_{\text{actual}}$. The difference $l_{\text{des}} - l_{\text{actual}}$ is the length by which the spring is compressed or stretched. A spring would apply a force of $K \cdot (l_{\text{des}} - l_{\text{actual}})$. We calculate the necessary torques in the joints to achieve this force and command that to the motors as $J^\top F$.
- Swing: When the foot is in the air, its movement has no effect on the trajectory of its center of mass; therefore, we can command the foot to follow any trajectory. It is customary to use Bezier curves as they are multiple times differentiable and smooth. This trajectory is translated to joint angles using inverse kinematics and are commanded to the motors.
This is the controller we will be using for controlling the robot in [this project](single-leg-project).