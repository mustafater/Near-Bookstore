import { context,PersistentUnorderedMap,math,PersistentVector,storage,ContractPromiseBatch, u128,logging } from "near-sdk-core";
import { AccountId } from "../../utils";
import {  Book,books, } from './model';

//near dev-deploy ./build/release/simple.wasm
//yarn build:release
//near call $CONTRACT bookAdd '{"bookTitle":"simyacı","bookAuthor":"PauloCoulho","bookPublisher":"canyayinlari","bookPublishDate":"1996","price":"3000000000000000000000000","hire":true,"date":"0"}'   --accountId mustafa-ter.testnet
//near call $CONTRACT bookAdd '{"bookTitle":"simyacı2","bookAuthor":"PauloCoulho2","bookPublisher":"canyayinlari2","bookPublishDate":"1991","price":"4000000000000000000000000","hire":true,"date":"0"}'   --accountId mustafa-ter.testnet
//near call $CONTRACT bookAdd '{"bookTitle":"simyacı3","bookAuthor":"PauloCoulho3","bookPublisher":"canyayinlari3","bookPublishDate":"1993","price":"2000000000000000000000000","hire":true,"date":"0"}'   --accountId mustafa-ter.testnet
//near call $CONTRACT bookAdd '{"bookTitle":"simyaci4","bookAuthor":"PauloCoulho4","bookPublisher":"canyayinlari4","bookPublishDate":"1994","price":"1000000000000000000000000","hire":true,"date":"0"}'   --accountId mustafa-ter.testnet
export function bookAdd(bookTitle:string,bookAuthor:string,bookPublisher:string,bookPublishDate:string,price:u128,hire:boolean,date:string):Book{

  return Book.bookcreate(bookTitle,bookAuthor,bookPublisher,bookPublishDate,price,hire,date);
}
//near call $CONTRACT bookFindOne '{"bookId":1180055164}'   --accountId mustafa-ter.testnet
export function bookFindOne(bookId:u32):Book{
  return Book.bookFindById(bookId);
}

//near call $CONTRACT bookAll '{}'   --accountId mustafa-ter.testnet
export function bookAll(): Book[] {
 
  return Book.bookShowAll();
}


//near call $CONTRACT bookFindAndDelete '{"bookId":4166171290}'   --accountId mustafa-ter.testnet
export function bookFindAndDelete(bookId:u32):string{
  return Book.bookDeleteOne(bookId);
}




//near call $CONTRACT bookForUpdate '{"bookId":1180055164,"news":{"bookTitle":"simyacı","bookAuthor":"PauloCoulho","bookPublisher":"canyayinlari","bookPublishDate": "1996","price":"3000000000000000000000000","hire":true,"date":0}}'  --accountId mustafa-ter.testnet
export function bookForUpdate(bookId:u32,news:Book):Book{

  return Book.bookupdate(bookId,news);

}

//near call $CONTRACT bookAllDelete '{}'   --accountId mustafa-ter.testnet
export function bookAllDelete():string{
  return Book.bookDeleteAll();
}

//near call $CONTRACT bookRent '{"bookId":4166171290,"date":"2"}' --accountId mustafa-ter.testnet  --amount 5
export function bookRent(bookId:u32,date:string):string{
   return Book.rentBook(bookId,date);
}

//near call $CONTRACT bookGiveBack '{"bookId":4166171290,"customerid":"mustafa-ter.testnet"}' --accountId mustafa-ter.testnet
export function bookGiveBack(bookId:u32,customerid:AccountId):string{
    
  return Book.giveBackBook(bookId,customerid);

}
// near call $CONTRACT bookBuy '{"bookId":4166171290,"customerid":"mustafa-ter.testnet"}' --accountId mustafa-ter.testnet
export function bookBuy(bookId:u32,customerid:AccountId):string{
   return Book.buyBook(bookId,customerid);
}
