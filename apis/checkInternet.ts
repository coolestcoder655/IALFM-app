const returnInternetStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch("https://www.google.com", {
      method: "HEAD",
      cache: "no-cache",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Internet connection check failed:", error);
    return false;
  }
};

export default returnInternetStatus;
