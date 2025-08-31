import { FormStatus } from "react-dom";

const statusStyles: any = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  SUBMITTED: "bg-green-100 text-green-800",
};

interface StatusBadgeProps {
  status: FormStatus | any;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full font-bold text-sm ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
