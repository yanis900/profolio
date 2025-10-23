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