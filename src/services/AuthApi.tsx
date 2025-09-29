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
    
  register: async (
    userName: string,
    email: string,
    password: string,
    countryOfOrigin: string,
    preferredLanguage: string,
    birthDate: Date
  ) => {
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
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("role", response.data.user.role);
    }

    return response.data;
  },


  // Get current user
  getUser: async (userId: number) => {
    const response = await Api.get(`/User/${userId}`);
    return response.data;
  },
};
