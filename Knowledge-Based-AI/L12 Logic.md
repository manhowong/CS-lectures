
## Introduction

An agent need two parts for logic to work:
1. **knowledge base** (knowledge represented in the form of sentences in the language of logic)
2. **Inference engine** (applies rules of inference to the knowledge)

**Inferencing** has two parts:
1. **Soundness**: only valid conclusions can be proven (the inference rules will derive only those conclusions that are valid)
2. **Completeness**: all valid conclusions can be proven (the agent will derive all the valid conclusions)

*Both* the knowledge base and the inference engine must be correct and complete in order to make valid conclusions.

## Translating knowledge into the language of logic

### Predicate

- A function that maps object arguments to true or false values
- e.g. `Feathers(animal)` where `Feathers` is a function (predicate) that maps the animal to either having feathers or not. For example, `Feathers(bluebird)` is true. 

The following sentence can be translated into *two predicates*:

'If an animal has feathers, then it is a bird.'
```
If Feathers(animal):
	Then Bird(animal)
```
The above sentence contains an **implication**, i.e. capturing the relationship of two predicates. It shows an **implicative relationship** (implication is represented by the *semi-colon* `:` here). 

Another example: 'If an animal lays eggs *AND* it flies, then it is a bird.'
```
If Lays-eggs(animal) ∧ Flies(animals):
	Then Bird(animal)
```
Note: $\wedge$ means "and" in logic.

### Logic symbols

- AND (**conjunction**) :  $\wedge$
- OR (**disjunction**) : $\lor$
- NOT (**negation**) : $\lnot$ 
- IMPLIES: $\Rightarrow$ (left-hand side implies the right-hand side)

### Truth Tables

It shows the truth values of an expression/sentence depending on the values of predicates in the expression.
See Wikipedia and the exercises.

### Properties of logical predicates 

- **Commutative property**: $A\wedge B = B \wedge A$ 
- **Distributive property**
	- works when operators within parenthesis are different
	- $A\wedge(B \lor C) = (A \wedge B) \lor (A \wedge C)$
- **Associative property**
	- works when all operators are either $\wedge$ or $\lor$
	- $A\lor(B \lor C) = (A \lor B) \lor C$
	- $A\wedge(B \wedge C) = (A \wedge B) \wedge C$
- **de Morgan's Law**
	- After distributing negation over each predicate inside the parenthesis, flip the operator (conjunction becomes disjunction and vice versa)
	- $\lnot(A \wedge B) = \lnot A \lor \lnot B$
	- $\lnot(A \lor B) = \lnot A \wedge \lnot B$

## Truth of implications

Is A $\Rightarrow$ B true?
- This is like asking: "Is the implication valid? Can you make such an implication given A and B?"

| A | B | A $\Rightarrow$ B |
|---|---|-------------------|
| T | T | T                 |
| T | F | F                 |
| F | T | T                 |
| F | F | T                 |

e.g.  (A)`Feathers(animal)` $\Rightarrow$ (B) `Bird(animal)`
- For the case of duck, both A and B is true.
- A $\Rightarrow$ B is True (`Feathers` implies bird.)

e.g.  (A)`Scales(animal)` $\Rightarrow$ (B) `Bird(animal)`
- For any animal, if A is true, B must be false (because no birds have scales).
- A $\Rightarrow$ B is False (`Scales` does not imply bird.)

e.g.  (A)`Flies(animal)` $\Rightarrow$ (B) `Bird(animal)`
- For any animal, if A is false, B can still be true. (e.g. Penguins can't fly.)
- A $\Rightarrow$ B is True (`Flies` can still imply bird.)

e.g.  (A)`Flies(animal)` $\Rightarrow$ (B) `Bird(animal)`
- For any animal, if both A and B are false, the implication can still be true. (e.g. Cats can't fly, but that doesn't mean `Flies` can't imply bird.)
- A $\Rightarrow$ B is True (`Flies` can still imply bird.)

If this is still confusion, rewrite the sentence "If A then B" as in the following section.

### Implication elimination

Rewrite a sentence to eliminate the implication in the sentence:

Given: $A \Rightarrow B$
Rewrite as: $\lnot A \lor B$

e.g. `Feathers` $\Rightarrow$ `Bird` can be rewritten as $\lnot$`Feathers` $\lor$ `Bird`

### Rules of inference

- Instantiate general rules to prove specific claims.
- **Modus Ponens**
	- Sentence 1: p $\Rightarrow$ q
	- Sentence 2: p
	- Therefore, Sentence 3: q
- **Modus Tollens**
	- Sentence 1: p $\Rightarrow$ q
	- Sentence 2: $\lnot$q
	- Therefore, Sentence 3: $\lnot$p
### Universal quantifiers

- So far we have been talking about **propositional logic** only (a.k.a. **zeroth-order logic**; it does not have variables in sentences), e.g.:
	- `Lays-eggs(animal)` $\wedge$ `Flies(animal)` $\Rightarrow$ `Bird(animal)`
	- Here you enter an animal (e.g. eagle) as the argument
	- A separate sentence is needed for every case (duck, eagle, etc.)

- In **First-order logic** (a.k.a. **predicate calculus**), variables are used, e.g.:
	- For all animals:
		- $\forall$`x[Lays-eggs(x)` $\wedge$ `Flies(x)` $\Rightarrow$ `Bird(x)]` 
	- `x` is a variable that can have any value within the range specified by the **quantifier** $\forall$.
	- Here the quantifier $\forall$ means "for all animals". Quantifiers like this ("For all x") are called "**Universal Quantifier**"
	- Instead of having separate sentences for different cases as in propositional logic, predicate logic reduces the number of sentences to just one sentence to cover all cases by using a variable

-  **Existential Quantifier** says that there is at least one value for which the implication is true. e.g.:
	- For at least one animal:
		- $\exists$`y[Lays-eggs(y)` $\wedge$ `Flies(y)` $\Rightarrow$ `Bird(y)]`

## Resolution theorem proving

The previous rules of implications are not computationally efficient.

1. Convert every sentence into a conjunctive normal form (eliminate the implication using the rewrite rule in an earlier section).
	- A conjunctive normal form of a sentence has no implication in it. It can have one of the three conditions below:
		1. It can have a literal (can be either a positive or a negative atom)
		2. It can have a disjunction literal e.g.:
			S1
		3. It can have a conjunction of disjunction literals. (P.S. This does not occur in the robot example here.)
2. Resolution theorem proving (prove by refutation)
	1. Take the negation of what we want to prove (Here the robot wants to prove "not lifitable", so the negation of the sentence that the robot wants to prove is `liftable`)

conclusion in 12.29
## Cognitive connection

The logic we talked about here is a form of deduction, but humans use not just deduction, but also induction and abduction.