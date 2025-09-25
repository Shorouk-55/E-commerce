import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  flag: boolean = true;
  @Input() element: string = 'input'
  @Input() control: any = '';
  @Input() typeInput!: string;
  @Input() idInput!: string;
  @Input() labelInput!: string;


}
