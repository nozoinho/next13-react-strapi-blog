export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Intl.DateTimeFormatOptions: es una interfaz en JavaScript que representa las opciones de formato utilizadas para formatear fechas y horas
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es", options);
};
