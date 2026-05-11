---
layout: note
title: "Monte Carlo Methods"
date: 2026-03-07
excerpt: "Monte Carlo methods are ways of solving reinforcement learning problems based on averaging sample returns. They require only experience, not complete knowledge of the environment."
---

#RL #Learning #computer-science #Control

We want to go one step further than [DP](/notes/Computer Science/Reinforcement Learning/Dynamic Programming/) algorithms. Here, we do not assume complete knowledge of the environment. Monte Carlo methods require only _experience_. Monte Carlo methods are ways of solving the reinforcement learning problem based on averaging sample returns. Monte Carlo methods sample and average returns for each state-action pair and average rewards for each action.
## Monte Carlo Prediction
Suppose we have a policy $\pi$ and we want to estimate the value $v_{\pi} (s)$. We start by actually running the controller. Each time we go through a state is called a _visit_. Monte Carlo methods can be _first-visit_ or _every-visit_, which determines which visits they consider for calculating the return. First-visit Monte Carlo methods only consider the first time a state is visited in an episode for calculating the return of that state. Both methods converge to $v_{\pi} (s)$ as the number of visits goes to infinity.
One important feature of Monte Carlo methods is that they do not bootstrap. This means that they do not use the estimated value of other states for estimating the value of a state.
## Monte Carlo Estimation of Action Values
Estimating the values of the states alone is not enough for choosing an action if no model of the environment is available. Instead, we have to estimate action values. After that, any policy that is greedy with respect to the action value is an improving policy.
The Monte Carlo methods for estimating action values are essentially the same as before; only this time the return is calculated for each pair of state and action $(s, a)$ every time a pair is visited. An state-action pair is said to be visited if the state $s$ is visited in an episode and action $a$ is taken in it.
The problem may seem to be solved now, but one issue still exists. Many state-action pairs may never be visited. For example, if the policy is deterministic, it is always going to choose a specific action in a state, and other actions are never tested in that state. This is the same problem of maintaining exploration. There are several ways to handle this issue.
One method we can use is called _exploring starts_. We can specify the episodes to be started in a state-action pair and give all the pairs a non-zero probability of being chosen. However, this method can only be implemented in some scenarios, such as simulations. In scenarios like real-world problems, this is probably not possible.
Another solution is to have a _soft_ policy. A soft policy is a policy which gives all actions a non-zero probability of being chosen in a given state. An example of these policies is $\epsilon$-greedy policies. We'll talk more about these in the next sections.
## Monte Carlo Control
We can now completely solve the RL problem using Monte Carlo methods. We start with an initial policy. Using [#Monte Carlo Estimation of Action Values](/notes//#monte-carlo-estimation-of-action-values) we calculate the action value of our policy. After that, we perform one step of policy improvement by making the new policy greedy with respect to the estimated action value.
One issue is that we know that Monte Carlo estimations of action values only converge to the true value in an infinite number of steps. This is not feasible for implementation. One solution is to actually move one to the _policy improvement_ step before the _policy evaluation_ step is completely converged. An extreme case of this is the _value iteration_ technique, which only performs one iteration of policy evaluation.

## Monte Carlo Control without Exploring Starts
As we mentioned earlier, it is important that every state-action pair is visited so that the Monte Carlo estimation of the returns can converge. We saw that one solution was to use _exploring starts_. Another solution was to make the policy _soft_. In fact, most _on-policy_ methods use soft policies to maintain exploration. They can then gradually shift to be more deterministic to get closer to optimality. An _$\epsilon$-soft_ policy is a policy in which all actions have a probability of being chosen that is higher than $\frac{\epsilon}{| \mathcal{A} (s)|}$ ($\pi (a | s) \geq \frac{\epsilon}{| \mathcal{A} (s) |}$). Among $\epsilon$-soft policies, $\epsilon$-greedy policies (with respect to $q_{\pi} (s)$) are optimal, meaning that their expected value is more than any other policy.

## Off-Policy Prediction based on Importance Sampling
Suppose that we wish to estimate the value of a policy, but our samples are generated using another policy. For example, we want to estimate $v_{\pi}$ or $q_{\pi}$, but the samples are generated following policy $\mu$, where $\mu \neq \pi$. We call $\pi$ the _target policy_ and $\mu$ the _behavior policy_. This problem is called _off-policy_ learning.
To ensure convergence, we have to ensure that any action taken under $\pi$ is also occasionally taken under $\mu$. This is called the assumption of _coverage_. We basically require that $\pi (a | s) > 0$ indicate $\mu (a | s)$. 
The technique we are going to use here is called _importance sampling_. Importance sampling is a general method for estimating expected values under one distribution given samples from another. 
The probability of a state-action trajectory is given as

$$
	\Pi_{k = t}^{T - 1} \pi (A_k | S_k) p (S_{k + 1} | S_k, A_k) .
$$

The importance sampling ratio is defined as

$$
	\rho _t^T = \frac{\Pi_{k = t}^{T - 1} \pi (A_k | S_k) p (S_{k + 1} | S_k, A_k)}{\Pi_{k = t}^{T - 1} \mu (A_k | S_k) p (S_{k + 1} | S_k, A_k)} = 
	\Pi_{k = t}^{T - 1} \frac{\pi (A_k | S_k)}{\mu (A_k | S_k)} .
$$

An interesting property of the importance sampling ratio is that it does not depend on the MDP ($p(S_{k + 1} | S_k, A_k)$) at all.
To estimate the value we can now simply scale the return by the importance sampling ratio and average the result:

$$
	V (s) = \frac{\sum_{t \in \mathcal{T} (s)} \rho_t^{T (t)} G_t}{| \mathcal{T} (s) |} ,
$$

where $\mathcal{T} (s)$ is the set of all timesteps in which state $s$ is visited and $T(t)$ is the first termination time following $t$. The equation above is called _ordinary importance sampling_. There is another type of importance sampling that calculates

$$
	V (s) = \frac{\sum_{t \in \mathcal{T} (s)} \rho_t^{T (t)} G_t}{\sum_{t \in \mathcal{T} (s)} \rho_t^{T (t)}} .
$$

This is called _weighted importance sampling_. Weighted importance sampling is actually biased in the statistical sense, but it usually has dramatically lower variance and is generally preferred. 
We saw that for the on-policy Monte Carlo method to be effective, the policy has to be $\epsilon$-soft (actually it doesn't _have to be_ $\epsilon$-soft, but this is the simplest and most straight-forward solution). We can now see the benefit of off-policy methods. We can require the behavior policy to be $\epsilon$-soft and then have a greedy policy as our actual main policy so that it is more optimal.















Sources:
1. [Reinforcement Learning: An Introduction by Sutton](https://epubs.siam.org/doi/pdf/10.1137/21N975254#page=7)