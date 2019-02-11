# BigCommerce Coding Assessment

Take home coding challenge

## Running the app

The project manages dependencies through `npm`. To install them, run the following command in the root of the project:

```
npm install
```

And finally, run the server with the following command:

```
npm run start
```

At this stage, the web app will be available at `https://localhost:3000`.

The single-page application can be built with the following command:

```
npm run build
```

To run the test suite (_However there are not many test yet_):

```
npm run test
```

## Premise

As part of the interviewing process i was given this take home coding challenge. I was given a zip file that had a bare essential React based folder structure and readme file with requirements and links to screens that highlighted what had to be done and general design guidelines and some ground rules.

Though challenge had no time limits recommendation was for 3 hours, I did set-up myself a time limit of 3 hours. As I did not wanted to spend more time on it than a weekend.

## Architecture / Tech Stack

I had a free choice to choose any framework, but the react was already provided. So I chose **React**. Since the challenge had a need to do a lot of UI components I selected **Material UI** which is a react component library for Google Material Design. Finally for state management I chose **Rx.JS** which is based on Observable pattern. It uses observers to notify component of changes happening while keeping data flow unidirectional.

## Assumptions

The JSON provided as mock did not had complete structure, the products object were missing id's so i assigned their indexes as their ID.

## Retrospective

I almost spent 4 hours into it and still had to few things to do.

I was not able to unit test. Also, the challenge is visually not where I wanted it to be with many UI component not looking what they should across viewports, with responsiveness taking a hit.

Overall, it was a fun challenge with a lot of features to be implemented, and I think i did a decent job in wrapping up the functionality. However if i have more time i would like to push some tests and fix the UI across viewports.
