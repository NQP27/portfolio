import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
interface StackItem {
	name: string;
	linkImage: string;
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
				{ name: 'C#', linkImage: '/assets/icons/cs.svg' },
				{ name: 'Python', linkImage: '/assets/icons/python.svg' },
				{ name: 'TypeScript', linkImage: '/assets/icons/typescript.svg' }
			]
		},
		{
			name: 'Framework',
			items: [
				{ name: 'ASP.NET Core', linkImage: '/assets/icons/dotnet.svg' },
				{ name: 'Angular', linkImage: '/assets/icons/angular.svg' },
				{ name: 'Bootstrap', linkImage: '/assets/icons/bootstrap.svg' },
			]
		},
		{
			name: 'ETL Framework',
			items: [
				{ name: 'Airflow', linkImage: '/assets/icons/airflow.svg' },
				{ name: 'Sparks', linkImage: '/assets/icons/spark.svg' },
			]
		},
		{
			name: 'Database',
			items: [
				{ name: 'SQLServer', linkImage: '/assets/icons/sqlserver.svg' },
				{ name: 'PostgreSQL', linkImage: '/assets/icons/postgresql.svg' }
			]
		},
		{
			name: 'Cloud',
			items: [
				{ name: 'AWS', linkImage: '/assets/icons/aws.svg' },
				{ name: 'GCP', linkImage: '/assets/icons/gcp.svg' },
			]
		},
		{
			name: 'Other',
			items: [
				{ name: 'Git', linkImage: '/assets/icons/git.svg' },
				{ name: 'Docker', linkImage: '/assets/icons/docker.svg' },
				{ name: 'Postman', linkImage: '/assets/icons/postman.svg' },
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