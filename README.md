# Phase-1 Project
## _Daniel's Film Processor_

## Features

- Import data from a public API 
- Extract selected information from the data in order to create an interactive experience for the user
- Store this information in a personal database that persists
- Allow the user to modify elements in the database

The project's main purpose is showcasing the ability to properly access a public API and efficiently manipulating its data through frontend tools. In order to accomplish this exercise, [OMDb's API](http://www.omdbapi.com/) was employed because of its resourceful film data. **Daniel's Film Processor** allows the user to search and store a beloved film into a personal database provided by [NPM, inc.](https://www.npmjs.com/package/json-server)

## Installation

After having [installed](https://www.npmjs.com/package/json-server) NPM's JSON server, you must locate the folder in which this repository was downloaded.

Follow these commands.

```sh
cd path/to/repository
json-server --watch db.json
```
If everything worked correctly, you should see the following message: 
```  
\{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
  http://localhost:3000/profile

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...'.
  ```
  Now, copy and paste http://localhost:3000/posts in a new tab in order to access the empty database. This is the location where the film information will be stored.

## Usage

After clicking the Start button located in the main webpage (index.html), the user will be prompted to submit a form. The application is expecting **the title of a film and the full name** of that film's director/s. Both inputs are case insensitive, but the input must match an existing result. What that means is that if you are trying to search for Martin Scorsese's Taxi Driver, you can do the following:

**Title: Taxi Driver**
**Director: Martin Scorsese**

**Title: taxi driver**
**Director: martin SCORsese**

**Title: TAXI driver**
**Director: MaRtIn ScOrsEse**

However, these inputs will not work because they are not 'exact' matches:
`Title: Taxi `
`Director: Martin`

`Title: Taxi Dri`
`Director: Martin Scor`

`Title: Driver`
`Director: M SCORSESE`

`Title: Taxi Driver`
`Director:   `

If the user satisfactorily retrieves a film, a corresponding poster will be posted in the webpage. At this moment, selected data from the film will be directly posted into http://localhost:3000/posts. For example:

```sh
 [
  {
    "title": "Taxi Driver",
    "directors": "Martin Scorsese",
    "genres": "Crime, Drama",
    "runtime": "114 min",
    "countries": "United States",
    "id": 1
  }
]
```

Additionally, near the film's poster, there will be a button that the user can click in order to add comments for that film directly into the database. These comments can be updated at any time if the page is not refreshed. They will persist if they page is reloaded, but they will not be able to be changed anymore.

```sh
[
  {
    "title": "Taxi Driver",
    "directors": "Martin Scorsese",
    "genres": "Crime, Drama",
    "runtime": "114 min",
    "countries": "United States",
    "id": 1,
    "comments": "This is a great film."
  }
]
```

#### Contributing
Suggestions are welcome in terms of the application's performance. For direct contact, use the following email address: daniel07escalona@gmail.com. Furthermore, it is understood that the application's visual are very simple and amateurish, so if there's any tips regarding this topic, they are very welcome as well.

#### Authors and Acknowledgment
**Author: Daniel Escalona. Student at [Flatiron School.](https://flatironschool.com/welcome-to-flatiron-school/?utm_source=Google&utm_medium=ppc&utm_campaign=12728169833&utm_content=127574232664&utm_term=flatiron&uqaid=513799628630&CjwKCAiA4KaRBhBdEiwAZi1zzgCEBEdI6285I6gmLUyI5Pw_8YNLXh1P1oRIGf8t0fXozErvGMW5FRoCG1MQAvD_BwE&gclid=CjwKCAiA4KaRBhBdEiwAZi1zzgCEBEdI6285I6gmLUyI5Pw_8YNLXh1P1oRIGf8t0fXozErvGMW5FRoCG1MQAvD_BwE)**
**This project would not have been possible without the following resources:**
http://www.csszengarden.com/
http://www.omdbapi.com/
https://flatironschool.com/courses/coding-bootcamp/

## License

MIT