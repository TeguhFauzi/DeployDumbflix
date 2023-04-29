package categoriesdto

type CategoryRequest struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Name string `json:"name" form:"name" gorm:"type: varchar(255)"`
}
