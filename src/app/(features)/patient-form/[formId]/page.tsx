import { PatientForm } from "@/app/shared/components/patient-form/PatientForm";

export default async function Form({ params }: any) {
  return (
    <div className="container mx-auto grid gap-6 p-8">
      <PatientForm formId={params.formId} />
    </div>
  );
}
