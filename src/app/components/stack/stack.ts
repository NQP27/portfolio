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
	categories: StackCategory[] = [
		{
			name: 'Languages',
			items: [
				{ name: 'C#', linkImage: '/assets/icons/cs.svg', alt: 'C#', link: 'https://dotnet.microsoft.com/en-us/languages/csharp' },
				{ name: 'Python', linkImage: '/assets/icons/python.svg', alt: 'Python', link: 'https://www.python.org/' },
				{ name: 'TypeScript', linkImage: '/assets/icons/typescript.svg', alt: 'TypeScript', link: 'https://www.typescriptlang.org/' }
			]
		},
		{
			name: 'Frameworks',
			items: [
				{ name: '.NET', linkImage: '/assets/icons/dotnet.svg', alt: 'ASP.NET Core, Entity Framework Core', link: 'https://dotnet.microsoft.com/en-us/apps/aspnet' },
				{ name: 'Angular', linkImage: '/assets/icons/angular.svg', alt: 'Angular', link: 'https://angular.io/' },
				{ name: 'Bootstrap', linkImage: '/assets/icons/bootstrap.svg', alt: 'Bootstrap', link: 'https://getbootstrap.com/' }
			]
		},
		{
			name: 'ETL Frameworks',
			items: [
				{ name: 'Airflow', linkImage: '/assets/icons/airflow.svg', alt: 'Apache Airflow', link: 'https://airflow.apache.org/' },
				{ name: 'Spark', linkImage: '/assets/icons/spark.svg', alt: 'Apache Spark', link: 'https://spark.apache.org/' }
			]
		},
		{
			name: 'Databases',
			items: [
				{ name: 'SQLServer', linkImage: '/assets/icons/sqlserver.svg', alt: 'SQL Server', link: 'https://www.microsoft.com/en-us/sql-server' },
				{ name: 'PostgreSQL', linkImage: '/assets/icons/postgresql.svg', alt: 'PostgreSQL', link: 'https://www.postgresql.org/' }
			]
		},
		{
			name: 'Clouds',
			items: [
				{ name: 'AWS', linkImage: '/assets/icons/aws.svg', alt: 'Amazon Web Services', link: 'https://aws.amazon.com/' },
				{ name: 'GCP', linkImage: '/assets/icons/gcp.svg', alt: 'Google Cloud Platform', link: 'https://cloud.google.com/' }
			]
		},
		{
			name: 'Others',
			items: [
				{ name: 'Git', linkImage: '/assets/icons/git.svg', alt: 'Git', link: 'https://git-scm.com/' },
				{ name: 'Docker', linkImage: '/assets/icons/docker.svg', alt: 'Docker', link: 'https://www.docker.com/' },
				{ name: 'Postman', linkImage: '/assets/icons/postman.svg', alt: 'Postman', link: 'https://www.postman.com/' }
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