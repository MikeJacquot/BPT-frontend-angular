import { FamilyRelationshipType } from '../entities/family.entity';

export class FamilyCreateDTO {
    name: string;
    relationShip: FamilyRelationshipType;
}