// Import our dependencies
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewPartComponent } from './view-part/view-part.component';
import { GuestIndexComponent } from './guest-index/guest-index.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { PrimeNgComponent } from './prime-ng/prime-ng.component'
// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', component: ViewPartComponent },
  { path: 'app-login',  component: ViewPartComponent },
  { path: 'app-guest-index',  component: GuestIndexComponent },
  { path: 'app-admin-index',  component: AdminIndexComponent },
  { path: 'app-create-user',  component: CreateUserComponent },
  { path: 'prime-table',  component: PrimeNgComponent }
];