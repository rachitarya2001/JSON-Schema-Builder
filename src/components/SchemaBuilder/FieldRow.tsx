import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SchemaField, FieldType } from '@/types/schema';

interface FieldRowProps {
    field: SchemaField;
    onUpdate: (id: string, updates: Partial<SchemaField>) => void;
    onDelete: (id: string) => void;
    onAddNested: (parentId: string) => void;
    level?: number;
}

export default function FieldRow({
    field,
    onUpdate,
    onDelete,
    onAddNested,
    level = 0
}: FieldRowProps) {
    return (
        <div className="space-y-2">
            <div
                className="flex items-center gap-6 p-6 border rounded-lg bg-card"
                style={{
                    marginLeft: level * 24,
                    borderWidth: level > 0 ? '2px' : '1px'
                }}
            >

                <Input
                    placeholder="Field name"
                    value={field.name}
                    onChange={(e) => onUpdate(field.id, { name: e.target.value })}
                    className="flex-1"
                />


                <Select
                    value={field.type}
                    onValueChange={(type: FieldType) => onUpdate(field.id, { type })}
                >
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="String">String</SelectItem>
                        <SelectItem value="Number">Number</SelectItem>
                        <SelectItem value="Nested">Nested</SelectItem>
                    </SelectContent>
                </Select>


                {field.type === 'Nested' && (
                    <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => onAddNested(field.id)}
                    >
                        Add Nested
                    </Button>
                )}

                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(field.id)}
                >
                    Delete
                </Button>
            </div>


            {field.type === 'Nested' && field.children && field.children.length > 0 && (
                <div className="space-y-4">
                    {field.children.map(child => (
                        <FieldRow
                            key={child.id}
                            field={child}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onAddNested={onAddNested}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}