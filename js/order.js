function createOrder(e){
  e.preventDefault();
  console.log("✅ createOrder terpanggil");

  // pastikan API_URL ada (dari auth.js)
  if (typeof API_URL === "undefined") {
    alert("❌ API_URL tidak terbaca");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER:", user);

  if(!user){
    alert("❌ User belum login");
    location.href = "../auth/login.html";
    return;
  }

  const data = {
    action: "createOrder",
    customer_id: user.id,
    nama: document.getElementById("nama").value,
    hp: document.getElementById("hp").value,
    pickup: document.getElementById("pickup").value,
    tujuan: document.getElementById("tujuan").value,
    catatan: document.getElementById("catatan").value
  };

  console.log("DATA DIKIRIM:", data);

  // 👉 UBAH KE GET
  const params = new URLSearchParams(data).toString();

  fetch(API_URL + "?" + params)
    .then(r => r.json())
    .then(res => {
      console.log("RESPONSE JSON:", res);

      if(res.status !== "ok"){
        alert("❌ Gagal: " + (res.msg || "unknown"));
        return;
      }

      alert("✅ ORDER BERHASIL\n\nResi:\n" + res.resi);

      // reset form
      document.getElementById("orderForm").reset();
    })
    .catch(err => {
      alert("❌ Fetch error");
      console.error(err);
    });
}
