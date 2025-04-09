import { Routes } from '@angular/router';
import { 
  LogInComponent,
  SignUpComponent,
  ForgetPassComponent, // Updated component name
  OtpVerificationComponent,
  ResetPasswordComponent,
  GuestComponent
} from './index';

export const routes: Routes = [
  { path: '', component: GuestComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forget-pass', component: ForgetPassComponent }, // Updated path to match component name
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '' }
];