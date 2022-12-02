package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func GetUsers(location string, bearer string) []byte {
	URL := "https://api.github.com/search/users?q=location:" + location

	req, req_err := http.NewRequest("GET", URL, nil)

	if req_err != nil {
		fmt.Println(req_err)
	}
	req.Header.Add("Accept", "application/vnd.github+json")
	req.Header.Add("Authorization", bearer)

	client := &http.Client{}
	resp, client_err := client.Do(req)
	if client_err != nil {
		fmt.Println(client_err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	return body
}

func GetRepos(user string, language string, bearer string) []byte {
	URL := "https://api.github.com/search/repositories?q=user:" + user + "+language:" + language

	req, req_err := http.NewRequest("GET", URL, nil)

	if req_err != nil {
		fmt.Println(req_err)
	}
	req.Header.Add("Accept", "application/vnd.github+json")
	req.Header.Add("Authorization", bearer)

	client := &http.Client{}
	resp, client_err := client.Do(req)
	if client_err != nil {
		fmt.Println(client_err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	return body
}

func GetCommits(user string, date string, bearer string) []byte {
	URL := "https://api.github.com/search/commits?q=committer:" + user + "+committer-date:>" + date

	req, req_err := http.NewRequest("GET", URL, nil)

	if req_err != nil {
		fmt.Println(req_err)
	}
	req.Header.Add("Accept", "application/vnd.github+json")
	req.Header.Add("Authorization", bearer)

	client := &http.Client{}
	resp, client_err := client.Do(req)
	if client_err != nil {
		fmt.Println(client_err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	return body
}
