# Project 2: Quiz

Repeated practice of learned content.
The application provides a list of topics and allows creating multiple-choice questions into those topics that are then answered by self and others.

The application follows a three-tier architechture. It uses a layered architecture with views, controllers, services, and database. There is also an API that returns a randomly selected question, and another for answering questions. There are 10 tests implemented.

The application is launched with docker compose up from the root.

The test are ran with deno test --allow-env --allow-net and need a database.