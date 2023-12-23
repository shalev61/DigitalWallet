# Digital Wallet Project


## Getting Started

To run the project locally, run this line:
npm run start:services

## My collections 
In my project i have 2 collections

1. users
with users like this 
{
  "userId": 3,
  "balance": 100
}
when userId is the unique id of person and balance it is the money that he has

2.transactions
which contains transactions like this
{
  "senderUserId": 1,
  "receiverUserId": 2,
  "amount": 20,
  "timestamp": "transaction_timestamp"
}
when the senderUserId is the id of the person that send the money
the receiverUserId is the id of the person that recive the money
amount is how much money sent
and timestamp is the date of the transaction

# API Routes
1. Create new User
Endpoint: /users/
Method: POST

Postman Example::
POST http://localhost:3000/users/
Body: { "userId": 7, "balance": 43 }

(create new user with userId=7 and balance=43)


2. Perform a Transaction
Endpoint: /api/transactions
Method: POST

Postman Example::
POST http://localhost:3001/api/transactions
Body: { "senderUserId": 7, "receiverUserId": 5, "amount": 20 }

(create new Transaction that user with userId 7 send amount of 20$ to user with userId 5)


3. Get User History
Endpoint: /users/history/:userId
Method: GET

Postman Example:
GET http://localhost:3001/api/history/3

(show us in list the history of user with the userId 3)
