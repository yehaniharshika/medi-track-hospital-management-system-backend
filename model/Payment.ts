import MedicinePaymentDetails from "./MedicinePaymentDetails";

export default class Payment{
    paymentId!:number;
    paymentDate!:string;
    patientId!:number;
    medicineItems!:MedicinePaymentDetails[];
}