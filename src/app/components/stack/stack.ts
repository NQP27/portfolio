import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
interface StackItem {
	name: string;
	iconClass: string;
}

interface StackCategory {
	name: string;
	items: StackItem[];
}

@Component({
	selector: 'app-stack',
	templateUrl: './stack.html',
	styleUrls: ['./stack.less'],
	imports: [CommonModule]
})
export class StackComponent implements AfterViewInit {
	categories: StackCategory[] = [
		{
			name: 'Language',
			items: [
				{ name: 'C#', iconClass: 'devicon-csharp-plain colored' },
				{ name: 'Python', iconClass: 'devicon-python-plain colored' },
				{ name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' }
			]
		},
		{
			name: 'Framework',
			items: [
				{ name: '.NET', iconClass: 'devicon-dotnetcore-plain colored' },
				{ name: 'Angular', iconClass: 'devicon-angularjs-plain colored' },
				{ name: 'Bootstrap', iconClass: 'devicon-bootstrap-plain colored' },
			]
		},
		{
			name: 'Database',
			items: [
				{ name: 'SQLServer', iconClass: 'devicon-microsoftsqlserver-plain colored' },
				{ name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain colored' }
			]
		},
		{
			name: 'Service',
			items: [
				{ name: 'AWS', iconClass: 'devicon-amazonwebservices-plain colored' },
				{ name: 'Google Cloud', iconClass: 'devicon-google-plain colored' },
			]
		},
		{
			name: 'Other',
			items: [
				{ name: 'Git', iconClass: 'devicon-git-plain colored' },
			]
		},
	];

	@ViewChildren('stackItem') stackItems!: QueryList<ElementRef>;
  @ViewChild('stackBg') stackBg!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('visible');
          observer.unobserve(el); 
        }
      });
    }, { threshold: 0.2 });

    // observe chữ nền
    if (this.stackBg) {
      observer.observe(this.stackBg.nativeElement);
    }

    // observe icons
    this.stackItems.forEach(el => observer.observe(el.nativeElement));
  }
}