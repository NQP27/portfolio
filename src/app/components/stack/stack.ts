import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StackItem {
	name: string;
	linkImage: string;
	alt: string;
	link: string;
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

	basePath = '/portfolio/assets/icons';
	// basePath = '/assets/icons';
	categories: StackCategory[] = [
		{
			name: 'Languages',
			items: [
				{ name: 'C#', linkImage: `${this.basePath}/cs.svg`, alt: 'C#', link: 'https://dotnet.microsoft.com/en-us/languages/csharp' },
				{ name: 'Python', linkImage: `${this.basePath}/python.svg`, alt: 'Python', link: 'https://www.python.org/' },
				{ name: 'TypeScript', linkImage: `${this.basePath}/typescript.svg`, alt: 'TypeScript', link: 'https://www.typescriptlang.org/' }
			]
		},
		{
			name: 'Frameworks',
			items: [
				{ name: '.NET', linkImage: `${this.basePath}/dotnet.svg`, alt: 'ASP.NET Core, Entity Framework Core', link: 'https://dotnet.microsoft.com/en-us/apps/aspnet' },
				{ name: 'Angular', linkImage: `${this.basePath}/angular.svg`, alt: 'Angular', link: 'https://angular.io/' },
				{ name: 'Bootstrap', linkImage: `${this.basePath}/bootstrap.svg`, alt: 'Bootstrap', link: 'https://getbootstrap.com/' }
			]
		},
		{
			name: 'ETL Frameworks',
			items: [
				{ name: 'Airflow', linkImage: `${this.basePath}/airflow.svg`, alt: 'Apache Airflow', link: 'https://airflow.apache.org/' },
				{ name: 'Spark', linkImage: `${this.basePath}/spark.svg`, alt: 'Apache Spark', link: 'https://spark.apache.org/' }
			]
		},
		{
			name: 'Databases',
			items: [
				{ name: 'SQLServer', linkImage: `${this.basePath}/sqlserver.svg`, alt: 'SQL Server', link: 'https://www.microsoft.com/en-us/sql-server' },
				{ name: 'PostgreSQL', linkImage: `${this.basePath}/postgresql.svg`, alt: 'PostgreSQL', link: 'https://www.postgresql.org/' }
			]
		},
		{
			name: 'Clouds',
			items: [
				{ name: 'AWS', linkImage: `${this.basePath}/aws.svg`, alt: 'Amazon Web Services', link: 'https://aws.amazon.com/' },
				{ name: 'GCP', linkImage: `${this.basePath}/gcp.svg`, alt: 'Google Cloud Platform', link: 'https://cloud.google.com/' }
			]
		},
		{
			name: 'Others',
			items: [
				{ name: 'Git', linkImage: `${this.basePath}/git.svg`, alt: 'Git', link: 'https://git-scm.com/' },
				{ name: 'Docker', linkImage: `${this.basePath}/docker.svg`, alt: 'Docker', link: 'https://www.docker.com/' },
				{ name: 'Postman', linkImage: `${this.basePath}/postman.svg`, alt: 'Postman', link: 'https://www.postman.com/' }
			]
		}
	];

	@ViewChildren('stackItem') stackItems!: QueryList<ElementRef>;
	@ViewChild('stackBg') stackBg!: ElementRef<HTMLDivElement>;

	openLink(url: string) {
		if (url) {
			window.open(url, '_blank');
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
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
		}, 500); // 50ms delay để đảm bảo QueryList đầy đủ
	}
}