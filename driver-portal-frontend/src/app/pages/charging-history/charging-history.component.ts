import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CHARGING_SESSIONS, ChargingSession } from './charging-history.data';

@Component({
  selector: 'app-charging-history',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './charging-history.component.html',
  styleUrls: ['./charging-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargingHistoryComponent {
  sessions: ChargingSession[] = CHARGING_SESSIONS;

  searchQuery = signal('');
  statusFilter = signal<'all' | 'Completed' | 'In Progress'>('all');
  expandedSessionId = signal<string | null>(null);

  filteredSessions = computed(() => {
    let result = this.sessions;
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(s => s.station.toLowerCase().includes(query) || s.sessionId.toLowerCase().includes(query));
    }
    const status = this.statusFilter();
    if (status !== 'all') {
      result = result.filter(s => s.status === status);
    }
    return result;
  });

  onSearchChange(value: string) {
    this.searchQuery.set(value);
  }

  onStatusFilterChange(value: string) {
    this.statusFilter.set(value as 'all' | 'Completed' | 'In Progress');
  }

  toggleExpanded(sessionId: string) {
    this.expandedSessionId.update(current => current === sessionId ? null : sessionId);
  }

  isExpanded(sessionId: string): boolean {
    return this.expandedSessionId() === sessionId;
  }
}
