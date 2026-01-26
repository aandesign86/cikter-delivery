requireRole("kurir");

const user = JSON.parse(localStorage.getItem("user"));
const box = document.getElementById("orders");

function loadOrders(){
  box.innerHTML = "Loading...";

  fetch(API_URL + "?action=listNewOrders")
    .then(r => r.json())
    .then(res => {
      if(res.status !== "ok"){
        box.innerHTML = "Gagal load order";
        return;
      }

      if(res.data.length === 0){
        box.innerHTML = "Tidak ada order baru";
        return;
      }

      box.innerHTML = "";
      res.data.forEach(o => {
        box.innerHTML += `
          <div style="border:1px solid #ccc;padding:10px;margin:10px">
            <b>${o.resi}</b><br>
            👤 ${o.nama} (${o.hp})<br>
            📍 ${o.pickup} ➜ ${o.tujuan}<br>
            📝 ${o.catatan}<br><br>
            <button onclick="ambilOrder('${o.resi}')">
              Ambil Order
            </button>
          </div>
        `;
      });
    });
}

function ambilOrder(resi){
  const params = new URLSearchParams({
    action: "ambilOrder",
    resi: resi,
    kurir_id: user.id,
    kurir_nama: user.nama,
    kurir_hp: user.hp
  });

  fetch(API_URL + "?" + params.toString())
    .then(r => r.json())
    .then(res => {
      alert(res.msg);
      loadOrders();
    });
}

loadOrders();
