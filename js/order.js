function createOrder(e){
  e.preventDefault();
  console.log("✅ createOrder terpanggil");

  if (typeof API_URL === "undefined") {
    alert("❌ API_URL tidak terbaca");
    console.error("API_URL undefined");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER:", user);

  if(!user){
    alert("❌ User belum login");
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

  fetch(API_URL,{
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(r => {
    console.log("RESPONSE RAW:", r);
    return r.text();   // ⬅️ PENTING
  })
  .then(txt => {
    console.log("RESPONSE TEXT:", txt);

    let res;
    try {
      res = JSON.parse(txt);
    } catch(e){
      alert("❌ Response bukan JSON");
      return;
    }

    if(res.status !== "ok"){
      alert("❌ Gagal: " + (res.msg || "unknown"));
      return;
    }

    alert("✅ ORDER BERHASIL\n\nResi:\n" + res.resi);

    // RESET FORM
    document.getElementById("orderForm").reset();
  })
  .catch(err => {
    alert("❌ Fetch error");
    console.error(err);
  });
}
