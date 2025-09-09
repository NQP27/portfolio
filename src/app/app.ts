import { Component, signal, ElementRef, ViewChild, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home";
import { StackComponent } from './components/stack/stack';
@Component({
  selector: 'app-root',
  imports: [HomeComponent, StackComponent],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('homeLink') homeLink!: ElementRef;


  sections: { id: string; navHref: string }[] = [
    { id: 'home-sector', navHref: '#home-sector' },
    { id: 'stack-sector', navHref: '#stack-sector' },
    { id: 'tools-sector', navHref: '#tools-sector' },
    { id: 'experience-sector', navHref: '#experience-sector' },
    { id: 'thoughts-sector', navHref: '#thoughts-sector' },
    { id: 'contact-sector', navHref: '#contact-sector' },
  ];


  ngAfterViewInit() {
    // scroll về đầu trang sau khi view render
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    this.updateActiveSection(); // set Home active khi load trang
  }

  scrollTo(sectionId: string, event: Event) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    this.setActive(sectionId);
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
    let currentSectionId = 'home-sector'; // default Home
    const scrollPosition = window.scrollY + 120; // offset cho navbar fixed

    for (let sec of this.sections) {
      const element = document.getElementById(sec.id);
      if (element && element.offsetTop <= scrollPosition) {
        currentSectionId = sec.id;
      }
    }

    this.setActive(currentSectionId);
  }
  protected readonly title = signal('portfolio');
}
