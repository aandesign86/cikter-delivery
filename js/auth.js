const API_URL = "https://script.google.com/macros/s/AKfycbwJvnsDf7tfmZEZKmmMpll_NfCVopBTCPGT4UBtI3mDMKM-AxkBe6P8HIKeNkXVThY/exec";

/* ================= REGISTER ================= */
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

  const params = new URLSearchParams(data).toString();

  fetch(API_URL + "?" + params)
    .then(r => r.json())
    .then(res => {
      alert(res.msg || "Registrasi berhasil");
      if(res.status === "ok"){
        location.href = "login.html";
      }
    })
    .catch(() => alert("❌ Fetch error"));
}

/* ================= LOGIN ================= */
function login(e){
  e.preventDefault();

  const data = {
    action: "login",
    email: document.getElementById("email")?.value || "",
    password: document.getElementById("password")?.value || "",
    hp: document.getElementById("hp")?.value || "",
    pin: document.getElementById("pin")?.value || ""
  };

  const params = new URLSearchParams(data).toString();

  fetch(API_URL + "?" + params)
    .then(r => r.json())
    .then(res => {
      if(res.status !== "ok"){
        alert(res.msg || "Login gagal");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.user));

      if(res.user.role === "customer"){
        location.href = "../customer/dashboard.html";
      }else if(res.user.role === "kurir"){
        location.href = "../kurir/dashboard.html";
      }else{
        location.href = "../admin/index.html";
      }
    })
    .catch(() => alert("❌ Fetch error"));
}

/* ================= ROLE GUARD ================= */
function requireRole(role){
  const user = JSON.parse(localStorage.getItem("user"));
  if(!user || user.role !== role){
    location.href = "../auth/login.html";
  }
}

/* ================= LOGOUT ================= */
function logout(){
  localStorage.removeItem("user");
  location.href = "../auth/login.html";
}
