// tokenUtils.js
async function refreshToken(refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  };

  try {
    console.log("Refresh token:", refreshToken);
    const response = await fetch("/members/refresh/", requestOptions);
    if (response.ok) {
      const data = await response.json();
      return data.access; // Return the new access token
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const handleTokenRefreshed = (newAccessToken, dispatch) => {
  // Save the new token in local storage
  localStorage.setItem("token", JSON.stringify(newAccessToken));

  // Update the state with the new token
  dispatch({
    type: "REFRESH_TOKEN",
    payload: { token: newAccessToken },
  });
};


async function fetchWithTokenRefresh(
  url,
  options,
  refreshTokenFn,
  onTokenRefreshed,
  dispatch
) {
  let response = await fetch(url, options);

if (response.status === 401 && refreshTokenFn) {
    const storedRefreshToken = refreshTokenFn();
    const newAccessToken = await refreshToken(storedRefreshToken, dispatch);

    if (newAccessToken) {
      options.headers.Authorization = `Bearer ${newAccessToken}`;

      if (typeof onTokenRefreshed === "function") {
        onTokenRefreshed(newAccessToken);
      }

      response = await fetch(url, options);
    }
  }

  return response;
}

export { refreshToken, fetchWithTokenRefresh, handleTokenRefreshed };
