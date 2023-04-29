package profiledto

import "dumbflix/models"

type ProfileResponse struct {
	ID     int                         `json:"id" gorm:"primary_key:auto_increment"`
	Photo  string                      `json:"photo" gorm:"type: varchar(255)"`
	UserID int                         `json:"user_id"`
	User   models.UsersProfileResponse `json:"user"`
}
