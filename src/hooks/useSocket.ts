import { PatientData } from "@/app/(features)/patient-form/config-form";
import { SocketEnum } from "@/app/shared/enums/socket.enum";
import { getSocket } from "@/lib/socketClient";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export function useSocket(room: SocketEnum, formId?: string) {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const connect = async () => {
      const s = getSocket(true);
      socketRef.current = s;
      setSocket(s);

      s.on("connect", () => {
        console.log(
          "room === SocketEnum.MANAGE_FORMS: ",
          room === SocketEnum.MANAGE_FORMS
        );
        if (room === SocketEnum.MANAGE_FORMS) {
          s.emit(SocketEnum.MANAGE_FORMS);
        } else {
          s.emit(room, { formId });
        }
        console.log("socket connected", s.id, room, formId);
      });

      s.on("connect_error", (err) => {
        console.warn("socket connect_error", err);
      });
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setSocket(null);
    };
  }, [room, formId]);

  const emitFormUpdate = (form: Partial<PatientData>) => {
    const s = socketRef.current;
    if (!s) return;

    s.emit(SocketEnum.PATIENT_FORM_UPDATE, {
      formId,
      data: form,
    });
  };

  const emitUpdateStatus = (data: any) => {
    const s = socketRef.current;
    if (!s) return;

    s.emit(SocketEnum.TRIGGER_FORM_UPDATE, data);
  };

  const emitFormClearData = () => {
    const s = socketRef.current;
    if (!s) return;

    s.emit(SocketEnum.CLEAR_FORM_DATA, formId);
  };

  return { socket, emitFormUpdate, emitFormClearData, emitUpdateStatus };
}
