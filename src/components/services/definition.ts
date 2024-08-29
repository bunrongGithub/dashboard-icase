export interface PhoneServicesProps {
    repId?: number | string;
    psId?: number | string | null;
    psName?: string | null;
    accept_date?: string | null;
    amount?: number | string | null;
    created_at?: string | null;
    description?: string | null;
    deviceNumbers?: string | null;
    duration?: string | null;
    payment_method_id?: string | number | null;
    payment_method_name?:string;
    phoneNumber?: string | null;
    updated_at?: string | null;
    warrantyperoid?: string | null;
}
export interface ViewPhoneServiceProps{
    repair?:PhoneServicesProps
    repairId?:number|null;
    statusFixed?:string|null;
    total?:string | number|null;
}
type StringOrNull = string;
type numberOrNull = number;
export interface PhoneServicesItemProps{
    colorId?:number | null;
    colorName?:StringOrNull;
    contact?:StringOrNull;
    moName?:StringOrNull;
    itemId?:numberOrNull;
    moId?:number | null;
    password?:StringOrNull;
    price?:string | number;
    problem?:StringOrNull;
    qyt?:numberOrNull;
    repId?:string|undefined;
    responsible?:StringOrNull;
    statusName?:StringOrNull;
    statusId?:numberOrNull;
    stausId?:number | null;
    techId?:number | null | string;
    techName?:StringOrNull;
    psId?: any
    psName?:StringOrNull;
}