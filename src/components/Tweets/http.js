const fetchTweets = (listId) =>
  fetch(`https://elegant-wozniak-2d084d.netlify.app/.netlify/functions/tweets?listId=${listId}`)
    .then(tweets => tweets.json())

export { fetchTweets }
