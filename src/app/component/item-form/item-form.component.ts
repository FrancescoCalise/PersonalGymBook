import { Component } from '@angular/core';
import { FirestoreService, Item } from '../../services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ItemFormComponent {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addItem() {
    if (this.itemForm.valid) {
      const newItem: Item = this.itemForm.value;
      console.log('Form is valid. Adding item:', newItem);
      this.firestoreService.addItem(newItem).then(() => {
        console.log('Item added successfully');
        this.router.navigate(['/items']);
      }).catch(error => {
        console.error('Error adding item:', error);
      });
    } else {
      console.log('Form is invalid:', this.itemForm);
    }
  }
}
