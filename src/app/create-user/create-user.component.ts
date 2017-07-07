import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    AdminIndexComponent
} from './../admin-index/admin-index.component'

import {
    CustomFormsModule
} from 'ng2-validation';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

    @Input() users;
    @Input() listOfBooks;
    model: any = {};
    loading = false;
    constructor(private router: Router) { }
    uid = 1;
    registerUser(model, event) {
        if (model.id == null) {
            model.id = this.uid++;
            this.users.push(model);
        }

        model = {};

        // this.router.navigate(['app-admin-index']);
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    }

    ngOnInit() { }

}