// ----
// DATA
// ----

// A couple jokes to start with
let jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
const noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
const jokesMenuList = document.getElementById('jokes-menu')
const updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  const jokeKeys = Object.keys(jokes)
  const jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
const requestedJokeInput = document.getElementById('requested-joke')
const jokeBox = document.getElementById('joke-box')
const stringifiedJokes = JSON.stringify(jokes)
const updateDisplayedJoke = function () {
  const requestedJoke = requestedJokeInput.value
  if (jokes[requestedJoke]) {
    jokeBox.innerHTML =
      '<p>' + jokes[requestedJoke].setup + '</p>' +
      '<p>' + jokes[requestedJoke].punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
const updatePage = function () {
  let oldJokes = JSON.parse(window.localStorage.getItem('jokes'))
  if (oldJokes === null) {
    oldJokes = jokes
    window.localStorage.setItem('jokes', stringifiedJokes)
  } else {
    jokes = oldJokes
  }
  updateJokesMenu()
  updateDisplayedJoke()
}

const newJoke = document.getElementById('rememberJoke')
const newName = document.getElementById('name')
const newSetup = document.getElementById('setup')
const newPunchline = document.getElementById('punchline')
const removeName = document.getElementById('deleteName')
const removeJoke = document.getElementById('deleteJoke')
const addJoke = function () {
  jokes[newName.value] = { setup: newSetup.value, punchline: newPunchline.value }
  window.localStorage.setItem('jokes', stringifiedJokes)
  updateJokesMenu()
}
const deleteJoke = function () {
  if (jokes[removeName.value]) {
    delete jokes[removeName.value]
    window.localStorage.setItem('jokes', stringifiedJokes)
    updateJokesMenu()
  } else {
    window.alert('No matching joke found.')
  }
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
newJoke.addEventListener('click', addJoke)
removeJoke.addEventListener('click', deleteJoke)
