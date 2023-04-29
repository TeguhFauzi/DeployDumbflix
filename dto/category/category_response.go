package categoriesdto

type CategoryResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name" form:"name" gorm:"type: varchar(255)" validate:"required"`
}
