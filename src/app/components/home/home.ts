import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.less',
    imports: [ButtonModule]
})
export class HomeComponent {}