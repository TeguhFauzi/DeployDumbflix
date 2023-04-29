package handlers

import (
	profiledto "dumbflix/dto/profile"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"fmt"
	"os"

	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"context"
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(ProfileRepository repositories.ProfileRepository) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func (h *handlerProfile) FindProfiles(c echo.Context) error {
	profile, err := h.ProfileRepository.FindProfiles()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data successfully obtained", Data: profile})
}

func (h *handlerProfile) GetProfile(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	var profile models.Profile
	profile, err := h.ProfileRepository.GetProfile(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data successfully obtained", Data: convertResponseProfile(profile)})
}

func (h *handlerProfile) CreateProfile(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	request := profiledto.ProfileRequest{
		ID:    int(userId),
		Photo: dataFile,
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
resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dumbflix"});
if err != nil {
	fmt.Println(err.Error())
  }

	profile := models.Profile{
		ID:     request.ID,
		Photo:  resp.SecureURL,
		UserID: int(userId),
	}

	profile, err = h.ProfileRepository.CreateProfile(profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	profile, _ = h.ProfileRepository.GetProfile(profile.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data created successfully", Data: convertResponseProfile(profile)})
}

func (h *handlerProfile) UpdateProfile(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	request := profiledto.ProfileRequest{
		ID:    int(userId),
		Photo: dataFile,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	user, err := h.ProfileRepository.GetProfile(int(userId))

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}


	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")


	// Add your Cloudinary credentials ...
cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

// Upload file to Cloudinary ...
resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dumbflix"});


if err != nil {
	fmt.Println(err.Error())
  }


	user.ID = request.ID

	if request.Photo != "" {
		user.Photo = resp.SecureURL
	}

	data, err := h.ProfileRepository.UpdateProfile(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data updated successfully", Data: convertResponseProfile(data)})
}

func (h *handlerProfile) DeleteProfile(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.ProfileRepository.GetProfile(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	fileName := user.Photo
	dirPath := "uploads"

	filePath := fmt.Sprintf("%s/%s", dirPath, fileName)

	data, err := h.ProfileRepository.DeleteProfile(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	err = os.Remove(filePath)
	if err != nil {
		fmt.Println("Failed to delete file"+fileName+":", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	fmt.Println("File " + fileName + " deleted successfully")

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Profile data deleted successfully", Data: convertResponseProfile(data)})
}

func convertResponseProfile(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		ID:     u.ID,
		Photo:  u.Photo,
		UserID: u.UserID,
		User:   u.User,
	}
}
