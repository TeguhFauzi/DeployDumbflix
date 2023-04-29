package models

type User struct {
	ID          int                   `json:"id" gorm:"primary_key:auto_increment"`
	Fullname    string                `json:"fullname" gorm:"type: varchar(255)"`
	Email       string                `json:"email" gorm:"type: varchar(255)"`
	Password    string                `json:"password" gorm:"type: varchar(255)"`
	Gender      string                `json:"gender" gorm:"type: varchar(255)"`
	Phone       string                `json:"phone" gorm:"type: varchar(255)"`
	Address     string                `json:"address" gorm:"type: text"`
	Subscribe   string                `json:"subscribe" gorm:"type:text"`
	Profile     ProfileResponse       `json:"profile"`
	Transaction []TransactionResponse `json:"transactions"`
	IsAdmin     bool                  `json:"is_admin" gorm:"type: bool"`
}

type UsersProfileResponse struct {
	ID        int    `json:"id"`
	Fullname  string `json:"fullname"`
	Email     string `json:"email"`
	Gender    string `json:"gender"`
	Phone     string `json:"phone"`
	Address   string `json:"address"`
	Subscribe string `json:"subscribe"`
	IsAdmin   bool   `json:"is_admin"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
