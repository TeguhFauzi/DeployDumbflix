package handlers

import (
	filmdto "dumbflix/dto/film"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"fmt"
	"os"

	"net/http"
	"strconv"

	"context"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerFilm struct {
	FilmRepository repositories.FilmRepository
}

func HandlerFilm(FilmRepository repositories.FilmRepository) *handlerFilm {
	return &handlerFilm{FilmRepository}
}

// var path_file = "http://localhost:5000/uploads/"
func (h *handlerFilm) FindFilm(c echo.Context) error {
	films, err := h.FilmRepository.FindFilms()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range films {
		films[i].Thumbnailfilm = p.Thumbnailfilm
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Film successfully obtained", Data: films})
}

func (h *handlerFilm) GetFilm(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var films models.Film

	films, err := h.FilmRepository.GetFilm(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	films.Thumbnailfilm = os.Getenv("PATH_FILE") + films.Thumbnailfilm

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data successfully obtained", Data: convertResponseFilm(films)})
}

func (h *handlerFilm) CreateFilm(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	category_id, _ := strconv.Atoi(c.FormValue("category_id"))
	year, _ := strconv.Atoi(c.FormValue("year"))

	request := filmdto.FilmRequest{
		Title:         c.FormValue("title"),
		Year:          year,
		CategoryID:    category_id,
		Description:   c.FormValue("description"),
		Thumbnailfilm: dataFile,
		LinkFilm:      c.FormValue("linkfilm"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dumbflix"})

	if err != nil {
		fmt.Println(err.Error())
	}
	film := models.Film{
		Title:         request.Title,
		Thumbnailfilm: resp.SecureURL,
		Year:          request.Year,
		CategoryID:    request.CategoryID,
		LinkFilm:      request.LinkFilm,
		Description:   request.Description,
	}

	film, err = h.FilmRepository.CreateFilm(film)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	film, _ = h.FilmRepository.GetFilm(film.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data created successfully", Data: convertResponseFilm(film)})
}

func (h *handlerFilm) UpdateFilm(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	
	id, _ := strconv.Atoi(c.Param("id"))

	year, _ := strconv.Atoi(c.FormValue("Year"))
	category_id, _ := strconv.Atoi(c.FormValue("Category_id"))

	request := filmdto.FilmRequest{
		Title:         c.FormValue("title"),
		Year:          year,
		CategoryID:    category_id,
		Description:   c.FormValue("description"),
		Thumbnailfilm: dataFile,
		LinkFilm:      c.FormValue("linkfilm"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dumbflix"})
	if err != nil {
		fmt.Println(err.Error())
	}
	film, _ := h.FilmRepository.GetFilm(id)
	// film.ID = request.ID

	if request.Title != "" {
		film.Title = request.Title
	}
	if request.Thumbnailfilm != "" {
		film.Thumbnailfilm = resp.SecureURL
	}
	if request.Year != 0 {
		film.Year = request.Year
	}
	if request.LinkFilm != "" {
		film.LinkFilm = request.LinkFilm
	}
	if request.Description != "" {
		film.Description = request.Description
	}

	data, err := h.FilmRepository.UpdateFilm(film)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data updated successfully", Data: convertResponseFilm(data)})
}

func (h *handlerFilm) DeleteFilm(c echo.Context) error {

	id, _ := strconv.Atoi(c.Param("id"))

	film, err := h.FilmRepository.GetFilm(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.FilmRepository.DeleteFilm(film, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data deleted successfully", Data: convertResponseFilm(data)})
}

func convertResponseFilm(u models.Film) filmdto.FilmResponse {
	return filmdto.FilmResponse{
		ID:            u.ID,
		Title:         u.Title,
		Thumbnailfilm: u.Thumbnailfilm,
		Category:      u.Category,
		CategoryID:    u.CategoryID,
		Year:          u.Year,
		LinkFilm:      u.LinkFilm,
		Description:   u.Description,
	}
}
