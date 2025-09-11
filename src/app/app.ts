import { Component, signal, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from "./components/home/home";
import { StackComponent } from './components/stack/stack';
import { ExperienceComponent } from "./components/experience/experience";
import { ContactComponent } from './components/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,  // 👈 thêm standalone cho đúng chuẩn
  imports: [
    FormsModule,           // 👈 import FormsModule
    ReactiveFormsModule,   // 👈 import ReactiveFormsModule
    HomeComponent,
    StackComponent,
    ExperienceComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('homeLink') homeLink!: ElementRef;

  currentSectionId: string = 'home-sector';
  sections: { id: string; navHref: string }[] = [
    { id: 'home-sector', navHref: '#home-sector' },
    { id: 'stack-sector', navHref: '#stack-sector' },
    { id: 'experience-sector', navHref: '#experience-sector' },
    { id: 'certificate-sector', navHref: '#thoughts-sector' },
    { id: 'contact-sector', navHref: '#contact-sector' },
  ];

  ngAfterViewInit() {
    setTimeout(() => window.scrollTo(0, 0), 0);
    this.updateActiveSection();
  }

  scrollTo(sectionId: string, event: Event) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    this.setActive(sectionId);
    this.currentSectionId = sectionId;
  }

  setActive(sectionId: string) {
    const navItems = document.querySelectorAll('.nav-icon');
    navItems.forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`.nav-icon[href="#${sectionId}"]`);
    if (activeItem) activeItem.classList.add('active');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const scrollPosition = window.scrollY + 120;
    for (let sec of this.sections) {
      const element = document.getElementById(sec.id);
      if (element && element.offsetTop <= scrollPosition) {
        this.currentSectionId = sec.id;
      }
    }
    this.setActive(this.currentSectionId);
  }

  protected readonly title = signal('portfolio');
}
