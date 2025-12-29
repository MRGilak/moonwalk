---
layout: note
title: "Impedance Control in Robotics"
date: 2025-12-27
excerpt: "Impedance control regulates a robots dynamic behavior at interaction ports with its environment."
---

#Robotics #Control #ImpedanceControl

Impedance control is a solution to the problem of controlling the interaction of a robot with its dynamics. It rises due to some interesting properties of mechanical interaction, namely that a stable isolated system is not necessarily stable when coupled to an environment, which is known as _coupled_ or _contact_ instability. These kind of instabilities can appear even in simple systems having simple interactions with the environment.
_Impedance_ itself is a loose extension of _stiffness_.
### Why classic control approaches fail
Using a disturbance rejection approach to deal with the environment's unknown dynamics depends heavily on being able to somehow bound the disturbances, but a kinematic constraint can introduce arbitrarily large forces depending on the robot behavior. Also, the environment forces depend on the robot's state, but in control literature, disturbance is usually assumed to be state-independent.

Modeling the environment as an uncertain part of the robot and using robust control approaches is another idea, but this would hugely sacrifice performance and would only work to an extent. Also, interaction might change the structure of the robot itself, thus rendering the robust control approach useless.
This is where _impedance control_ comes in. We get to know some of the basic definitions below and then we get to impedance control itself.
### Impedance control
The general approach here termed _interaction control_ refers to regulation of the robot’s dynamic behavior at its _ports of interaction_ with the environment. An interaction port is a place at which energy may be exchanged with the environment [1].

_Mechanical impedance_ at a port (denoted $Z$) is a dynamic operator that determines an output force (torque) time function from an input velocity (angular velocity) time function at the same port.

The dynamic port behavior of a robot is a property of the robot itself and does not depend on the environment anymore, but motion and force depend on both the robot and the environment. Basically, the idea behind impedance control is if arbitrary impedance can be achieved, arbitrary performance can be acheived.

### What this means for a single leg robot?
For the single leg robot that we have in [this project](/notes/Robotics/Single Leg Project/Single Leg Control/), impedance control seems like an appropriate approach. Controlling only motion could lead to arbitrarily large torques at the robot joints when it is interacting with the ground.

The solution that has been used by many is PD control in the form of

$$
\tau = K_p (q - q_{des}) + K_d (\dot{q} - \dot{q}_{des}) + \tau_{ff},
$$

where $\tau_{ff}$ is the feedforward torque. When the foot is on the ground, it can be calculated as

$$
\tau_{ff} = J^T [K_P (x - L(q)) + K_D (\dot{x} - J(q) \dot{q})].
$$

Basically $x$ is compared with $L(q)$ and $\dot{x}$ is compared to $J(q) \dot{q}$. This displacement and difference in velocity is then transformed into force by considering a desired mechanical behavior for the robot in the form of $K_P$ and $K_D$. It is very important to note that although this looks like a PD controller, the intuition behind it is very different. The coefficients $K_P$ and $K_D$ represent a spring-damper behavior for the robot. The resulting force is then converted to torques using the transpose of the Jacobian matrix, $J^T$. This $\tau_{ff}$ torque is then passed to a PD controller, because feedforward-only control would degrade performance.

It is also worth pointing out here why PD is such a suitable choice and why it is so widely used in robotics. The first important feature of a PD controller is that it is model-free. Although having some information about the plant would help in the tuning process of the PD controller, the controller itself is model-free and can be applied to any robotic system, regardless of the type of the robot.

One might then think of other model-free controllers that can replace the PD controller that might have even better reference tracking and disturbance rejection properties, like ADRC or [MFAC](/notes/Control/Adaptive Control/MFAC/MFAC/) for example, but the surprising thing is that we're not necessarily seeking that good of a reference tracking ability. As absurd as this might seem to a control engineer, in robotics sometimes it is preferred if the reference isn't tracked that well. This is because the reference which is provided by an upper layer controller in a hierarchical structure, may not necessarily be feasible at the moment or might require a lot of control effort. In our example, when a $q_{des}$ is provided by an upper layer, following that $q_{des}$ might need a lot of torque, which can damage the robot (this could happen, for example, when the robot is stuck, but the upper layer hasn't been informed yet). This is where PD shines. A PD controller promises fairly good performance in normal conditions, but does not spend excessive control effort when the reference cannot be tracked. This is also the reason why the integral term is missing in the controller, i.e. why a PID controller isn't used. A PID controller would increase torque indefinitely until the reference tracking is achieved.





References:
- Hogan, Neville, and Stephen P. Buerger. "Impedance and interaction control." _Robotics and automation handbook_. CRC press, 2018. 375-398.
