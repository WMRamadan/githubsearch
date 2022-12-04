package main

import (
	"flag"
	"githubsearch/helpers"
	"githubsearch/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	bearer string
	port   = flag.String("port", ":3001", "Port to listen on")
	prod   = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {
	flag.Parse()
	app := fiber.New(fiber.Config{
		Prefork: *prod, // go run app.go -prod
		AppName: "Github Search v" + helpers.GetVersion(),
	})
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowMethods:  "GET",
		ExposeHeaders: "Content-Type,Authorization,Accept",
		AllowOrigins:  "http://localhost:3000",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to Github Search v" + helpers.GetVersion())
	})

	api := app.Group("/api")

	routes.Routes_V1(api)

	app.Use(func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusNotFound).SendString("What are you doing, you can't be here!")
	})

	app.Listen(":3001")
}
