export default class MedicalReport {
    medicalReportId!: string;
    reportDate!: string;
    testResults!: {
        description: string;
        result: string;
        units: string;
        referenceRange: string;
        stat: string;
    }[];
    notes!: string;
    patientId!: string;
    patientName!: string;
    doctorId!: string;
}
