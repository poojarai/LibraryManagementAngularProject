import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyFilterPipe } from './../search.pipe';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
import { MyServiceService } from '../my-service.service';
import { UserServiceService } from '../user-service.service';
@Component({
    selector: 'app-admin-index',
    templateUrl: './admin-index.component.html',
    styleUrls: ['./admin-index.component.css'],
    providers: [MyServiceService, UserServiceService]
})
export class AdminIndexComponent implements OnInit {
    public uid = 101;
    toggle = true;
    setClickedRow: Function;
    addBookForm: FormGroup;
    selectedRow: Number;
    editableRow: Number;
    model: any = {};
    localArray: any;
    guestName: string;

    booksData = [];
    books: any;
    user_data: any;
    showAlert: boolean;
    _view_name: string;
    _view_email: string;
    _view_address: string;
    _view_activeStatus: string;
    tab: string;
    constructor(public router: Router, public formBuilder: FormBuilder, private MyServiceService: MyServiceService, public userServ: UserServiceService) {
        // var debug = false;
        // if (!debug) {
        //     //console.log.apply(this, arguments);
        //      console.log = function(){};
        // }
        this.guestName = localStorage.getItem("currentUser");
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        }
        this.tab = 'userListTab'
        this.addBookForm = this.formBuilder.group({
            'addTitle': ['', Validators.required],
            'addAuthor': ['', Validators.required],
            'addPublisher': ['', Validators.required],
            'addHiddenId': ['', Validators],
            'addStatus': ['', Validators.required],
            'addSummary': ['', Validators.required]
        });

        if (localStorage.getItem("book_Data") == null) {
            var service_data = [];
            this.MyServiceService.getData().subscribe(get_value => {
                localStorage.setItem('book_Data', JSON.stringify(get_value));
                this.books = JSON.parse(localStorage.getItem("book_Data"));
            });
        }
        if (localStorage.getItem("userData") == null) {
            this.userServ.getUserData().subscribe(user_value => {
                localStorage.setItem('userData', JSON.stringify(user_value));
                this.user_data = JSON.parse(localStorage.getItem("userData"));
            });
        }
        this.books = JSON.parse(localStorage.getItem("book_Data"));
        this.user_data = JSON.parse(localStorage.getItem("userData"));
    }

    editUserData = function (index, _id, _userObj) {
        if (this.toggle) {
            this.editableRow = index;
            $('#' + _id).text('Save');
            this.toggle = false;
        } else {
            this.editableRow = -1;
            this.toggle = true;
            $('#' + _id).text('Edit');
            let allVisitors = JSON.parse(localStorage["userData"]);
            for (let i in allVisitors) {
                if (allVisitors[i].id === _id) {
                    allVisitors[i].username = _userObj.username;
                    allVisitors[i].email = _userObj.email;
                    break;
                }
            }
            localStorage["userData"] = JSON.stringify(allVisitors);
            this.books = JSON.parse(localStorage["userData"]);
        }
    }
    userDetailsViewOnClick = function (user) {
        this._view_name = user.username;
        this._view_email = user.email;
        this._view_address = user.address;
        if(user.activeOrNot == true){
            this._view_activeStatus = "Active";
        } else {
            this._view_activeStatus = "In-Active";
        }
        
    }
    editBookData = function (index, _id, bookObj) {
        if (this.toggle) {
            this.editableRow = index;
            $('#' + _id).text('Save');
            this.toggle = false;
        } else {
            this.editableRow = -1;
            this.toggle = true;
            $('#' + _id).text('Edit');
            let allVisitors = JSON.parse(localStorage["book_Data"]);
            for (let i in allVisitors) {
                if (allVisitors[i].id === _id) {
                    allVisitors[i].publisher = bookObj.publisher;
                    allVisitors[i].title = bookObj.title;
                    allVisitors[i].author = bookObj.author;
                    break;
                }
            }
            localStorage["book_Data"] = JSON.stringify(allVisitors);
            this.books = JSON.parse(localStorage["book_Data"]);
        }

    }
    disableUser = function (event, user_id) {
        let userCollection = JSON.parse(localStorage.getItem("userData"));
        for (let i in userCollection) {
            if (userCollection[i].id == user_id) {
                //  userCollection.splice(i,1);
                if (event == false || event == "false") {
                    userCollection[i].activeOrNot = false;
                } else {
                    userCollection[i].activeOrNot = true;
                }

                break;
            }
        }
        localStorage["userData"] = JSON.stringify(userCollection);
        this.user_data = JSON.parse(localStorage["userData"]);
    }
    deleteUser = function (id) {
        for (let i in this.users) {
            if (this.users[i].id == id) {
                this.users.splice(i, 1);
            }
        }
    }
    deleteBook = function (id) {
        var book_items = JSON.parse(localStorage["book_Data"]);
        for (let i in book_items) {
            if (book_items[i].id == id) book_items.splice(i, 1);
        }
        localStorage["book_Data"] = JSON.stringify(book_items);
        this.books = JSON.parse(localStorage["book_Data"]);

        // for (let i in this.listOfBooks) {
        //     if (this.listOfBooks[i].id == id) {
        //        this.listOfBooks.splice(i, 1);
        //     }
        // }
    }
    updateView = function () {
        this.books = JSON.parse(localStorage["book_Data"]);
    }
    approve_book_request = function (_id) {
        var allVisitors = JSON.parse(localStorage["book_Data"]);
        for (let i in allVisitors) {
            if (allVisitors[i].id == _id) {
                allVisitors[i].order_status = "Approved By Admin";
                allVisitors[i].status_to_show = "Issued to " + this.toTitleCase(allVisitors[i].requested_user);
                allVisitors[i].status = "Not Available";
                allVisitors[i].show_requested_user = "-";
                break;
            }
        }
        localStorage["book_Data"] = JSON.stringify(allVisitors);
        this.books = JSON.parse(localStorage["book_Data"]);
    }
    reject_book_request = function (_id) {
        var allVisitors = JSON.parse(localStorage["book_Data"]);
        for (let i in allVisitors) {
            if (allVisitors[i].id == _id) {
                allVisitors[i].order_status = "Rejected";
                 allVisitors[i].status_to_show = "Issue Request Rejected Order Again";
                 allVisitors[i].show_requested_user = "-";
                break;
            }
        }
        localStorage["book_Data"] = JSON.stringify(allVisitors);
        this.books = JSON.parse(localStorage["book_Data"]);
    }
    create = function (user) {
        if (user.id == null) {
            user.id = this.uid++;
            user.push(user);
        } else {
            for (let i in this.users) {
                if (this.users[i].id == this.users.id) {
                    this.users[i] = user;
                }
            }
        }
    }
    addNewBook(model, event) {
        if (model.id == null) {
            model.id = this.uid++;
            model.path = "assets/images/2.jpg";
            model.status = "Available";
            model.flag = false;
            model.order_status = "-";

            // this.listOfBooks.push(model);
            this.localArray = localStorage.getItem("book_Data") ? JSON.parse(localStorage.getItem("book_Data")) : [];
            this.localArray.push(model);
            localStorage.setItem("book_Data", JSON.stringify(this.localArray));
        }
        model = {};
        this.updateView();
        this.model.title = "";
        this.model.author = "";
        this.model.publisher = "";
        this.model.status = "";
        this.model.summary = "";

        this.showAlert = true;
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    }
    closeAddBook() {
        this.model.title = "";
        this.model.author = "";
        this.model.publisher = "";
        this.model.status = "";
        this.model.summary = "";
    }
    toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
    ngOnInit() {

    }

}