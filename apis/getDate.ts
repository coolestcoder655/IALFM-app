const getDate = async (): Promise<string> => {
  return new Date().toISOString().split("T")[0];
};

export default getDate;
