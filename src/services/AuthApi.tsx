import Api from "./Api";

// Authentication API methods
export const AuthApi = {
  // Login user
  login: async (email: string, password: string) => {
    const response = await Api.post("/Auth/Login", { email, password });

    if (response.data.isSuccess && response.data.user) {
      const userData = response.data.user;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return response.data;
  },

  // Register new user
  register: async (
    userName: string,
    email: string,
    password: string,
    countryOfOrigin: string,
    preferredLanguage: string,
    birthDate: Date
  ) => {
    const response = await Api.post("/Auth/Register", {
      UserName: userName,
      Email: email,
      Password: password,
      CountryOfOrigin: countryOfOrigin,
      PreferredLanguage: preferredLanguage,
      BirthDate: birthDate.toISOString().split("T")[0],
    });

    if (response.data.isSuccess && response.data.user?.token) {
      const userData = response.data.user;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return response.data;
  },

  // Get user by ID
  getUser: async (userId: number) => {
    const response = await Api.get(`/User/${userId}`);
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },
};

// Get current authenticated user from localStorage
export const getAuthUser = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    clearAuthData();
    return null;
  }

  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    if (tokenPayload.exp * 1000 < Date.now()) {
      clearAuthData();
      return null;
    }
    return JSON.parse(user);
  } catch {
    clearAuthData();
    return null;
  }
};

// Clear authentication data
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
