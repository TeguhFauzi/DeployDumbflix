package authdto

type RegisterRequest struct {
	IsAdmin   bool   `json:"is_admin"`
	Fullname  string `gorm:"type: varchar(255)" json:"fullname" validate:"required"`
	Email     string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password  string `gorm:"type: varchar(255)" json:"password" validate:"required"`
	Gender    string `gorm:"type: varchar(255)" json:"gender"`
	Phone     string `gorm:"type: varchar(255)" json:"phone"`
	Address   string `gorm:"type: varchar(255)" json:"address"`
	Subscribe string `gorm:"type: varchar(255)" json:"subscribe"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}
