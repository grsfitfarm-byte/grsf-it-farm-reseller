/*
 GRSF IT FARM Reseller Portal — v1
 Demo frontend only. Data is stored in localStorage.
 For production, replace localStorage auth/data with a secure backend + database.
*/

const KEY="grsf_portal_v1";
const seed={
  offers:[
    {id:1,name:"Starter",deposit:10000,bonus:2000,code:"GRSF10K",start:"2026-09-29",end:"2026-10-29",status:"Active",terms:"Bonus for reseller business use only."},
    {id:2,name:"Premium",deposit:20000,bonus:5000,code:"GRSF20K",start:"2026-09-29",end:"2026-10-29",status:"Active",terms:"Bonus for reseller business use only."},
    {id:3,name:"Business",deposit:50000,bonus:15000,code:"GRSF50K",start:"2026-09-29",end:"2026-10-29",status:"Active",terms:"Bonus for reseller business use only."},
    {id:4,name:"Enterprise",deposit:100000,bonus:35000,code:"GRSF100K",start:"2026-09-29",end:"2026-10-29",status:"Active",terms:"Bonus for reseller business use only."}
  ],
  resellers:[
    {id:"RS001",name:"Demo Reseller",mobile:"01800000000",area:"Demo Area",balance:25000,status:"Active",password:"123456"}
  ],
  transactions:[
    {date:"2026-09-29",reseller:"RS001",name:"Demo Reseller",code:"GRSF20K",deposit:20000,bonus:5000,ref:"DEMO-001"}
  ]
};
function load(){return JSON.parse(localStorage.getItem(KEY)||"null")||seed}
function save(){localStorage.setItem(KEY,JSON.stringify(db))}
let db=load();
let session=null;
const app=document.getElementById("app");
const taka=n=>"৳"+Number(n||0).toLocaleString("en-BD");

function login(){
  app.innerHTML=`<div class="login"><div class="login-card">
    <div class="logo">GRSF IT FARM</div><div class="tag">Reseller Portal — Version 1</div>
    <div class="field"><label>Login Type</label><select id="type"><option value="reseller">Reseller</option><option value="admin">Admin</option></select></div>
    <div class="field"><label>User ID / Username</label><input id="user" placeholder="Reseller ID or admin"></div>
    <div class="field"><label>Password</label><input id="pass" type="password" placeholder="Password"></div>
    <button class="btn" style="width:100%" onclick="doLogin()">Login</button>
    <div class="demo"><b>Demo Admin:</b> admin / admin123<br><b>Demo Reseller:</b> RS001 / 123456</div>
  </div></div>`;
}
function doLogin(){
  const type=document.getElementById("type").value,u=document.getElementById("user").value.trim(),p=document.getElementById("pass").value;
  if(type==="admin"&&u==="admin"&&p==="admin123"){session={type,user:"admin"};renderAdmin();return}
  const r=db.resellers.find(x=>x.id===u&&x.password===p&&x.status==="Active");
  if(type==="reseller"&&r){session={type,user:r.id};renderReseller();return}
  alert("Login information is incorrect.");
}
function shell(title,body,active){
 app.innerHTML=`<div class="shell"><div class="topbar"><div><div class="brand">GRSF IT FARM</div><small>${title}</small></div><button class="btn secondary" onclick="logout()">Logout</button></div>
 <main class="main"><div class="nav">
 ${session.type==="admin"?`<button class="${active==="dash"?"active":""}" onclick="renderAdmin('dash')">Dashboard</button><button class="${active==="offers"?"active":""}" onclick="renderAdmin('offers')">Offers</button><button class="${active==="resellers"?"active":""}" onclick="renderAdmin('resellers')">Resellers</button><button class="${active==="tx"?"active":""}" onclick="renderAdmin('tx')">Transactions</button>`:
 `<button class="${active==="dash"?"active":""}" onclick="renderReseller('dash')">Dashboard</button><button class="${active==="offers"?"active":""}" onclick="renderReseller('offers')">Offers</button><button class="${active==="tx"?"active":""}" onclick="renderReseller('tx')">My Transactions</button>`}
 </div>${body}</main></div>`;
}
function logout(){session=null;login()}
function renderAdmin(active="dash"){
 if(active==="dash"){const a=db.offers.filter(x=>x.status==="Active").length;
  shell("Admin Dashboard",`<div class="grid"><div class="card"><div class="muted">Active Offers</div><div class="metric">${a}</div></div><div class="card"><div class="muted">Resellers</div><div class="metric">${db.resellers.length}</div></div><div class="card"><div class="muted">Transactions</div><div class="metric">${db.transactions.length}</div></div><div class="card"><div class="muted">Demo Balance</div><div class="metric">${taka(db.resellers.reduce((s,r)=>s+r.balance,0))}</div></div></div>
  <div class="panel" style="margin-top:18px"><h2>Quick Update</h2><p class="muted">Edit offers below. Active offers appear immediately on the Reseller Dashboard in this browser.</p><button class="btn" onclick="renderAdmin('offers')">Manage Offers</button></div>`,"dash");return}
 if(active==="offers"){
  const rows=db.offers.map(o=>`<tr><td>${o.name}</td><td>${taka(o.deposit)}</td><td>${taka(o.bonus)}</td><td>${taka(o.deposit+o.bonus)}</td><td><b>${o.code}</b></td><td>${o.start}</td><td>${o.end}</td><td class="status ${o.status.toLowerCase()}">${o.status}</td><td><button class="btn secondary" onclick="editOffer(${o.id})">Edit</button></td></tr>`).join("");
  shell("Offer Management",`<div class="panel"><div class="row"><div><h2>Offers</h2><p class="muted">Create or update reseller campaigns.</p></div><button class="btn" onclick="newOffer()">+ New Offer</button></div></div><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Deposit</th><th>Bonus</th><th>Total</th><th>Promo</th><th>Start</th><th>End</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>`,"offers");return}
 if(active==="resellers"){
  const rows=db.resellers.map(r=>`<tr><td>${r.id}</td><td>${r.name}</td><td>${r.mobile}</td><td>${r.area}</td><td>${taka(r.balance)}</td><td>${r.status}</td></tr>`).join("");
  shell("Reseller Management",`<div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Name</th><th>Mobile</th><th>Area</th><th>Balance</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`,"resellers");return}
 if(active==="tx"){
  const rows=db.transactions.map(t=>`<tr><td>${t.date}</td><td>${t.reseller}</td><td>${t.name}</td><td>${t.code}</td><td>${taka(t.deposit)}</td><td>${taka(t.bonus)}</td><td>${t.ref}</td></tr>`).join("");
  shell("All Transactions",`<div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Reseller ID</th><th>Name</th><th>Promo</th><th>Deposit</th><th>Bonus</th><th>Reference</th></tr></thead><tbody>${rows}</tbody></table></div>`,"tx");
 }
}
function offerForm(o){
 const isNew=!o;
 o=o||{id:Date.now(),name:"",deposit:0,bonus:0,code:"",start:new Date().toISOString().slice(0,10),end:"",status:"Active",terms:"Bonus for reseller business use only."};
 return `<div class="panel"><h2>${isNew?"New Offer":"Edit Offer"}</h2><div class="form-grid">
 <div class="field"><label>Offer Name</label><input id="f_name" value="${o.name}"></div>
 <div class="field"><label>Deposit (৳)</label><input id="f_deposit" type="number" value="${o.deposit}"></div>
 <div class="field"><label>Bonus (৳)</label><input id="f_bonus" type="number" value="${o.bonus}"></div>
 <div class="field"><label>Promo Code</label><input id="f_code" value="${o.code}"></div>
 <div class="field"><label>Start Date</label><input id="f_start" type="date" value="${o.start}"></div>
 <div class="field"><label>End Date</label><input id="f_end" type="date" value="${o.end}"></div>
 <div class="field"><label>Status</label><select id="f_status"><option ${o.status==="Active"?"selected":""}>Active</option><option ${o.status==="Inactive"?"selected":""}>Inactive</option><option ${o.status==="Expired"?"selected":""}>Expired</option></select></div>
 <div class="field"><label>Terms</label><input id="f_terms" value="${o.terms}"></div>
 </div><div class="row"><button class="btn secondary" onclick="renderAdmin('offers')">Cancel</button><button class="btn" onclick="saveOffer(${isNew?"null":o.id})">Save Offer</button></div></div>`;
}
function newOffer(){shell("Offer Management",offerForm(null),"offers")}
function editOffer(id){shell("Offer Management",offerForm(db.offers.find(x=>x.id===id)),"offers")}
function saveOffer(id){
 const o={id:id||Date.now(),name:document.getElementById("f_name").value.trim(),deposit:+document.getElementById("f_deposit").value,bonus:+document.getElementById("f_bonus").value,code:document.getElementById("f_code").value.trim().toUpperCase(),start:document.getElementById("f_start").value,end:document.getElementById("f_end").value,status:document.getElementById("f_status").value,terms:document.getElementById("f_terms").value.trim()};
 if(!o.name||!o.deposit||!o.code){alert("Offer Name, Deposit and Promo Code are required.");return}
 const i=db.offers.findIndex(x=>x.id===o.id); if(i>=0) db.offers[i]=o; else db.offers.push(o); save(); renderAdmin("offers");
}
function renderReseller(active="dash"){
 const r=db.resellers.find(x=>x.id===session.user), offers=db.offers.filter(x=>x.status==="Active");
 if(active==="dash"){
  shell("Reseller Dashboard",`<div class="notice">Welcome, <b>${r.name}</b>. Active offers below are controlled by GRSF IT FARM Admin.</div><div class="grid"><div class="card"><div class="muted">Reseller ID</div><div class="metric">${r.id}</div></div><div class="card"><div class="muted">Current Balance</div><div class="metric">${taka(r.balance)}</div></div><div class="card"><div class="muted">Active Offers</div><div class="metric">${offers.length}</div></div><div class="card"><div class="muted">Status</div><div class="metric" style="font-size:20px">${r.status}</div></div></div><h2 style="margin-top:28px">Current Offers</h2><div class="offer-grid">${offers.map(offerCard).join("")}</div>`,"dash");return}
 if(active==="offers"){shell("Active Offers",`<div class="offer-grid">${offers.map(offerCard).join("")}</div>`,"offers");return}
 if(active==="tx"){
  const ts=db.transactions.filter(x=>x.reseller===r.id);
  shell("My Transactions",`<div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Promo</th><th>Deposit</th><th>Bonus</th><th>Reference</th></tr></thead><tbody>${ts.map(t=>`<tr><td>${t.date}</td><td>${t.code}</td><td>${taka(t.deposit)}</td><td>${taka(t.bonus)}</td><td>${t.ref}</td></tr>`).join("")||"<tr><td colspan=5>No transactions yet.</td></tr>"}</tbody></table></div>`,"tx");
 }
}
function offerCard(o){
 return `<div class="offer"><h3>${o.name}</h3><div class="muted">Deposit</div><div class="price">${taka(o.deposit)}</div><div class="bonus">+ ${taka(o.bonus)} Bonus</div><div class="price" style="font-size:21px">${taka(o.deposit+o.bonus)} Total Credit</div><div class="promo">${o.code}</div><div class="muted">Valid: ${o.start} → ${o.end}</div><p>${o.terms}</p></div>`;
}
login();
