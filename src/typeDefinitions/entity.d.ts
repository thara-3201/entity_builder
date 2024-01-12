export interface IEntityField {
    fname: string;
    type: string;
    included: boolean;
    mandatory: boolean;
}

export interface IEntity {
    name: string;
    fields: IEntityField[]
}

export interface IEntity_with_TotalFields extends IEntity{
    totalFields: number;
}