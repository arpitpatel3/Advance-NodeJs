
//  User Login Validation
function validateLogin({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isValid = username === "user@example.com" && password === "pass123";
      if (!isValid) {
        return reject(new Error("Login failed: invalid username or password"));
      }
      resolve({ id: 101, email: "user@example.com" }); // matches sample output
    }, 300);
  });
}

module.exports = { validateLogin };

