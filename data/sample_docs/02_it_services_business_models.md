# Global IT Services, Business Models, and Engineering Methodologies

## Global IT Services and the Offshore Revolution

### The Rise of the Indian IT Industry
- **F.C. Kohli & Tata Consultancy Services (TCS, 1968)**: Often called the "Father of the Indian IT Industry," Fakir Chand Kohli led TCS from its inception as a division of Tata Sons. In the 1970s, TCS pioneered offshore software development, delivering punch-card projects and mainframe migrations for international clients like Burroughs and American Express.
- **Infosys (1981)**: Founded in Pune by N.R. Narayana Murthy, Nandan Nilekani, S. Gopalakrishnan, S.D. Shibulal, K. Dinesh, N.S. Raghavan, and Ashok Arora with an initial capital of $250. Infosys pioneered the **Global Delivery Model (GDM)**, proving that software can be conceptualized, designed, developed, and maintained across geographically separated time zones.
- **Wipro (1980s)**: Under Azim Premji, Western India Vegetable Products Limited pivoted into IT hardware and software services, becoming a global technological leader in enterprise transformation, engineering R&D, and consulting.
- **HCL Technologies & Shiv Nadar (1976)**: Initially founded as a microcomputer hardware company in a Delhi garage, HCL pivoted into remote infrastructure management, enterprise software engineering, and digital solutions.
- **Cognizant (1994)**: Founded by Kumar Mahadeva and Wijeyaraj Kumar Inman as an in-house technology unit of Dun & Bradstreet, Cognizant grew into a Fortune 500 consulting and digital services powerhouse.
- **Global IT Giants**: Firms like **Accenture** (spun out from Arthur Andersen in 2000), **IBM Global Business Services**, **Capgemini**, and **Deloitte** established massive delivery centers worldwide, integrating strategic management consulting with multi-shore engineering.

### The Offshore Delivery Model (ODC)
- **Cost Arbitrage to Value Arbitrage**: Initially driven by labor cost differences between Western corporations and skilled Indian/Eastern European engineers, outsourcing matured from simple bug fixing into digital transformation, cloud migrations, enterprise cybersecurity, and AI engineering.
- **The "Follow-The-Sun" Model**: By distributing teams across North America, Europe, and Asia (specifically India with UTC+5:30), global organizations achieved continuous 24-hour development cycles: code written in the U.S. during the day was tested in India overnight and ready the next morning.
- **Economic Impact**: By the 2020s, the Indian IT-BPM sector generated over $250 billion in annual revenue, employing over 5.4 million software professionals and accounting for more than 7% of India's GDP.

---

## Evolution of Software Business Models

### From Perpetual Licenses to SaaS Subscriptions
1. **Perpetual Licensing Era (1980s–2000s)**:
   - Customers bought boxed software on physical media (floppy disks, CD-ROMs) with a single upfront license fee.
   - Updates were rare and expensive (e.g., buying Microsoft Office 97, then Office 2000, then Office 2003).
   - High piracy rates, high distribution overhead, and difficult maintenance across legacy operating systems.
2. **Cloud SaaS Subscription Era (2010s–Present)**:
   - Led by companies like Salesforce, Adobe (transitioning Creative Suite to Creative Cloud in 2013), and Microsoft (Office 365 in 2011).
   - Customers pay recurring monthly/annual subscriptions. Software is continuously deployed, automatically updated, accessible from any browser or device, and yields predictable Recurring Revenue (ARR/MRR).

### The "As-a-Service" Pyramid
- **IaaS (Infrastructure as a Service)**: Provides virtualized computing resources, storage, and networking over the internet. Examples: Amazon EC2, Google Compute Engine, Azure Virtual Machines.
- **PaaS (Platform as a Service)**: Provides hardware and software tools (operating system, runtime, database) over the internet so developers can deploy applications without server management. Examples: Heroku, AWS Elastic Beanstalk, Google App Engine.
- **SaaS (Software as a Service)**: Delivers complete end-user software applications hosted and managed in the cloud. Examples: Gmail, Salesforce, Slack, Jira, Zoom.
- **Serverless / FaaS (Function as a Service)**: Abstracting servers entirely away from the developer; code executes only when triggered by events, billing strictly per millisecond of execution. Examples: AWS Lambda (introduced in 2014), Google Cloud Functions, Azure Functions.

---

## Software Development Methodologies

### The Waterfall Model
- Introduced formally by Winston Royce in 1970.
- A sequential, linear development lifecycle where each phase must be fully completed and signed off before the next begins:
  `Requirements Analysis -> System Design -> Implementation -> Verification/Testing -> Deployment & Maintenance`.
- **Strengths**: Highly predictable, clear documentation, straightforward for small, unchanging project scopes.
- **Flaws**: Inability to accommodate changing requirements mid-development, late-stage testing where discovered architectural defects are catastrophic, and long delays before customers see working software.

### The Agile Revolution (2001)
- In February 2001, 17 software practitioners (including Kent Beck, Ward Cunningham, Martin Fowler, Alistair Cockburn, and Robert C. Martin) met at the Snowbird ski resort in Utah and authored the **Agile Manifesto**:
  1. **Individuals and interactions** over processes and tools.
  2. **Working software** over comprehensive documentation.
  3. **Customer collaboration** over contract negotiation.
  4. **Responding to change** over following a plan.

### Core Agile Frameworks: Scrum & Kanban
- **Scrum**:
  - Organizes work into time-boxed iterations called **Sprints** (typically 1 to 4 weeks).
  - **Key Roles**:
    - *Product Owner*: Prioritizes the product backlog based on business value.
    - *Scrum Master*: Facilitates processes and removes impediments for the team.
    - *Development Team*: Cross-functional engineers responsible for delivering a potentially shippable increment.
  - **Key Ceremonies**: Sprint Planning, Daily Scrum (15-minute standup), Sprint Review (demo to stakeholders), and Sprint Retrospective (continuous process improvement).
- **Kanban**:
  - Originated from the Toyota Production System (Just-in-Time manufacturing).
  - Visualizes work on a board (To Do, In Progress, Review, Done).
  - Focuses on limiting **Work In Progress (WIP)** to prevent bottlenecks, reduce multitasking, and maximize throughput flow.

### IT Service Management (ITSM) and ITIL
- **ITIL (Information Technology Infrastructure Library)**: A globally accepted set of best practice recommendations for IT Service Management (ITSM).
- **Service Level Agreements (SLAs)**: Formal contractual commitments defining uptime availability (e.g., 99.9% "three nines" or 99.99% "four nines"), response time, and mean time to recovery (MTTR).
- **Incident & Problem Management**:
  - *Incident Management*: Rapidly restoring normal service operation after an unplanned interruption.
  - *Problem Management*: Root cause analysis (RCA) to eliminate recurring incidents and prevent future failures.
- **Change Advisory Board (CAB)**: A governance committee that reviews, evaluates, and schedules major infrastructure and application changes to minimize service disruption.
