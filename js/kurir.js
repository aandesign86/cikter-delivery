const API_URL = "https://script.google.com/macros/s/AKfycbwJvnsDf7tfmZEZKmmMpll_NfCVopBTCPGT4UBtI3mDMKM-AxkBe6P8HIKeNkXVThY/exec";
requireRole("kurir");

const user = JSON.parse(localStorage.getItem("user"));
const box = document.getElementById("orders");

function loadOrders(){
  box.innerHTML = "Loading...";

  const url = API_URL + "?action=listNewOrders";

  fetch(url)
    .then(r => r.text())
    .then(txt => {
      console.log("RAW:", txt);

      let res;
      try{
        res = JSON.parse(txt);
      }catch(e){
        box.innerHTML = "Response bukan JSON";
        return;
      }

      if(res.status !== "ok"){
        box.innerHTML = "Gagal load order: " + res.status;
        return;
      }

      if(res.data.length === 0){
        box.innerHTML = "Tidak ada order baru";
        return;
      }

      box.innerHTML = "";
      res.data.forEach(o=>{
        box.innerHTML += `
          <div style="border:1px solid #ccc;padding:10px;margin:10px">
            <b>${o.resi}</b><br>
            👤 ${o.nama} (${o.hp})<br>
            📍 ${o.pickup} ➜ ${o.tujuan}<br>
            <button onclick="ambilOrder('${o.resi}')">
              Ambil Order
            </button>
          </div>
        `;
      });
    })
    .catch(err=>{
      box.innerHTML = "Fetch error";
      console.error(err);
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
