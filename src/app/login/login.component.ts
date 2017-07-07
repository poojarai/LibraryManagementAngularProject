import { Component, OnInit, Input, Injectable } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf, NgForm, Control, ControlGroup } from 'angular2/common';
import { Router, RouterModule, ROUTER_CONFIGURATION } from '@angular/router';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { ValidationManager } from "ng2-validation-manager";
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  /// directive: FORM_DIRECTIVES,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  userForm: any;
  create = {};
  localArray: any;
  getData: any;
  LogINForm: FormGroup;
  signUpForm: FormGroup;
  gender: any;
  notValidUser: boolean;
  global_name: string;
  showAlert: string;
  disableOrNot: boolean;
  users: any;
  defalaut_select_option: "Select";
  _id: number;
  isDuplicate: boolean;
  exampleData: any;
  constructor(public router: Router, public formBuilder: FormBuilder) {
    this.buildForm();
    this.isDuplicate = false;
    //  var debug = true;
    //     if (!debug) {
    //         //console.log.apply(this, arguments);
    //          console.warn = function(){};
    //     }
  }
  buildForm() {
    this.LogINForm = this.formBuilder.group({
      'name': [name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        this.nospaceValidator
      ]
      ],
      'select1': [{ value: '', disable: true }, Validators.required],
      'select2_ex': [{ value: '', disabled: true }, Validators.required]
    });
    this.LogINForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

    this.signUpForm = this.formBuilder.group({
      'create_Username': ['', Validators.required],
      'create_pass': ['', Validators.required],
      'create_email': ['', Validators.required],
      'create_address': ['', Validators.required],
      'confirm_Pass': ['', Validators.compose([Validators.required])]
    });
    // });
    //this.signUpForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  onValueChanged(data?: any) {
    if (!this.LogINForm) { return; }
    const form = this.LogINForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'pass': '',
    'gender': '',
    'radio_entry': ''
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.',
      'nospace': 'Space not allowed'
    },
    'pass': {
      'required': 'Password is required.'
    },
    'gender': {
      'required': 'Gender  required.'
    },
    'radio_entry': {
      'required': ' required.'
    }
  };

  login() {
    if (this.userName == "admin" && this.Pass == "admin") {
      this.router.navigate(['app-admin-index']);
    }
    else {
      this.notValidUser = true;
      if (localStorage.getItem("userData") != null) {
        this.getData = JSON.parse(localStorage.getItem("userData"));
      } else {
        this.getData = "";
      }
      if (this.getData != null) {
        for (let i in this.getData) {
          if (this.getData[i].username != null && this.getData[i].username.toLowerCase() == this.userName.toLowerCase() && this.getData[i].password == this.Pass) {
            if (this.getData[i].activeOrNot == "true" || this.getData[i].activeOrNot == true) {
              this.router.navigate(['app-guest-index']);
              this.notValidUser = false;
            }
          }
        }
      }
      if (this.userName == null && this.Pass == null) {
        alert("UserName and Password Required.");
        this.notValidUser = false;
      }
      //  else if(this.userName.toLowerCase() == "pooja" && this.Pass =="pooja"){
      //   this.router.navigate(['app-guest-index']);
      //    this.notValidUser = false;
      //  }
      if (this.notValidUser) {
        this.router.navigate(['app-login']);
        alert("UserName / Password Invalid.");
        this.userName = "";
        this.Pass = "";
      }
    }
    localStorage.setItem("currentUser", this.userName.toLowerCase());
  }
  getName = function () {
    return this.userName;
  }
  createUser(myData) {
    this.localArray = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [];
    for (let i in this.localArray) {
      if (this.localArray[i].username == myData.username) {
        alert("Username Exists");
        this.showAlert = "false";
        this.isDuplicate = true;
        break;
      }
    }
    if (!this.isDuplicate) {
      myData["id"] = "IIIPL_10" + Math.round(Math.random() * 10);
      myData["activeOrNot"] = true;
      this.localArray.push(myData);
      localStorage.setItem("userData", JSON.stringify(this.localArray));
      this._id++;
      this.showAlert = "true"
      this.router.navigate(['app-login']);
    }
    this.create["username"] = "";
    this.create["password"] = "";
    this.create["email"] = "";
    this.create["confirmPass"] = "";
    this.create["address"] = "";
  }
  public options: any;
  ngOnInit() {
    this.disableOrNot = true;
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      disabled: this.disableOrNot
    }
    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
  }

  @Input() Pass: string;
  @Input() userName: string;

  nospaceValidator(control: AbstractControl): { [s: string]: boolean } {
    let re = / /;
    if (control.value && control.value.match(re)) {
      return { nospace: true };
    }
  }
}



/***
 * Reactive From Validation
 *
 * https://angular.io/docs/ts/latest/cookbook/form-validation.html

 * * */