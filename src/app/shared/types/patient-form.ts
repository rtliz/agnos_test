import { FormStatusEnum } from "../enums/form-status.enum";

export interface PatientForm {
  id?: string;
  status: FormStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
}

export interface FormLink {
  id: string;
  patientFormId: string;
  url: string;
  expiresAt?: Date;
  isActive: boolean;
}

// สำหรับ WebSocket events
export interface FormUpdateEvent {
  formId: string;
  field: string;
  value: any;
  timestamp: Date;
}
