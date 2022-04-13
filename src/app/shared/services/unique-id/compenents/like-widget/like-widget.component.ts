import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { UniqueIdService } from '../../unique-id.service';

@Component({
  selector: 'app-like-widget',
  templateUrl: './like-widget.component.html',
  styleUrls: ['like-widget.component.scss'],
})
export class LikeWidgetComponent implements OnInit {
  @Output() public liked = new EventEmitter<void>();
  @Input() public likes = 0;
  @Input() public id: string = null;

  public fonts = {
    faThumbsUp,
    faThumbsDown,
  };

  constructor(private uniqueIdService: UniqueIdService) {}

  //se voce nao passou um Id ELE VAI GERAR um, se você passar ele vai respeitar e não vai gerar
  //com esta condição ele testa a presença de um ID ou NÃO
  public ngOnInit(): void {
    if (!this.id) {
      this.id = this.uniqueIdService.generateUniqueIdWithPrefix('like-widget');
    }
  }

  public like(): void {
    this.liked.emit();
  }
}
