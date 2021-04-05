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
const updateDisplayedJoke = function () {
  if (jokes[requestedJokeInput.value]) {
    jokeBox.innerHTML =
      '<p>' + jokes[requestedJokeInput.value].setup + '</p>' +
      '<p>' + jokes[requestedJokeInput.value].punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

const addAbout = document.getElementById('about')
const newSetup = document.getElementById('setup')
const newPunchline = document.getElementById('punchline')
const newJoke = document.getElementById('rememberJoke')
const deleteAbout = document.getElementById('deleteAbout')
const deleteJoke = document.getElementById('deleteJoke')

const updatePage = function () {
  let originJokes = JSON.parse(window.localStorage.getItem('jokes'))
  if (originJokes !== null) {
    jokes = originJokes
  } else {
    originJokes = jokes
    const stringifiedJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', stringifiedJokes)
  }
  updateJokesMenu()
  updateDisplayedJoke()
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
newJoke.addEventListener('click', function () {
  jokes[addAbout.value] = { setup: newSetup.value, punchline: newPunchline.value }
  const stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  updateJokesMenu()
})
deleteJoke.addEventListener('click', function () {
  if (jokes[deleteAbout.value]) {
    delete jokes[deleteAbout.value]
    const stringifiedJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', stringifiedJokes)
    updateJokesMenu()
  } else {
    window.alert('Cannot delete.')
  }
})
