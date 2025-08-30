import { RealTimeFormView } from "@/app/shared/components/staff-view/RealTimeFormView";

export default function StaffView({ params }: any) {
  return (
    <div className="container mx-auto grid gap-6 p-8">
      <h1 className="text-2xl font-bold text-center">Form {params.formId}</h1>
      <RealTimeFormView formId={params.formId} />
    </div>
  );
}
