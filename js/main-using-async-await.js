$(function () {
  $('#randomize').click(() => {
    processRequest()
  })

  async function processRequest () {
    const wordData = await getWord()
    console.log(wordData)

    const scoreData = await getScore(wordData.name)
    console.log(scoreData)

    updateWordUi(wordData)
    updateScoreUi(scoreData.score)
  }

  async function getWord () {
    const url = 'https://sat-words-api.herokuapp.com/api/v1/words/random'
    const response = await axios.get(url)
    return response.data
  }

  async function getScore (word) {
    const url = 'https://scrabble-scorer-api.herokuapp.com/api/v1/words/score'

    const response = await axios.get(url, {
      params: {
        word: word
      }
    })

    return response.data
  }

  function updateWordUi (wordData) {
    $('#word').text(wordData.name)
    $('#definition').text(wordData.definition)
  }

  function updateScoreUi (score) {
    $('#score').text(score)
  }
})
