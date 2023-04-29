package profiledto

type ProfileRequest struct {
	ID     int    `json:"id" gorm:"primary_key:auto_increment" validate:"required"`
	Photo  string `json:"photo" form:"photo" gorm:"type: varchar(255)" validate:"required"`
	UserID int    `json:"user_id"`
}
