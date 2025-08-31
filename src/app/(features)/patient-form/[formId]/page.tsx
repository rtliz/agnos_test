import { PatientForm } from "../PatientForm";

export default async function PatientFormPage({ params }: any) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 grid gap-6 ">
      <PatientForm formId={params.formId} />
    </div>
  );
}
