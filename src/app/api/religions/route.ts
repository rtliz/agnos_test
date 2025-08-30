import { ApiResponse } from "@/app/shared/types/api/response";
import { NextResponse } from "next/server";

interface Religion {
  id: number;
  label: string;
  value: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<Religion[]>>> {
  const religions: Religion[] = [
    { id: 1, label: "Buddhist", value: "buddhist" },
    { id: 2, label: "Christian", value: "christian" },
    { id: 3, label: "Islam", value: "islam" },
    { id: 4, label: "Sikh", value: "sikh" },
    { id: 5, label: "Hindu", value: "hindu" },
    { id: 6, label: "None", value: "none" },
    { id: 7, label: "Other", value: "other" },
  ];

  const response: ApiResponse<Religion[]> = {
    status: "success",
    data: religions,
  };

  return NextResponse.json(response, { status: 200 });
}
