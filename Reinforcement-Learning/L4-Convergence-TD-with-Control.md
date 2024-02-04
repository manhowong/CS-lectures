# L4 Convergence: TD with Control

These are my personal lecture notes for Georgia Tech's [Reinforcement Learning course (CS 7642, Spring 2024)](https://omscs.gatech.edu/cs-7642-reinforcement-learning) by Charles Isbell and Michael Littman. All images are taken from the course's lectures unless stated otherwise.

# References and further readings

- Littman, M. L., & Szepesvári, C. (1996, July). A generalized reinforcement-learning model: Convergence and applications. In ICML (Vol. 96, pp. 310-318).
- Littman, M. L. (1996). Algorithms for sequential decision-making. Brown University. (Chapter 3)
- Sutton, R. S., & Barto, A. G. (2018). Reinforcement learning: An introduction. MIT press.
        
    Chapters: 7.1-7.2, 7.7, 12.1-12.5, 12.7, 12.10-12.13

# Table of Contents

- [Bellman equations](#bellman-equations)
    - [Bellman equations WITHOUT action](#bellman-equations-without-action)
    - [Bellman equations WITH action](#bellman-equations-with-action)
- [Bellman operator](#bellman-operator)
- [Contraction mappings](#contraction-mappings)
    - [Contraction properties](#contraction-properties)
    - [Bellman operator contracts](#bellman-operator-contracts)
        - [Proof](#proof)
        - [Max is a non-expansion](#max-is-a-non-expansion)


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

    - Let $B$ be an operator (mapping from value functions to value functions):

        $\displaystyle [BQ](s,a) = R(s,a) + \gamma \sum_{s'} T(s,a,s')\max_{a'} Q(s',a')$

- Think of $B$ as a function that takes a value function and returns a new value function. When we apply $B$ to $Q$, we get a new value function $BQ$ that follows $B$'s definition above.

- Therefore, when apply $B$ to $Q^*$, it's another way of writing the Bellman equation:

    $Q^* = BQ^*$

- $Q_T = BQ_{T-1}$ is another way of writing the value iteration algorithm.

# Contraction mappings

- Let $B$ be an operator. If, for all value functions $F$, $G$ and some $\gamma \in [0, 1)$:

    $\left\| BF - BG \right\|_\infty \leq \gamma \left\| F - G \right\|_\infty$

    Then, $B$ is a contraction mapping.

- Intuition: The distance between $BF$ and $BG$ is always smaller than the distance between the original functions $F$ and $G$. This means that applying $B$ to the two value functions brings them closer to each other.
- The notation $\infty$: The infinity norm (or max norm) is used here. It finds the maximum absolute value of the elements in a vector. For example:

    $\displaystyle \left\| Q \right\|_\infty = \max_{s,a} \left| Q(s,a) \right|$

    This returns the state-action pair with the maximum absolute value.

- Therefore, the infinity norm here specifies the maximum difference between two value functions.

> Example: In the space of real numbers, which of the following operators are contraction mappings?
>
> 1. $\displaystyle B(x) = \frac{x}{2}$
> 2. $B(x) = x + 1$
> 3. $B(x) = x - 1$
> 4. $B(x) = (x + 100)\cdot 0.9$
>
> **Answer**: 1 and 4 are contraction mappings.
> - Let's say we have two real numbers $x$ and $y$.
> - For 1, $\displaystyle \left| B(x) - B(y) \right| = \left| \frac{x}{2} - \frac{y}{2} \right| = \frac{1}{2} \left| x - y \right| \leq \left| x - y \right|$
> - For 4, $\displaystyle \left| B(x) - B(y) \right| = \left| 0.9(x + 100) - 0.9(y + 100) \right| = 0.9 \left| x - y \right| \leq \left| x - y \right|$

## Contraction properties

- If $B$ is a contraction mapping, then:
    1. $F^* = BF^*$ has a solution and it is unique.
    
        (i.e. there is some function $F^*$ which stays the same when applying $B$ to it.)

    2. $F_T = BF_{T-1} \Rightarrow F_T \to F^*$

        (i.e. If we apply $B$ to a value function $F_{T-1}$, we get a new value function $F_T$. If we keep doing this, the value functions will converge to $F^*$.)

- For property 2, consider the following:

    - $\left\| BF_{T-1} - BF^* \right\|_\infty \leq \gamma \left\| F_{T-1} - F^* \right\|_\infty$
    - i.e. $\left\| F_T - F^* \right\|_\infty \leq \gamma \left\| F_{T-1} - F^* \right\|_\infty$
    - $F_T$ is converging to $F^*$ through the iterations.

## Bellman operator contracts

Bellman operator $B$:

$\displaystyle [BQ](s,a) = R(s,a) + \gamma \sum_{s'} T(s,a,s')\max_{a'} Q(s',a')$

Given $Q_1$ and $Q_2$, we can show that $B$ is a contraction mapping:

$\displaystyle \left\| BQ_1 - BQ_2 \right\|_\infty \leq \gamma \left\| Q_1 - Q_2 \right\|_\infty$

### Proof:

$\displaystyle \left\| BQ_1 - BQ_2 \right\|_\infty = \max_{s,a} \left| [BQ_1](s,a) - [BQ_2](s,a) \right|$

$\displaystyle = \max_{s,a} \left| \left( R(s,a) + \gamma \sum_{s'} T(s,a,s')\max_{a'} Q_1(s',a') \right) - \left( R(s,a) + \gamma \sum_{s'} T(s,a,s')\max_{a'} Q_2(s',a') \right) \right|$

$\displaystyle = \max_{s,a} \left| \gamma \sum_{s'} T(s,a,s')\max_{a'} Q_1(s',a') - \gamma \sum_{s'} T(s,a,s')\max_{a'} Q_2(s',a') \right|$

> For the same state-action pair, both $Q_1$ and $Q_2$ will have the same rewards and we can cancel them out.

$\displaystyle = \max_{s,a} \left| \gamma \sum_{s'} T(s,a,s')(\max_{a'} Q_1(s',a') - \max_{a'} Q_2(s',a')) \right|$

> Note that the $a'$ we'll get from the max terms are not necessarily the same for $Q_1$ and $Q_2$, so we keep the max functions separate.

$\displaystyle \leq \gamma \max_{s'} \left| \max_{a'} Q_1(s',a') - \max_{a'} Q_2(s',a') \right|$

> Here we don't need to consider the transition probabilities, but only care about the maximum difference between $Q_1$ and $Q_2$ at whatever state $s'$. 
>
> Also, we can use $max_{s'}$ instead of $max_{s,a}$ because we can simply select $s'$ instead of the state-action pair that leads to $s'$.
>
> The $\leq$ sign comes from the fact that we're taking the maximum difference over all states, while the previous step is taking the maximum difference over all state-action pairs.

$\displaystyle \leq \gamma \max_{s', a'} \left| Q_1(s',a') - Q_2(s',a') \right|$

> We can simplify the max functions $\max_{a'}$ and $\max_{s'}$ to just $\max_{s', a'}$. (See next section).

Recall that $\displaystyle \left\| Q_1 - Q_2 \right\|_\infty = \max_{s,a} \left| Q_1(s,a) - Q_2(s,a) \right|$

Therefore, $\displaystyle \left\| BQ_1 - BQ_2 \right\|_\infty \leq \gamma \left\| Q_1 - Q_2 \right\|_\infty$

### Max is a non-expansion




