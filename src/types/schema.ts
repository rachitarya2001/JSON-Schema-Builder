export type FieldType = 'String' | 'Number' | 'Nested';

export interface SchemaField {
    id: string;
    name: string;
    type: FieldType;
    children?: SchemaField[];
}

export interface SchemaBuilderState {
    fields: SchemaField[];
}