# L2.4 Human Abilities

These are my personal lecture notes for Georgia Tech's Human-Computer Interaction course (CS 6750, Spring 2024) by David Joyner. All images are taken from the course's lectures unless stated otherwise.

# References and further readings

MacKenzie, I.S. (2013). Chapter 2: The Human Factor. Human-Computer Interaction: An Empirical Research Perspective. (pp. 27-66). Waltham, MA: Elsevier.

# Introduction

- **Input**: stimuli from the environment
- **Processing**: cognition and perception
- **Output**: actions and behaviors

# Sensation and Perception: visual

- **Color vision**: some people are color blind. We shouldn't rely on color alone in interface design.
- Sight is **directional**: we can only see what's in front of us.
- **Visual acuity**: decreases with age

# Sensation and Perception: auditory

- We are good at detecting **distance** and **direction** of sounds (even when two sound sources of different distances have the same loudness)
- Hearing is **non-directional:** we can't close our ears, nor point them in a direction to focus on a sound. Audio alerts can be overwhelming.

# Sensation and Perception: haptic

- Skin can feel pressure, temperature, and vibration
- We can't easily filter out touch feedback
- Touch feedback is generally only available to the user, so it can be used to create more **personal** feedback.

# Memory

- **perceptual store/ working memory**
- **short-term** memory
- **long-term** memory

## Perceptual store/ working memory

- Three parts (Baddeley and Hitch, 1974):
    - **Visual-spatial sketchpad**: holds visual information
    - **Phonological loop**: holds verbal and auditory information
    - **Episodic buffer**: **integrates** information from the other two, and **organizes** things **chronologically**
- **Expertise** **delays the decay** of perceptual buffer:
    - A study showed that chess experts could remember a realistic chess board better than novices, but not a random board.

## Short-term memory

- Avoid requiring users to keep too much info in short-term memory at a time:
    - rule of thumb: "**Four to five chunks** at a time"
- **Chunking**: grouping several bits of information together
- Some information is easier to chunk:
    - e.g. "DNA" is easier to remember than "ADN" because it's a **familiar** acronym
    - e.g. "PODAP" is easier to remember than "PXNRE" because it's **pronounceable**
- It's **easier to recognize something than to recall it**
- Takeaways:
    - four to five chunks at a time
    - help users chunk information
    - leverage recognition over recall

## Long-term memory

- Generally, we need to put things into **short-term memory** several times **before they can be stored in long-term memory**
    - **Lightner system**: a way of memorizing key-value pairs (e.g. flashcards)

# Cognitive processes

## Learning

- **Procedural** learning: how to do something
- **Declarative** learning: knowledge about something

**"We're prone to design things that are easy for us to use but hard for anyone else."**:
- You are unconsciously competent at doing something, it's hard to explain how you do it to someone who lacks that competence
- **Difficult to transfer subconscious procedural knowledge** into conscious declarative knowledge
- **declarative knowledge** is what we as designers want to communicate to users

## Cognitive load

- Resources available to the brain are finite
- **stress** and **anxiety** can reduce cognitive resources
- We want to **reduce the cognitive load** posed by the interface so that users can focus on the task
- We want to **understand the context** of what else is going on while the user is using the interface (what else is competing for cognitive resources)

## 5 Tips for Reducing Cognitive Load

1. Use **multiple modalities**
    - e.g. use both visual and verbal information
2. Let the **modalities** **complement** each other
    - Each modality supports/explains the other instead of competing with it
3. Give the **user control** of the pace
    - e.g. a timer or a disappearing interface after a certain time induces stress and reduces cognitive resources
4. **Emphasize** essential content and **minimize** clutter
    - e.g. giving too many options without a clear hierarchy can increase cognitive load
5. **Offload tasks**
# **Motor system

- Take motor system and the context of use into consideration when designing interfaces:
    - physical **constraints**
    - how **precise** the user's movements need to be
- make interface more **tolerant of errors** if needed