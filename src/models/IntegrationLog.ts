export interface IntegrationLogModel
{
    ownerId: string | null;
    integrationSourceId: string;
    userId: string | null;
    state: number;
    authUrl: string;
    shop: string;
    status: string;
    readonly createdAt: Date;
    readonly id: string;
}

export enum InitializeStatus
{
    Initialized = "Initialized",
    Success = "Success",
    Failure = "Failure"
}