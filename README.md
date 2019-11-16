# Bonsai React-Native Full-Stack Interview Test

Welcome to the creative interview test at Shop Bonsai.

This interview test simulates an environment that is similar to working at Shop Bonsai (very similar tech stack we run today).

Scenario:
You joined as the new member of a small start-up team. Together we are building a new app to sell cool 3rd party products! So far, the sales team worked tirelessly and managed to acquire over 50 merchants who each have different brands and products offerings. The developers have also been working hard and have created a shop page to welcome the users and display the products of the newly acquired merchants.

Goal:
Your task is to add a new complete working feature that you feel will best demonstrate your capabilities as a team-member and have the largest positive impact on our customer. This implies that JUST updating the es-lint rules to include trailing commas, switching all space-characters in the code-base to tab-characters, and/or updating the .gitignore will score low. However, non-customer facing features such as validating data, unit-testing, creating a automatic-backups of the database, can score very high if done well.

Here are some ideas for features that are missing from the app:

- We expect to see that you understand main concepts of graphql and Apollo Client, so you are encouraged to create some new queries and mutations or add other featues( e.g. pagination, using of apollo cache etc)
- Clicking Buy does SOMETHING! This should add data to the database in a meaningful way and communicate to the user that such an action took place.
- Ability to select a quantity to buy. The quantity should be stored in the database in a meaningful way, this data should be retrieved and displayed somewhere for the user.
- Add a profile page to display user-related data. This data should be stored in the database and retrieved.
- Allow users to login using social media. A record of the user being logged in should be stored in the database, retrieved and displayed (perhaps on a special admin-only page).
- Add validation model for the data, model hooks (back-end).
- Add authorization and/or authentification.
- Select multiple items to buy together. Which items get selected/submitted should be stored meaningfully in the database.
- Add a cart object to display selected items the user wants to buy. Store this information meaningfully in the database.
- Organize the shop page for better browsing experience, adding filters for brands/merchants/products.
- Ability to 'like' an item. Store which items got liked in the database, retrieve this information.
- Searching for product by name/brand/merchant. Store searches meaningfully in the database (to show search history on the front-end)
- Add loading-images so the screen isn't empty while data is loading. Add page visits and loading times to the database in a meaningful way.
- Add a react testing-framework and create a test. Record the results in separate database for the QA team!

The following should be noted:

1. Assume that if a piece of code/function is not working, it is a bug in the app (oh no!)
2. Work with the data as if it were real
3. You can make additional assumptions, please note them if they are critical to understanding the way a feature is implemented
4. You can add multiple small features or one large feature
5. Please document your changes well and make as many atomic commits as you feel are necessary for someone to track your changes

Of your submission, the following will be evaluated:

- Ability to work in a pre-existing React-native environment (front-end)
- Ability to use existing data in the database (back-end)
- Ability add/store/retrieve new data in the database (back-end)
- Completeness of feature, works as a user would expect such a feature to work
- Adopting and using best practices
- Coding style
- Attention to detail
- Clarity in communicating the feature implemented (I highly recommend taking pictures and gifs)

High scorers will be contacted via email within a week of acknowledgement of PR submission.
Thank you and good luck for everyone who applied and submitted a PR.

## Install

1. Ensure `yarn` is installed
2. Run mongodb on `localhost:27017`

## Run

1. Navigate to `/server`, run `yarn start`
2. Navigate to `/client`, run `yarn ios` or `yarn android`

This is how it looks like initially:


<img width="493" alt="Screen Shot 2019-10-17 at 6 09 12 PM" src="https://user-images.githubusercontent.com/39282144/67597477-48e9f700-f739-11e9-87f4-56d6be45d76b.png">

