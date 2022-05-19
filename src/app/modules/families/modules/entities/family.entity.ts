import { User } from '~modules/auth/entities/user.entity';

export type FamilyRelationshipType =
| 'parent'
| 'grandparent'
| 'uncle / aunt'
| 'godparent'
| 'other';

export const familyRelationshipsList = [
'parent',
'grandparent',
'uncle / aunt',
'godparent',
'other',
];
export class Family {
    id: string;
    name: string;
    familyRelationShip: FamilyRelationshipType;
}