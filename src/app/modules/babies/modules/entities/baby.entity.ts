import { Family } from '~modules/families/modules/entities/family.entity';

export class Baby {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    birthLocation: string;
    family: Family;
}
