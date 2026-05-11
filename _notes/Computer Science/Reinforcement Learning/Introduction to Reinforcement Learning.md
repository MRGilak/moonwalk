---
layout: note
title: "Introduction to Reinforcement Learning"
date: 2026-03-06
excerpt: "Reinforcement Learning (RL) involves learning to maximize a numerical reward signal."
---

#RL #Learning #computer-science 

This note is almost entirely based on the book [Reinforcement Learning: An Introduction by Sutton](https://epubs.siam.org/doi/pdf/10.1137/21N975254#page=7). I highly encourage reading the book itself for more detailed information and clear explanations. 

Reinforcement Learning (RL) refers to problems that involve learning what to do to maximize a numerical _reward_ signal.
The three most important features of RL problems are
1. being closed-loop, meaning the learning system’s actions influence its later inputs.
2. not having direct instructions as to what actions to take, but instead the agent must discover which actions yield the most reward by trying them out.
3. the consequences of actions, including reward signals, play out over extended time periods.
There are important differences between different types of learning.
- _Supervised learning_ is learning from a training set of labeled examples provided by an external supervisor. The object of this kind of learning is for the system to _extrapolate_, or _generalize_, so that it acts correctly in situations not present in the training set.
- _Unsupervised learning_ is typically about finding structures hidden in collections of unlabeled data.
- _Reinforcement learning_ on the other hand is trying to maximize a reward signal instead of trying to find hidden structure.
Having an explicit goal and dealing with the exploration-exploitation trade-off are of the most important aspects of RL.

# Elements of Reinforcement Learning
The four main sub-elements of a reinforcement learning systems are a _policy_, a _reward signal_ , a _value function_, and, optionally, a _model of the environment_.
1. A _policy_ defines the agent’s way of behaving at a given time. Roughly speaking, a policy is a mapping from perceived states of the environment to actions taken in those states.
2. A _reward_ signal defines the goal in an RL problem. The agent’s only objective is to maximize the total reward it receives over the long run.
3. The _value_ of a state is the expected total amount of reward an agent can accumulate in the future, starting from that state. Action choices are made based on value judgments. Rewards are basically given directly by the environment, but values must be estimated from the sequences of observations.
4. The final element of some RL systems is a _model of the environment_. This is something that mimics the behavior of the environment. Models are used for planning. RL methods that use models and planning are called _model-based_ methods, as opposed to _model-free_ methods that are explicitly trial-and-error learners.

You can continue to learn about reinforcement learning by taking a look at the classic multi-arm bandit example [here](/notes/Computer Science/Reinforcement Learning/Multi-arm Bandits/).

Sources:
1. [Reinforcement Learning: An Introduction by Sutton](https://epubs.siam.org/doi/pdf/10.1137/21N975254#page=7)