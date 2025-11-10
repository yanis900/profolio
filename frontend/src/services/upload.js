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

export async function updateProfileBanner(token, formData) {

  const requestOptions = {
    method: "PUT",
    headers: {
    Authorization: `Bearer ${token}`,
    },
    body: formData
  };

  let response = await fetch(`${BACKEND_URL}/upload/profile-banner`, requestOptions);

  if (response.status === 200) {
    const data = await response.json()
    console.log(data)
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when uploading banner. Expected 200`
    );
  }
}

export async function uploadCV(token, formData) {

  const requestOptions = {
    method: "POST",
    headers: {
    Authorization: `Bearer ${token}`,
    },
    body: formData
  };

  let response = await fetch(`${BACKEND_URL}/upload/cv`, requestOptions);

  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when uploading cv. Expected 200`
    );
  }
}

export async function uploadThumbnail(token, projectId, formData) {

  const requestOptions = {
    method: "POST",
    headers: {
    Authorization: `Bearer ${token}`,
    },
    body: formData
  };

  let response = await fetch(`${BACKEND_URL}/upload/thumbnail/${projectId}`, requestOptions);

  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when uploading project thumbnail. Expected 200`
    );
  }
}
 