import { PatientForm } from "@/app/shared/components/patient-form/PatientForm";

export default async function Form({ params }: any) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 grid gap-6 ">
      <PatientForm formId={params.formId} />
    </div>
  );
}
