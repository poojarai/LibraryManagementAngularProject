import {
    Component,
    OnInit,
    AfterViewInit,
    ViewContainerRef
} from '@angular/core';

import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
    ReactiveFormsModule
} from '@angular/forms';
import {
    LoginComponent
} from '../login/login.component'
import {
    ModalModule
} from "ng2-modal";
import {
    DatePickerOptions,
    DateModel
} from 'ng2-datepicker';
declare var $: any;

import { MyServiceService } from '../my-service.service'
@Component({
    selector: 'app-guest-index',
    templateUrl: './guest-index.component.html',
    styleUrls: ['./guest-index.component.css'],
    providers: [LoginComponent, MyServiceService]
})
export class GuestIndexComponent implements AfterViewInit {

    selectedRow: Number;
    setClickedRow: Function;
    order: any;
    _date = {};
    bTitle: string;
    bAuthor: string;
    bPublisher: string;
    _return_title: string;
    _return_author: string;
    _return_publisher: string;
    bIssueDate: DateModel;
    bReturnDate: DateModel;
    minDate: any;

    rowIndex: number;
    guestName: string;
    date: DateModel;
    options: DatePickerOptions;
    books: any;
    my_reuested_book: any = [];
    count: number;

    _show_book_name: string;
    _show_book_author: string;
    _show_book_publisher: string;
    _show_book_summary: string;
    _show_book_img: string;
    tab: string;

    constructor(public logIn_comp: LoginComponent, public myserv: MyServiceService) {
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        }
        var d = new Date();
        this.loadBookData();
        this.tab = 'allBooksTab';
        this.options = new DatePickerOptions();
        this.options.minDate = new Date();
        this.options.maxDate = new Date(d.setDate(d.getDate() + 60));
        this.books = JSON.parse(localStorage.getItem("book_Data"));
        this.guestName = localStorage.getItem("currentUser");
        this.users_books();
    }
    loadBookData = function () {
        if (localStorage.getItem("book_Data") == null) {
            console.log("Inside service call");
            this.myserv.getData().subscribe(get_value => {
                console.log(get_value);
                localStorage.setItem('book_Data', JSON.stringify(get_value));
                this.books = JSON.parse(localStorage.getItem("book_Data"));
            });
        }
    }
    users_books = function () {
        var allVisitors = JSON.parse(localStorage["book_Data"]);
        this.count = 0;
        for (let i in allVisitors) {
            if (allVisitors[i].requested_user != null) {
                if (allVisitors[i].requested_user.toLowerCase() == this.guestName.toLowerCase() && allVisitors[i].order_status == 'Approved By Admin') {
                    this.my_reuested_book.push(allVisitors[i]);
                    this.count++;
                }
            }
        }
    }
    returnBookSelectedData(book) {
        this._return_title = book.title;
        this._return_author = book.author;
        this._return_publisher = book.publisher;
        var allVisitors = JSON.parse(localStorage["book_Data"]);
        for (let i in allVisitors) {
            if (allVisitors[i].id == book.id) {
                console.log("inside");
                allVisitors[i].order_status = "-";
                allVisitors[i].status = "Available";
                allVisitors[i].requested_user = "-";
                allVisitors[i].show_requested_user = "-";
                allVisitors[i].status_to_show = "-";
                break;
            }
        }
        localStorage["book_Data"] = JSON.stringify(allVisitors);
        this.my_reuested_book = JSON.parse(localStorage["book_Data"]);
    }
    requestBook(rqBook) {
        var allVisitors = JSON.parse(localStorage["book_Data"]);
        for (let i in allVisitors) {
            if (allVisitors[i].id == this.rowIndex) {
                allVisitors[i].order_status = "Pending";

                if (rqBook.issue != null && rqBook.return != null) {
                    allVisitors[i].issuedDate = rqBook.issue.formatted;
                    allVisitors[i].returnDate = rqBook.return.formatted;
                } else {
                    allVisitors[i].issuedDate = new Date();
                    allVisitors[i].returnDate = new Date();
                }
                allVisitors[i].requested_user = localStorage.getItem('currentUser');
                allVisitors[i].show_requested_user = localStorage.getItem('currentUser');
                allVisitors[i].status_to_show = "Book Issue Request";
                break;
            }
        }
        localStorage["book_Data"] = JSON.stringify(allVisitors);
        this.books = JSON.parse(localStorage["book_Data"]);
    }
    cancelRequest = function (_id) {
        var allVisitors = JSON.parse(localStorage["book_Data"]);
        for (let i in allVisitors) {
            if (allVisitors[i].id == _id) {
                allVisitors[i].order_status = "-";
                allVisitors[i].requested_user = "-";
                allVisitors[i].show_requested_user = "-";
                allVisitors[i].status_to_show = "-";
                break;
            }
        }
        localStorage["book_Data"] = JSON.stringify(allVisitors);
        this.books = JSON.parse(localStorage["book_Data"]);
    }
    
    toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
    ngAfterViewInit() {

    }
    updateView = function () {
        this.books = JSON.parse(localStorage["book_Data"]);
    }
    showBookDetails = function (seledtedBookData) {
        this._show_book_name = seledtedBookData.title;
        this._show_book_author = seledtedBookData.author;
        this._show_book_publisher = seledtedBookData.publisher;
        this._show_book_summary = seledtedBookData.summary;
        this._show_book_img = seledtedBookData.path;
    }
    orderBook(selectedBookData, i) {
        this.bAuthor = selectedBookData.author;
        this.bTitle = selectedBookData.title;
        this.bPublisher = selectedBookData.publisher;
        this.rowIndex = selectedBookData.id;
    }
}