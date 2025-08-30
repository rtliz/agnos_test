import type { ApiResponse } from "@/app/shared/types/api/response";
import { NextResponse } from "next/server";
import { forms } from "../route";

export async function GET(
  request: Request,
  { params }: { params: { formId: string } }
) {
  const form = forms.find((f) => f.id === params.formId);

  const response: ApiResponse<typeof form> = {
    status: "success",
    data: form,
  };

  return NextResponse.json(response);
}
