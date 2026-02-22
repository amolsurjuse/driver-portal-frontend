import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CHARGING_SESSIONS, ChargingSession } from './charging-history.data';

@Component({
  selector: 'app-charging-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './charging-history.component.html',
  styleUrls: ['./charging-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargingHistoryComponent {
  sessions: ChargingSession[] = CHARGING_SESSIONS;
}
