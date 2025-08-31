import { getForms } from "@/app/shared/data/forms";
import type { ApiResponse } from "@/app/shared/types/api/response";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const paths = url.pathname.split("/");
  const formId = paths[paths.length - 1];

  const currentForms = getForms();

  const form = currentForms.find((f) => f.id === formId);

  const response: ApiResponse<typeof form> = {
    status: "success",
    data: form,
  };

  return NextResponse.json(response);
}
