import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private itemsCollection = collection(this.firestore, 'items');

  constructor(private firestore: Firestore) {}

  getItems(): Observable<Item[]> {
    console.log('Fetching items from Firestore...');
    return collectionData(this.itemsCollection, { idField: 'id' }) as Observable<Item[]>;
  }

  getItem(id: string): Observable<Item> {
    const itemDocRef = doc(this.firestore, `items/${id}`);
    return docData(itemDocRef, { idField: 'id' }) as Observable<Item>;
  }

  addItem(item: Item): Promise<void> {
    const itemDocRef = doc(this.itemsCollection); // Genera un nuovo documento con ID automatico
    console.log('Adding item to Firestore:', { ...item, id: itemDocRef.id });
    return setDoc(itemDocRef, { ...item, id: itemDocRef.id }).then(() => {
      console.log('Item successfully added:', item);
    }).catch(error => {
      console.error('Error adding item to Firestore:', error);
    });
  }

  updateItem(item: Item): Promise<void> {
    const itemDocRef = doc(this.firestore, `items/${item.id}`);
    console.log('Updating item in Firestore:', item);
    return updateDoc(itemDocRef, { ...item });
  }

  deleteItem(id: string): Promise<void> {
    const itemDocRef = doc(this.firestore, `items/${id}`);
    console.log('Deleting item from Firestore:', id);
    return deleteDoc(itemDocRef);
  }
}
