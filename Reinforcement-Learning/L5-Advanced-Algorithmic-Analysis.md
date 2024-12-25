# L5 Advanced Algorithmic Analysis

These are my personal lecture notes for Georgia Tech's [Reinforcement Learning course (CS 7642, Spring 2024)](https://omscs.gatech.edu/cs-7642-reinforcement-learning) by Charles Isbell and Michael Littman. All images are taken from the course's lectures unless stated otherwise.

# References and further readings

- Littman, M. L., & Szepesvári, C. (1996, July). A generalized reinforcement-learning model: Convergence and applications. In ICML (Vol. 96, pp. 310-318).
- Littman, M. L. (1996). Algorithms for sequential decision-making. Brown University. (Chapter 3)
- Sutton, R. S., & Barto, A. G. (2018). Reinforcement learning: An introduction. MIT press.
        
    Chapters: 7.1-7.2, 7.7, 12.1-12.5, 12.7, 12.10-12.13

# Table of Contents

- [Value iteration (VI)](#value-iteration-vi)
    - [1. The policy converges to the optimal policy in a polynomial number of steps](#1-the-policy-converges-to-the-optimal-policy-in-a-polynomial-number-of-steps)
    - [2. When the value difference between any two consecutive iterations is small, we are close to the optimal policy](#2-when-the-value-difference-between-any-two-consecutive-iterations-is-small-we-are-close-to-the-optimal-policy)
    - [3. How long we run the value iteration is related to how close we are to the optimal policy](#3-how-long-we-run-the-value-iteration-is-related-to-how-close-we-are-to-the-optimal-policy)
- [Linear programming](#linear-programming)
    - [Writing the MDP as a linear program](#writing-the-mdp-as-a-linear-program)
    - [Primal and dual linear programs](#primal-and-dual-linear-programs)
- [Policy iteration (PI)](#policy-iteration-pi)
    - [Domination](#domination)
    - [Why does policy iteration work?](#why-does-policy-iteration-work)
        - [$B_2$ is monotonic](#b_2-is-monotonic)
        - [Value improvement](#value-improvement)
        - [Putting it all together](#putting-it-all-together)
        - [Another important property in PI](#another-important-property-in-pi)

# Value iteration (VI)

## 1. The policy converges to the optimal policy in a polynomial number of steps.

- There's some $t^*$ (less than infinity) that's polynomial in:
    - the size of the problem (the number of states $|S|$ and the number of actions $|A|$),
    - the magnitude of the rewards ($R_MAX = max_{s,a} |R(s,a)|$), 
    - $1/(1-\gamma)$, and 
    - bits of precision (e.g. number of bits that are used to specify the precision of the transition probabilities).

    If we run value iteration for $t^*$ steps, the policy $\pi(s)$ we get is optimal:
    $$\pi(s) = \arg\max_a Q_{t^*}(s,a)$$

    - Note that the policy is a greedy policy w.r.t. $Q_{t^*}$.

   - In other words, we don't need to run value iteration for an infinite number of steps, but only for a polynomial number of steps ($t^*$), and that will already give us a Q-function that is close enough to the optimal Q-function. We can then extract the optimal policy from that Q-function.
   - This is saying that once we fix the MDP and the precision (see the polynomial properties above), the value iteration will give us actions where the second best action is some distance (a fixed value gap that depends on the precision?) away from the best action. The separation of actions allows the policy to choose the best action.

## 2. When the value difference between any two consecutive iterations is small, we are close to the optimal policy.

- If the change in the value between two consecutive iterations is less than $\epsilon$ for all states in the MDP, 

    $\forall s, \text{if } |V_t(s) - V_{t+1}(s)| < \epsilon$

    then the maximum difference between the value function of the policy $\pi_{V_t}$ and the optimal value function is small:

    $\displaystyle \max_s |V^{\pi_{V_t}}(s) - V^*(s)| < \frac{2\epsilon \gamma}{1-\gamma}$

    Note: $V^{\pi_{V_t}}$ is the value function following the policy $\pi_{V_t}$, where $\pi_{V_t}$ is the greedy policy w.r.t. $V_t$.

    In other words, if you can get a good enough approximation of the optimal value function, then you know how much you're off from the optimal policy by just looking at the value difference between two consecutive iterations (you don't need to know what the optimal value function is!).

    **This helps us decide when is a good time to stop the value iteration!**

    > About $\gamma$:
    > - If we don't care so much about the future, we can set a smaller $\gamma$. Small $\gamma$ will make the value function converge faster (fewer iterations), since $t^*$ is polynomial in $1/(1-\gamma)$. 
    > - If we care a lot about the future and set a very large $\gamma$, the value function will take longer to converge.
    > - In other words, there's a **trade-off between the horizon of the problem (how much we care about the future) and the computational time**.

## 3. How long we run the value iteration is related to how close we are to the optimal policy.

If we run $k$ steps of value iteration (i.e. applying the Bellman operator $k$ times), the difference between two value functions $Q_1$ and $Q_2$ after $k$ steps is bounded as follows (constraction mapping. See Lesson 4):

$||B^K Q_1 - B^K Q_2||_\infty \leq \gamma^k ||Q_1 - Q_2||_\infty$

i.e. Value iteration brings the value functions closer. How close they are depends on the number of iterations.

# Linear programming

- Recall that the number of iterations is polynomial in $1/(1-\gamma)$. 
    - However, $1/(1-\gamma)$ is not really a polynomial in the bits of precision we need to represent $\gamma$ (e.g. we can specify a $\gamma$ that is very close to 1 with just a few bits of precision to cause the term $1/(1-\gamma)$ to explode).
    - So value iteration is not a polynomial-time algorithm for solving MDPs.

- **Linear programming** (LP) is a polynomial-time algorithm for solving MDPs.
- LP is an optimization technique that can be used to solve a problem with an objective function and a set of linear constraints.
- We can encode an MDP as a linear program and solve it using LP

## Writing the MDP as a linear program

- To solve a value function, we have a set of constraints to satisfy, one for each state $s$:   
        
    $\forall s: V_s = \max_a [R(s,a) + \gamma \sum_{s'} T(s,a,s') V_{s'}]$

- Since the max function is not a linear operator, the set of equations above is *non-linear*, and thus we can't solve it using LP.
 - However, we can specify the max operator as a set of **linear constraints** and an **objective function**. 
 
    > For example:
    >          
    >  - Let's say $x$ is the maximum value of a list of numbers:
    >      
    >       $\max (-3, 7, 2, 5) = x$
    >
    >  - We have the following constraints:
    >
    >       $x \geq -3$
    >        
    >       $x \geq 7$
    >        
    >       $x \geq 2$
    >        
    >       $x \geq 5$
    >
    >   - There is a set of $x$'s that satisfies all these constraints. To find the maximum value, we need to find the smallest $x$ among these $x$'s. Therefore, we can add an objective function to minimize $x$:
    >
    >       $\min x$

- Therefore, we can rewrite the above set of value constraints for each $s$ and $a$ as follows:

    $\forall s, a: V_s \geq R(s,a) + \gamma \sum_{s'} T(s,a,s') V_{s'}$

    - This is a set of linear constraints.
    - We can add an objective function to minimize the value of $V_s$ for *all* states $s$:
    
        $\displaystyle \min \sum_s V_s$
  
        > Note: We can't just do $\min V_s$ here because $V_s$ is a set of variables (one for each state $s$). To find the minimum $V_s$ among all states, an easy way is to sum all $V_s$ for all states first and then find the minimum of that sum.
        
- This is a linear program that we can use to solve the MDP.
- The advantage of LP is that it's easy to add other constraints to the problem.

## Primal and dual linear programs

- Another LP (called the **dual**) can be derived from the above LP (the original one, i.e. the **primal**).
    - Each variable in the primal becomes a constraint in the dual, and vice versa.
    - The objective direction is reversed.

Dual of the above LP:
- Objective function:

    $\displaystyle \max_{q_{sa}} \sum_s \sum_a q_{sa} R(s,a)$

    Here we want to maximize the rewards for all states and actions.

    $q_{sa}$ is what Michael calls the "Policy Flow" in the lecture (see below). Each state-action pair has a $q_{sa}$.

- Constraints:

    $\displaystyle 1 + \gamma \sum_s \sum_a q_{sa} T(s,a,s') = \sum_a q_{s'a}$ for all $s'$

    $q_{sa} \geq 0$ for all $s,a$

    The idea is that the total "policy flow" that arrives at a state $s'$ is equal to the flow that the state $s'$ can send out ($\sum_a q_{s'a}$) (think of it as a "conservation of the flow"). 
    
    We add a $1$ and discount the flow by $\gamma$ on the left-hand side to account for the MDP dynamics.

    The policy flow must be non-negative, so that we pass flow to the next states, we can't send all the flow to one state and send negative flow to the other states to balance the total flow.

- Intuitively, the dual LP is about finding a policy that has the "policy flow" distributed in a way that maximizes the rewards.

- The dual's algorithm is also polynomial, but it focuses on the policy (how the "flow" is distributed) rather than the value function.

# Policy iteration (PI)

Steps:

1. Initialize $Q_0$

    $\forall s: Q_0(s) = 0$

2. Policy improvement (greedy policy):

    $\forall s: \pi_t(s) = \arg\max_a Q_t(s,a)$ where $t \geq 0$

3. Policy evaluation:

    $Q_{t+1} = Q^{\pi_t}$

Note:

- $Q_t$ converges to $Q^*$
- Convergence is exact and complete in finite time
- Converges at least as fast as VI
-Trade off: PI is more computationally expensive than VI
    - The policy evaluation step is like a value iteration process
    - Open question: we only know the convergence time of PI is $\geq$ linear in $|S|$ and $\leq$ exponential in $|A|^{|S|}$, but we don't know the exact convergence time

## Domination

- A policy dominates another policy if it is better in at least one state and not worse in any other state:

    $\pi_1 \geq \pi_2$ i.f.f. 
    
    $\forall s: V^{\pi_1}(s) \geq V^{\pi_2}(s)$

- Strict domination:

    $\pi_1 > \pi_2$ i.f.f.
    
    $\forall s: V^{\pi_1}(s) \geq V^{\pi_2}(s)$ 
    
    $\land$ 
    
    $\exists s: V^{\pi_1}(s) > V^{\pi_2}(s)$

    (One policy is strictly better than the other in at least one state)

- A policy is $\epsilon$-optimal i.f.f.:

    $\forall s: |V^{\pi}(s) - V^{\pi^*}(s)| \leq \epsilon$

    (In other words, the policy is nearly as good as the optimal policy, and the loss/regret is bounded by $\epsilon$)

## Why does policy iteration work?

- Let's say we have two policies $\pi_1$ and $\pi_2$.

- We can update the value function $V$ by following $\pi_1$ and $\pi_2$ using the Bellman operators $B_1$ and $B_2$:

    $\displaystyle [B_1V](s) = R(s,\pi_1(s)) + \gamma \sum_{s'} T(s,\pi_1(s),s') V(s')$

    $\displaystyle [B_2V](s) = R(s,\pi_2(s)) + \gamma \sum_{s'} T(s,\pi_2(s),s') V(s')$

- We will show why PI works with two properties:

    1. **Monotonicity**: $B_2$ are monotonic
    2. **Value improvement**: $B_2$ improves the value function

### $B_2$ is monotonic

- Monotonicity means that the Bellman operator $B_2$ preserves the order of any two value functions (i.e. if one value function dominates another, the Bellman operator will also preserve this order). 
- We will show that $B_2$ is monotonic ($B_1$ is the same but we won't need it to prove PI).

- We want to proof that if

    $\forall s: V_1 \geq V_2$ ($V_1$ dominates $V_2$)

    then the Bellman operators consisting of the two value functions are also related in the same way. For example:  

    $B_2V_1 \geq B_2V_2$

    Proof (Substracting the two Bellman operators and see if one is greater than the other):

    $(B_2V_1 - B_2V_2)(s) = \gamma \sum_{s'} T(s,\pi_2(s),s') (V_1(s') - V_2(s'))$

    Since $V_1 \geq V_2$, the right-hand side is non-negative, therefore:

    $(B_2V_1 - B_2V_2)(s) \geq 0$

    Therefore, $B_2V_1 \geq B_2V_2$

    P.S. The lecture used $V$ here but the same property holds for $Q$.

### Value improvement

- Again, $B_1$ is the Bellman operator associated with policy $\pi_1$
- $Q_1 \larr B_1Q_1$ (fixed point of $B_1$, constraction property)
- Let $\pi_2$ be the greedy policy w.r.t. $Q_1$
- Let $B_2$ be the Bellman operator associated with $\pi_2$
- We want to show that after applying the Bellman operator w.r.t. the greedy policy (i.e. $B_2$), we will get an updated value function that dominates the value function (i.e. $Q_1$) before the update:

    $B_2Q_1 \geq Q_1$

- Proof:

    $Q_1(s,a) = R(s,\pi_1(s)) + \gamma \sum_{s'} T(s,\pi_1(s),s') Q_1(s',\pi_1(s'))$


### Putting it all together

Let:
- $B_1$ be the Bellman operator associated with policy $\pi_1$,
- $Q_1$ be the fixed point of $B_1$,
- $\pi_2$ be the greedy policy w.r.t. $Q_1$, and 
- $B_2$ be the Bellman operator associated with $\pi_2$

1. Value improvement (*or at least not getting worse*):

    Applying $B_2$ to $Q_1$ gives us a value function that dominates $Q_1$:

    $B_2Q_1 \geq Q_1$

2. Monotonicity:

    Applying $B_2$ $k+1$ times gives us a value function that dominates the value function after applying $B_2$ $k$ times:

    $B_2^{k+1}Q_1 \geq B_2^kQ_1$

3. Transitivity (If $a \geq b \land b \geq c \implies a \geq c$):

    If we keep applying $B_2$, we will get a sequence of value functions where each value function dominates the previous one:

    $\displaystyle \lim_{k \to \infty} B_2^kQ_1 \geq Q_1$

4. Fixed point:

    We will reach a fixed point where the value function doesn't change anymore:

    $Q_2 \geq Q_1$

### Another important property in PI

- PI does not get stuck in a local minimum because it always improves the policy if it can.
- Recall that the property of value improvement is that a value function dominates the previous value function after an update. There is actually a nuance here we didn't discuss:
    - At some states, $V_{t+1}$ dominates $V_t$ (i.e. $V_{t+1} \geq V_t$), but there are states where $V_{t+1}$ *strictly* dominates than $V_t$ (i.e. $V_{t+1} > V_t$). For example:

        | State | $V_{t+1}$ | $V_t$ |
        |-------|-------|-------|
        | $s_1$ | 10    | 6     |
        | $s_2$ | 3     | 3     |

    - However, there is another set of states where the same relationship holds:

        | State | $V_{t+1}$ | $V_t$ |
        |-------|-------|-------|
        | $s_1$ | 3     | 3     |
        | $s_2$ | 10    | 6     |

    - In both cases, $V_{t+1} \geq V_t$. Does that mean that at some point the policy can just go back and forth between these cases as long as $V_{t+1} \geq V_t$?
    - No. If this happens, the value functions may just keep changing without actually improving the overall policy when there is still room for improvement.
    - Actually, "value improvement" in PI means that not only $V_{t+1}$ dominates $V_t$ for a set of states, but once $V_{t+1}$ dominates $V_t$ for a state, it will never go back to the previous value function for that state.



