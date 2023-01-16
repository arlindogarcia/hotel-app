import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDate(
  date: Date | string,
  formatStr = "dd/MM/yyyy"
): string {
  if (!date) {
    return "";
  }
  try {
    if (typeof date === "string") {
      return format(parseISO(date), formatStr, {
        locale: ptBR,
      });
    }
    return format(date, formatStr, {
      locale: ptBR,
    });
  } catch (error) {
    console.log("error on format date", date);
    return "";
  }
}
