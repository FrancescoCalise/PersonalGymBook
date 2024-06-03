import { Firestore, collection, query, where, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BaseDocument } from '../interface/models';
import { AuthService, PersonalUser } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends BaseDocument> implements OnInit, OnDestroy {
  private collectionName!: string;
  private user: PersonalUser | null = null;
  private userSubscription!: Subscription

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
    });
    
    if(!this.user)
      this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    debugger;
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  setCollectionName(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getItems(): Promise<T[]> {
    const colRef = collection(this.firestore, this.collectionName);
    const q = query(colRef, where('ownerId', '==', this.user?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
  }

  async getItem(id: string): Promise<T | null> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    try{
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as T) : null;
    }catch(e){
      throw new Error('Error getting item: ' + e);
    }
    
  }

  async addItem(item: T): Promise<boolean> {
    try {
      debugger;
      const colRef = collection(this.firestore, this.collectionName);
      item.ownerId = this.user?.uid;
      let data = await addDoc(colRef, item);
      return data ? true : false;
    } catch (e) {
      console.error('Error adding item: ', e);
      return false;
    }
  }

  async updateItem(item: T): Promise<boolean> {
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
