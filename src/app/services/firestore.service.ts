import { Firestore, collection, query, where, collectionData, doc, docData, addDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AuthService, User } from './auth.service';
import { Observable } from 'rxjs';
import { BaseDocument } from '../interface/models';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends BaseDocument> {
  private collectionName!: string;

  constructor(private firestore: Firestore, private auth: AuthService) { }

  setCollectionName(collectionName: string) {
    this.collectionName = collectionName;
  }

  private async getAuthenticatedUser(): Promise<User> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }
    return user;
  }

  async getItems(): Promise<Observable<T[]>> {
    const user = await this.getAuthenticatedUser();
    const colRef = collection(this.firestore, this.collectionName);
    const q = query(colRef, where('ownerId', '==', user.uid));
    return collectionData(q, { idField: 'id' }) as Observable<T[]>;
  }

  async getItem(id: string): Promise<Observable<T | undefined>> {
    await this.getAuthenticatedUser();
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<T | undefined>;
  }

  async addItem(item: T): Promise<boolean> {
    const user = await this.getAuthenticatedUser();
    try {
      const colRef = collection(this.firestore, this.collectionName);
      item.ownerId = user.uid;
      debugger;
      let data = await addDoc(colRef, item);
      debugger;
      return data ? true : false;
    } catch (e) {
      console.error('Error adding item: ', e);
      return false;
    }
  }

  async updateItem(item: T): Promise<boolean> {
    await this.getAuthenticatedUser();
    const docRef = doc(this.firestore, `${this.collectionName}/${item.id}`);
    try {
      await setDoc(docRef, item);
      return true;
    } catch (e) {
      console.error('Error updating item: ', e);
      return false;
    }
  }

  async deleteItem(id: string): Promise<boolean> {
    await this.getAuthenticatedUser();
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    try {
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error('Error deleting item: ', e);
      return false;
    }
  }
}
