import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChargingHistoryComponent } from './pages/charging-history/charging-history.component';
import { ChargingReceiptComponent } from './pages/charging-history/charging-receipt.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'payment', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'account', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'charging-history', component: ChargingHistoryComponent, canActivate: [authGuard] },
  { path: 'charging-history/:sessionId/receipt', component: ChargingReceiptComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent },
];
