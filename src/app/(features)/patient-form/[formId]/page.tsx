import { PatientForm } from "@/app/shared/components/patient-form/PatientForm";

interface PageProps {
  params: {
    formId: string;
  };
}

export default function Form({ params }: PageProps) {
  return (
    <div className="container mx-auto grid gap-6 p-8">
      <PatientForm formId={params.formId} />;
    </div>
  );
}
