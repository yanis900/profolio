const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createProject(token, project) {

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(project)
  };

  let response = await fetch(`${BACKEND_URL}/projects/new`, requestOptions);

  if (response.status === 201) {
    const data = await response.json()
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when creating an new project. Expected 201`
    );
  }
}

export async function editProject(token, project) {

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(project)
  };

  let response = await fetch(`${BACKEND_URL}/projects/edit/${project.id}`, requestOptions);

  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when editing a project. Expected 201`
    );
  }
}

export async function deleteProject(token, id) {

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await fetch(`${BACKEND_URL}/projects/delete-one/${id}`, requestOptions);

  if (response.status === 200) {
    const data = await response.json()
    return data
  } else {
    throw new Error(
      `Received status ${response.status} when deleting a project. Expected 200`
    );
  }
}

export async function getProjectByTags(tags) {
  const response = await fetch(`${BACKEND_URL}/projects/search?tags=${tags}`);

  if (response.status !== 200 && response.status !== 404) {
    throw new Error("Server error");
  }
  if (response.status === 404) {
    return null;
  }

  const data = await response.json();
  return data;
}