const fetchTweets = () =>
  fetch('/api/tweets')
    .then(tweets => tweets.json())

export { fetchTweets }
