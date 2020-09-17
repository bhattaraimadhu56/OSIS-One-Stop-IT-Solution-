// save login  reponse > (user's name and token) to session storage
export const authenticate = (response, next) => {
  if (window !== "undefined") {
    // console.log('authenticate', response)
    // Always see the console what is coming in respone

    //     data:
    // message: "User Found ==> Login Successfull"
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0X2lkIjoiNWYwMTc1NDI0M2UyNDIwYjgwYTg4YWUzIiwidF9lbWFpbCI6Im1hZGh1QGdtYWlsLmNvbSIsInRfcm9sZSI6InN1YnNjcmliZXIiLCJpYXQiOjE1OTQxMDExMDEsImV4cCI6MTU5NDEwNDcwMX0.YNho34aJ-ErN5zFQowWBvY7A1X2V-CEsT1R9-NMACmc"
    // userData: {_id: "5f01754243e2420b80a88ae3", cname: "Madhu", email: "madhu@gmail.com", role: "admin"}

    // To store in session
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem(
      "user",
      JSON.stringify(response.data.userData.cname)
    );
    sessionStorage.setItem("role", JSON.stringify(response.data.userData.role));
    // To store in localstorage method is same
    // localStorage.setItem("jwt", JSON.stringify(response));
  }
  next(); // latero we can pass the redirect function to send to nexgt page
};

// access token name from session storage
export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

// access user name from session storage
export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

// access user role from session storage
export const getUserRole = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("role")) {
      return JSON.parse(sessionStorage.getItem("role"));
    } else {
      return false;
    }
  }
};
// access user name from session storage
export const getRole = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("role")) {
      return JSON.parse(sessionStorage.getItem("role"));
    } else {
      return false;
    }
  }
};

// remove token from session storage
export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
  }
  next();
};

// export const authenticate = (data, next) => {
//   // we we get the data and save the information in local storage in "jwt" any name can be given
//   if (typeof window !== "undefined") {
//     localStorage.setItem("jwt", JSON.stringify(data));
//     next(); // latero we can pass the redirect function to send to nexgt page
//   }
// };
