

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};
export const removeToken = () => {
  console.log(localStorage)
  localStorage.removeItem('token');
};
