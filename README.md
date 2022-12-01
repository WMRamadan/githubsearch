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
curl -X GET http://localhost:3000/api/v1/users/
```

get all users by location
```
curl -X GET http://localhost:3000/api/v1/users/location:<location>
```

get repositories by language
```
curl -X GET http://localhost:3000/api/v1/repos/<language>
```
