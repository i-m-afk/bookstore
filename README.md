# BOOKSTORE API

## Description

This is a simple API for a bookstore. It allows you to create, read, update and delete books. It also allows you to create, read, update and delete authors. The API is written in TypeScript and uses PostgreSQL as a database. It is built with Node.js and Express.js.

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following variables:

```env
PORT = <port>
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=<secret>
```

4. Run `npm run dev` to start the development server

## Usage

Note: The API uses JSON Web Tokens for authentication. You can get a token by signing up or logging in. You can then use the token in the `Authorization` header of your requests. The token should be prefixed with `Bearer`.
User authentication is not required for the following endpoints:
`POST /signin`
`POST /customer`
For simplicity sake, the API does not have a way to create an admin user. You can manually set the `isAdmin` field of a user to `true` in the database to make them an admin.
NOTE: Only admins can create, update and delete books and authors.

### Books

#### Get all books

`GET /book`

expected response: Object containing objects of books

#### Get a book by id

`GET /book/:id`

expected response: Object containing a book

#### Get books by name

`GET /book/?name=The Lord of the Rings`

expected response: Object containing a book, case insensitive and returns all books with the name The Lord of the Rings

#### Get books by author

`GET /book/?author=Tolkien`

expected response: Object containing a book, case insensitive and returns all books with the author Tolkien

#### Create a book

`POST /book`

```json
{
  "name": "The Lord of the Rings",
  "link": "https://www.amazon.in/Lord-Rings-J-R-Tolkien/dp/0261103253",
  "description": "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.",
  "cover": "https://m.media-amazon.com/images/I/41mhbov-KRL._SX309_BO1,204,203,200_.jpg",
  "isbn": " 0261103253",
  "authorId": "b7d62ef6-68c5-437e-8deb-1d7743bcb148",
  "inStock": true
}
```

expected response: Object containing a book

#### Update a book

`PUT api/book/:id`

```json
{
  "name": "The Lord of the Rings",
  "link": "https://www.amazon.in/Lord-Rings-J-R-Tolkien/dp/0261103253",
  "description": "",
  "cover": "https://m.media-amazon.com/images/I/41mhbov-KRL._SX309_BO1,204,203,200_.jpg",
  "isbn": " 0261103253",
  "authorId": "b7d62ef6-68c5-437e-8deb-1d7743bcb148",
  "inStock": true
}
```

expected response: Object containing a book

#### Delete a book

`DELETE api/book/:id`

expected response: Object containing a book, this object will be deleted from the database.

### Authors

#### Get all authors

`GET api/author`

expected response: Object containing objects of authors

#### Get an author

`GET api/author/:id`

expected response: Object containing an author

#### Get authors by name

`GET api/author/?name=Tolkien`

expected response: Object containing an author, case insensitive and returns all authors with the name Tolkien

#### Create an author

`POST /author`

```json
{
  "name": "J. R. R Tolkien",
  "biography": "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.",
  "photo": "https://m.media-amazon.com/images/S/amzn-author-media-prod/hq6oari96tk6tlqvhqs9qqcvi8._SX450_.jpg"

}

expected response: Object containing an author

```

#### Update an author

`PUT /author/:id`

```json

{
  "name": "J. R. R Tolkien",
  "biography": "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings. J.R.R. Tolkien was born on 3rd January 1892. After serving in the First World War, he became best known for The Hobbit and The Lord of the Rings, selling 150 million copies in more than 40 languages worldwide. Awarded the CBE and an honorary Doctorate of Letters from Oxford University, he died in 1973 at the age of 81.",
  "photo": "https://m.media-amazon.com/images/S/amzn-author-media-prod/hq6oari96tk6tlqvhqs9qqcvi8._SX450_.jpg"
}

expected response: Object containing an author

```

#### Delete an author

`DELETE /author/:id`

expected response: Object containing an author, this object will be deleted from the database and to undo this action you will have to use the same object to create a new author. (Handled in frontend)

### Customers

#### Create a customer / Sign up

`POST /customer`

```json
{
  "username": "i-am-afk",
  "password": "password",
  "email": "rishavkumar208@gmail.com",
  "phone": "9876543210",
  "address": "B-40, Mock Street, Fake City"
}
```

expected response: Json Web Token

### Authentication

#### Login/ Sign in

`POST /signin`

```json
{
  "username": "i-am-afk",
  "password": "password"
}
```

expected response: Json Web Token

