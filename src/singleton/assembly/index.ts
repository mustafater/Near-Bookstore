import { context,PersistentUnorderedMap,math,PersistentVector,storage,ContractPromiseBatch, u128,logging } from "near-sdk-core";
import { AccountId } from "../../utils";
import {  Book,books } from './model';



export function bookAdd(bookTitle:string,bookAuthor:string,bookPublisher:string,bookPublishDate:string,price:string):Book{

  return Book.bookcreate(bookTitle,bookAuthor,bookPublisher,bookPublishDate,price);
}
export function Show_All(): Book[] {
 
  return Book.bookShowAll();
}