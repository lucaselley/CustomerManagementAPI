export interface Changes {
    additionalProp?: string;
}

export interface Audit {
    id?: string;
    name?: string;
    createdDate?: Date;
    updatedDate?: Date;
    entity?: string;
    entityId?: string;
    action?: string;
    actor?: string;
    changes?: Changes[];
    tempProperties?: string;
}