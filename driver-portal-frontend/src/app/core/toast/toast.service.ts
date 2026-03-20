import { Injectable, signal } from '@angular/core';

export type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private idCounter = 0;
  toasts = signal<Toast[]>([]);

  show(message: string, type: Toast['type'], duration = 5000) {
    const id = this.idCounter++;
    const toast: Toast = { id, message, type };

    this.toasts.update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number) {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
