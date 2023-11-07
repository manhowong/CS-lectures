
(This lecture mainly uses the **Block World Problem** as an example.) 
(For block world problem in this lecture, placing blocks on the left or right doesn't matter.)

## Problem represented by a semantic network

- A problem has an **initial state** and a **goal state**
- **State space**: all the possible states (that can be generated iteratively from the initial state)
- Solution is the **path** from the initial state to the goal state
- How can AI find the path? It can pick an operator that helps to reduce the distance between current state and goal state

## Means-Ends Analysis

- ***End*:** **reduction of "distance"** (in an abstract space), i.e. **difference**, between current state and goal state
- ***Mean:*** application of the operator to achieve the *end*
- ***Distance***: identify the differences between states
	- The distance/difference decreases during the transition from initial to goal state

##### General steps of means-ends analysis:
For each operator that can be applied:
- apply the operator to the current state
- calculate difference between new state and goal state
- prefer state that minimizes distance between new state and goal state

## Problem reduction

- Decompose a hard problem into simpler, smaller problems. Compose solution by putting solutions to small problems together
- e.g. Goal state = a series of **sub-goals**
	- **address one sub-goal at a time**

### Example: RPM problems

- E.g. Knowledge representation of figures using semantic networks
- We can identify similarity and correspondence (e.g. an element in figure A corresponds to which element in figure C) between figures
- Breaking down the problem into sub-goals: 
	- e.g. Sub-goal1: identify the differences; 
	- sub-goal 2: identify the transformation required to solve sub-goal 1
	- ... etc.

## Cognitive connection

- The AI techniques we learned so far are ***weak** methods*: they make only little use of knowledge
	- Coupling between knowledge representation of semantic network and these AI techniques is weak
- ***Strong** methods*: demand a lot of knowledge
	- e.g. experts (with a lot of knowledge) in a specific domain solve problems using strong methods, but people who are not an expert in that domain may rely on weak methods

