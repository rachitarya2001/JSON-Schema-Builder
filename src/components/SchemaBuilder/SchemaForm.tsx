import { useForm, FormProvider } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import FieldRow from './FieldRow';
import { SchemaField } from '@/types/schema';
import './SchemaBuilder.css';

interface SchemaFormProps {
    fields: SchemaField[];
    onAddField: () => void;
    onUpdateField: (id: string, updates: Partial<SchemaField>) => void;
    onDeleteField: (id: string) => void;
    onAddNestedField: (parentId: string) => void;
}

interface FormData {
    fields: Record<string, any>;
}

export default function SchemaForm({
    fields,
    onAddField,
    onUpdateField,
    onDeleteField,
    onAddNestedField
}: SchemaFormProps) {
    const methods = useForm<FormData>({
        defaultValues: {
            fields: {}
        }
    });

    const validateSchema = (): string[] => {
        const errors: string[] = [];

        // Recursive function to check all fields
        const checkFields = (fieldsToCheck: SchemaField[], level = 0, parentName = 'root'): void => {
            fieldsToCheck.forEach((field, index) => {
                const fieldPosition = level === 0 ? `Field ${index + 1}` : `Nested field under "${parentName}"`;

                // Check for empty names
                if (!field.name || field.name.trim() === '') {
                    errors.push(`${fieldPosition}: Field name cannot be empty`);
                }

                // Check for nested fields without children
                if (field.type === 'Nested') {
                    if (!field.children || field.children.length === 0) {
                        errors.push(`${fieldPosition} "${field.name}": Nested field has no children`);
                    } else {
                        // Recursively check nested fields
                        checkFields(field.children, level + 1, field.name);
                    }
                }
            });

            // Check for duplicate names at same level
            const names = fieldsToCheck
                .filter(field => field.name && field.name.trim() !== '')
                .map(field => field.name.trim());

            const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
            const uniqueDuplicates = [...new Set(duplicates)];

            if (uniqueDuplicates.length > 0) {
                const levelText = level === 0 ? 'top level' : `under "${parentName}"`;
                errors.push(`Duplicate field names at ${levelText}: ${uniqueDuplicates.join(', ')}`);
            }
        };

        // Start validation
        if (fields.length === 0) {
            errors.push('Schema is empty. Add at least one field.');
        } else {
            checkFields(fields);
        }

        return errors;
    };

    const onSubmit = (data: FormData) => {
        console.log('Schema validation started:', data);

        const errors = validateSchema();

        if (errors.length === 0) {
            alert('✅ Schema is valid!\n\nAll fields have names and proper structure.');
        } else {
            alert(`❌ Schema has ${errors.length} error(s):\n\n${errors.join('\n')}`);
        }
    };

    // Fix for the Promise error
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void methods.handleSubmit(onSubmit)();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Schema Builder</h2>
                    <div className="flex gap-8">
                        <div className="schema-buttons">
                            <Button type="button" onClick={onAddField} className="bg-red-500 text-white p-8" >
                                Add Field
                            </Button>
                            <Button type="submit" variant="secondary" size="sm">
                                Validate Schema
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="fields-container">
                        {fields.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">
                                No fields yet. Click "Add Field" to get started.
                            </p>
                        ) : (
                            fields.map(field => (
                                <FieldRow
                                    key={field.id}
                                    field={field}
                                    onUpdate={onUpdateField}
                                    onDelete={onDeleteField}
                                    onAddNested={onAddNestedField}
                                />
                            ))
                        )}
                    </div>

                </div>
            </form>
        </FormProvider>
    );
}