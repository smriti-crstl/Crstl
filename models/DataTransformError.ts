export interface DataTransformError
{
    fileName: string;
    dataTransformId: string;
    readonly id: string;
    readonly createdAt: string;
    orderId: string;
    errors: any;
}