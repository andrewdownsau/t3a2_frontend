
export async function BackendRequestGET(path, setData) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (response.status >= 400) {
    throw new Error("not authorized");
  } else {
    const data = await response.json()
    setData(data);
    // console.log(data)
  }
}

export async function BackendRequestGETLandmark(path, setData) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (response.status >= 400) {
    throw new Error("not authorized");
  } else {
    const data = await response.json()
    setData(data.landmark);
    // console.log(data.landmark)
  }
}

export async function BackendRequestDELETE(path) {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    method: "DELETE"
  });
}

export async function BackendRequestPUT(path, body) {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}` 
    },
    method: "PUT",
    body: body
  });
}

export async function BackendRequestPOST(path, body) {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}` 
    },
    method: "POST",
    body: body
  });
}