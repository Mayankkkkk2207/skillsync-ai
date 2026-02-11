export const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch {
    // Ignore storage errors (e.g. SSR or private mode issues)
  }
};

