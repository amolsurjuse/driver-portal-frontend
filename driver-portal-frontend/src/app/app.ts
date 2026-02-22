import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUserEmail } from './core/auth/auth.selectors';
import { AuthActions } from './core/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private store = inject(Store);

  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  email$ = this.store.select(selectUserEmail);
  userMenuOpen = signal(false);
  sidebarCollapsed = signal(false);
  mobileSidebarOpen = signal(false);
  isMobile = signal(this.detectMobileViewport());

  constructor() {
    const stored = localStorage.getItem('accessToken');
    if (stored) {
      this.store.dispatch(AuthActions.setAccessToken({ accessToken: stored }));
    }
  }

  toggleUserMenu(event?: Event) {
    event?.stopPropagation();
    this.userMenuOpen.update((open) => !open);
  }

  closeUserMenu() {
    this.userMenuOpen.set(false);
  }

  logout() {
    this.closeUserMenu();
    this.store.dispatch(AuthActions.logoutAll());
  }

  userDisplayName(email: string | null | undefined): string {
    const source = (email ?? '').trim();
    if (!source) return 'Driver';
    const local = source.split('@')[0] ?? source;
    const words = local
      .replace(/[._-]+/g, ' ')
      .split(' ')
      .map((part) => part.trim())
      .filter(Boolean);
    if (words.length === 0) return 'Driver';
    return words
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  userInitials(email: string | null | undefined): string {
    const words = this.userDisplayName(email).split(' ').filter(Boolean);
    if (words.length === 0) return 'DR';
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeUserMenu();
  }

  toggleSidebarFromUserName() {
    if (this.isMobile()) {
      return;
    }
    this.sidebarCollapsed.update((v) => !v);
  }

  openMobileSidebar() {
    if (this.isMobile()) {
      this.mobileSidebarOpen.set(true);
    }
  }

  closeMobileSidebar() {
    this.mobileSidebarOpen.set(false);
  }

  onLeftNavClick() {
    if (this.isMobile()) {
      this.closeMobileSidebar();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    const mobile = this.detectMobileViewport();
    this.isMobile.set(mobile);
    if (!mobile) {
      this.mobileSidebarOpen.set(false);
    }
  }

  private detectMobileViewport(): boolean {
    return globalThis.matchMedia?.('(max-width: 960px)').matches ?? false;
  }
}
