import { RealTimeFormView } from "@/app/shared/components/staff-view/RealTimeFormView";

export default function StaffView({ params }: any) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 grid gap-6 ">
      <RealTimeFormView formId={params.formId} />
    </div>
  );
}
