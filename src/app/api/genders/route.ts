import { ApiResponse } from "@/app/shared/types/api/response";
import { NextResponse } from "next/server";

interface Gender {
  id: number;
  label: string;
  value: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<Gender[]>>> {
  const genders: Gender[] = [
    { id: 1, value: "Male", label: "Male" },
    { id: 2, value: "Female", label: "Female" },
    { id: 3, value: "Other", label: "Other" },
  ];

  const response: ApiResponse<Gender[]> = {
    status: "success",
    data: genders,
  };

  return NextResponse.json(response, { status: 200 });
}
