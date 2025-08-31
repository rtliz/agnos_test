import { PatientForm } from "@/app/shared/types/patient-form";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import { FormStatusEnum } from "../../enums/form-status.enum";
import { RouteEnum } from "../../enums/routes.enum";
import { StatusBadge } from "../../lib/StatusBadge";
interface FormTableProps {
  patientForms: PatientForm[];
  onViewForm: (formId: string) => void;
}

export function FormTable({ patientForms, onViewForm }: FormTableProps) {
  const copyLink = async (item: any) => {
    if (item.status === FormStatusEnum.SUBMITTED) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/${RouteEnum.PATIENT_FORM}/${encodeURIComponent(
        item.id
      )}`
    );
    window.open(
      `${window.location.origin}/${RouteEnum.PATIENT_FORM}/${encodeURIComponent(
        item.id
      )}`
    );
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
              <div className="flex items-center justify-center gap-2">
                <Tooltip id="table-tooltip" />

                <button
                  data-tooltip-id="table-tooltip"
                  data-tooltip-content="View Form"
                  onClick={() => onViewForm(item.id ?? "")}
                  className="cursor-pointer rounded-full  p-2  "
                >
                  <FontAwesomeIcon icon={faEye} className="text-blue-700" />
                </button>
                <button
                  data-tooltip-id="table-tooltip"
                  data-tooltip-content="Copy Link & Open New Tab"
                  onClick={() => copyLink(item)}
                  disabled={item.status === FormStatusEnum.SUBMITTED}
                  className={` rounded-full p-2 ${
                    item.status === FormStatusEnum.SUBMITTED
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <FontAwesomeIcon icon={faFile} className="text-green-700" />
                </button>
              </div>
            </td>
            <td className="p-4 border border-gray-200 text-center">
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
