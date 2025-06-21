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
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || `Error en la solicitud a ${url}.`);
    }

    return data;
  } catch (error) {
    console.error(`Error en apiFetch para ${url} (${method}):`, error);
    throw error;
  }
};
