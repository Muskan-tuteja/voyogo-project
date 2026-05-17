export function getRoleFromToken() {

  try {

    const token =
      localStorage.getItem("token");

    if (!token) return null;

    const payload =
      token.split(".")[1];

    const decoded =
      JSON.parse(atob(payload));

    return decoded.role;

  } catch (error) {

    console.error(
      "JWT decode failed:",
      error
    );

    return null;

  }

}
