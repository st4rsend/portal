export interface DecodedToken {
	// Standard JWT claims
	aud: string;
	exp: number;
	iat: number;
	iss: string;
	sub: string;

	// role?: string;
	companyId?: string;
	groupId?: string;
	groupWriter?: boolean;
	groupAdmin?: boolean;
	companyWriter?: boolean
	companyAdmin?: boolean;
	superAdmin?: boolean;
	company?: string;
	group?: string;
}
