requireRole("kurir");

const user = JSON.parse(localStorage.getItem("user"));
const box = document.getElementById("orders");

function loadOrderSaya(){
  const user = JSON.parse(localStorage.getItem("user"));
  const list = document.getElementById("list");

  fetch(API_URL + "?" + new URLSearchParams({
    action: "getOrderSaya",
    kurir_id: user.id
  }))
  .then(r=>r.json())
  .then(res=>{
    if(res.status !== "ok"){
      list.innerHTML = "❌ Gagal load order";
      return;
    }

    if(res.data.length === 0){
      list.innerHTML = "📭 Belum ada order";
      return;
    }

    list.innerHTML = res.data.map(o=>`
      <div style="border:1px solid #ccc;padding:10px;margin:10px">
        <b>${o.resi}</b><br>
        Dari: ${o.pickup}<br>
        Ke: ${o.tujuan}<br>
        Status: ${o.status}
        <button onclick="selesaikanOrder('${o.resi}')">
          Selesaikan Order
        </button>

      </div>
    `).join("");
  });
}



function loadOrderBaru(){
  const list = document.getElementById("list");

  fetch(API_URL + "?" + new URLSearchParams({
    action: "getOrderBaru"
  }))
  .then(r=>r.json())
  .then(res=>{
    if(res.status !== "ok"){
      list.innerHTML = "❌ Gagal load order";
      return;
    }

    if(res.data.length === 0){
      list.innerHTML = "📭 Tidak ada order baru";
      return;
    }

    list.innerHTML = res.data.map(o=>`
      <div class="card">
        <b>${o.resi}</b><br>
        Pemesan: ${o.nama}<br>
        HP: ${o.hp}<br>
        Pickup: ${o.pickup}<br>
        Tujuan: ${o.tujuan}<br>
        <button onclick="ambilOrder('${o.resi}')">
          Ambil Order
        </button>
      </div>
    `).join("");
  });
}


function ambilOrder(resi){
  const user = JSON.parse(localStorage.getItem("user"));

  if(!confirm("Ambil order ini?")) return;

  fetch(API_URL + "?" + new URLSearchParams({
    action: "ambilOrder",
    resi: resi,
    kurir_id: user.id,
    nama_kurir: user.nama
  }))
  .then(r=>r.json())
  .then(res=>{
    if(res.status !== "ok"){
      alert("❌ Gagal ambil order");
      return;
    }

    alert("✅ Order berhasil diambil");
    loadOrderBaru();
  });
}


function selesaikanOrder(resi){
  if(!confirm("Selesaikan order ini?")) return;

  fetch(API_URL + "?" + new URLSearchParams({
    action: "selesaikanOrder",
    resi: resi
  }))
  .then(r=>r.json())
  .then(res=>{
    if(res.status !== "ok"){
      alert("❌ Gagal menyelesaikan order");
      return;
    }

    alert("✅ Order selesai");
    loadOrderSaya();
  });
}
