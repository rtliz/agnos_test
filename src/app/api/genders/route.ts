import { ApiResponse } from "@/app/shared/types/api/response";
import { NextResponse } from "next/server";

interface Gender {
  id: number;
  label: string;
  value: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<Gender[]>>> {
  const genders: Gender[] = [
    { id: 1, value: "male", label: "Male" },
    { id: 2, value: "female", label: "Female" },
    { id: 3, value: "other", label: "Other" },
  ];

  const response: ApiResponse<Gender[]> = {
    status: "success",
    data: genders,
  };

  return NextResponse.json(response, { status: 200 });
}
