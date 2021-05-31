const fetchTweets = (listId) =>
  fetch(`/api/tweets/${listId}`)
    .then(tweets => tweets.json())

export { fetchTweets }
