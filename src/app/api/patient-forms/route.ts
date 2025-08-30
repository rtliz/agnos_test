import { addForm, getForms } from "@/app/shared/data/forms";
import { SocketEnum } from "@/app/shared/enums/socket.enum";
import { ApiResponse } from "@/app/shared/types/api/response";
import type { PatientForm } from "@/app/shared/types/patient-form";
import { getSocket } from "@/lib/socketClient";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const newForm: PatientForm = await req.json();
    const currentForms = getForms();
    newForm.id = (currentForms.length + 1).toString();
    addForm(newForm);

    const response: ApiResponse<PatientForm> = {
      status: "success",
      data: newForm,
      message: "Form created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const errorResponse: ApiResponse<PatientForm> = {
      status: "error",
      message: "Failed to create form",
      errors: [
        {
          code: "FORM_CREATE_ERROR",
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  const currentForms = getForms();
  const response: ApiResponse<PatientForm[]> = {
    status: "success",
    data: currentForms.sort((a: PatientForm, b: PatientForm) =>
      a.status.toString().localeCompare(b.status.toString())
    ),
    metadata: {
      total: currentForms.length,
      page: 1,
      limit: currentForms.length,
      totalPages: 1,
    },
  };
  return NextResponse.json(response);
}

// อัพเดทข้อมูลฟอร์ม
export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const currentForms = getForms();
    let form = currentForms.find((f: PatientForm) => f.id === body.id);
    if (form) {
      Object.assign(form, body);
      const socket = getSocket();
      socket.emit(SocketEnum.TRIGGER_FORM_UPDATE, form);
    }

    const response: ApiResponse<PatientForm | null> = {
      status: "success",
      message: "Form updated successfully",
      data: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      status: "error",
      message: "Failed to update form",
      errors: [
        {
          code: "FORM_UPDATE_ERROR",
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
