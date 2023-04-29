package transactionsdto

import (
	"dumbflix/models"
	"time"
)

type TransactionRequest struct {
	ID        int                         `json:"id" gorm:"primary_key:auto_increment"`
	StartDate time.Time                   `json:"startdate" form:"startdate" `
	DueDate   time.Time                   `json:"duedate" form:"duedate" `
	User      models.UsersProfileResponse `json:"userId"`
	UserID    int                         `json:"user_id"`
	Status    string                      `json:"status" form:"status" gorm:"type: text"`
}

type TransactionRequestcreate struct {
	Price  int    `json:"price"`
	Days   int    `json:"days"`
	Status string `json:"status"`
}
