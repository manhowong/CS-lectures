# L4 Convergence: TD with Control

These are my personal lecture notes for Georgia Tech's [Reinforcement Learning course (CS 7642, Spring 2024)](https://omscs.gatech.edu/cs-7642-reinforcement-learning) by Charles Isbell and Michael Littman. All images are taken from the course's lectures unless stated otherwise.

# References and further readings

- Littman, M. L., & Szepesvári, C. (1996, July). A generalized reinforcement-learning model: Convergence and applications. In ICML (Vol. 96, pp. 310-318).
- Littman, M. L. (1996). Algorithms for sequential decision-making. Brown University. (Chapter 3)
- Sutton, R. S., & Barto, A. G. (2018). Reinforcement learning: An introduction. MIT press.
        
    Chapters: 7.1-7.2, 7.7, 12.1-12.5, 12.7, 12.10-12.13

# Table of Contents

# Bellman equations

- Two types of RL problems: prediction and control
- **Prediction**: given a policy, estimate the value function
- **Control**: find the optimal policy and the optimal value function. We need to consider **action** selection for this.

## Bellman equations WITHOUT action:

- $\displaystyle V(s) = R(s) + \gamma \sum_{s'} T(s, s')V(s')$

- Update rule for TD(0):

    $S_{t-1} \xrightarrow{R_t} S_t$

    - $\displaystyle V_{T}(s_{t-1}) = V_{T-1}(s_{t-1}) + \alpha_T \left[ R_{t} + \gamma V_{T-1}(s_{t}) - V_{T}(s_{t-1}) \right]$
    - $V_T(s) = V_{T-1}(s), \text{otherwise.}$

## Bellman equations WITH action:

- $\displaystyle Q(s, a) = R(s, a) + \gamma \sum_{s'} T(s, a, s')\max_{a'} Q(s', a')$

- Update rule for Q-learning (similar to TD(0)):

    $S_{t-1} \xrightarrow{a_{t-1}, r_t} S_t$

    - $\displaystyle Q_{T}(s_{t-1}, a_{t-1}) = Q_{T-1}(s_{t-1}, a_{t-1}) + \alpha_T \left[ r_{t} + \gamma \max_{a'} Q_{T-1}(s_{t}, a') - Q_{T-1}(s_{t-1}, a_{t-1}) \right]$
    - $Q_T(s, a) = Q_{T-1}(s, a), \text{otherwise.}$

- Approximations in Q-learning:
    1. If we knew the model, synchronously update:
        - $\displaystyle Q_{T}(s,a) = R(s,a) + \gamma \sum_{s'} T(s,a,s')\max_{a'} Q_{T-1}(s',a')$
    2. If we knew $Q^*$, sampling asynchronusly update:
        - $\displaystyle Q_{T}(s_{t-1},a_{t-1}) = Q_{T-1}(s_{t-1},a_{t-1}) + \alpha_T \left[ r_{t} + \gamma \max_{a'} Q^*(s_{t},a') - Q_{T-1}(s_{t-1},a_{t-1}) \right]$

# Bellman operator

- To make math notations cleaner, we can define a Bellman operator $B$:

    Let $B$ be an operator (mapping from value functions to value functions):

    $\displaystyle [BQ](s,a) = R(s,a) + \gamma \sum_{s'} T(s,a,s')\max_{a'} Q(s',a')$

- Think of $B$ as a function that takes a value function and returns a new value function. When we apply $B$ to $Q$, we get a new value function $BQ$ that follows $B$'s definition above.

- Therefore, when apply $B$ to $Q^*$, it's another way of writing the Bellman equation:

    $\displaystyle Q^* = BQ^*$

- $Q_T = BQ_{T-1}$ is another way of writing the value iteration algorithm.

