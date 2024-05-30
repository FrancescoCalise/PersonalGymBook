import { Component, OnInit } from '@angular/core';
import { FirestoreService, Item } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private firestoreService: FirestoreService) {
    this.items$ = this.firestoreService.getItems();
    this.items$.subscribe(items => {
      console.log('Items fetched from Firestore:', items);
    }, error => {
      console.error('Error fetching items:', error);
    });
  }

  ngOnInit(): void {}

  deleteItem(id: string): void {
    this.firestoreService.deleteItem(id).then(() => {
      console.log('Item deleted');
    }).catch(error => {
      console.error('Error deleting item:', error);
    });
  }
}
