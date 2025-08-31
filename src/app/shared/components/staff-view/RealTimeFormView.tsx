"use client";

import { useSocket } from "@/hooks/useSocket";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldTypeEnum } from "../../enums/field-type.enum";
import { RouteAPIEnum } from "../../enums/routes-api.enum";
import { RouteEnum } from "../../enums/routes.enum";
import { SocketEnum } from "../../enums/socket.enum";
import { formFields, PatientData } from "../patient-form/config-form";

interface Props {
  formId: string;
}

export function RealTimeFormView({ formId }: Props) {
  const [formData, setFormData] = useState<Partial<PatientData>>({});
  const { socket } = useSocket(
    SocketEnum.JOIN_FORM_ROOM,
    decodeURIComponent(formId)
  );

  useEffect(() => {
    const handleFormUpdate = (data: any) => {
      console.log("data: ", data);
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    };
    socket?.on(SocketEnum.PATIENT_FORM_UPDATE, handleFormUpdate);
    return () => {
      socket?.off(SocketEnum.PATIENT_FORM_UPDATE, handleFormUpdate);
    };
  }, [socket]);

  useEffect(() => {
    fetchForms();
  }, [formId]);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `${RouteAPIEnum.API_PATIENT_FORMS}/${formId}`
      );
      if (response.data.status === "success") {
        console.log("response.data.data: ", response.data.data);
        setFormData((prev) => ({
          ...prev,
          ...response.data.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching patient forms:", error);
    }
  };

  const renderFieldValue = (field: (typeof formFields)[0]) => {
    const value = formData[field.name];
    if (!value) return <span className="text-gray-400">No data available</span>;

    if (field.type === FieldTypeEnum.date) {
      return (
        <span>
          {new Date(value.toString()).toLocaleDateString("th-TH", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      );
    }

    if (field.type === FieldTypeEnum.select) {
      const option = field.options?.find(
        (opt) => opt.value === value.toString()
      );
      return <span>{option?.label || value.toString()}</span>;
    }

    return <span>{value.toString()}</span>;
  };

  return (
    <div className="h-full flex items-center justify-center  p-6 ">
      <div className="bg-white shadow-2xl rounded-2xl p-8 grid gap-8 border border-blue-100">
        <Link
          href={"/" + RouteEnum.MANAGE}
          className="mb-4 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold w-fit flex items-center gap-2 shadow"
        >
          Back
        </Link>
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight drop-shadow-sm">
          Form ID {formId}
        </h1>
        <h2 className="text-xl font-semibold text-blue-900">
          Patient Information (Real-time)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((field) => (
            <div key={field.name} className="gap-1 grid">
              <div className="flex items-center justify-between">
                <label className="block text-base font-semibold text-blue-900 mb-1 tracking-wide">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
              </div>
              <div className="px-4 bg-gray-50 rounded-md min-h-[36px] flex items-center">
                {renderFieldValue(field)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm text-gray-500">
          * Data will update automatically when the patient enters information
        </div>
      </div>
    </div>
  );
}
