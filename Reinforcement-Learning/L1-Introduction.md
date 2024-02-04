# L1-Introduction

These are my personal lecture notes for Georgia Tech's [Reinforcement Learning course (CS 7642, Spring 2024)](https://omscs.gatech.edu/cs-7642-reinforcement-learning) by Charles Isbell and Michael Littman. All images are taken from the course's lectures unless stated otherwise.

# References and further readings

- Littman, M. L. (1996). Algorithms for sequential decision-making. Brown University. (Chapter 1)
- Sutton, R. S., & Barto, A. G. (2018). Reinforcement learning: An introduction. MIT press.
        
    Chapters: 1.1-1.4, 1.6-1.7, 3.1-3.8, 16.1-16.8

# Table of Contents

- [Introduction](#introduction)
- [Markov Decision Process (MDP)](#markov-decision-process-mdp)
    - [Properties of MDP](#properties-of-mdp)
    - [Policy - the solution to MDP](#policy---the-solution-to-mdp)
- [Reward](#reward)
- [Sequences of Rewards](#sequences-of-rewards)
    - [Assumptions](#assumptions)
    - [Infinite horizon problem and solution: discounted rewards](#infinite-horizon-problem-and-solution-discounted-rewards)
- [More on Policies](#more-on-policies)
    - [Bellman Equation](#bellman-equation)
        - [Finding policy $\pi^*$](#finding-policy-pi)
- [Variants of Bellman equation](#variants-of-bellman-equation)
    - [Value function $V$](#value-function-v)
    - [Quality function $Q$](#quality-function-q)
    - [Continuation function $C$](#continuation-function-c)
    - [Relationship between $V$, $Q$ and $C$](#relationship-between-v-q-and-c)

# Introduction

- Supervised Learning
    - $y = f(x)$
    - Given $x$ (data) and $y$ (label), learn $f$ (model)
    - It is about function approximation
- Unsupervised Learning
    - $y = f(x)$
    - Given $x$ (data), learn $f$ (model) and $y$ (label)
    - It is about clustering or describing the data
- Reinforcement Learning
    - $y = f(x)$ and $z$
    - Given $x$ (state) and $z$ (reward), learn $f$ (optimal policy) and $y$ (action)

# Markov Decision Process (MDP)

- Markov Decision Process (MDP) is a mathematical framework for modeling decision making
- MDP captures uncertainty during decision making
- MDP contains the following components:
    - $S$: a set of states
    - $T(s, a, s')$: state transition function (the rules/ model of the "world")
        - It's probabilistic, $T\approx P(s'|s, a)$
    - $A(s)$: a set of actions available in state $s$
    - $R$, $R(s)$, $R(s, a)$ or $R(s, a, s')$: reward function
- The goal state is called the terminating state (or absorbing state)

## Properties of MDP
- Markovian property
    - The future is independent of the past
    - The present state captures all relevant information from the history
    - Markovian property allows us to solve MDP problems in a tractable way
- Stationary world
    - The transition function $T$ does not change over time

## Policy - the solution to MDP
- Policy, $\pi$:
    - a mapping from states to actions
        - $\pi(s) = a$
    - Optimal policy, $\pi^*$: policy that maximizes the expected return (sum of rewards over time)

# Reward

- The reward $R(s)$ is the immediate reward for entering the state $s$. (If $R$ is expressed as $R(s,a)$, it is the reward for taking action $a$ in state $s$. We will talk about it later.)
- Delayed reward: an action may affect not only the immediate reward but also the future rewards
    - minor changes matter!
- Temporal credit assignment problem: how to assign credit to actions that lead to the reward

# Sequences of Rewards

## Assumptions

- Infinite horizon
    - The agent has infinite time(steps) to interact with the environment (Otherwise, the policy will not be stationary, i.e. $\pi$ will change depending on how much time is left. In this case, the policy will be a function of both state and time: $\pi(s, t)$)
- Utility of sequences
    - Stationary preferences:
	    The agent's preferences over sequences of rewards do not change over time:
	
	    If $U(s_0, s_1, s_2, \dots) > U(s_0', s_1', s_2', \dots)$,         
	    then $U(s_1, s_2, \dots) > U(s_1', s_2', \dots)$
    
    - Utility $U$ of sequences is the sum of rewards:

        $\displaystyle U(s_0, s_1, s_2, \dots) = \sum_{t=0}^{\infty} R(s_t)$

## Infinite horizon problem and solution: discounted rewards

- The problem with the above utility equation is that the sum is infinite because of infinite time. To solve this problem, we can use discounting:

    $\displaystyle U(s_0, s_1, s_2, \dots) = \sum_{t=0}^{\infty} \gamma^t R(s_t)$

    where $0 \leq \gamma < 1$ is the discount factor 

    - $\gamma = 0$: only cares about the immediate reward
    - $\gamma$ close to 1: cares more about the future rewards
- Note that the above equation is a geometric series ($U = \gamma^0 R_0 + \gamma^1 R_1 + \gamma^2 R_2 + \dots$)
    - Therefore, with discounting, $U$ is bounded: 

        $U \leq \displaystyle \sum_{t=0}^{\infty} \gamma^t R_{max} =  \frac{R_{max}}{1-\gamma}$

        where $R_{max}$ is the largest possible reward.
    - By introducing discounting, we can get a finite value for an infinite sequence!

    > The bound of geometric series can be derived as follows:
    >
    > $U \leq \displaystyle \sum_{t=0}^{\infty} \gamma^t R_{max}$
    >
    > i.e. $U \leq \gamma^0 R_{max} + \gamma^1 R_{max} + \gamma^2 R_{max} + \dots$
    >
    > Let $\Gamma = \gamma^0 + \gamma^1 + \gamma^2 + \dots$
    > 
    > We can rewrite it as: 
    >
    > $\Gamma = \gamma^0 + \gamma(\gamma^0 + \gamma^1 + \dots)$
    >
    > Consider $\Gamma$ as a recursive function, we have:
    >
    > $\Gamma = \gamma^0 + \gamma \Gamma$
    >
    > $\Gamma - \gamma \Gamma = \gamma^0$
    >
    > $\Gamma = \frac{\gamma^0}{1-\gamma} = \frac{1}{1-\gamma}$
    >
    > Therefore, $U \leq \displaystyle \sum_{t=0}^{\infty} \gamma^t R_{max} =  \frac{R_{max}}{1-\gamma}$

# More on Policies

- Optimal policy:

    $\displaystyle \pi^* = \arg\max_{\pi} \mathbb{E}\left[ \sum_{t=0}^{\infty} \gamma^t R(s_t) \mid \pi \right]$

- Given a policy $\pi$, the utility of a state $s$ is:

    $\displaystyle U^{\pi}(s) = \mathbb{E}\left[ \sum_{t=0}^{\infty} \gamma^t R(s_t) \mid \pi, s_0 = s \right]$,

    where $s_0$ is the initial state. Note that $U^{\pi}(s)$ is the expected utility, not the immediate reward $R(s)$.
- Given a state $s$, the optimal action $a^*$ can be found by:

    $\displaystyle \pi^*(s) = \arg\max_{a} \sum_{s'} T(s, a, s') U^{\pi^*}(s')$

    where $U^{\pi^*}(s')$ is the *true utility* of the next state $s'$ based on $\pi^*$.
    
    **For simplicity, we will write $U^{\pi^*}$ as $U$ from now on.**

# Bellman Equation

- The above equation for $U^\pi(s)$ is essentially the expected value for the sum of rewards from $t=0$ to $\infty$. We can get rid of $\mathbb{E}$ by including the immediate reward $R(s)$ and the transition function $T(s, a, s')$ in the equation. For example, the equation for $U(s)$ (based on optimal policy) can be rewritten as:

    $\displaystyle U(s) = R(s) + \gamma \max_{a} \sum_{s'} T(s, a, s') U(s')$

    - Now we get everything of MDP ($s$, $a$, $R(s)$, $T(s, a, s')$, $\gamma$) in the equation!
    - This is the **Bellman Equation**.
    - You can think of this equation as a recursive function: $U(s)$ is a function of $U(s')$.
    - The first term is the immediate reward $R(s)$. The second term is the delayed reward, calculated from the utility we'll get if we take the optimal action $a^*$ according to  $\pi^*$.
    - Note that $a^*$ is chosen by the max argument. We don't need to determine what action to take.

## Finding policy $\pi^*$

- If we have $n$ states, we have $n$ equations of $U(s)$. For each equation, we have $n$ unknowns ($U(s')$). However, we cannot solve this system of equations using linear algebra because the max function is nonlinear. 
- Instead, we can solve it using **value iteration** or **policy iteration**

### Value iteration

1. Start with arbitrary utilities
2. Update utilities based on neighbors' utilities (Bellman equation)

    i.e. the estimated utility of a state $\hat U(s)$ at iteration $i+1$ is:

    $\displaystyle \hat U_{i+1}(s) = R(s) + \gamma \max_{a} \sum_{s'} T(s, a, s') \hat U_i(s')$
3. Repeat until convergence (until the utilities do not change much)
4. Once we have the utilities, we can find the optimal policy $\pi^*$ by:

    $\displaystyle \pi^*(s) = \arg\max_{a} \sum_{s'} T(s, a, s') \hat U(s')$

> Why does value iteration work?
>
> - The immediate reward $R(s)$ is known and true. (Only $\hat U$ is estimated.) 
> - So in each iteration, we are updating $\hat U$ with a true value $R(s)$, i.e. we are propagating the true value to the neighbors.
> - Therefore, even we start with arbitrary utilities, the utilities will get closer and closer to the true values.

> Remember that the goal here is to find $\pi^*$, utilities don't need to be accurate as long as they are good enough for us to choose the optimal action at each state.


#### Exercise
Find $\hat U_1(x)$ and $\hat U_2(x)$ in the following 3-by-4 grid world, given

- current state $x$: you are at $(1, 3)$
- $T(s, a, s')$ for going in the intended direction = 0.8; for directions perpendicular to the intended direction = 0.1
- $R(s) = -0.04$ for all $s$, except $R(1, 4) = 1$ and $R(2, 4) = -1$
- $\hat U_0(s) = 0$ for all $s$ (arbitrary utilities)
- $\gamma = 0.5$

```
---------------------------------
|       |       |   x   |  +1   |
|       |       |       |       |
---------------------------------
|       |||||||||       |  -1   |
|       |||||||||       |       |
---------------------------------
|       |       |       |       |
|       |       |       |       |
---------------------------------
```

Hint:

$\hat U_{i+1}(s) = R(s) + \gamma \max_{a} \sum_{s'} T(s, a, s') \hat U_i(s')$

> Answers:
> 
> $\hat U_1(x) = -0.04 + 0.5(0.8 \times 1 + 0.1 \times 0 + 0.1 \times 0) = 0.36$
>
> $\hat U_2(x) = -0.04 + 0.5(0.8 + 0.036 + (-0.004)) = 0.376$

### Policy iteration

1. Start with guess $\pi_0$ (random state-action pairs)
2. Evaluate the current policy $\pi_i$ by utility

    Calculate $U^{\pi_i}$ (written as $U_i$ below)

3. Improve the policy with actions that maximize the utilities calculated in step 2

    $\displaystyle \pi_{i+1} = \arg\max_{a} \sum_{s'} T(s, a, s') U_i(s')$

- To find $U_i$:

    $\displaystyle U_i(s) = R(s) + \gamma \sum_{s'} T(s, \pi_i(s), s') U_i(s')$

    > **Note that this is different from the utility equation in value iteration:**
    > - We are not updating $U$ in every iteration like in value iteration, we are simply calculating $U_i$ based on the current policy $\pi_i$, not arbitrary utilities! (It's $U_i(s)$ here, not $U_{i+1}(s)$)
    > - We don't need the max function here. We are using the action $\pi_i(s)$ given by the current policy. The system of equations is linear here, so we can solve it using linear algebra.

# Variants of Bellman equation

## Value function $V$

- Just another name for the utility function $U$
- We will use $V$ from now on
- We will also use $R(s,a)$ instead of $R(s)$. We can rewrite $U$ as:  
    $\displaystyle V(s) = \max_{a} (R(s,a)+\gamma \sum_{s'} T(s, a, s') V(s'))$
- Note that the reward function $R$ is now inside the max function.

## Quality function $Q$

- $V(s)$ is a recursive function where the whole equation is repeated as $V(s')$:

    $\displaystyle V(s_1) = \max_{a_1} (R(s_1,a_1)+\gamma \sum_{s_2} T(s_1, a_1, s_2) (\max_{a_2} (R(s_2,a_2)+\gamma \sum_{s_3} T(s_2, a_2, s_3) \max_{a_3} (\dots]$
- Note that the repetition starts from the max function, which is needed to get the optimal action
- If we already know the initial action $a$, the repetition can start from the subsequent max function inside $V(s')$. We can rewrite the equation as $Q(s,a)$:

    $\displaystyle Q(s,a) = R(s,a) + \gamma \sum_{s'}T(s,a,s')\max_{a'}Q(s',a')$

- The Q function is more useful in reinforcement learning: no need to have direct access to $R$ and $T$; agent can learn $Q$ by experience

## Continuation function $C$

- The Q function can be repeated from $\gamma$. We can rewrite the equation as $C(s,a)$:

    $\displaystyle C(s,a) = \gamma \sum_{s'}T(s,a,s')\max_{a'}(R(s',a') + C(s',a'))$

## Relationship between $V$, $Q$ and $C$

Express $V$ in terms of...

- $Q$: $\displaystyle V(s) = \max_{a} Q(s,a)$
- $C$: $\displaystyle V(s) = \max_{a} (R(s,a) + C(s,a))$

Express $Q$ in terms of...

- $V$: $\displaystyle Q(s,a) = R(s,a) + \gamma \sum_{s'} T(s,a,s') V(s')$
- $C$: $\displaystyle Q(s,a) = R(s,a) + C(s,a)$

Express $C$ in terms of...

- $V$: $\displaystyle C(s,a) = \gamma \sum_{s'} T(s,a,s') V(s')$
- $Q$: $\displaystyle C(s,a) = \gamma \sum_{s'} T(s,a,s') \max_{a'} Q(s',a')$





