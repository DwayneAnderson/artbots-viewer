const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888/.netlify/functions'
  : 'https://artbots-viewer-functions.netlify.app/.netlify/functions'

const fetchTweets = (listId) => {
  return fetch(`${API_URL}/tweets?listId=${listId}`)
    .then(tweets => tweets.json())
    .catch(error => {
      console.error(error)
      return {
        error: 'Failed to load tweets!'
      }
    })
}

export { fetchTweets }
