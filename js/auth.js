const API_URL = "https://script.google.com/macros/s/AKfycbwJvnsDf7tfmZEZKmmMpll_NfCVopBTCPGT4UBtI3mDMKM-AxkBe6P8HIKeNkXVThY/exec";

/* ===== REGISTER ===== */
function register(e){
  e.preventDefault();

  const data = {
    action: "register",
    nama: document.getElementById("nama").value,
    hp: document.getElementById("hp").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value,
    pin: Math.floor(1000 + Math.random() * 9000).toString()
  };

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(data)
  })
  .then(r=>r.json())
  .then(res=>{
    alert(res.msg || "Registrasi sukses");
    if(res.status==="ok"){
      location.href="login.html";
    }
  });
}

/* ===== LOGIN ===== */
function login(e){
  e.preventDefault();

  const data = {
    action:"login",
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    hp: document.getElementById("hp").value,
    pin: document.getElementById("pin").value
  };

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(data)
  })
  .then(r=>r.json())
  .then(res=>{
    if(res.status!=="ok"){
      alert(res.msg);
      return;
    }

    localStorage.setItem("user", JSON.stringify(res.user));

    if(res.user.role==="customer"){
      location.href="../customer/dashboard.html";
    }else if(res.user.role==="kurir"){
      location.href="../kurir/dashboard.html";
    }else{
      location.href="../admin/index.html";
    }
  });
}

/* ===== GUARD ROLE ===== */
function requireRole(role){
  const user = JSON.parse(localStorage.getItem("user"));
  if(!user || user.role!==role){
    location.href="../auth/login.html";
  }
}

/* ===== LOGOUT ===== */
function logout(){
  localStorage.removeItem("user");
  location.href="../auth/login.html";
}
