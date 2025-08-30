// หน้าหลักสำหรับ manage forms
"use client";

import { FormTable } from "@/app/shared/components/form-management/FormTable";
import { FormStatusEnum } from "@/app/shared/enums/form-status.enum";
import { RouteAPIEnum } from "@/app/shared/enums/routes-api.enum";
import { RouteEnum } from "@/app/shared/enums/routes.enum";
import { SocketEnum } from "@/app/shared/enums/socket.enum";
import type { PatientForm } from "@/app/shared/types/patient-form";
import { useSocket } from "@/hooks/useSocket";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormManagement() {
  const router = useRouter();
  const [patientForms, setPatientForms] = useState<PatientForm[]>([]);
  const [loading, setLoading] = useState(false);
  const { socket } = useSocket(SocketEnum.MANAGE_FORMS);
  useEffect(() => {
    fetchForms();
  }, []);
  useEffect(() => {
    socket?.on(SocketEnum.TRIGGER_FORM_UPDATE, (updatedForm: PatientForm) => {
      console.log("updatedForm: ", updatedForm);
      setPatientForms((currentForms) => {
        const updatedForms = currentForms.map((form) =>
          form.id === updatedForm.id
            ? { ...form, status: updatedForm.status }
            : form
        );
        return updatedForms;
      });
    });
    return () => {
      socket?.off(SocketEnum.TRIGGER_FORM_UPDATE);
    };
  }, [socket]);
  const fetchForms = async () => {
    try {
      const response = await axios(RouteAPIEnum.API_PATIENT_FORMS);
      const data = response.data;
      if (data.status === "success" && data.data) {
        setPatientForms(data.data);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const generateForm = async () => {
    try {
      setLoading(true);
      const newForm: PatientForm = {
        status: FormStatusEnum.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const response = await fetch(RouteAPIEnum.API_PATIENT_FORMS, {
        method: "POST",
        body: JSON.stringify(newForm),
      });
      const result = await response.json();
      if (result.status === "success") {
        fetchForms();
      }
    } catch (error) {
      console.error("Error generating form:", error);
      // TODO: Add error notification
    } finally {
      setLoading(false);
    }
  };

  const handleViewForm = (formId: string) => {
    router.push(`/${RouteEnum.STAFF}/${formId}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Form Management</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors disabled:opacity-50 cursor-pointer"
          onClick={generateForm}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Form"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <FormTable patientForms={patientForms} onViewForm={handleViewForm} />
      </div>
    </div>
  );
}
