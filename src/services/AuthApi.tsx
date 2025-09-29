import Api from "./Api";

export const AuthApi = {
  // Login user
  login: async (userName: string, password: string) => {
    const response = await Api.post("/Auth/Login", { userName, password });

    if (response.data.isSuccess) {
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("role", response.data.user.role);
    }
    return response.data;
  },

  // Register new user
  register: async (
    userName: string,
    email: string,
    password: string,
    countryOfOrigin: string,
    preferredLanguage: string
  ) => {
    const response = await Api.post("/Auth/Register", {
      UserName: userName,
      Email: email,
      Password: password,
      CountryOfOrigin: countryOfOrigin,
      PreferredLanguage: preferredLanguage,
    });
    return response.data;
  },

  // Get current user
  getUser: async (userId: number) => {
    const response = await Api.get(`/User/${userId}`);
    return response.data;
  },
};
