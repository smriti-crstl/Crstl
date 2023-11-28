export interface UserTosAcceptanceModel
{
    id: string;
    createdAt: string;
    userId: string;
    organizationId: string;
    acceptedTos: boolean
}