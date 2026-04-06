export interface INote{
    _id: string;
    title: string;
    tag:string;
    body: string;
    status: 'active'|'in-progress'|'completed';
    summary: string;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
}