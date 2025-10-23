const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export async function updateProfileImage(token, formData) {

  const requestOptions = {
    method: "PUT",
    headers: {
    Authorization: `Bearer ${token}`,
    },
    body: formData //FormData is a special JavaScript object used to send files (like images) and other key/value pairs to the server
  };

  let response = await fetch(`${BACKEND_URL}/upload/profile-image`, requestOptions);

  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when uploading image. Expected 200`
    );
  }
}
 