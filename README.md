# Near Project Book Store

In this project, renting or buying books using near tokens with an imaginary bookshop.
 Another goal is to be environmentally conscious by using more than one book.

### Loom Video

https://loom.com/share/970cbb5a4e39468197ab8f3c19cc8eb6

## Build and devDeploy
```
yarn
yarn build:release
near dev-deploy ./build/release/simple.wasm
near login
export CONTRACT=<accountId(YOUR TESTNET ACCOUNT)>

```


## Functions

------
- creating a book
```
near call $CONTRACT bookAdd '{"bookTitle":"","bookAuthor":"","bookPublisher":"","bookPublishDate":"","price":"","hire":,"date":""}'   --accountId (YOUR TESTNET ACCOUNT)
```
- Use to find the book.

```
near call $CONTRACT bookFindOne '{"bookId":}'   --accountId (YOUR TESTNET ACCOUNT)
```

- Used to find a book.

```
near call $CONTRACT bookFindOne '{"bookId":}'   --accountId (YOUR TESTNET ACCOUNT)

```

- Used to see all books.

```
near call $CONTRACT bookAll '{}'   --accountId (YOUR TESTNET ACCOUNT)
```

- Used to delete a book.

```
near call $CONTRACT bookFindAndDelete '{"bookId":}'   --accountId (YOUR TESTNET ACCOUNT)
```

- Used to update the book.

```
near call $CONTRACT bookForUpdate '{"bookId":,"news":{"bookTitle":"ı","bookAuthor":"","bookPublisher":"","bookPublishDate": "","price":"","hire":,"date":}}'  --accountId (YOUR TESTNET ACCOUNT)
```
- Used to delete all books.

```
near call $CONTRACT bookAllDelete '{}'   --accountId (YOUR TESTNET ACCOUNT)

```

- Used to rent the book.

```
near call $CONTRACT bookRent '{"bookId":,"date":""}' --accountId (YOUR TESTNET ACCOUNT)  --amount 

```

- Used to return the book.

```
near call $CONTRACT bookGiveBack '{"bookId":,"customerid":""}' --accountId (YOUR TESTNET ACCOUNT)

```

- Used to buy the book.

```
near call $CONTRACT bookBuy '{"bookId":,"customerid":""}' --accountId (YOUR TESTNET ACCOUNT)
```

## Used Technology

--------

- Near sdk.
- Near cli.
- Assemply script for writing the contract.
