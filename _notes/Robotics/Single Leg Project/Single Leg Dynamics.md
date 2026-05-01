---
layout: note
title: "Single Leg Dynamics"
date: 2026-03-28
excerpt: "#Robotics #Modeling"
---

#Robotics #Modeling 
In this note I am taking a different approach to deriving the dynamics of a single leg. In all other notes in this project I have recorded how I actually derived the dynamics of a single leg for myself. Those notes were written on the basis of my own timeline, meaning I wrote them as I went along. 
In this note, I do not want to derive the dynamics for the single leg we have in the lab. I do not want to write the dynamics using the Lagrangian technique and derive the complete description of the system, including the dynamics of the height of the base itself. In this note, I want to write the dynamics of a single leg as seen in the legged robots literature. The dynamics here do not describe the entire system, because a single leg itself would fall under gravity and we would need to derive the dynamics of that as well. However, here I am just focusing on the dynamics of the joints.
The dynamics of a single leg, therefore, are exactly the same to an $n-$link manipulator. The dynamics of the $n$ links are
$$
	\begin{bmatrix}
		m_1 I & \cdots & 0 & 0 & \cdots & 0 \\
		\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
		0 & \cdots & m_n I & 0 &  \cdots & 0 \\
		0 & \cdots & 0 & I_1 & \cdots & 0 \\
		\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
		0 & \cdots & 0 & 0 &  \cdots & I_n
	\end{bmatrix}
	
	\begin{bmatrix}
		\dot{v}_1 \\ \dot{v}_2 \\ \vdots \\ \dot{v}_n \\
		\dot{\omega}_1 \\ \dot{\omega}_2 \\ \vdots \\ \dot{\omega}_n
	\end{bmatrix}
	+
	\begin{bmatrix}
		0 & \cdots & 0 & 0 & \cdots & 0 \\
		\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
		0 & \cdots & 0 & 0 &  \cdots & 0 \\
		0 & \cdots & 0 & -S(I_1 \omega_1) & \cdots & 0 \\
		\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
		0 & \cdots & 0 & 0 &  \cdots & -S(I_n \omega_n)
	\end{bmatrix}
	
	\begin{bmatrix}
		v_1 \\ v_2 \\ \vdots \\ v_n \\
		\omega_1 \\ \omega_2 \\ \vdots \\ \omega_n
	\end{bmatrix}
	+
	\begin{bmatrix}
		g_1 \\ g_2 \\ \vdots \\ g_n \\ 0 \\ \vdots \\ 0
	\end{bmatrix}
	=
	\begin{bmatrix}
		f_1 \\ f_2 \\ \vdots \\ f_n \\ n_1 \\ n_2 \\ \vdots \\ n_n
	\end{bmatrix}
	,
$$
where $g_i = \begin{bmatrix}0 & 0 & m_i g_0 \end{bmatrix}^\top$ and $S(x)$ denotes the skew-symmetric form of a vector. These equations show the dynamics of  $n$ separate links, meaning the connection of the links is not present in the dynamics. We show these dynamics in a compact form as
$$
	D \dot{z} + S z + g = F .
$$
We note that $z = J \dot{q}$. Also, we multiply the equation in $J^\top$ from the left side to get
$$
	\begin{align}
		J^\top D ( J \ddot{q} + \dot{J} \dot{q} ) + J^\top S ( J \dot{q} ) + J^\top g &= J^\top F 
		\Rightarrow \\
		( J^\top D J ) \ddot{q} + ( J^\top D \dot{J} + J^\top S J ) \dot{q} + J^\top g &= J^\top F
		\Rightarrow \\
		M (q) \ddot{q} + C (q, \dot{q}) \dot{q} + G &= \tau . 
	\end{align}
$$
This final form is what often appears in the literature. We can also prove a useful identity that can be used later, for example for deriving the dynamics of the momentum of the leg.
$$
	\begin{align}
		C + C^\top = J^\top D \dot{J} + J^\top S J + \dot{J}^\top \underbrace{D^\top}_{= D} J + J^\top S^\top J
		\Rightarrow \\
		C + C^\top = ( J^\top D \dot{J} + \dot{J}^\top D J ) + \underbrace{J^\top ( S + S^\top ) J}_{= 0} = \dot{M} 
	\end{align}
$$
a