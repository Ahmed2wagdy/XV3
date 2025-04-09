import { Routes } from '@angular/router';
import { 
  LogInComponent,
  SignUpComponent,
  ForgetPassComponent,
  OtpVerificationComponent,
  ResetPasswordComponent,
  GuestComponent,
  DashboardComponent
} from './index';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

export const routes: Routes = [
  { path: '', component: GuestComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forget-pass', component: ForgetPassComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  // New routes for features accessible from dashboard
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'chat-bot', component: ChatBotComponent },
  
  // Wildcard route
  { path: '**', redirectTo: '' }
];