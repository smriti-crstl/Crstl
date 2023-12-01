export interface ChecklistItemModel
{
    isCompleted: boolean;
    notes: string;
}

export interface ChecklistItemUpdate
{
    isCompleted: boolean;
    notes: string;
}

export interface ChecklistTemplateItemModel
{
    title: string;
    description: string;
    position: number;
}

export interface ChecklistTemplateModel
{
    id: string;
    name: string;
    channelId: string;
    items: ChecklistTemplateItemModel[];
}

export interface ChecklistTemplateUpdate
{
    name: string;
    channelId: string | null;
    items: ChecklistTemplateItemModel[];
}
export interface ChecklistTemplateCreate extends ChecklistTemplateUpdate
{
    id: string;
}
