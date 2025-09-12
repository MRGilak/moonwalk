---
layout: note
title: "Robot Leg Equations"
date: 2025-09-09
excerpt: "Robot leg motion is governed by equations such as Newtons and Eulers."
---

#Robotics #Modeling 
The main equations governing the motion of the leg are:
- The _Newton_ Equation:
	$$
	m (\ddot{c} + g) = \sum_i f_i
	$$
	where $m$ is the total mass of the robot, $c$ is the position of its center of mass (CoM), and $f_i$ are the forces acting on the leg.
- The _Euler_ Equation:
	$$
	\dot{L} = \sum_i (p_i - c) \times f_i
	$$
	where $L$ is the angular momentum of the whole robot with respect to its CoM and is defined as:
	$$
	L = \sum_k (x_k - c) \times m_k \dot{x}_k + I_k \omega_k
	$$
There are two phases in moving the leg:
- _Flight Phase_:  When a legged robot is not in contact with its environment, not experiencing any contact forces, $f_i$, the Newton equation simplifies to
	$$
	\ddot{c} = - g
	$$
	and the Euler equation simplifies to
	$$
	\dot{L} = 0
	$$
	There is absolutely no possibility to control the CoM to move in any different way. However, the robot is still able to generate and control both joint motions.
- _Stance Phase_: In case the forces applied by the environment on the robot are due to contacts with a flat ground, one can show that the center of pressure (CoP) is bound to lie in the convex hull of the contact points

# Contact Models
There are several ways to model how a legged robot contacts the ground.
- _Coulomb Friction_: When a contact point, $p_i$, is sliding on its contact surface, the corresponding tangential contact force, $f_i^{x,y}$ , is proportional to the normal  force, $f_i^z$, in a direction opposite to the sliding motion:
	$$
	f_i^{x,y} = -\mu_0 f_i^z \frac{\dot{p}_i^{x,y}}{\parallel \dot{p}_i^{x,y} \parallel} \ ,\ if\ \dot{p}_i^{x,y} \neq 0
	$$
	with $\mu_0$ as the friction constant.
	When the contact point is sticking and not sliding, the norm of the tangential force is simply bounded, with the same friction coefficient:
	$$
	\parallel f_i^{x,y} \parallel \leq \mu_0 f_i^z  \ ,\ if\ \dot{p}_i^{x,y} \neq 0
	$$ 
	This is typically referred to as the _friction cone_.
- _Compliant Contact Models_: Compliant contact models take into account the visco-elastic properties of the materials in contact in the direction orthogonal to the contact surfaces:
	$$
	f_i^z = - K_i p_i^z - \Lambda_i \dot{p}_i^z \ ,\ if\ \dot{p}_i^z \neq 0
	$$
	where $K_i$ $and $\Lambda_i$ are _stiffness_ and _damping_ coefficients, respectively.
	When there is no contact, there is no contact force:
	$$
	f_i^z = 0 \ ,\ if\ \dot{p}_i^z > 0
	$$
- _Rigid Contact Models_: Rigid contact models are simpler to introduce. Either there is contact and the normal force can take any non-negative value
	$$
	f_i^z \geq 0 \ ,\ if\ \dot{p}_i^z = 0
	$$  or there is no contact and no contact force: 
	$$
	 f-i^z = 0 \ ,\ if\ \dot{p}_i^z > 0
	$$
	The rigid model can be summarized in the following way:
	$$
	f_i^z \geq 0 \, \ p_i^z \geq 0 \, \ f_i^z p_i^z = 0
	$$
	This is called a _complementarity condition_.
With rigid contacts, the dynamics of legged robots appears to switch, depending on the contact situations. Discontinuities of the state of the robot also occur at impacts. A classical way to combine these different aspects is with a _hybrid_ dynamical system. This approach has however some limitations, the most obvious one being its incapacity to handle properly _Zeno behaviors_, infinite accumulations of impacts in finite time.
Impacts with multiple contacts and Zeno behaviors are not the only difficulties with rigid contact models: there is also the _Painleve paradox_, tangential impacts, impacts without collisions, etc.
By conservatively approximating the friction cone as a polyhedron, forward dynamics can be cast as a [linear complementarity problem (LCP)](/notes/Robotics/Linear Complementarity Problem/).

To read more, you can continue to [Stability of Legged Robots](/notes/Robotics/Stability of Legged Robots/).


Sources:
1. [Modeling and Control of Legged Robots](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_48)