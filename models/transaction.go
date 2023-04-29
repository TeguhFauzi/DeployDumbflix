package models

import "time"

type Transaction struct {
	ID        int                  `json:"id" gorm:"primary_key: auto_increment"`
	StartDate time.Time            `json:"startdate"`
	DueDate   time.Time            `json:"duedate"`
	UserID    int                  `json:"user_id"`
	User      UsersProfileResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Status    string               `json:"status" gorm:"type: varchar(20)"`
	Price     int                  `json:"total_price" gorm:"type: int"`
}

type TransactionResponse struct {
	ID        int                  `json:"id" gorm:"primary_key: auto_increment"`
	StartDate time.Time            `json:"startdate"`
	DueDate   time.Time            `json:"duedate"`
	UserID    int                  `json:"user_id"`
	User      UsersProfileResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Status    string               `json:"status" gorm:"type: varchar(20)"`
	Price     int                  `json:"total_price" gorm:"type: int"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
