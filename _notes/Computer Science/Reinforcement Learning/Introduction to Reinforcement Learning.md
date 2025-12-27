---
layout: note
title: "Introduction to Reinforcement Learning"
date: 2025-09-12
excerpt: "#RL #Learning #computer-science"
---

#RL #Learning #computer-science 
Reinforcement Learning (RL) is simultaneously a problem, a class of solution methods that work well on the class of problems, and the field that studies these problems and their solution methods. Reinforcement learning problems involve learning what to do so as to maximize a numerical reward signal.
The three most important distinguishing features of reinforcement learning problems are
1. being closed-loop in an essential way, meaning the learning system’s actions influence its later inputs.
2. not having direct instructions as to what actions to take, but instead the agent must discover which actions yield the most reward by trying them out.
3. the consequences of actions, including reward signals, play out over extended time periods
There are important differences between different types of learning.
- Supervised learning is learning from a training set of labeled examples provided by a knowledgeable external supervisor. The object of this kind of learning is for the system to _extrapolate_, or _generalize_, its responses so that it acts correctly in situations not present in the training set
- Unsupervised learning is typically about finding structure hidden in collections of unlabeled data.
- Reinforcement learning on the other hand is trying to maximize a reward signal instead of trying to find hidden structure.
Having an explicit goal and dealing with the exploration-exploitation trade-off are of the most important aspects of RL.

# Elements of Reinforcement Learning
The four main subelements of a reinforcement learning systems are a _policy_, a _reward signal_ , a _value function_, and, optionally, a _model of the environment_.
1. A _policy_ defines the learning agent’s way of behaving at a given time. Roughly speaking, a policy is a mapping from perceived states of the environment to actions to be taken when in those states.
2. A reward signal defines the goal in a reinforcement learning problem. The agent’s sole objective is to maximize the total reward it receives over the long run. The reward signal is the primary basis for altering the policy
3. The _value_ of a state is the total amount of reward an agent can expect to accumulate over the future, starting from that state. Action choices are made based on value judgments. Unfortunately, it is much harder to determine values than it is to determine rewards. Rewards are basically given directly by the environment, but values must be estimated and re-estimated from the sequences of observations an agent makes over its entire lifetime.
4. The final element of some RL systems is a _model of the environment_. This is something that mimics the behavior of the environment, or more generally, that allows inferences to be made about how the environment will behave. Models are used for planning, by which we mean any way of deciding on a course of action by considering possible future situations before they are actually experienced.
	RL methods that use models and planning are called _model-based_ methods, as opposed to _model-free_ methods that are explicitly trial-and-error learners.

You can continue to learn about reinforcement learning by taking a look at the classic multi-arm bandit example [here](multi-arm-bandits).

Sources:
1. [Reinforcement Learning: An Introduction by Sutton](https://epubs.siam.org/doi/pdf/10.1137/21N975254#page=7)