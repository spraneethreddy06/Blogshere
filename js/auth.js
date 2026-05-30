const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");


// REGISTER USER
if(registerForm){

  registerForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(user => user.email === email);

    if(userExists){
      showToast("User already exists!");
      return;
    }

    users.push({
      name,
      email,
      password
    });

    localStorage.setItem("users",JSON.stringify(users));

    showToast("Registration Successful!");

    window.location.href = "login.html";

  });

}



// LOGIN USER
if(loginForm){

  loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user => 
      user.email === email &&
      user.password === password
    );

    if(!validUser){
      showToast("Invalid Credentials");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(validUser)
    );

    showToast("Login Successful!");

    window.location.href = "dashboard.html";

  });

}