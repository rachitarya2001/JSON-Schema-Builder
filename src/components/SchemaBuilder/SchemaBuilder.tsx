import { Button } from "@/components/ui/button";
import FieldRow from './FieldRow';
import { SchemaField } from '@/types/schema';

interface SchemaBuilderProps {
    fields: SchemaField[];
    onAddField: () => void;
    onUpdateField: (id: string, updates: Partial<SchemaField>) => void;
    onDeleteField: (id: string) => void;
    onAddNestedField: (parentId: string) => void;
}

export default function SchemaBuilder({
    fields,
    onAddField,
    onUpdateField,
    onDeleteField,
    onAddNestedField
}: SchemaBuilderProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Schema Builder</h2>
                <Button onClick={onAddField}>
                    Add Field
                </Button>
            </div>

            <div className="space-y-4">
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
    );
}