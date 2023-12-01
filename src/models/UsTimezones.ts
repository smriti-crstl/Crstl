export interface USTimezoneModelResponse
{
    id: string;
    timezone: string;
    offset: number;
    offset_dst: number;
    canBeSelected: boolean;
    altLabel: string;
}
