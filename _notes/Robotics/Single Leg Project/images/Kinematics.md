---
layout: note
title: "Kinematics"
date: 2025-12-27
excerpt: "#Robotics"
---

#Robotics 
The [single leg project](single-leg-control) requires working with frames, defining angles and deriving dinematics and dynamics. Dynamics of the robot are derived [here](single-leg-robot-numerical-model). Kinematics will be derived here.
We define the hip angle and the knee angle as in the image below.
![kinematics.jpg](/assets/Robotics/Single Leg Project/images/kinematics.jpg)
It is now easy to write
$$
	x = x_{\text{foot}} - x_{\text{hip}} = - l_1 \cos (q_1) + l_2 \cos (\pi - (q_1 + q_2)) = -l_1 \cos (q_1) - l_2 \cos (q_1 + q_2)
$$
$$
	y = y_{\text{foot}} - y_{\text{hip}} = - l_1 \sin (q_1) - l_2 \sin (\pi - (q_1 + q_2)) = - l_1 \sin (q_1) - l_2 \sin (q_1 + q_2)
$$
The Jacobian matrix of a robot is the matrix that relates the angular or linear velocities of the joints (revolute or prismatic joints) to the angular and linear velocity of the end effecetor. Here, we consider the foot to be our EF and since we don't care about its orientation, we can write
$$
	\dot{x} = l_1 \dot{q}_1 \sin (q_1) + l_2 (\dot{q}_1 + \dot{q}_2) \sin (q_1 + q_2)
$$
$$
	\dot{y} = - l_1 \dot{q}_1 \cos (q_1) - l_2 (\dot{q}_1 + \dot{q}_2) \cos (q_1 + q_2)
$$
and the Jacobian matrix will be
$$
	\begin{bmatrix} \dot{x} \\ \dot{y} \end{bmatrix} = 
	\underbrace{
	\begin{bmatrix}
	l_1 \sin (q_1) + l_2 \sin (q_1 + q_2) & l_2 \sin (q_1 + q_2) \\
	- l_1 \cos (q_1) - l_2 \cos (q_1 + q_2) & - l_2 \cos (q_1 + q_2)
	\end{bmatrix}
	}_{J (q_1 , q_2)}
	\begin{bmatrix} \dot{q}_1 \\ \dot{q}_2 \end{bmatrix}
$$
The Jacobian matrix of the robot is frequently used for different purposes. For example, it can be shown that the force acting on the foot can be negated by applying torques in the joints of the form
$$
	\tau = J^T F
$$