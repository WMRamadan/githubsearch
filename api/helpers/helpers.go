package helpers

import (
	"io/ioutil"
	"log"
	"os"
)

func GetEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func GetVersion() string {
	file, err := os.Open("../VERSION")
	if err != nil {
		log.Fatal(err)
	}
	b, err := ioutil.ReadAll(file)
	file.Close()
	return string(b)
}
