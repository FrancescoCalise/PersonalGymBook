import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Item } from '../../interface/item';
import { Observable } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private firestoreService: FirestoreService<Item>) {
    this.firestoreService.setCollectionName('items');
    this.items$ = new Observable<Item[]>();
  }

  async ngOnInit() {
    this.items$ = await this.firestoreService.getItems();
  }

  deleteItem(id: string): void {
    this.firestoreService.deleteItem(id).then(() => {
      console.log('Item deleted');
    });
  }
}
