# VanHack Bonsai

## Introduction

For a very interesting code challenge I created this Git repository and this documentation to share my results and solutions about different kind of tasks, that were related to this code challenge.

The challenge is about to implement a cross-platfom mobile shopping app to sell different kind of street wear products to the customer. In this challenge I decided to use modern and outstanding technologies like **GraphQL**, **Apollo** and **TypeScript**.

Please read the following sections to understand how I solved some of those tasks of the challenge.

## Challenge

There were many different kind of tasks requested to be solved for this challenge, like for example creating a user profile page, do some user registration and authentication, and searching for products etc.

I decided to solve the task about user registration and authentication, to create a simple infinite scrollable page to list product items, and to create a simple shopping cart where users can select their products from the list and add them to the shopping cart.

One of the most important feature nowadays for a modern mobile app to increase the user's experience, is a friendly user authentication process by also supporting logins using social media platforms. That's why I decided to implement a login using Facebook as an authentication provider.

## Technology stack

For the frontend part the requirement was to use **React Native**. I decided to use **TypeScript** which has an outstanding type checking system, **React Navigation** for a better structuring of the overall app navigation, **React Native Animated** for smooth animations of the visual interface. For all form validation I used **rc-form**, a React High Order Form Component.

To connect to the backend server I used **GraphQL** with **Apollo**.

For the backend part I used **Node.js** as the server endpoint which connects to a **MongoDB** database using the **Mongoose** library. The server endpoint is based on a combination of **GraphQL-Apollo-Express**. The authentication is implemented by using **Passport.js**.

I also added **TSLint** code checks and **Prettier** for code formatting.

## Solution

My solution is based on functional components using [hooks](https://reactjs.org/docs/hooks-intro.html) instead of simple class-based structures.

The underlying source code is using a role-based structure where, for example, all components are placed in one subfolder. I devided all functional components into two categories: containers with specific business logic inside and reusable components for UI.

For the backend part I modelled the implementation based on a domain-oriented structure. The main idea was also to use the [Repository pattern](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design) to create an encapsulated persistence layer to handle all requests within the GraphQL-resolvers consistently.
Unfortunately there was not enough time to implement this pattern, a meaningful error handling and useful tests using **Jest**.

Please note: that a few minor bugs are probably also not fixed.

## Impressions

Here is a visual impression of how the mobile app and the UI looks like:

![](image.gif)

## Summary

At the end it was a very interesting code challenge. And because of the short ammount of time that was available, I wanted to figure out on how much time we could nowadays spend to adapt and effectively use new kind of technologies to solve a specific problem.

I like to learn and code with new technologies, and always try to improve my experience in learning new things.

There are still a lot of improvements and work to be done in this project if there is some more time applied to those tasks. But I'm very happy that I could participate in this challenge.

Thank you,
Svitlana
