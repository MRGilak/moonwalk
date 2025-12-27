---
layout: note
title: "Mathematical Modeling of a Single Leg Robot"
date: 2025-12-27
excerpt: "#Robotics #Single_Leg_Project #Modeling"
---

#Robotics #Single_Leg_Project #Modeling

>[!note] this note is still being completed

The mathematical model of a single leg robot can be written both by using the Newtonian method and by using the Lagrangian method. For now, the Lagrangian method is explained below. The Newtonian method will also be added later, but for now you can take a look at [this](robot-leg-equations) to read about it.
# Euler-Lagrange Dynamics of the System
When systems of bodies get very complicated, it is often easier to work with Lagrangian dynamics rather than Newtonian dynamics. To write the equations of motion for any system, this is what we should do:
1. Write the kinetic energy of the system, $T$. This includes all the translational and rotational kinetic energy of all the bodies in the system.
2. Write the potential energy of the system, $P$. This includes the potential energy of all the bodies.
3. Define $\mathcal{L} := T - P + \lambda^T c$. This is called the Lagrangian. $\lambda$ is the vector of Lagrange multipliers and $c$ is the vector of equality constraint ($c = 0$). Any constraint can be added to the Lagrangian like this. If the constraint is an inequality constraint, for example $c \geq 0$, then we will have a [complementarity problem](linear-complementarity-problem), meaning we should have $\lambda \geq 0,  c \geq 0, \lambda c = 0$.
4. For any variable $x$, you can now solve the equation below to derive its dynamics:
	$$
		\frac{\partial \mathcal{L}}{\partial x} - \frac{d}{dt} \frac{\partial \mathcal{L}}{\partial \dot{x}} = 0
	$$
This approach has been used to derive the equations of motion for the double-joint single leg below.
![400](/assets/Robotics/Single Leg Project/Picture7.jpg)
The kinetic energies are:
- _Linear Horizontal Kinetic Energy of Load Mass_: $K_M^h = 0$
- _Linear Vertical Kinetic Energy of Load Mass_: $K_M^v = \frac{1}{2} M \dot{h}_{hip}^2$
- _Linear Horizontal Kinetic Energy of Hip Link_: $K_H^h = \frac{1}{2} m_1 \dot{d}_1^2$
- _Linear Vertical Kinetic Energy of Hip Link_: $K_H^v = \frac{1}{2} m_1 \dot{h}_1^2$
- _Rotational Kinetic Energy of Hip Link_: $K_H^r = \frac{1}{2} I_1 \dot{q}_1^2$
- _Linear Horizontal Kinetic Energy of Shank Link_: $K_S^h = \frac{1}{2} m_2 \dot{d}_2^2$
- _Linear Vertical Kinetic Energy of Shank Link_: $K_S^v = \frac{1}{2} m_2 \dot{h}_2^2$
- _Rotational Kinetic Energy of Shank Link_: $K_S^r = \frac{1}{2} I_2 \dot{q}_2^2$
The total kinetic energy of the system is
$$
	K = K_M^h + K_M^v + K_H^h + K_H^v + K_H^r + K_S^h + K_S^v + K_S^r.
$$
The potential energies in the system are:
- _Potential Energy of Load Mass_: $P_M = M g h_{hip}$ 
- _Potential Energy of Hip Link_: $P_H = m_1 g h_1$
- _Potential Energy of Shank Link_: $P_S = m_2 g h_2$
The total potential energy of the system is
$$
	P = P_M + P_H + P_S.
$$
All the parameters used in calculating the kinetic and potential energy, like $d_i$ and $h_i$ and their derivatives can be calculated using the link lengths $l_1$ and $l_2$ and joints angles and angular velocities $q_i$ and $\dot{q}_i$.  
Finally, the constraint on the system is that its foot cannot penetrate the ground, which can be added as $Fh$, where $F$ is the Lagrange multiplier and $h$ is shown in the image above. This leads to a [linear complementarity problem](linear-complementarity-problem), meaning we have $Fh = 0, F \geq 0, h \geq 0$. 
If we want to be more precise, we have to add two more constraints to prevent the knee and the hip joints from penetrating the ground as well, but that makes the problem exponentially more difficult, without adding that much value. If the knee or hip joint contact the ground, we have far worse problems to deal with in control rather than modelling.
There is a very interesting intuition behind the constraint. $Fh = 0, F \geq 0, h \geq 0$ means that at any given time, both $F$ and $h$ cannot be zero, meaning the foot cannot be on the ground without any force being exerted on it. The foot is either in the air with $h > 0$, at which time it doesn't experience any force, or it is on the ground with $F > 0$ and thus $h = 0$.
The Lagrangian can now be written as
$$
	\mathcal{L} = K + P + Fh.
$$
We can calculate the dynamics of the joint angles by solving
$$
	\begin{align}
		\frac{\partial \mathcal{L}}{\partial q_1} - \frac{\mathrm{d}}{\mathrm{d} t} \frac{\partial \mathcal{L}}{\partial \dot{q_1}} = 0 \\
		\frac{\partial \mathcal{L}}{\partial q_2} - \frac{\mathrm{d}}{\mathrm{d} t} \frac{\partial \mathcal{L}}{\partial \dot{q_2}} = 0
	\end{align}
$$
When the foot is in the air, the third equation comes from
$$
		\frac{\partial \mathcal{L}}{\partial h} - \frac{\mathrm{d}}{\mathrm{d} t} \frac{\partial \mathcal{L}}{\partial \dot{h}} = 0
$$
When the foot is on the ground, the force $F$ can be calculated.
(#todo: add simulation figures. For now you can take a look at [this](single-leg-robot-numerical-model))


To read more about what's in the literature, take a look at [Robot Leg Equations](robot-leg-equations).