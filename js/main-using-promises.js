$(function () {
  $('#randomize').click(() => {
    processRequest()
  })

  function processRequest () {
    getWord()
      .then((data) => {
        const word = data.name
        console.log(word)
        updateWordUi(data)

        return getScore(word)
      }).then((scoreData) => {
        console.log(scoreData)
        updateScoreUi(scoreData.score)
      })
  }

  function getWord () {
    const url = 'https://sat-words-api.herokuapp.com/api/v1/words/random'

    // use return to 'return a promise'
    return axios.get(url)
      .then((response) => {
        console.log(response)
        return response.data
      }).catch((error) => {
        console.log(error)
      })
  }

  function getScore (word) {
    const url = 'https://scrabble-scorer-api.herokuapp.com/api/v1/words/score'

    // use the return keyword to "return a promise"
    return axios.get(url, {
      params: {
        word: word
      }
    }).then((response) => {
      console.log(response)
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  }

  function updateWordUi (wordData) {
    $('#word').text(wordData.name)
    $('#definition').text(wordData.definition)
  }

  function updateScoreUi (score) {
    $('#score').text(score)
  }
})
