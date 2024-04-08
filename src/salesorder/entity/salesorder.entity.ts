export class SalesOrder {
    id: string;
    customerID: string;
    companyID: string;
    orderDate: Date;
    requiredDeliveryDate: Date;
    salesRepresentative: string;
    shippingMethod: string;
    shippingAddress: string;
    billingAddress: string;
    orderStatus: string;
    paymentTerms: string;
    paymentStatus: string;
    orderTotal: string;
    discountsApplied: string;
    itemsOrdered: string;
    specialInstructions: string;
    salesOrderSource: string;
    salesOrderType: string;
    relatedDocuments: string;
    shippingTrackingInfo: string;
    orderCompletionDate: Date;
}
