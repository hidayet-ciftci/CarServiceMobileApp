export const getCustomerDetail = async (email: string) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/ServiceRecords/OneServiceDetails`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/* export const getToken = async (loginData: loginDataType) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/Auth/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
 */
