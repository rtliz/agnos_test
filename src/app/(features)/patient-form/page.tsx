import { RouteEnum } from "@/app/shared/enums/routes.enum";
import { redirect } from "next/navigation";

export default async function PatientFormPage() {
  redirect(`/${RouteEnum.NOTFOUND}`);
}
