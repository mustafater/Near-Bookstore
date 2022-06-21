import {
    context, 
    PersistentUnorderedMap, 
    math, 
    logging,
    ContractPromiseBatch,
    u128,
  } from "near-sdk-as";
import { AccountId } from "../../utils";

export const books = new PersistentUnorderedMap<u32,Book>("books");
export const OneWeek = u128.from("1000000000000000000000000");
export const OneMonth = u128.from("2000000000000000000000000");
export const OneYear = u128.from("3000000000000000000000000");


@nearBindgen
export class Book{
    bookId:u32;
    bookTitle:string;
    bookAuthor:string;
    bookPublisher:string;
    price:u128;
    time:u64;
    hire:boolean;
    date:string;
    bookPublishDate:string;
    
    constructor(bookTitle:string,bookAuthor:string,bookPublisher:string,bookPublishDate:string,price:u128,hire:boolean,date:string){
        this.bookId=math.hash32<string>(bookTitle);
        this.bookTitle=bookTitle;
        this.bookAuthor=bookAuthor;
        this.bookPublisher=bookPublisher;
        this.price=price;
        this.bookPublishDate=bookPublishDate;
        this.time=context.blockTimestamp;
        this.date=date;
        this.hire=true;
    }
    // one book
    static bookFindById(bookId:u32):Book{
        assert(books.contains(bookId),"book not found");
        return books.getSome(bookId);
    }
    // create book
   static bookcreate(bookTitle:string,bookAuthor:string,bookPublisher:string,bookPublishDate:string,price:u128,hire:boolean,date:string):Book{

        const newbook = new Book(bookTitle,bookAuthor,bookPublisher,bookPublishDate,price,hire,date);
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
    static bookupdate(bookId:u32,news:Book):Book{
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
    
    //date = 0  don't hire 
    //date =1  one week hire
    // date =2 one month hire 
    // date = 3 one year hire
    //hire parametre we keep the information whether it is rented or not.
    static  rentBook(bookId:u32,date:string):string {
        assert(books.contains(bookId),"book not found")
         let ket= this.bookFindById(bookId);
         let price= ket.price;
         
         ket.date=date;
       
         assert(context.attachedDeposit > price, `Please more deposit minimum ${price}`);
         if(ket.hire==true){
            ket.hire=false;
            
            if(date.toString()=="1"){
                
                ket.time=context.blockTimestamp+604800000000;
             }else if (date.toString()=="2") {
                
                 ket.time=context.blockTimestamp+2629743831225 ;
                 
             } else {
                ket.time=context.blockTimestamp+31557600000000;
             }
             
             books.set(bookId,ket);
            return "you rented the book";
         }
         return "sorry This book cannot be rented."
        
    }

    static  giveBackBook(bookId:u32,customerid:AccountId):string{
        assert(books.contains(bookId),"book not found")
        let ket= this.bookFindById(bookId);
        let price= ket.price;
        let rTime=ket.time;
        
        let nowTime=context.blockTimestamp;
        let nowdate=ket.date;
    

        
        if(rTime > nowTime  && nowdate=="1"){
            ket.hire=true;
            ket.date="0";
            
            const receiveToCash = u128.sub(price,OneWeek );
            ContractPromiseBatch.create(customerid).transfer(receiveToCash);
            books.set(bookId,ket);
        }else if(rTime > nowTime  && nowdate=="2")  {
            ket.hire=true;
            
            ket.date="0";
            const receiveToCash = u128.sub(price,OneMonth );
            ContractPromiseBatch.create(customerid).transfer(receiveToCash);
            books.set(bookId,ket);
        }else if (rTime > nowTime   && nowdate=="3") {
            const receiveToCash = u128.sub(price,OneYear );
            ContractPromiseBatch.create(customerid).transfer(receiveToCash);
            ket.hire=true;
            ket.date="0";
            
            books.set(bookId,ket);
        } else {
            ContractPromiseBatch.create(customerid).transfer(context.attachedDeposit);
            return "sorry This book cannot be return." 
            
        }
           return "well done!"; 
           
    }



    static buyBook(bookId:u32,customerid:AccountId):string{
        assert(books.contains(bookId),"book not found")
        let ket= this.bookFindById(bookId);
        let price= ket.price;
        ContractPromiseBatch.create(customerid).transfer(context.attachedDeposit);
        this.bookDeleteOne(bookId);
        return "oke the book yours";
    }
   
}   