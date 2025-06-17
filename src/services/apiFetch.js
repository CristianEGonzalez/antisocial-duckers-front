const API_BASE_URL = "http://localhost:3000";

export const apiFetch = async (endpoint, method = 'GET', bodyData = null) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (
    bodyData &&
    (method === "POST" || method === "PUT" || method === "DELETE")
  ) {
    config.body = JSON.stringify(bodyData);
  }

  try {
    const res = await fetch(url, config);

    if (!res.ok) {
      throw new Error(`Error en la solicitud a ${url}.`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error en apiFetch para ${url} (${method}):`, error);
    throw error;
  }
};
