export const formatterDate = (date: string): string => {
  const dateFormated = new Date(date);
  return dateFormated.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};