package filmdto

import "dumbflix/models"

type FilmResponse struct {
	ID            int                     `json:"id" gorm:"primary_key:auto_increment"`
	Title         string                  `json:"title" gorm:"type: varchar(255)"`
	Thumbnailfilm string                  `json:"thumbnailfilm" gorm:"type:varchar(255)"`
	Year          int                     `json:"year" gorm:"type: int"`
	Category      models.CategoryResponse `json:"category"`
	CategoryID    int                     `json:"category_id" gorm:"type:int"`
	LinkFilm      string                  `json:"linkfilm" gorm:"type: varchar(255)"`
	Description   string                  `json:"description" gorm:"type: varchar(255)"`
}
