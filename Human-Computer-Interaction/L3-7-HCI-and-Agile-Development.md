# L3.7 HCI and Agile Development

These are my personal lecture notes for Georgia Tech's Human-Computer Interaction course (CS 6750, Spring 2024) by David Joyner. All images are taken from the course's lectures unless stated otherwise.

# References and further readings

Wania, C. E., Atwood, M. E., & McCain, K. W. (2006, June). How do design and evaluation interrelate in HCI research? In Proceedings of the 6 Conference on Designing Interactive Systems. (pp. 90-98). ACM.

Chamberlain, S., Sharp, H., & Maiden, N. (2006). Towards a framework for integrating agile development and user-centered design. In Proceedings of the 4 International Conference on Extreme Programming and Agile Processes in Software Engineering. (pp. 143-153). Springer.

# The demand for rapid HCI

- In the past, software development was slow and expensive. Hight costs in all stages:
  - **Development**
  - **Distribution** (takes time to ship; takes time to fix bugs)
  - **Feedback** (takes time to get feedback from users)

- Now we have a demand for rapid development:
  - Shorter development cycles (many tools available to individuals)
  - Faster distribution (e.g. software updates via internet is essentially free)
  - Faster feedback (e.g. user feedback via internet)

- How can we apply HCI principles to a agile development process?

# When to go agile?

- Which of the following applications are suitable for rapid development?
    1. A camera interface for aiding MOOC recording
    2. A tool for helping doctors visualize patient info in surgery
    3. A smartwatch game to play in short five-minute sessions
    4. A wearable device for mobile keyboard entry
    5. A mobile app for aggregating newsfeeds across networks
    6. A navigation app for the console of an electric car

- In generally, **high stakes applications are not suitable** for rapid development because we want to make sure that they are **reliable** and **safe** before they are released. Also, the **cost of failure** is high. On the other hand, applications with **low cost or easy updates** are suitable for rapid development. (So the answer is probably 3 and 5)

|                            | Traditional | Agile      |
| -------------------------- | ----------- | ---------- |
| **Criticality is...**      | High        | Low        |
| **Requirements change...** | Rarely      | Frequently |
| **Team size is...**        | Large       | Small      |
| **Team embraces...**       | Order       | Change     |

## Paper spotlight: "Towards a framework for integrating agile development and user-centered design" (Chamberlain et al., 2006)

- Both agile and UCD: 
    - "rely on **iterative** and development process, building on **empirical** information from previous cycles or rounds"
    - emphasize **user's role** in the development process
    - emphasize the importance of **team coherence**

- UCD disagrees with agile in:
    - the importance of **documentation**
    - the importance of **doing research prior to the design work**

- So both have the **same objectives but different ways** of achieving them.

- The paper suggested five principles for integrating UCD and agile development:
    1. **User** involvement
    2. **Collaboration** and **culture**
    3. **Prototyping**
    4. Project **lifecycle**
    5. Project **management**

# Life prototyping

- **Life "prototyping"**: when constructing **working interfaces** is just as easy as constructing prototypes
- **Cost of failure** is low, **potential benefits** are high

- **A/B testing**
    - We don't want to roll out a new interface to all users at once
    - rapid software testing between **typically two alternatives (A and B)**
    - rapidly testing **small changes** with **real users**
    - roll out B (new version) to a small number of users and ensure that there is **not a dramatic decrease in performance before rolling out to all users**
    - Pros: 
        - **no added cost** to recruit participants
        - **instant** feedback

# Agile HCI in the design life cycle

- Agile development techniques don't replace the design life cycle:
    - still doing needfinding
    - still doing brainstorming (but ideas come quickly and are immediately tested with prototypes)
    - still doing prototyping (just that they are working interfaces)
    - still doing evaluation (but first with a small number of users)

# 5 tips for mitigating risks in HCI and agile development

1. **Start more traditional**
    - start with a more traditional **needfinding** and **prototyping** process. Shift to agile development once you have something up and running.
2. Focus on **small changes**
3. Adopt a **parallel track method**
    - have the **HCI research team one sprint ahead** of the implementation (e.g. they can do needfinding, prototyping and low-fidelity evaluation, and hand the results to the development team)
4. Be careful with **consistency**
    - e.g. when you have **frequent users**, you don't want to mess up their expectations
5. **Nest your design cycles**
    - In agile development, you go through many **small cycles** and gather many **bits of new information**. Take all that new information and use it in a **broader, more traditional design cycle** aimed at **long-term** substantive improvements.

