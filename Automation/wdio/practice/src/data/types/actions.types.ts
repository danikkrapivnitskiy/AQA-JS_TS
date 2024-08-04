export interface IActionsProduct {
    clickOnAction(actionPath: string): Promise<this>;
}

export enum ProductDetails {
    NAME = 'Name:',
    PRICE = 'Price:',
    MANUFACTURER = 'Manufacturer:',
    AMOUNT = 'Amount:',
    NOTES = 'Notes:',
}