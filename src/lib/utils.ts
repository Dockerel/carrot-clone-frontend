export const formatDate = (dateFormat: string | undefined): string => {
  return `${dateFormat?.split("T")[0].split("-")[0].slice(2, 4)}.${
    dateFormat?.split("T")[0].split("-")[1]
  }.${dateFormat?.split("T")[0].split("-")[2]}`;
};
