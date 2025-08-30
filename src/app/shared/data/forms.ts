import type { PatientForm } from "@/app/shared/types/patient-form";

let forms: PatientForm[] = [];

export const getForms = () => forms;
export const setForms = (newForms: PatientForm[]) => {
  forms = newForms;
};
export const addForm = (form: PatientForm) => {
  forms.push(form);
  return form;
};
