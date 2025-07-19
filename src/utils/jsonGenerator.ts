import { SchemaField } from '@/types/schema';

export function generateJson(fields: SchemaField[]): Record<string, any> {
    const result: Record<string, any> = {};

    fields.forEach(field => {
        if (field.name.trim()) {
            switch (field.type) {
                case 'String':
                    result[field.name] = "String";
                    break;
                case 'Number':
                    result[field.name] = "number";
                    break;
                case 'Nested':
                    result[field.name] = field.children ? generateJson(field.children) : {};
                    break;
            }
        }
    });

    return result;
}