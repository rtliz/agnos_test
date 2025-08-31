import { PatientForm } from "@/app/shared/types/patient-form";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RouteEnum } from "../../enums/routes.enum";
import { StatusBadge } from "./StatusBadge";

interface FormTableProps {
  patientForms: PatientForm[];
  onViewForm: (formId: string) => void;
}

export function FormTable({ patientForms, onViewForm }: FormTableProps) {
  const copyLink = async (id: string) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${
          RouteEnum.PATIENT_FORM
        }/${encodeURIComponent(id)}`
      );
      window.open(
        `${window.location.origin}/${
          RouteEnum.PATIENT_FORM
        }/${encodeURIComponent(id)}`
      );
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <table className="w-full mt-4 table-auto border-collapse border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-2 text-left border border-gray-200">Actions</th>
          <th className="p-2 text-left border border-gray-200">Status</th>
          <th className="p-2 text-left border border-gray-200">ID</th>
          <th className="p-2 text-left border border-gray-200">Created At</th>
          <th className="p-2 text-left border border-gray-200">Updated At</th>
        </tr>
      </thead>
      <tbody>
        {patientForms.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="p-4 border border-gray-200">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => onViewForm(item.id ?? "")}
                  className="cursor-pointer"
                />
                <FontAwesomeIcon
                  icon={faFile}
                  className="cursor-pointer"
                  onClick={() => copyLink(item.id ?? "")}
                />
              </div>
            </td>
            <td className="p-4 border border-gray-200">
              <StatusBadge status={item.status} />
            </td>
            <td className="p-4 border border-gray-200">{item.id}</td>
            <td className="p-4 border border-gray-200">
              {new Date(item.createdAt).toLocaleString("th-TH", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td className="p-4 border border-gray-200">
              {new Date(item.updatedAt).toLocaleString("th-TH", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
