package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/labstack/echo/v4"
)

func CategoryRoutes(e *echo.Group) {
	categoryRepository := repositories.RepositoryCategory(mysql.DB)
	h := handlers.HandlerCategory(categoryRepository)

	e.GET("/categories", h.FindCategories)
	e.GET("/category/:id", middleware.Auth(h.GetCategory))
	e.POST("/category", middleware.Auth(h.CreateCategory))
	e.PATCH("/category/:id", middleware.Auth(h.UpdateCategory))
	e.DELETE("/category/:id", middleware.Auth(h.DeleteCategory))
}
