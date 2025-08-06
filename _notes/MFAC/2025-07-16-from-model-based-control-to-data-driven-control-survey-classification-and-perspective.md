---
layout: post
title: From Model Based Control To Data Driven Control, Survey, Classification And
  Perspective
---

#AdaptiveControl #DataDrivenControl

This paper is a survey of [Data-driven Control](data-driven-control).
>[! summary] Summary
>The paper starts with model-based controllers (MBC) and points out their need for an accurate or at least a good-enough model and proceeds to draw attention to the difficulty of deriving such a model. Four classes of systems are defined based on the accuracy of their model and data-driven control is then suggested as the solution to the most difficult classes to deal with.
>Different DDC (data-driven control) methods are categorized into 3 main catogories:
>1. Online data-based DDC
>	Several famous DDC methods in this category are mentioned:
>	1. ___SPSA___
>		Simultaneous perturbation stochastic approximation (SPSA) works like this: 
>		The controller serves as a function approximator whose structure is fixed. Its parameters are then tuned using system's I/O data. The inputs of the controller are
>		$$
>		y(k),y(k-1),...,y(k-M+1),u(k-1),u(k-2),...,u(k-n),y_d(k+1) 
>		$$
>		and $u(k)$ is its output. The aim of controller design is to minimize
>		$$
>		J-k(\theta_k)=E{(y(\theta_k,k+1)-y_d(k+1))^2}
>		$$
>		where $y_d(k+1)$ is the desired output at the next sample. $\theta_k$ is updated using
>		$$
>		\hat{\theta}_k=\hat{\theta_{k-1}}-a_k \hat{g_k (\hat{\theta-{k-1}})} 
>		$$
>		where $\hat{g_k (\hat{\theta-{k-1}})}$ is the estimation of simultaneous perturbation which is explained in [this survey](from-model-based-control-to-data-driven-control,-survey,-classification-and-perspective).
>		
>	2. ___MFAC___
>		A general SISO nonlinear system is considered as:
>		$$
> 		y(k+1)=f(y(k),...,y(k-n_y),u(k),...,u(k-n_u))
>		$$
>		A constant $L$ under the name _control input length constant of linearization_ has been introduced. Under two very simple assumptions (one of them being that the system has to be Lipschitz), an equivalent PFDL description is introduced:
>		$$
>		\Delta y(k+1) = \Phi^T(k) \Delta U(k)
>		$$
>		This equivalent system is then identified iteratively using a time-varying parameter estimation method. For example, using a modified projection algorithm, we can write:
>		$$
>		\hat{\phi}(k)=\hat{\phi}(k-1)+\frac{\eta_k \Delta u(k-1)}{\mu + \Delta^2 u(k-1)}(\Delta y(k)-\hat{\phi}(k-1)\Delta u(k-1))
>		$$
>		It is important to reset the estimator when $\hat{\phi} < \epsilon$ or $\Delta u(k-1) < \epsilon$.
>		The control law is then defined, usually by minimizing a cost function like
>		$$
>		J(u(k))=|y^\ast (k+1)-\hat{y}(k+1)|^2+\lambda|\Delta^2 U(k)|^2
>		$$
>		
>	3. ___UC___
>		Unfalsified control (UC) is a control method that recursively falsifies control parameter sets that fail to satisfy the performance specification. The main elements of UC are as follows: an invertible controller candidate set, cost-detectable performance specifications, and the switching mechanism.
>		Using I/O data of the system, a fictitious reference signal for each controller is computed and then each controller is evaluated using a control performance measure.
>		
>	4. a
>
>2. c
>3. c
>
>
>



a