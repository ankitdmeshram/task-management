export const validateEmail = (email) => {
  // Regular expression pattern for validating email addresses
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

//set cookie
export const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = async (name) => {
  const cookies = await document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie contains the name we're looking for
    if (cookie.startsWith(name + "=")) {
      // If found, return the cookie value
      return cookie.substring(name.length + 1);
    }
  }
  // If cookie with the given name is not found, return null
  return null;
};
