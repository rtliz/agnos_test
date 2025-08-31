import { ApiResponse } from "@/app/shared/types/api/response";
import { NextResponse } from "next/server";

interface Religion {
  id: number;
  label: string;
  value: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<Religion[]>>> {
  const religions: Religion[] = [
    { id: 1, label: "Buddhist", value: "Buddhist" },
    { id: 2, label: "Christian", value: "Christian" },
    { id: 3, label: "Islam", value: "Islam" },
    { id: 4, label: "Sikh", value: "Sikh" },
    { id: 5, label: "Hindu", value: "Hindu" },
    { id: 6, label: "None", value: "None" },
    { id: 7, label: "Other", value: "Other" },
  ];

  const response: ApiResponse<Religion[]> = {
    status: "success",
    data: religions,
  };

  return NextResponse.json(response, { status: 200 });
}
