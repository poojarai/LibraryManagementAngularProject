import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ViewPartComponent } from './view-part/view-part.component';
import { BodyContentComponent } from './body-content/body-content.component';
import { PoojaComponent } from './pooja/pooja.component';
import { LoginComponent } from './login/login.component';
import { GuestIndexComponent } from './guest-index/guest-index.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { routes } from './app.route';
import { CreateUserComponent } from './create-user/create-user.component';
import { MyFilterPipe, bookSearch, TitleCase } from './search.pipe';
import { NgbdModalBasic } from './modal-basic';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule } from 'ng2-datepicker';
import { ModalModule } from "ng2-modal";
import { CustomFormsModule } from 'ng2-validation';
import { Select2Module } from 'ng2-select2';
import { Ng2PaginationModule } from 'ng2-pagination';
import { DataTableModule, SharedModule, DialogModule, Column, Schedule, Growl, Message, SelectItem } from 'primeng/primeng';
import { PrimeNgComponent } from './prime-ng/prime-ng.component';
import { DropdownModule, MultiSelectModule, Dropdown, CheckboxModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import swal from 'sweetalert2';
@NgModule({
  declarations: [
    AppComponent,
    ViewPartComponent,
    BodyContentComponent,
    PoojaComponent,
    LoginComponent,
    GuestIndexComponent,
    AdminIndexComponent,
    CreateUserComponent,
    MyFilterPipe, bookSearch, TitleCase,
    NgbdModalBasic,
    PrimeNgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, DropdownModule,
    ModalModule,
    DatePickerModule,
    CustomFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
    }),
    NgbModule.forRoot(),
    Select2Module,
    Ng2PaginationModule,
    DataTableModule,
    MultiSelectModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
