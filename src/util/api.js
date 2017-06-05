export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function post(url, data) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const body = JSON.stringify(data);

  return fetch(url, {
    method: 'post',
    headers: headers,
    body: body,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function get(url) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  return fetch(url, {
    method: 'get',
    headers: headers,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function logout(session) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  return fetch(`http://localhost:4000/api/v1/session/${session.id}`, {
    method: 'delete',
    headers: headers,
  })
  .then(checkStatus)
  .then(parseJSON);
}