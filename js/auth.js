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
    role: document.getElementById("role").value
  };

  fetch(API_URL + "?" + new URLSearchParams(data))
    .then(r => r.json())
    .then(res => {
      if(res.status === "ok"){
        showModal(
          res.msg || "Registrasi berhasil, silakan login"
        );
        setTimeout(() => {
          location.href = "login.html";
        }, 1500);
      }else{
        showModal(res.msg || "Registrasi gagal");
      }
    })
    .catch(() => showModal("❌ Koneksi ke server gagal"));
}

/* ================= LOGIN ================= */
function login(e){
  e.preventDefault();

  const data = {
    action: "login",
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  fetch(API_URL + "?" + new URLSearchParams(data))
    .then(r => r.json())
    .then(res => {

      if(res.status === "blocked"){
        showModal(
          "Akun kurir belum aktif.<br>Silakan gabung grup WhatsApp untuk verifikasi.",
          "https://chat.whatsapp.com/HFrhrJbxJJwDTxNPhNTQsH"
        );
        return;
      }

      if(res.status !== "ok"){
        showModal(res.msg || "Email atau password salah");
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
    .catch(() => showModal("❌ Koneksi ke server gagal"));
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
