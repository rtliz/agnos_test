import { FieldTypeEnum } from "../../enums/field-type.enum";

export interface PatientData {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  phone: string;
  email: string;
  status: string;
  address: string;
  nationality: string;
  preferredLanguage: string;
  religion?: string;
  emergencyContact?: string;
}

interface FormFieldConfig {
  name: keyof PatientData;
  label: string;
  placeholder: string;
  type: FieldTypeEnum;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export const formFields: FormFieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    type: FieldTypeEnum.text,
    required: true,
  },
  {
    name: "middleName",
    label: "Middle Name (optional)",
    placeholder: "Enter your middle name (if any)",
    type: FieldTypeEnum.text,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
    type: FieldTypeEnum.text,
    required: true,
  },
  {
    name: "birthDate",
    label: "Date of Birth",
    placeholder: "Select your birth date",
    type: FieldTypeEnum.date,
    required: true,
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Select your gender",
    type: FieldTypeEnum.select,
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone number",
    type: FieldTypeEnum.tel,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email address",
    type: FieldTypeEnum.email,
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter your full address",
    type: FieldTypeEnum.text,
    required: true,
  },
  {
    name: "preferredLanguage",
    label: "Preferred Language",
    placeholder: "Select your preferred language",
    type: FieldTypeEnum.text,
    required: true,
  },
  {
    name: "emergencyContact",
    label: "Emergency Contact",
    placeholder: "Enter emergency contact details",
    type: FieldTypeEnum.text,
  },
  {
    name: "nationality",
    label: "Nationality",
    placeholder: "Enter your nationality",
    type: FieldTypeEnum.text,
  },
  {
    name: "religion",
    label: "Religion (optional)",
    placeholder: "religion",
    type: FieldTypeEnum.select,
  },
];
