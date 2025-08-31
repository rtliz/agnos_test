"use client";

import { useSocket } from "@/hooks/useSocket";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Select from "react-select";
import { FieldTypeEnum } from "../../enums/field-type.enum";
import { FormStatusEnum } from "../../enums/form-status.enum";
import { RouteAPIEnum } from "../../enums/routes-api.enum";
import { SocketEnum } from "../../enums/socket.enum";
import { CustomDatePicker } from "../common/CustomDatePicker";
import { formFields, PatientData } from "./config-form";

interface Religion {
  id: number;
  label: string;
  value: string;
}

export function PatientForm({ formId }: { formId: string }) {
  const [formData, setFormData] = useState<Partial<PatientData>>(
    {} as Partial<PatientData>
  );
  const [religions, setReligions] = useState<Religion[]>([]);
  const [genders, setGenders] = useState<Religion[]>([]);
  const [loading, setLoading] = useState(false);
  const { emitFormUpdate } = useSocket(
    SocketEnum.JOIN_FORM_ROOM,
    decodeURIComponent(formId)
  );
  const [isFirstChange, setIsFirstChange] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReligions();
    fetchGenders();
    fetchForms();
  }, [formId]);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `${RouteAPIEnum.API_PATIENT_FORMS}/${formId}`
      );
      if (response.data.status === "success") {
        if (response.data.data?.status === FormStatusEnum.SUBMITTED) {
          setIsSubmitted(true);
        }
        setIsLoading(false);
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching patient forms:", error);
    }
  };

  const fetchReligions = async () => {
    try {
      const response = await axios.get(RouteAPIEnum.API_RELIGIONS);

      if (response.data.status === "success" && response.data.data) {
        setReligions(response.data.data ?? []);
      }
    } catch (error) {
      console.error("Error fetching religions:", error);
    }
  };

  const fetchGenders = async () => {
    try {
      const response = await axios.get(RouteAPIEnum.API_GENDERS);

      if (response.data.status === "success" && response.data.data) {
        setGenders(response.data.data ?? []);
      }
    } catch (error) {
      console.error("Error fetching genders:", error);
    }
  };

  const handleChange = (name: keyof PatientData, value: string) => {
    const updatedData = (prev: Partial<PatientData>) => ({
      ...prev,
      [name]: value,
    });

    setFormData(updatedData);
    setIsFirstChange(true);
    emitFormUpdate(updatedData(formData));
  };

  const updateStatusForm = async (body: Partial<PatientData>) => {
    try {
      const response = await axios.put(RouteAPIEnum.API_PATIENT_FORMS, body);
      if (response.data.status === "success") {
        if (body.status === FormStatusEnum.SUBMITTED) {
          setIsSubmitted(true);
        }
      }
    } catch (error) {
      console.error("Error fetching religions:", error);
    }
  };

  useEffect(() => {
    if (isFirstChange) {
      console.log("updateStatusForm: ");
      updateStatusForm({
        status: FormStatusEnum.IN_PROGRESS,
        updatedAt: new Date(),
        id: formId,
      });
    }
  }, [isFirstChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      updateStatusForm({
        ...formData,
        status: FormStatusEnum.SUBMITTED,
        updatedAt: new Date(),
        id: formId,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: (typeof formFields)[0]) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        handleChange(field.name, e.target.value),
      className:
        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
    };

    if (field.type === FieldTypeEnum.date) {
      const dateValue = formData?.[field.name];
      return (
        <CustomDatePicker
          selected={typeof dateValue === "string" ? new Date(dateValue) : null}
          placeholderText={field.placeholder}
          onChange={(date) =>
            handleChange(field.name, date ? date.toISOString() : "")
          }
        />
      );
    }

    if (field.type === FieldTypeEnum.select) {
      let options = field.options || [];

      if (field.name === "religion") {
        options = religions;
      } else if (field.name === "gender") {
        options = genders;
      }

      return (
        <Select
          options={options}
          value={
            options?.find((opt) => opt.value === formData?.[field.name]) || null
          }
          onChange={(opt) => handleChange(field.name, opt?.value || "")}
          placeholder={field.placeholder}
          isSearchable
          isClearable
          className="w-full"
        />
      );
    }
    if (field.type === FieldTypeEnum.tel) {
      return (
        <input
          {...commonProps}
          placeholder={field.placeholder}
          type="tel"
          maxLength={10}
          value={formData?.[field.name]?.toString() ?? ""}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // เอาเฉพาะตัวเลข
            handleChange(field.name, value);
          }}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          className="w-full h-9 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
      );
    }
    return (
      <input
        {...commonProps}
        placeholder={field.placeholder}
        type={field.type}
        value={formData?.[field.name]?.toString() ?? ""}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className="w-full h-9 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      />
    );
  };

  return isLoading ? (
    <div className="h-screen flex items-center justify-center">
      <div className="loader scale-125"></div>
    </div>
  ) : isSubmitted ? (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center "
    >
      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-xl border border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <label className="text-3xl font-bold text-green-700 drop-shadow-sm">
          Form Submitted Successfully!
        </label>
        <p className="text-gray-600 text-center text-lg">
          Thank you for your submission.
          <br />
          Your information has been saved successfully.
        </p>
      </div>
    </motion.div>
  ) : (
    <div className="h-full flex items-center justify-center  p-8 ">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-8 grid gap-8 border border-blue-100">
          <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight drop-shadow-sm">
            Form ID {formId}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formFields.map((field) => (
              <div key={field.name} className="grid gap-2">
                <label
                  htmlFor={field.name}
                  className="block text-base font-semibold text-blue-900 mb-1 tracking-wide"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Saving...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
