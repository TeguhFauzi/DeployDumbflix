package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/labstack/echo/v4"
)

func ProfileRoutes(e *echo.Group) {
	profileRepository := repositories.RepositoryProfile(mysql.DB)
	h := handlers.HandlerProfile(profileRepository)

	e.GET("/profile", middleware.Auth(h.GetProfile))
	e.GET("/profiles", h.FindProfiles)
	e.POST("/profile", middleware.Auth(middleware.UploadFile(h.CreateProfile)))
	e.PATCH("/profile", middleware.Auth(middleware.UploadFile(h.UpdateProfile)))
	e.DELETE("/profile", middleware.Auth(h.DeleteProfile))
}
