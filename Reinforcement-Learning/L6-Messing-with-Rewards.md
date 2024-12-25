# L6: Messing with Rewards

These are my personal lecture notes for Georgia Tech's [Reinforcement Learning course (CS 7642, Spring 2024)](https://omscs.gatech.edu/cs-7642-reinforcement-learning) by Charles Isbell and Michael Littman. All images are taken from the course's lectures unless stated otherwise.

# References and further readings

- Ng, A. Y., Harada, D., & Russell, S. (1999, June). Policy invariance under reward transformations: Theory and application to reward shaping. In Icml (Vol. 99, pp. 278-287).
- Asmuth, J., Littman, M. L., & Zinkov, R. (2008, July). Potential-based Shaping in Model-based Reinforcement Learning. In AAAI (pp. 604-609).
- Sutton, R. S., & Barto, A. G. (2018). Reinforcement learning: An introduction. MIT press.
        
    Chapters: 3.1-3.8(Reread), 4.1-4.8(Reread), 17.4

# Table of Contents

- [Changing the reward function without changing the optimal policy](#changing-the-reward-function-without-changing-the-optimal-policy)
    - [Multiply the reward by a (positive) scalar](#multiply-the-reward-by-a-positive-scalar)
    - [Add a scalar](#add-a-scalar)
    - [Reward shaping](#reward-shaping)
        - [Example: a soccer game](#example-a-soccer-game)
- [Potential-based shaping](#potential-based-shaping)
    - [The optimal policy is not changed](#the-optimal-policy-is-not-changed)
- [Q-learning with potentials](#q-learning-with-potentials)

# Changing the reward function without changing the optimal policy

- In other words, we want to change $R$ without changing $Q^*$ or $\pi^*$.
-Examples:
    - Multiply the reward by a positive constant
    - Add a constant to the reward
    - Non-linear potential-based shaping (reward shaping)

## Multiply the reward by a (positive) scalar

Consider the following Q-function:

$Q(s,a) = R(s,a) + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q(s',a')$

If we multiply the reward by $c$, we will get $R'$:

$R'(s,a) = cR(s,a)$, and the new Q-function, $Q'$, will be:

$Q'(s,a) = cQ(s,a)$

- Intuitively, each of the future rewards will be scaled by $c$ as well, so the Q-values in the 2nd term of the equation will be scaled by $c$. 
- This means that everything on the right-hand side of the Q-function will be scaled by $c$. Hence we will get $cQ(s,a)$.
- Let's see if the Q-function is still optimal after this transformation.
$\begin{align}
Q'(s,a) &= cR(s,a) + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q'(s',a')\\
cQ(s,a) &= cR(s,a) + \gamma\sum_{s'}T(s,a,s')\max_{a'}cQ(s',a')\\
cQ(s,a) &= cR(s,a) + c\gamma\sum_{s'}T(s,a,s')\max_{a'}Q(s',a')\\
Q(s,a) &= R(s,a) + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q(s',a')
\end{align}$

    - In step 3, we can take $c$ out of the max because it is a constant and max does not depend on $c$. Then, we can take $c$ out of the sum because it is being applied to each term in the sum.
    - In step 4, we can cancel out $c$ from both sides to get the original Q-function. This means that the Q-function is still optimal after the scaling.

## Add a scalar

If we add a scalar to the reward, we will get $R'$:

$R'(s,a) = R(s,a) + c$

The new Q-function, $Q'$, will be:

$\displaystyle Q'(s,a) = Q(s,a) + \frac{c}{1-\gamma}$

- Intuitively, each of the future rewards will be increased by $c$, so we get a total increase of $C + \gamma C + \gamma^2 C + \ldots = \frac{c}{1-\gamma}$.
- Let's see if the Q-function is still optimal after this transformation.
$\begin{align}
\tag{1} Q'(s,a) &= R'(s,a) + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q'(s',a')\\
\tag{2} Q(s,a) + \frac{c}{1-\gamma} &= R(s,a) + c + \gamma\sum_{s'}T(s,a,s')\max_{a'}[Q(s',a') + \frac{c}{1-\gamma}]\\
\tag{3} Q(s,a) + \frac{c}{1-\gamma} &= R(s,a) + c + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q(s',a') + \frac{c\gamma}{1-\gamma}\\
\tag{4} Q(s,a) + \frac{c}{1-\gamma} &= Q(s,a) + c + \frac{c\gamma}{1-\gamma}\\
\tag{5} \frac{c}{1-\gamma} &= c + \frac{c\gamma}{1-\gamma}\\
\tag{6} c &= c - c\gamma + c\gamma\\
\tag{7} c &= c
\end{align}$

    - In step 3, we can take $\frac{c}{1-\gamma}$ out of the max because the maximum term will always carry the same constant. Then, we can take $\frac{c}{1-\gamma}$ out of the sum because the weighted sum of this term (weighted by $T$) is simply the term itself. We also multiply the term by $\gamma$ after taking it out of the sum.
    - In step 4, the 1st and the 3rd terms on the right-hand side are the original Q-function.
    - In step 5, we can cancel out $Q(s,a)$ from both sides.
    - Rearranging the terms, we will get the constant $c$ on both sides.

## Reward shaping

- Reward shaping is a technique to change the reward function without changing the optimal policy (Like the previous two examples).
- The idea is to give hints (some small rewards) to the agent in every step to guide it towards the goal instead of just giving a reward at the end.

### Example: a soccer game

- Score +100 if the ball goes into the goal
- Shaping reward:
    - $+\frac{1}{\text{distance}}$ if agent is near the ball
    - $-\frac{1}{\text{distance}}$ if ball is near the goal
- One problem though: The agent might exploit the shaping reward (e.g. keep kicking the ball back and forth to get more rewards) and not reach the goal.
- We can avoid creating such a suboptimal positive feedback loop by doing **potential-based shaping**.

# Potential-based shaping

- Instead of giving the agent a reward, we give it a bonus based on the pontentials of the states it enters and leaves.
- The potential function, $\psi(s)$: Each state has a "potential" (think of this as the "earning potential" of a state).
- For example, consider the soccer game above. When the agent's distance to the goal changes from 10 to 5, 
    - We may give the agent a reward of $+\frac{1}{5}$.
    - But we can also give the agent a potential-based bonus, which involves $+\psi(s')$ and $-\psi(s)$:
    
        For entering state $s'$ from state $s$, the bonus is: $+\psi(s')$ (it gains the potential of the state $s'$). For leaving state $s$, the bonus is: $-\psi(s)$ (it loses the potential of the state $s$).

## The optimal policy is not changed

If we add a potential-based bonus to the reward, the new reward for transitioning from $s$ to $s'$ will be:

$R'(s,a,s') = R(s,a) - \psi(s) + \gamma\psi(s')$

- For subsequent transitions, the bonus is added in the same way: For every transition, we add a total bonus of  $-\psi(s^{current}) + \gamma\psi(s^{next})$

- So the total return is:

    $Q'(s,a) = R + \gamma R + \gamma^2 R + \ldots + -\psi(s) + \gamma\psi(s') + \gamma(-\psi(s') + \gamma\psi(s'')) + \gamma^2(-\psi(s'') + \gamma\psi(s''')) - \ldots$

    All the bonus terms in the middle cancel out:
    
    $Q'(s,a) = Q(s,a) - \psi(s) + \gamma^\infty\psi(s^\infty)$   

    $\gamma^\infty$ is zero because $\gamma < 1$. So we have:

    $Q'(s,a) = Q(s,a) - \psi(s)$

-  Let's see if the Q-function is still optimal after this transformation (i.e. the optimal policy is not changed).

    $\begin{align}
    \tag{1} Q'(s,a) &= R'(s,a) + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q'(s',a')\\
    \tag{2} Q(s,a) - \psi(s) &= \sum_{s'}T(s,a,s')[R(s,a) - \psi(s) + \gamma\psi(s')] + \gamma\sum_{s'}T(s,a,s')\max_{a'}[Q(s',a') - \psi(s')]\\
    \tag{3} Q(s,a) - \psi(s) &= \sum_{s'}T(s,a,s')[R(s,a) - \psi(s) + \gamma\psi(s') + \gamma\max_{a'}[Q(s',a') - \psi(s')]]\\
    \tag{4} Q(s,a) - \psi(s) &= \sum_{s'}T(s,a,s')[R(s,a) - \psi(s) + \gamma\max_{a'}Q(s',a')]\\
    \tag{5} Q(s,a) - \psi(s) &= R(s,a) - \psi(s) + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q(s',a')\\
    \tag{6} Q(s,a) &= R(s,a) + \gamma\sum_{s'}T(s,a,s')\max_{a'}Q(s',a')
    \end{align}$

# Q-learning with potentials

Q-learning update rule with potentials:

$\displaystyle Q(s,a) \leftarrow Q(s,a) + \alpha_t[r - \psi(s) + \gamma\psi(s') + \gamma\max_{a'}Q(s',a') - Q(s,a)]$

- As shown previously, the optimal policy is not changed by adding potentials to the reward. In other words, the update will eventually converge to the optimal Q-values regardless of the values of the potentials.

- However, the values of the potentials can affect the convergence speed: If the potentials are set such that they guide the agent towards the goal, the agent will learn faster.
- Suppose we can set the potential function such that 

    $\psi(s) = \max_{a}Q^*(s,a)$. 

    (This is probably not possible in practice during Q-learning because we don't know the optimal Q-values in advance, but let's assume we can do it for now.)

    As shown before, $Q'(s,a) = Q(s,a) - \psi(s)$. The optimal Q-function $Q^*(s,a)$ will also be shifted by the potential as follows:

    $Q(s,a) = Q^*(s,a) - \psi(s)$

    $Q(s,a) = Q^*(s,a) - \max_{a}Q^*(s,a)$

    $Q(s,a) = Q^*(s,a) - Q^*(s,a^*)$

    Therefore, if the optimal action is chosen, the Q-value will be zero, and negative if any suboptimal action is chosen:

    $\begin{align}
    \notag
        Q(s,a) \begin{cases}
        =0 & \text{if a is optimal, i.e. } a=a^*\\
        <0 & \text{otherwise}
        \end{cases}
    \end{align}$

    This means that if we initialize the Q-values to zero, for the optimal actions we are already starting off with the optimal Q-values. (It is like we are initializing the Q-values to the optimal Q-values shifted by the potentials as shown above.) For suboptimal actions, even though we are starting off with zero, once the agent takes these actions and finds out that they are suboptimal, the Q-values will become negative.

- With the right Q-function initialization (or potential-based shaping), it is like giving the agent some *knowledge* about where to start the learning. This can help the agent learn faster.

