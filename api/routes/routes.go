package routes

import (
	"githubsearch/handlers"
	"githubsearch/helpers"

	"github.com/gofiber/fiber/v2"
)

var (
	bearer string
)

func Routes_V1(api fiber.Router) {
	bearer = "Bearer " + helpers.GetEnv("ACCESS_TOKEN", "")

	v1 := api.Group("/v1")

	v1.Get("/users/location::location/:page?", func(c *fiber.Ctx) error {
		c.Set("Content-type", "application/json; charset=utf-8")
		return c.Send(handlers.GetUsers(c.Params("location"), c.Params("page"), bearer))
	})

	v1.Get("/repos/:user/:language?", func(c *fiber.Ctx) error {
		c.Set("Content-type", "application/json; charset=utf-8")
		return c.Send(handlers.GetRepos(c.Params("user"), c.Params("language"), bearer))
	})

	v1.Get("/commits/:user/:date", func(c *fiber.Ctx) error {
		c.Set("Content-type", "application/json; charset=utf-8")
		return c.Send(handlers.GetCommits(c.Params("user"), c.Params("date"), bearer))
	})
}
