import Api from "./Api";

interface AuthResponse {
  isSuccess: boolean;
  user: {
    id: number;
    email: string;
    role: string;
    token: string;
  };
  message?: string;
}

export const AuthApi = {
  // 🔹 Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await Api.post("/Auth/Login", { email, password });

    if (response.data.isSuccess) {
      const userData = response.data.user;

      // Guardamos toda la info del usuario en localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return response.data;
  },

  // 🔹 Register new user
  register: async (
    userName: string,
    email: string,
    password: string,
    countryOfOrigin: string,
    preferredLanguage: string,
    birthDate: Date
  ): Promise<AuthResponse> => {
    const birthDateString = birthDate.toISOString().split("T")[0];
    const response = await Api.post("/Auth/Register", {
      UserName: userName,
      Email: email,
      Password: password,
      CountryOfOrigin: countryOfOrigin,
      PreferredLanguage: preferredLanguage,
      BirthDate: birthDateString,
    });

    if (response.data.isSuccess && response.data.user?.token) {
      const userData = response.data.user;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return response.data;
  },

  // 🔹 Get user by ID
  getUser: async (userId: number) => {
    const response = await Api.get(`/User/${userId}`);
    return response.data;
  },

  // 🔹 Logout / clear local storage
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },
};

//Helper functions (para rutas protegidas)
export const getAuthUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
