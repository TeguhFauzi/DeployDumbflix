package filmdto



type FilmRequest struct {
	ID            int                     `json:"id" gorm:"primary_key:auto_increment"`
	Title         string                  `json:"title" form:"title" gorm:"type: varchar(255)"`
	Thumbnailfilm string                  `json:"thumbnailfilm" form:"thumbnailfilm" gorm:"type: varchar(255)"`
	Year          int                     `json:"year" form:"year" gorm:"type: int" `
	CategoryID    int                     `json:"category_id" form:"category_id" gorm:"type: int"`
	LinkFilm      string                  `json:"linkfilm" form:"linkfilm" gorm:"type: varchar(255)"`
	Description   string                  `json:"description" form:"description" gorm:"type: varchar(255)"`
}

type UpdateFilmRequest struct {
	Title         string                  `json:"title" form:"title" gorm:"type: varchar(255)"`
	Thumbnailfilm string                  `json:"thumbnailfilm" form:"thumbnailfilm" gorm:"type: varchar(255)"`
	Year          int                     `json:"year" form:"year" gorm:"type: int"`
	CategoryID    int                     `json:"category_id" form:"category_id" gorm:"type: int"`
	LinkFilm      string                  `json:"linkfilm" form:"linkfilm" gorm:"type: varchar(255)"`
	Description   string                  `json:"description" form:"description" gorm:"type: varchar(255)"`
}
