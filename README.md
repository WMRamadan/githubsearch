# githubsearch

API for Github Search

# Config/Setup

Export the `ACCESS_TOKEN` environment variable with your github access token
```
export ACCESS_TOKEN=<github_acess_token>
```

# Run Tests
```
go test -v ./...
```

# Run App

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

get repositories by user
```
curl -X GET http://localhost:3000/api/v1/repos/<username>
```

get repositories by user & language
```
curl -X GET http://localhost:3000/api/v1/repos/<username>/<language>
```

get total commits made by user
```
curl -X GET http://localhost:3000/api/v1/commits/<username>
```
