package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/labstack/echo/v4"
)

func EpisodeRoutes(e *echo.Group) {
	episodeRepository := repositories.RepositoryEpisode(mysql.DB)
	h := handlers.HandlerEpisode(episodeRepository)

	e.GET("/episodes", h.FindEpisodes)
	e.GET("/film/:id/episode", h.FindEpisodeByFilm)
	e.GET("/episode/:id", h.GetEpisode)
	e.POST("/episode", middleware.Auth(middleware.UploadFile(h.CreateEpisode)))
	e.DELETE("/episode/:id", middleware.Auth(h.DeleteEpisode))
	e.PATCH("/episode/:id", middleware.Auth(middleware.UploadFile(h.UpdateEpisode)))
}
