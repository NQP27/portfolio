import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExperienceItem {
	company: string;
	link: string;
	alt: string;
	start: string;
	end: string;
	role: string;
	image: string;
}

@Component({
	selector: 'app-experience',
	templateUrl: './experience.html',
	styleUrls: ['./experience.less'],
	standalone: true,
	imports: [CommonModule]
})
export class ExperienceComponent implements AfterViewInit {
	basePath = '/assets/images';
	timeline: ExperienceItem[] = [
		{ company: 'GTSC', link: 'https://www.gtsc.vn/', alt: 'Công ty cổ phần thương mại và dịch vụ công nghệ GTSC Việt Nam', start: '06/2025', end: 'Present', role: 'Software Developer', image: `${this.basePath}/gtsc.png` },
		{ company: 'TrueConnect', link: 'https://trueconnect.vn/', alt: 'Công ty Cổ phần Công nghệ True Connect', start: '04/2024', end: '06/2025', role: 'Backend Developer', image: `${this.basePath}/true.png` },
		{ company: 'INDA', link: 'https://inda.vn/', alt: 'Công ty TNHH phân tích dữ liệu Insight Data', start: '09/2023', end: '03/2024', role: 'Intern Data Engineer', image: `${this.basePath}/inda.png` },
	];

	@ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;
	@ViewChild('experienceBg') experienceBg!: ElementRef<HTMLDivElement>;

	ngAfterViewInit() {
		setTimeout(() => {
			const elements: HTMLElement[] = [
				this.experienceBg.nativeElement,
				...this.timelineItems.map(e => e.nativeElement),
				...Array.from(document.querySelectorAll('.stat-item')) as HTMLElement[] // thêm stat-item
			];

			const observer = new IntersectionObserver((entries, obs) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const el = entry.target as HTMLElement;
						if (el.classList.contains('timeline-item')) el.classList.add('show');
						if (el.classList.contains('experience-title-bg')) el.classList.add('visible');
						if (el.classList.contains('stat-item')) el.classList.add('show'); // bật animation stat-item
						obs.unobserve(el);
					}
				});
			}, { threshold: 0.2 });

			elements.forEach(el => {
				observer.observe(el);

				// Nếu element đã trong viewport khi load
				requestAnimationFrame(() => {
					if (this.isInViewport(el)) {
						if (el.classList.contains('timeline-item')) el.classList.add('show');
						if (el.classList.contains('experience-title-bg')) el.classList.add('visible');
						if (el.classList.contains('stat-item')) el.classList.add('show');
						observer.unobserve(el);
					}
				});
			});
		}, 500);
	}



	openLink(url: string) {
		if (url) window.open(url, '_blank');
	}

	private isInViewport(el: HTMLElement): boolean {
		const rect = el.getBoundingClientRect();
		return rect.top < window.innerHeight && rect.bottom > 0;
	}
}
