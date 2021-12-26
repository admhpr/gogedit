### store data in session

save data on session object on redis

### in redis

sess:some-text -> {userId: 1}

### express session

sets cookie on browser, a signed version of the key in redis

### browser makes request

when user makes request signed cookie is sent along to the server

### serverside

decrypt cookie and make a request to redis for the value
