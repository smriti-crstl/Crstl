export interface AccountBalanceModel
{
    readonly id: string;
    plaidItemId: string;
    integrationId: string;
    updatedFromFilename: string;
    institutionName: string;
    institutionId: string;
    accountId: string;
    accountName: string;
    accountOfficialName: any;
    accountMask: string;
    accountType: string;
    accountSubtype: any;
    balances: any;
}

export interface CashOnHandDonutChart {
    total: any;
    data: Array<{id: any , color: string, textColor: string, label: string, balance: any, value: any}>;
  }
