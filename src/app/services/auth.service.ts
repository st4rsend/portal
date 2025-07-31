import { Injectable } from '@angular/core';
//import { Auth, signInAnonymously, User } from '@angular/fire/auth';
import { of, Observable, BehaviorSubject, switchMap } from 'rxjs';
import {Auth,
	signInAnonymously,
	authState,
	signOut,
	user,
	User,
} from '@angular/fire/auth';
import {jwtDecode} from 'jwt-decode';

import {UserEnv, DecodedToken} from '../interfaces';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private userSubject = new BehaviorSubject<User | null>(null);
	user$ = this.userSubject.asObservable();
	private bearer: string = "";

	constructor(private auth: Auth) {
		this.auth.onAuthStateChanged(user => {
			this.userSubject.next(user);
		});
	}

	getAuthState(): Observable<UserEnv|null> {
		return authState(this.auth).pipe(
			switchMap((user, index) => {
				if (user) {
					return user.getIdToken().then((token: any) => {
						let userEnv = this.initUserEnv();
						this.bearer = token;
						const decodedToken = jwtDecode(token) as DecodedToken;
						//console.log(decodedToken);
						return <UserEnv>{
							status: true,
							uid: user.uid,
							name: user?.email ?? "",
							companyId: decodedToken.companyId ?? "",
							groupId: decodedToken.groupId ?? "",
							groupWriter: decodedToken.groupWriter ?? false,
							groupAdmin: decodedToken.groupAdmin ?? false,
							companyWriter: decodedToken.companyWriter ?? false,
							companyAdmin: decodedToken.groupAdmin ?? false,
							superAdmin: decodedToken.superAdmin ?? false,
							alias: user?.displayName ?? "",
							company: decodedToken.company ?? "",
							group: decodedToken.group ?? "",
						};
					});
				} else {
					return of(null);
				}
			})
		);
	}

	getBearerToken(): string {
		return this.bearer;
	}


	async signInAnonymously(): Promise<void> {
		try {
			console.log("signing in");
			const userCredential = await signInAnonymously(this.auth);
			console.log('Signed in anonymously:', userCredential.user);
			this.userSubject.next(userCredential.user);
		} catch (error) {
			console.error('Anonymous sign-in error:', error);
		}
	}

	async logout(): Promise<void> {
		await this.auth.signOut();
		this.userSubject.next(null);
	}

	initUserEnv(): UserEnv {
		return {
			status: false,
			uid: "",
			name: "",
			companyId: "",
			groupId: "",
			groupWriter: false,
			groupAdmin: false,
			companyWriter: false,
			companyAdmin: false,
			superAdmin: false,
			alias: "",
			company: "",
			group: "",
		};
	}
}
