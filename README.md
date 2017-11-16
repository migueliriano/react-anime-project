# react-anime-project

In this APP you are going to see the latest animes in an interactive home page with a infinite feed. Also, you can find information about your favorite anime for example: characters, synopsis, start date, etc.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), you can use all the default commands. 

This project uses the public API [Kitsu](https://kitsu.docs.apiary.io/) to get the anime data.

## Installing / Getting started
react-anime-project is a really easy project to setup in your environment, you only need to run these commands:

```bash
npm install
npm start
```
- `npm install`going to install all the dependency packages 
- `npm start` going to compile our project and run a local server. 

 In this point you should be able to see the APP on the local url `http://localhost:3000/`.

## Developing

```bash
git clone https://github.com/migueliriano/react-anime-project.git
cd react-anime-project/
npm install
npm start
```
- `git clone` make a copy of the project in your local machine.
- `cd react-anime-project/` Move to the respository folder
- `npm install` install all the dependency packages
- `npm start` Run the APP and open your browser in a local server `http://localhost:3000/`

## Features

* Home Page
  * Infinite scroll feed.

* Single Page:
  * Characters
  * Synopsis
  * Trailer
  * General information: Type, Episodes, Status, Start and End Data, Rating, and Duration

## Roadmap

* Home Page
  * Support Search anime by name.
  * Support filter anime by category or status.
  
* Single Page
  * Add categories
  * Add genres

## Todo Tasks

- [ ] Unit Test with 90% coverage or more
- [ ] Set Order descending on Home Page infinite scroll

## Heroku
Live page url with `master` branch: https://anime-reactjs.herokuapp.com

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## License

MIT
