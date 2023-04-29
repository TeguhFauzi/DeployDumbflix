package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	UserRoutes(e)
	FilmRoutes(e)
	EpisodeRoutes(e)
	AuthRoutes(e)
	CategoryRoutes(e)
	TransactionRoutes(e)
	ProfileRoutes(e)
}
