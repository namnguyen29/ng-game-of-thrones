import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'got-home-card',
  standalone: true,
  imports: [],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCardComponent implements OnInit {
  public ngOnInit(): void {}
}
