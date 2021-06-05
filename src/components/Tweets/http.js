const fetchTweets = (listId) =>
  fetch(`/api/tweets?listId=${listId}`)
    .then(tweets => tweets.json())

export { fetchTweets }
