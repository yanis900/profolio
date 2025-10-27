const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

export async function getUserByEmail(email) {
  let response = await fetch(`${BACKEND_URL}/users/email?email=${email}`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Received status ${response.status} when fetching user by email. Expected 200`
    );
  }
}
export async function getUserById(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Received status ${response.status} when fetching user by id. Expected 200`
    );
  }
}

export async function editUser(token, user) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  };
  console.log(user);
  let response = await fetch(`${BACKEND_URL}/users/edit`, requestOptions);
  console.log(response);
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    throw new Error(
      `Received status ${response.status} when updating user. Expected 200`
    );
  }
}

export async function getUserBySlug(userSlug) {
  let response = await fetch(`${BACKEND_URL}/users/portfolio/${userSlug}`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Received status ${response.status} when fetching user by slug. Expected 200`
    );
  }
}

export async function getUserByName(name) {
  const response = await fetch(`${BACKEND_URL}/users/search?name=${name}`);

  if (response.status !== 200 && response.status !== 404) {
    throw new Error("Server error");
  }
  if (response.status === 404) {
    return null;
  }

  const data = await response.json();
  return data;
}

export async function toggleVisibility(token, visibility) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ visibility }),
  };

  let response = await fetch(`${BACKEND_URL}/users/visibility`, requestOptions);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Received status ${response.status} when updating visibility. Expected 200`
    );
  }
}

export async function getGithubContributions(username) {

  const query = `
  {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              weekday
              date
            }
          }
        }
      }
    }
  }`;

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({query})
  };

  let response = await fetch('https://api.github.com/graphql', requestOptions);

  if (response.status === 200) {
    const data = await response.json();
    console.log(data)
    return data.data.user.contributionsCollection.contributionCalendar
  } else {
    throw new Error(
      `Received status ${response.status} when fetching github contributions. Expected 200`
    );
  }
}