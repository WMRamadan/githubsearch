package main

import (
	"flag"
	"githubsearch/handlers"
	"io/ioutil"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	bearer string
	port   = flag.String("port", ":3000", "Port to listen on")
	prod   = flag.Bool("prod", false, "Enable prefork in Production")
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func getVersion() string {
	file, err := os.Open("VERSION")
	if err != nil {
		log.Fatal(err)
	}
	b, err := ioutil.ReadAll(file)
	file.Close()
	return string(b)
}

func main() {
	flag.Parse()
	app := fiber.New(fiber.Config{
		Prefork: *prod, // go run app.go -prod
		AppName: "Github Search v" + getVersion(),
	})
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowMethods:  "GET",
		ExposeHeaders: "Content-Type,Authorization,Accept",
	}))

	bearer = "Bearer " + getEnv("ACCESS_TOKEN", "")

	api := app.Group("/api")

	v1 := api.Group("/v1")

	v1.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to Github Search v" + getVersion())
	})

	v1.Get("/users", func(c *fiber.Ctx) error {
		c.Set("Content-type", "application/json; charset=utf-8")
		return c.Send(handlers.GetUsers("", bearer))
	})

	v1.Get("/users/location::location?", func(c *fiber.Ctx) error {
		c.Set("Content-type", "application/json; charset=utf-8")
		return c.Send(handlers.GetUsers(c.Params("location"), bearer))
	})

	v1.Get("/repos/:user/:language?", func(c *fiber.Ctx) error {
		c.Set("Content-type", "application/json; charset=utf-8")
		return c.Send(handlers.GetRepos(c.Params("user"), c.Params("language"), bearer))
	})

	v1.Get("/commits/:user/:date", func(c *fiber.Ctx) error {
		c.Set("Content-type", "application/json; charset=utf-8")
		return c.Send(handlers.GetCommits(c.Params("user"), c.Params("date"), bearer))
	})

	app.Use(func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusNotFound).SendString("What are you doing, you can't be here!")
	})

	app.Listen(":3000")
}
