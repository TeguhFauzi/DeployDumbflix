package models

type Category struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Name string `json:"name" gorm:"type: varchar(255)"`
}

type CategoryResponse struct {
	ID int `json:"id"`
	Name string `json:"name" form:"name" gorm:"type: varchar(255)"`
}
func (CategoryResponse) TableName() string{
	return "categories"
}