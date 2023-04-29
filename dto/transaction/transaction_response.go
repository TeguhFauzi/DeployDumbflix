package transactionsdto

import (
	"dumbflix/models"
	"time"
)

type TransactionResponse struct {
	ID        int                         `json:"id" gorm:"primary_key:auto_increment"`
	Startdate time.Time                   `json:"startdate"`
	Duedate   time.Time                   `json:"duedate"`
	User      models.UsersProfileResponse `json:"userId"`
	UserID    int                         `json:"user_id" gorm:"type: int"`
	Status    string                      `json:"status" gorm:"type: text"`
}
