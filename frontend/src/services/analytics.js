const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function updateViewCount(token, slug) {
    const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await fetch(`${BACKEND_URL}/analytics/view/${slug}`, requestOptions);

  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when creating an new project. Expected 201`
    );
  }
}