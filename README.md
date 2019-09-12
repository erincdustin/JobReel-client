# JobReel

##
Creators:
Aldiyar Batyrbekov, Chris Fiander, Erin Dustin, Jonathan Moore, Michael Romero

## Link to app

https://jobreelapp.erincdustin.now.sh/

## Demo

To see apps functionality just log in with demo credentials.
Username: Demo
Password: Asdf123!

## Landing and User Routes

### Register:

![register](/src/images/registration-page.jpg)

The Registration route has information about the project as well as a form for a user to sign up for the application

### Login:
![login](/src/images/login-page.jpg "Login")

Simple login form to verify entered credentials.

### Dashboard:

![dashboard](src/images/dashboard-page.jpg "Dashboard-screen")

The Dashboard route displays notifications as well as summary sections for applied jobs, saved jobs, saved companies, saved contacts, saved events, and saved resources. Each summary section displays the last three items added to that category.


## API Documentation and Routes

### Jobs Route: Github and Authentic

The jobs route relies on two simultaneous calls to two separate external API's, passed through the server. These Job and GithubJob components take the data objects from the two respective API calls and reformat them to fit the same rendering object framework for the Jobs Route.

### Find Contacts Route: Professional Contacts Route

The professional contacts route is leveraged on the hunter.io API. This returns a large nested dataset matching either searches by domain (url, e.g. google.com) or company name (a string, e.g. Google). Within the API if domain is entered it ignores the company name in the search, so we only render one at a time as text is added to either input. Additional optional search criteria are seniority and department. 

### Find Events Route: Eventbrite Route

The Find Events route uses the eventbrite API. The API is guarded with OAUTH2, thus emphasizing the importance of sending the external API call through our server. Users are redirected to Eventbrite to give permissions to JobReel to use their account in searching for and RSVP'ing to events. OAUTH tokens are passed only to the server. Search criteria include jobtitle (a query string), city (a string), and optional category and subcagetories. Subcategories only render  when an indvidual category has been selected, after which appropriate subcategories render for a gvien category. 

## Database Related Documentation and Routes

![assets](src/images/saved-assets-page.jpg "saved-assets-example")

### Saved Jobs:

The Saved Jobs route displays all jobs of interest that the user has stored to the database. This route also contains a form that allows users to manually add jobs to the database. The user can also edit saved job information.

### Saved Events:

The Saved Events route displays all events of interest that the user has stored to the database. This route also contains a form that allows users to manually add events to the database. The user can also edit saved event information.

### Saved Companies:

The Saved Companies route displays all companies of interest that the user has stored to the database. This route also contains a form that allows users to manually add companies to the database. The user can also edit saved company information.

### Saved Contacts:

The Saved Contacts route displays all contacts of interest that the user has stored to the database. This route also contains a form that allows users to manually add contacts to the database. The user can also edit saved contact information.

### Resources:

The Resources route displays a list of resources that the user has stored, and can be categorized by book, website, magazine, online publication, github repository, or podcast.

## Summary

JobReel simplifies the job search process for bootcamp Graduates. The app is loaded with 3rd party API's to assist you in job search. Our database can hold entries such as jobs that user applied to, professional contact information, and companies of interest. The user is greeted with a user-friendly dashboard that contains all the information needed to start searching for your dream job and connecting with contacts in your local community. The app is responsive and can be used on desktop, laptop, tablet, or mobile. JobReel is you job search companion!

## Technology Used

HTML5
CSS3
ReactJS
NodeJS
Express
Enzyme
Mocha
Chai
PostgreSQL







________________________________________________________________________________________________________________________________________

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
