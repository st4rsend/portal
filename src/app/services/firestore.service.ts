import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, of, firstValueFrom} from 'rxjs';
import {Firestore,
//	writeBatch,
	collection,
	query,
	where,
	doc,
	docData,
//	getDoc,
//	addDoc,
//	setDoc,
	collectionData,
	CollectionReference,
	Timestamp,
	serverTimestamp,
	limit,
	Query,
	QueryFieldFilterConstraint
	} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

	convDBPath: string = '/Content/Xj2sEuNvzDtXlTkV2Xnp/Docs/';

	constructor(private firestore: Firestore) { }

	async asyncReadConv(id: string): Promise<any> {
		const docRef = doc(this.firestore, `${this.convDBPath}`, id);
		//const ret = await getDoc(docRef);
		//return ret.data();
		return firstValueFrom(docData(docRef));
	}
}
