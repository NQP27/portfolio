import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.less'],
})
export class ContactComponent implements AfterViewInit {
  contactForm: FormGroup;
  isSubmitted = false;

  // Fade-in refs
  @ViewChild('contactBg') contactBg!: ElementRef<HTMLDivElement>;
  @ViewChild('contactIntro') contactIntro!: ElementRef<HTMLDivElement>;
  @ViewChild('contactFormWrapper') contactFormWrapper!: ElementRef<HTMLDivElement>;

  // Thời gian & vị trí
  currentTime: string = '';
  location: string = 'Hà Nội';
  basePath = '/portfolio/assets/icons';
  // basePath = '/assets/icons';
  pinSrc = `${this.basePath}/pin.svg`;
  clockSrc = `${this.basePath}/clock.svg`;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    this.updateTime(); // khởi tạo thời gian
  }

  /** Cập nhật thời gian hiện tại mỗi giây */
  updateTime() {
    this.currentTime = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    setTimeout(() => this.updateTime(), 1000);
  }

  /** Submit form */
  onSubmit() {
    this.isSubmitted = true;
    if (this.contactForm.valid) {
      console.log('Form submitted', this.contactForm.value);
      this.contactForm.reset();
      this.isSubmitted = false;
    }
  }

  /** Bounce button */
  onBounce(event: Event) {
    const btn = event.currentTarget as HTMLElement;
    btn.classList.add('bounce');
    btn.addEventListener(
      'animationend',
      () => btn.classList.remove('bounce'),
      { once: true }
    );
  }

  /** Fade-in on scroll */
  ngAfterViewInit() {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.classList.add('visible');
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.2 }
      );

      if (this.contactBg) observer.observe(this.contactBg.nativeElement);
      if (this.contactIntro) observer.observe(this.contactIntro.nativeElement);
      if (this.contactFormWrapper) observer.observe(this.contactFormWrapper.nativeElement);
    }, 500);
  }
}
