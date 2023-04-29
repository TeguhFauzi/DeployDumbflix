package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type FilmRepository interface {
	FindFilms() ([]models.Film, error)
	GetFilm(ID int) (models.Film, error)
	CreateFilm(film models.Film) (models.Film, error)
	UpdateFilm(film models.Film) (models.Film, error)
	DeleteFilm(film models.Film, ID int) (models.Film, error)
	GetCategoryFilm(ID int) (models.Category, error)
}

func RepositoryFilm(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindFilms() ([]models.Film, error) {
	var films []models.Film
	err := r.db.Preload("Category").Find(&films).Error

	return films, err
}

func (r *repository) GetFilm(ID int) (models.Film, error) {
	var films models.Film
	err := r.db.Preload("Category").First(&films, ID).Error

	return films, err
}

func (r *repository) CreateFilm(films models.Film) (models.Film, error) {
	err := r.db.Create(&films).Error

	return films, err
}

func (r *repository) UpdateFilm(film models.Film) (models.Film, error) {
	err := r.db.Save(&film).Error
	return film, err
}

func (r *repository) DeleteFilm(film models.Film, ID int) (models.Film, error) {
	err := r.db.Delete(&film, ID).Scan(&film).Error

	return film, err
}
func (r *repository) GetCategoryFilm(ID int) (models.Category, error) {
	var category models.Category
	err := r.db.First(&category, ID).Error
	return category, err
}
