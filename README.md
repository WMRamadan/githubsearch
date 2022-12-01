# githubsearch

API for Github Search

# Setup

Run in developer mode
```
go run main.go
```

Run in production mode
```
go run main.go -prod
```

# API

get all users
```
localhost:3000/api/v1/users/
```

get all users by location
```
localhost:3000/api/v1/users/location:<location>
```

get repositories by language
```
localhost:3000/api/v1/repos/<language>
```
