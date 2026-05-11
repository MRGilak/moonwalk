---
layout: note
title: "Temporal-Difference Learning"
date: 2026-03-07
excerpt: "Temporal-difference learning combines elements of dynamic programming and Monte Carlo methods. It bootstraps, learning from experience without requiring a model of the environment."
---

#RL #Learning #computer-science #Control

Temporal-difference (TD) learning is kind of related to both [Dynamic Programming](/notes/Computer Science/Reinforcement Learning/Dynamic Programming/) and [Monte Carlo Methods](/notes/Computer Science/Reinforcement Learning/Monte Carlo Methods/) and tries to include the best features of both. TD methods bootstrap, similar to dynamic programming methods. They also don't require a model of the environment (MDP) and learn from experience, much like Monte Carlo methods.

## TD Prediction
Monte Carlo method suggests

$$
	V (S_t) \leftarrow V (s_t) + \alpha [ G_t - V (S_t) ] ,
$$

where $G_t$ is the return and $\alpha$ is a constant step-size parameter. This is called _constant-$\alpha$ MC_. The simplest TD method, called TD(0) suggests

$$
	V (S_t) \leftarrow V (s_t) + \alpha [ R_{t + 1} + \gamma V (S_{t + 1}) - V (S_t) ] .
$$

Because the estimate of $V (S_t)$ depends on the estimate of the values of other states, namely $V (S_{t + 1})$, we say that TD methods _bootstrap_. 
The target of Monte Carlo methods is an estimate, because they estimate the expected value from experience. Although the dynamics of the MDP are known,  the target of dynamic programming methods is also an estimate, because $v_{\pi} (S_{t + 1})$ is not known and $V (S_{t + 1})$ is used instead. The target of TD methods is an estimate in both manners.
MC and TD updates are called _sample backups_, because they involve looking at a sample successor state. This is in contrast with _full backups_ of DP methods.
The TD method has been proven to converge to $v_{\pi}$.

## Optimality of TD(0)
In practical scenarios a common approach is to present the experience repeatedly until the method converges. The increments specified by the two equations above are added together and only at the end, the value is updated. Then with this new value function, all the available experience is processed again. This is called _batch updating_.
Batch TD methods and batch MC methods are both optimal but in different senses. Batch MC methods find estimates that minimize the mean-squared error on the training set. On the other hand, batch TD methods find estimates that are correct for the maximum-likelihood model of the Markov process. This difference arises exactly because of using bootstrapping in TD methods.
_Note_: There is a very good example of this in Sutton's book, which gives much better intuition. It's example 6.4 of the book.
If the model formed from the observed data were indeed correct, the estimation of the value function using TD would be exactly correct. This is called the _certainty-equivalence estimate_ (if you're wondering, yes, this comes exactly from the literature of [Adaptive Control](/notes/Control/Adaptive Control/Adaptive Control/)).

## Sarsa: On-Policy TD Control
With the help of [#TD Prediction](/notes//#td-prediction), it is now easy to introduce TD control. As always, we use the notion of Generalized Policy Iteration (GPI).
We start with an arbitrary estimate of $Q$. At each state $S_t$, we take action an $A_t$ and observe the reward $R_{t + 1}$ and the next state $S_{t + 1}$. The state-action value is then updated as

$$
	Q (S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [ R_{t + 1} + \gamma Q (S_{t + 1}, A_{t + 1}) - Q (S_t, A_t) ] .
$$

This rule uses all the five elements of $S_t , A_t, R_{t + 1} , S_{t + 1} , A_{t + 1}$, hence the name _SARSA_. We then make our policy greedy with respect to this estimation of the action value function. 

## Q-Learning: Off-Policy TD Control
Q_learning is an off-policy method of TD control. In its simplest form, _one-step Q-learning_ is defined as

$$
	Q (S_t, A_t) \leftarrow Q (S_t, A_t) + \alpha [ R_{t + 1} + \gamma \max_{a} Q (S_{t + 1}, a) - Q (S_t, A_t) ]
$$

The learned action-value function, $Q$, directly estimates $q_{\ast}$ independent of the policy being followed. All that is needed for convergence of this method is that all state-action pairs be continually updated. $Q$ has been shown to converge, with probability of $1$, to $q_{\ast}$.

## Afterstates
Sometimes it is useful to use the notion of _afterstates_ instead of states. This typically happens when we know exactly what is going to happen after we take an action, but not what happens after that. A good example is a chess game. We know the position of every piece _after_ we take our action. In these cases, it might be useful to use these _afterstates_ and estimate their values instead of the values of the states themselves. This can especially help reduce a lot of computation and convergence time, because different states might produce the same afterstate.