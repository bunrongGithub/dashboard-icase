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
    statusFixing?: string | null;
    updated_at?: string | null;
    warrantyperoid?: string | null
}
export interface ViewPhoneServiceProps{
    repair?:PhoneServicesProps
    repairId?:number|null;
    statusFixed?:string|null;
    total?:string | number|null;
}
type StringOrNull = string| null;
type numberOrNull = number | null;
export interface PhoneServicesItemProps{
    colorId?:numberOrNull;
    colorName?:StringOrNull;
    contact?:StringOrNull;
    moName?:StringOrNull;
    itemId?:numberOrNull;
    moId?:numberOrNull;
    password?:StringOrNull;
    price?:StringOrNull;
    problem?:StringOrNull;
    qyt?:numberOrNull;
    repId?:numberOrNull;
    responsible?:StringOrNull;
    statusName?:StringOrNull;
    statusId?:numberOrNull;
    techId?:numberOrNull;
    techName?:StringOrNull;
    psId?:numberOrNull;
    psName:StringOrNull;
}