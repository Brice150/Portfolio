import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, RouterModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  imagePath: string = environment.imagePath + 'skills/';
  readonly scrollContent = viewChild.required<ElementRef>('content');
  expandedImageSrc = signal<string | null>(null);

  onImageClick(imageSrc: string): void {
    this.expandedImageSrc.set(imageSrc);
  }

  closeImage(): void {
    this.expandedImageSrc.set(null);
  }

  scrollDown(): void {
    this.scrollContent().nativeElement.scrollTo({
      top: this.scrollContent().nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }
}
