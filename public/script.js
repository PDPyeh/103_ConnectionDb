const list = document.getElementById('list');
const q = document.getElementById('q');
const toast = document.getElementById('toast');

let data = [];

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1600);
}

async function loadData(){
  try{
    const res = await fetch('/biodata', { cache: 'no-store' });
    if(!res.ok) throw new Error('Gagal fetch data');
    data = await res.json();
    render(data);
    showToast(`Loaded ${data.length} data ✅`);
  }catch(e){
    render([]);
    showToast('Gagal memuat data ❌');
    console.error(e);
  }
}

function render(rows){
  if(!rows.length){
    list.innerHTML = `<div class="card"><div class="body"><div class="title">Tidak ada data</div><div class="meta"><div>Tambahkan data di database kamu.</div></div></div></div>`;
    return;
  }
  list.innerHTML = rows.map(r => card(r)).join('');
}

function card({ id, nama, nim, kelas }){
  return `
  <article class="card">
    <div class="body">
      <span class="badge">ID: <code>${id}</code></span>
      <div class="title">${escapeHtml(nama || '-')}</div>
      <div class="meta">
        <div><span class="label">NIM</span> <code>${escapeHtml(nim || '-')}</code></div>
        <div><span class="label">Kelas</span> ${escapeHtml(kelas || '-')}</div>
      </div>
    </div>
  </article>`;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"'`=\/]/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'
  }[s]));
}

q.addEventListener('input', (e)=>{
  const v = e.target.value.trim().toLowerCase();
  const filtered = !v ? data : data.filter(x =>
    (x.nama || '').toLowerCase().includes(v) ||
    (x.nim || '').toLowerCase().includes(v) ||
    (x.kelas || '').toLowerCase().includes(v)
  );
  render(filtered);
});

loadData();
