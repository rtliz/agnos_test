import { SocketEnum } from "@/app/shared/enums/socket.enum";
import { ApiResponse } from "@/app/shared/types/api/response";
import type { PatientForm } from "@/app/shared/types/patient-form";
import { getSocket } from "@/lib/socketClient";
import { NextResponse } from "next/server";

export let forms: PatientForm[] = [];

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const newForm: PatientForm = await req.json();
    newForm.id = (forms.length + 1).toString();
    forms.push(newForm);

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
  const response: ApiResponse<PatientForm[]> = {
    status: "success",
    data: forms?.sort((a, b) =>
      a.status.toString().localeCompare(b.status.toString())
    ),
    metadata: {
      total: forms.length,
      page: 1,
      limit: forms.length,
      totalPages: 1,
    },
  };
  return NextResponse.json(response);
}

// อัพเดทข้อมูลฟอร์ม
export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    let form = forms.find((f) => f.id === body.id);
    if (form) {
      Object.assign(form, body);
      const socket = getSocket();
      socket.emit(SocketEnum.TRIGGER_FORM_UPDATE, form);
    }

    const response: ApiResponse<PatientForm | null> = {
      status: "success",
      message: "Form updated successfully",
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
