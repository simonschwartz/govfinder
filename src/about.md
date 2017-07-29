# GovFinder

An easy way for anyone to find and collaborate on public Government software


## What problem am I trying to solve

Government digital teams have very low visibility on what other digital teams across government are working on, which leads to different teams each spending effort trying to solve the same problem.

It is hard for Delivery teams in other departments to communicate and collaborate with other departments delivery teams.

Attracting tech talent and techies who want to help government can be very hard. Get a security clearance, get a job.

Getting to work on government services is hard if you aren't an employee, or on a panel.


## Guiding principles of this hack

If people want to help make government better, we should make it easy for them.

It should be easy for Government teams to collaborate across different departments or even different country governments

If a Government team has solved a problem, it should be easy for other government teams to use their solution, rather than build their own in isolation.


### Benefits

Many government agencies are starting to see the value of Open Source software development and government departments all over the world and starting to release open source software on GitHub.

Whitehouse, NASA, Geoscience Australia, 18F, City Councils

This is a huge opportunity.

The easier we can make it for Government teams to find Open Source software, the easier it will be for teams to collaborate to solve the big problems of government, together.


## What is the hack

For this hack I built a search engine that finds Open source Government projects on GitHub.

### What is open source?

Open Source is when the code for a project is published publicly. The benefits of this are that people can
- use your software
- copy('fork') your software and adapt it for their own needs
- raise issues thay find in your software
- contribute code back to your project


### Scenarios

Developer has some spare time and wants to practice some coding. They have heard about this <name> thing and give it a go. They select the language they are proficient in and find some interesting projects. They see a project that is quite active and has a few issues open. They visit the repo and find an issue to work on. On monday his PR gets merged.

A state council team has been asked to build a tool for finding schools in their state. The visit <name> and search for 'school' and find a project called School finder by the NSW government. They can message the contributors about the project and easily use the project as a starting point for their project, saving weeks of development and design time.

The Singapore government has recently been tasked with creating a Whole of Government accessibility guide for other departments to use when designing and building online services. They go to <name> and search for accessibility. They find an open source project called accessibility handbook by 18F in America. They can see how the 18F team approached the problem and send a message to the team on GitHub to ask questions.

(maybe just steal it, rather than sending the email prior!)


## Tech

This application is a simple JAM stack (JavaScript, API, Markup). This means that the app assets are totally static and all dynamic functionality is achieved through the use of API's executed in the browser.

The frontend is built using ReactJS. I have used the boilerplate from Create React App which allowed me to get setup quickly so I could spend time coding rather than configuring. I am using Googles Material Design System React components for building the User Interface

The data for the Application is live data from GitHub. I am using the GitHub API and have built a search engine around this API that filters Open Source projects that are tagged as Government. This search engine also ranks results based on filters set by the user.

Deployment of the application is automated using TravisCI. Because the app is just a static bundle I have the benefit of just being able to deploy to a CDN. I use Surge.sh to do this.


## Future work

I think this app has lots of potential and see some great opportunities to extend upon it outside of GovHack. My next steps would be to do some user research to understand what users expect to get out of a tool like this. I think there would walso be a benefit to adding features that incentivise people to contribute to Open Source government projects so we can improve collaboration in Government.

Improve the search engine to search issues find projects with the same issues (Fix 1 issue and help multiple projects)


### Ignore (just my notes)

NOTES:

Small business
Promote remote work and harnessing knowledge workers who arent government employed or on a panel

Make it easy for the public to interact with government, by helping to build government services

Allows public to return value as well as cross department/ country to return value
