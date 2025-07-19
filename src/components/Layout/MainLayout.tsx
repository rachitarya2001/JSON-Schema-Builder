import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemaForm from '@/components/SchemaBuilder/SchemaForm';
import { SchemaField } from '@/types/schema';
import { generateJson } from '@/utils/jsonGenerator';

export default function MainLayout() {
    const [fields, setFields] = useState<SchemaField[]>([]);

    // Generate unique ID for new fields
    const generateId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Add new top-level field
    const addField = () => {
        const newField: SchemaField = {
            id: generateId(),
            name: '',
            type: 'String',
            children: []
        };

        setFields(prev => [...prev, newField]);
    };

    // Add nested field to a parent
    const addNestedField = (parentId: string) => {
        const newField: SchemaField = {
            id: generateId(),
            name: '',
            type: 'String',
            children: []
        };

        setFields(prev => addFieldToParent(prev, parentId, newField));
    };

    // Update field (works for nested too)
    const updateField = (fieldId: string, updates: Partial<SchemaField>) => {
        setFields(prev => updateNestedField(prev, fieldId, updates));
    };

    // Delete field (works for nested too)
    const deleteField = (fieldId: string) => {
        setFields(prev => removeNestedField(prev, fieldId));
    };

    // Generate JSON for preview
    const jsonOutput = generateJson(fields);

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6 text-center">JSON Schema Builder</h1>

            <Tabs defaultValue="builder" className="w-full">
                <TabsList className="grid w-full grid-cols-2 gap-4 mb-6">
                    <TabsTrigger value="builder">Schema Builder</TabsTrigger>
                    <TabsTrigger value="preview">JSON Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="builder" className="space-y-4">
                    <div className="border rounded-lg p-6 bg-card">
                        <SchemaForm
                            fields={fields}
                            onAddField={addField}
                            onUpdateField={updateField}
                            onDeleteField={deleteField}
                            onAddNestedField={addNestedField}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                    <div className="border rounded-lg p-6 bg-card">
                        <h2 className="text-xl font-semibold mb-4">JSON Preview</h2>
                        <pre className="bg-muted p-4 rounded-md text-sm font-mono overflow-auto min-h-[200px]">
                            {JSON.stringify(jsonOutput, null, 2)}
                        </pre>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Helper functions for nested operations
function addFieldToParent(fields: SchemaField[], parentId: string, newField: SchemaField): SchemaField[] {
    return fields.map(field => {
        if (field.id === parentId) {
            return {
                ...field,
                children: [...(field.children || []), newField]
            };
        }
        if (field.children) {
            return {
                ...field,
                children: addFieldToParent(field.children, parentId, newField)
            };
        }
        return field;
    });
}

function updateNestedField(fields: SchemaField[], fieldId: string, updates: Partial<SchemaField>): SchemaField[] {
    return fields.map(field => {
        if (field.id === fieldId) {
            return { ...field, ...updates };
        }
        if (field.children) {
            return {
                ...field,
                children: updateNestedField(field.children, fieldId, updates)
            };
        }
        return field;
    });
}

function removeNestedField(fields: SchemaField[], fieldId: string): SchemaField[] {
    return fields
        .filter(field => field.id !== fieldId)
        .map(field => ({
            ...field,
            children: field.children ? removeNestedField(field.children, fieldId) : []
        }));
}