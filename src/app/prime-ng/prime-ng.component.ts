import {
	Component, OnInit, AfterViewInit,ViewChild
}
from '@angular/core';

import {
	CarService
}
from '../carService.service';
import {
	DropdownModule
}
from 'primeng/primeng';
import {
	DataTableModule, SharedModule, DialogModule, Column, Schedule, Growl, Message,ButtonModule, Dropdown
}
from 'primeng/primeng';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf, NgForm, Control, ControlGroup } from 'angular2/common';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
	SelectItem
}
from 'primeng/primeng';@
//  import  swal  from 'sweetalert2';
Component({
	selector: 'app-prime-ng',
	templateUrl: './prime-ng.component.html',
	styleUrls: ['./prime-ng.component.css'],
	providers: [CarService]
})
export class PrimeNgComponent implements OnInit {
	carData = [];
	selectedValues: string[] = ['New York'];
	brands: SelectItem[];
	dataTypeOptions: SelectItem[];
	typeList: any;
	columns: SelectItem[];
	selectedCircle: string;
	selectedCities: any;
	loading: boolean;
	hideNameCol: boolean;
	hideGenderCol: boolean;
	hideCompanyCol: boolean;
	patternForString : string;
	patternForNumber :string;
	defalaut_select_option : any;
	defalaut_select_option1 :any;
	addList: any;
	showList :any;
	_id:any;
	constructor(public carService: CarService) {
		this.loading = true;
		carService.getCarsData().subscribe(myData => {
			this.carData = myData;
			this.loading = false;
		});
		this._id =1;
		this.selectedCircle = "build";
		this.defalaut_select_option = "";
		this.defalaut_select_option1 = "";
		this.brands = [];
		this.brands.push({label: 'All Brands',value: null});
		this.brands.push({label: 'Male',value: 'male'});
		this.brands.push({label: 'Female',value: 'female'});

		this.dataTypeOptions = [];
		this.dataTypeOptions.push({label: 'Select',value: null});
		this.dataTypeOptions.push({label: 'String',value: "string"});
		this.dataTypeOptions.push({label: 'Number',value: "number"});
		// this.dataTypeOptions.push({label: 'Boolean',value: "boolean"});
		

		this.columns = [];
		this.columns.push({label: 'Name',value: 'name'});
		this.columns.push({label: 'Gender',value: 'gender'});
		this.columns.push({label: 'Company',value: 'compnay'});
	
	
		 this.typeList = [
			{
				id: 'name',
				text: 'Name'
			},
			{
				id: 'Id',
				text: 'Process ID'
			},
			{
				id: 'placeholder',
				text: 'placeholder'
			}
  		  ];
			this.addList = [{
				"id":101,"text":" "
			}]
			this.showList = [{
				"index": 0
			}]
	}
	getColor = function(_c) {
		if(_c == "high") {
			return "red";
		} else if(_c == "low") {
			return "green";
		} else if(_c == "medium") {
			return "orange";
		}
	}
	func = function() {
		// console.log("Hello Pooja");
		//console.log("Ayushi")
		return "newClass";
	}
	onUserChange = function(e) {
		this.hideNameCol = false;
		this.hideGenderCol = false;
		this.hideCompanyCol = false;
		if(this.selectedCities.length == 1) {
			if(((this.selectedCities).indexOf("name")) != -1) {
				this.hideNameCol = false;
				this.hideGenderCol = true;
				this.hideCompanyCol = true;
			} else if(((this.selectedCities).indexOf("gender")) != -1) {
				this.hideGenderCol = false;
				this.hideNameCol = true;
				this.hideCompanyCol = true;
			} else if(((this.selectedCities).indexOf("compnay")) != -1) {
				this.hideCompanyCol = false;
				this.hideNameCol = true;
				this.hideGenderCol = true;
			} else {
				this.hideNameCol = false;
				this.hideGenderCol = false;
				this.hideCompanyCol = false;
			}
		} else if(this.selectedCities.length == 2) {
			if(((this.selectedCities).indexOf("name")) != -1 && ((this.selectedCities).indexOf("gender")) != -1) {
				this.hideNameCol = false;
				this.hideGenderCol = false;
				this.hideCompanyCol = true;
			} else if(((this.selectedCities).indexOf("name")) != -1 && ((this.selectedCities).indexOf("compnay")) != -1) {
				this.hideNameCol = false;
				this.hideCompanyCol = false;
				this.hideGenderCol = true;
			} else if(((this.selectedCities).indexOf("gender")) != -1 && ((this.selectedCities).indexOf("compnay")) != -1) {
				this.hideCompanyCol = false;
				this.hideGenderCol = false;
				this.hideNameCol = true;
			}
		} else if(this.selectedCities.length == 3) {
			if(((this.selectedCities).indexOf("name")) != -1 && ((this.selectedCities).indexOf("gender")) != -1 && ((this.selectedCities).indexOf("compnay")) != -1) {
				this.hideNameCol = false;
				this.hideGenderCol = false;
				this.hideCompanyCol = false;
			}
		}
	}
	getDatatypeOnChange = function(e){
		if(e.value == "string"){
			this.num_ranges = "";
			this.patternForNumber = "string";
		}else if(e.value == "number"){
			this.patternForNumber = "number";
			this.num_ranges = "";
		}else if(e.value == "boolean"){
			this.patternForNumber = "boolean";
			this.num_ranges = "";
		}
		
	}
	onlyNumberKey(event) {
  	  return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}
	 @ViewChild('abc')abc: string;
	validateAddForQueryBuilder = function(){
			for(let i= 0 ; i< this.showList.length ; i++){
				var selectEle = (<HTMLInputElement>document.getElementById("dynamic"+i)).value;
				var inputEle = (<HTMLInputElement>document.getElementById("input"+i)).value;
				if(selectEle == "" || selectEle == null || selectEle=="Select" || inputEle == "" || inputEle == null ){
						this.shwoQueryBuilder = true;
				} else {
						this.shwoQueryBuilder = false;
						// this.showList.push({"index":this._id});
						// this._id++;
				}
				// console.log(this.abc.nativeElement.value);
			}
	}
	select2Onchange = function(select2Id , eventObj){
		if(select2Id == "s1"){
			this.defalaut_select_option = eventObj;
		} else if(select2Id == "s2"){
			this.defalaut_select_option1 = eventObj;
		}
		console.log(this.defalaut_select_option)
	}
	onChange(item:any)
    {
      console.log("I am called  " + item);
    }
	demo = function() {
		if(!this.shwoQueryBuilder){
			this.showList.push({"index":this._id});
			this._id++;
		}
   }
   saveList =  function() {
	if(!this.shwoQueryBuilder){
		console.log("Saved")
	}
   }
	ngOnInit() {}
}
// dp.operations@axisbank.com