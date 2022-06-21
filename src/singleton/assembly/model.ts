import {
    context, 
    PersistentUnorderedMap, 
    math, 
    logging,
    u128,
  } from "near-sdk-as";

export const books = new PersistentUnorderedMap<u32,Book>("books");/*
export const customers= new PersistentUnorderedMap<u32,Customer>("customers");

export const date = Date.now();
@nearBindgen
export  class Customer extends Book{
     id:u32;
      newdate:u64;
      price:string;
      time:string
  time keeps track of how long we use the book
    constructor(id:u32,time:string) {
        assert(books.contains(id),"book not found");
        this.price=books.getSome(id).price;
        this.newdate=context.blockTimestamp;
        this.time=time;
        logging.log(this.newdate);
        logging.log(date);
            
        assert(context.attachedDeposit == u128.fromString('price'), 'Please deposit exactly the amount of price to hire a book ');
         
        if(time.toString()== "oneweek" && this.newdate >= date+604800){

        }else if (time.toString()=="onemonth" && this.newdate >= date+) {
            
        } else {
            
        }
    }
    static bookreceipt(id:u32,time:string):Customer{

        const newcustomer = new Customer(id,time);
        customers.set(newcustomer.id, newcustomer);
       return newcustomer;
   }
    
    static rentBookAndBuy(date:u64):void{
        assert(context.attachedDeposit == u128.fromString('price'), 'Please deposit exactly the amount of price to hire a book ');
        
    }
    

}*/

@nearBindgen
export class Book{
    bookId:u32;
    bookTitle:string;
    bookAuthor:string;
    bookPublisher:string;
    price:string;
    bookPublishDate:string;
    
    constructor(bookTitle:string,bookAuthor:string,bookPublisher:string,bookPublishDate:string,price:string){
        this.bookId=math.hash32<string>(bookTitle);
        this.bookTitle=bookTitle;
        this.bookAuthor=bookAuthor;
        this.bookPublisher=bookPublisher;
        this.price=price;
        this.bookPublishDate=bookPublishDate;
    }
    // one book
    static bookFindById(bookId:u32):Book{
        assert(books.contains(bookId),"book not found");
        return books.getSome(bookId);
    }
    // create book
   static bookcreate(bookTitle:string,bookAuthor:string,bookPublisher:string,bookPublishDate:string,price:string):Book{

        const newbook = new Book(bookTitle,bookAuthor,bookPublisher,bookPublishDate,price);
        books.set(newbook.bookId,newbook);
       return newbook;
   }
   // show all book
    static  bookShowAll():Book[]{
        let limit = books.length;
        let offset:u32=0;
        return books.values(offset,offset+limit);
    }
    //update book
    static bookUpdate(bookId:u32,news:Book):Book{
       let book= this.bookFindById(bookId);
       book.bookAuthor=news.bookAuthor;
       book.bookPublishDate=news.bookPublishDate;
       book.bookTitle=news.bookPublisher;
       book.bookPublisher=news.bookPublisher;
       book.price=news.price;
       books.set(bookId,book);
       return book;
    }
    //delete book
    static bookDeleteOne(bookId:u32):string{
        assert(books.contains(bookId),"book not found")
        books.delete(bookId);
        return "the book was deleted";
    }
    // delele all book
    static bookDeleteAll():string{
        books.clear();
        return "All books have been deleted"
    }
  
}   