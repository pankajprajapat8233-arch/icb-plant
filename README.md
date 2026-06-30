<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="theme-color" content="#0d0f14">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="ICB Plant">
<title>ICB Plant — Issue Tracker</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css">

<!-- Firebase SDKs (loaded via CDN, no npm/install needed) -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

<style>
/* ========================================================
   ICB PLANT — SINGLE FILE VERSION
   Open this file in Chrome. No install. No server.
   ======================================================== */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d0f14;--bg2:#161922;--bg3:#1f2330;
  --b1:rgba(255,255,255,.07);--b2:rgba(255,255,255,.13);
  --tx:#e9ebf1;--tx2:#8a8fa3;--tx3:#565b6e;
  --blue:#3B8EE8;--bluel:#B8D9F7;
  --red:#E5484D;--amber:#F0A732;
  --green:#4C9A2A;--greenm:#5DB335;--purple:#6E62E5;
  --r:14px;--rs:9px;--tbh:56px;--bnh:66px;
}
html,body{height:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  background:var(--bg);color:var(--tx);font-size:15px;line-height:1.5;
  -webkit-tap-highlight-color:transparent}
button,input,select,textarea{font-family:inherit}

/* ── SPLASH ── */
#splash{position:fixed;inset:0;background:var(--bg);display:flex;flex-direction:column;
  align-items:center;justify-content:center;z-index:9999;gap:12px;
  transition:opacity .3s}
.brand-icon-big{width:72px;height:72px;background:linear-gradient(135deg,var(--blue),#1a5fa8);
  border-radius:20px;display:flex;align-items:center;justify-content:center;
  font-size:36px;color:#fff}
#splash h2{font-size:22px;font-weight:700}
#splash p{font-size:13px;color:var(--tx2)}
.spin{width:26px;height:26px;border:3px solid rgba(59,142,232,.2);
  border-top-color:var(--blue);border-radius:50%;animation:sp .7s linear infinite;margin-top:6px}
@keyframes sp{to{transform:rotate(360deg)}}

/* ── LOGIN ── */
#screen-login{display:none;min-height:100vh;align-items:center;justify-content:center;
  padding:24px;background:radial-gradient(circle at 30% 20%,#182030,#0d0f14)}
.login-card{background:var(--bg2);border:.5px solid var(--b2);border-radius:var(--r);
  padding:28px 22px;width:100%;max-width:380px}
.login-logo{text-align:center;margin-bottom:22px}
.brand-icon{width:56px;height:56px;background:linear-gradient(135deg,var(--blue),#2563b8);
  border-radius:15px;display:flex;align-items:center;justify-content:center;
  font-size:28px;color:#fff;margin:0 auto 12px}
.brand-icon.sm{width:36px;height:36px;font-size:17px;border-radius:10px}
.login-logo h1{font-size:21px;font-weight:700}
.login-logo p{font-size:12px;color:var(--tx2);margin-top:2px}
.login-title{font-size:15px;font-weight:600;margin-bottom:16px}

/* ── FORMS ── */
.fg{margin-bottom:14px}
.fl{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;
  color:var(--tx2);margin-bottom:5px;text-transform:uppercase;letter-spacing:.04em}
.fl i{font-size:13px}
.req{color:var(--red)}
.fc{width:100%;padding:11px 12px;background:var(--bg3);border:.5px solid var(--b2);
  border-radius:var(--rs);color:var(--tx);font-size:14px}
.fc:focus{outline:none;border-color:var(--blue)}
.fc::placeholder{color:var(--tx3)}
textarea.fc{resize:vertical;min-height:84px}
.fr2{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.iw{position:relative}
.pwt{position:absolute;right:4px;top:4px;bottom:4px;width:36px;background:none;
  border:none;color:var(--tx2);font-size:17px;cursor:pointer}
.ferr{background:rgba(229,72,77,.12);border:.5px solid rgba(229,72,77,.4);
  color:#f3868a;font-size:12px;padding:9px 11px;border-radius:var(--rs);
  margin-bottom:12px;display:flex;align-items:flex-start;gap:7px;line-height:1.4}
.ferr i{flex-shrink:0;margin-top:1px;font-size:15px}
.fcard{background:var(--bg2);border:.5px solid var(--b1);border-radius:var(--r);padding:16px}
.fcard-title{font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:7px}
.factions{display:flex;gap:9px;margin-top:6px}
.factions .btn{flex:1}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
  padding:11px 17px;border-radius:var(--rs);border:.5px solid var(--b2);
  background:var(--bg3);color:var(--tx);font-size:14px;font-weight:500;
  cursor:pointer;transition:all .12s}
.btn:active{transform:scale(.97)}
.btn:hover:not(:disabled){background:rgba(255,255,255,.07)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-primary{background:var(--blue);color:#fff;border-color:var(--blue)}
.btn-primary:hover:not(:disabled){background:#2f76c4}
.btn-danger{background:var(--red);color:#fff;border-color:var(--red)}
.btn-success{background:var(--green);color:#fff;border-color:var(--green)}
.btn-ghost{background:transparent}
.btn-full{width:100%;padding:13px;font-size:15px}
.btn-sm{padding:8px 12px;font-size:12px}
.btn-xs{padding:5px 9px;font-size:11px}
.hint{font-size:11px;color:var(--tx3);text-align:center;margin-top:12px}
.infopill{background:rgba(59,142,232,.1);border:.5px solid rgba(59,142,232,.3);
  border-radius:var(--rs);padding:9px 12px;font-size:12px;color:var(--bluel);
  display:flex;align-items:center;gap:7px;line-height:1.4}
.infobox{background:rgba(240,167,50,.1);border:.5px solid rgba(240,167,50,.3);
  border-radius:var(--rs);padding:10px 12px;font-size:12px;color:var(--amber);
  display:flex;align-items:flex-start;gap:8px;line-height:1.4;margin-bottom:14px}
.infobox i{flex-shrink:0;margin-top:1px;font-size:16px}

/* ── APP SHELL ── */
#screen-app{display:none;height:100vh;overflow:hidden;position:relative}
.topbar{position:fixed;top:0;left:0;right:0;height:var(--tbh);background:var(--bg2);
  border-bottom:.5px solid var(--b1);display:flex;align-items:center;
  justify-content:space-between;padding:0 8px;z-index:60}
.topbar-title{font-size:16px;font-weight:600}
.icon-btn{width:40px;height:40px;border-radius:var(--rs);border:none;background:transparent;
  color:var(--tx);display:flex;align-items:center;justify-content:center;font-size:21px;cursor:pointer}
.icon-btn:hover{background:var(--bg3)}
.av-btn{background:var(--blue);color:#fff;font-size:11px;font-weight:700;
  width:32px;height:32px;border-radius:50%;margin-right:4px;border:none;cursor:pointer}

/* ── SIDEBAR ── */
.sidebar{position:fixed;top:0;left:-280px;bottom:0;width:280px;background:var(--bg2);
  border-right:.5px solid var(--b1);z-index:200;transition:left .25s;
  display:flex;flex-direction:column}
.sidebar.open{left:0}
.sbo{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:199}
.sbo.show{display:block}
.sb-top{padding:16px;border-bottom:.5px solid var(--b1)}
.sb-brand{display:flex;align-items:center;gap:9px;margin-bottom:14px}
.sb-brand-name{font-size:14px;font-weight:700}
.sb-brand-sub{font-size:11px;color:var(--tx2)}
.sb-user{display:flex;align-items:center;gap:9px}
.sb-nav{flex:1;padding:9px 7px;overflow-y:auto}
.ni{display:flex;align-items:center;gap:11px;padding:10px 11px;border-radius:var(--rs);
  cursor:pointer;font-size:14px;color:var(--tx2);margin-bottom:2px}
.ni:hover{background:var(--bg3);color:var(--tx)}
.ni.active{background:rgba(59,142,232,.16);color:var(--blue);font-weight:600}
.ni i{font-size:19px}
.nb{margin-left:auto;background:var(--red);color:#fff;border-radius:20px;
  font-size:10px;font-weight:700;padding:2px 6px;min-width:18px;text-align:center}
.sb-foot{padding:13px;border-top:.5px solid var(--b1)}
.hod-only{display:none}
.is-hod .hod-only{display:flex}
.is-hod .tab.hod-only{display:flex}

/* ── CONTENT ── */
.content{padding:calc(var(--tbh) + 12px) 12px calc(var(--bnh) + 16px);
  overflow-y:auto;height:100vh}
.page{display:none}.page.active{display:block}

/* ── STATS ── */
.sr{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px}
.sc{background:var(--bg2);border:.5px solid var(--b1);border-radius:var(--r);padding:13px}
.sl{font-size:10px;color:var(--tx2);text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px}
.sv{font-size:27px;font-weight:700}
.sv.blue{color:var(--blue)}.sv.red{color:#f3868a}
.sv.amber{color:var(--amber)}.sv.green{color:var(--greenm)}

/* ── SECTION HEADER ── */
.sh{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;
  color:var(--tx2);text-transform:uppercase;letter-spacing:.06em;margin:4px 0 9px}
.sh i{font-size:14px}

/* ── OVERDUE BANNER ── */
.ob{background:rgba(229,72,77,.1);border:.5px solid rgba(229,72,77,.35);
  border-radius:var(--rs);padding:10px 12px;display:flex;align-items:center;gap:9px;
  color:#f3868a;font-size:13px;margin-bottom:13px}
.ob i{font-size:18px;flex-shrink:0}
.ob span{flex:1}

/* ── TABLE ── */
.tw{background:var(--bg2);border:.5px solid var(--b1);border-radius:var(--r);
  overflow-x:auto;margin-bottom:16px}
.tt{width:100%;border-collapse:collapse;font-size:13px;min-width:640px}
.tt th{text-align:left;padding:10px 11px;font-size:10px;font-weight:700;color:var(--tx2);
  text-transform:uppercase;letter-spacing:.04em;border-bottom:.5px solid var(--b2);white-space:nowrap}
.tt td{padding:10px 11px;border-bottom:.5px solid var(--b1);vertical-align:middle;white-space:nowrap}
.tt tr:last-child td{border-bottom:none}
.tt tbody tr{cursor:pointer}
.tt tbody tr:hover td{background:var(--bg3)}
.tid{color:var(--blue);font-weight:700;font-size:12px}
.tiss{max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;font-size:11px;font-weight:700;
  padding:3px 8px;border-radius:20px;white-space:nowrap}
.bc{background:rgba(229,72,77,.16);color:#f3868a}
.bh{background:rgba(240,167,50,.16);color:var(--amber)}
.bm{background:rgba(59,142,232,.16);color:var(--bluel)}
.bl{background:rgba(76,154,42,.18);color:#82c45d}
.bo{background:rgba(229,72,77,.14);color:#f3868a}
.bp{background:rgba(240,167,50,.14);color:var(--amber)}
.br{background:rgba(76,154,42,.16);color:#82c45d}
.bcl{background:rgba(255,255,255,.08);color:var(--tx2)}
.bov{background:rgba(110,98,229,.2);color:#a89eef}

/* ── AVATAR ── */
.av{width:27px;height:27px;border-radius:50%;display:inline-flex;align-items:center;
  justify-content:center;font-size:10px;font-weight:700;flex-shrink:0}
.avb{background:rgba(59,142,232,.22);color:var(--bluel)}
.avt{background:rgba(26,160,122,.22);color:#6fdcb8}
.ava{background:rgba(240,167,50,.22);color:var(--amber)}
.avco{background:rgba(229,108,72,.22);color:#f2a78b}
.avp{background:rgba(110,98,229,.22);color:#a89eef}
.avpk{background:rgba(220,90,140,.22);color:#f3a0c0}
.avg{background:rgba(76,154,42,.22);color:#82c45d}
.avrow{display:flex;align-items:center;gap:6px}
.avn{font-size:12px;color:var(--tx2)}

/* ── PRIORITY PICKER ── */
.pp{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.po{display:flex;align-items:center;gap:6px;padding:9px 11px;
  border:.5px solid var(--b2);border-radius:var(--rs);font-size:13px;
  cursor:pointer;background:var(--bg3)}
.po.sel{border-color:var(--blue);background:rgba(59,142,232,.12)}
.pd{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.pd.low{background:#82c45d}.pd.med{background:var(--bluel)}
.pd.hi{background:var(--amber)}.pd.crit{background:#f3868a}

/* ── PHOTO UPLOAD ── */
.photodrop{border:1.5px dashed var(--b2);border-radius:var(--rs);
  padding:22px 14px;text-align:center;cursor:pointer;color:var(--tx2)}
.photodrop:hover{border-color:var(--blue)}
.photodrop i{font-size:28px;display:block;margin-bottom:7px}
.photodrop-t{font-size:13px;color:var(--tx);margin-bottom:2px}
.photodrop-s{font-size:11px;color:var(--tx3)}
.photopreview{width:100%;max-height:200px;object-fit:cover;border-radius:var(--rs);margin-bottom:8px}

/* ── FILTER ── */
.frow{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:11px}
.fsel{flex:1;min-width:100px;background:var(--bg2);border:.5px solid var(--b2);
  border-radius:var(--rs);padding:9px 9px;color:var(--tx);font-size:12px;cursor:pointer}

/* ── TEAM CARDS ── */
.tc{background:var(--bg2);border:.5px solid var(--b1);border-radius:var(--r);padding:13px;margin-bottom:9px}
.tctop{display:flex;align-items:center;gap:11px;margin-bottom:9px}
.tcav{width:42px;height:42px;font-size:14px;border-radius:11px}
.tcname{font-size:15px;font-weight:600}
.tcrole{font-size:12px;color:var(--tx2)}
.hodtag{background:rgba(110,98,229,.2);color:#a89eef;font-size:10px;font-weight:700;
  padding:2px 8px;border-radius:20px;margin-left:auto}

/* ── WORKLOAD ── */
.wrow{background:var(--bg2);border:.5px solid var(--b1);border-radius:var(--rs);
  padding:11px 13px;margin-bottom:7px}
.wlabel{display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px}
.wbg{background:var(--bg3);border-radius:20px;height:7px}
.wfill{border-radius:20px;height:7px;transition:width .4s}

/* ── DEPT BAR ── */
.drow{display:flex;align-items:center;gap:11px;background:var(--bg2);
  border:.5px solid var(--b1);border-radius:var(--rs);padding:9px 13px;
  margin-bottom:7px;font-size:13px}
.dname{width:130px;color:var(--tx2);flex-shrink:0}
.dbg{flex:1;background:var(--bg3);border-radius:20px;height:7px}
.dfill{background:var(--blue);border-radius:20px;height:7px}
.dcnt{width:26px;text-align:right;font-weight:700}

/* ── RECUR ── */
.rcitem{display:flex;justify-content:space-between;align-items:center;
  background:var(--bg2);border:.5px solid var(--b1);border-radius:var(--rs);
  padding:10px 13px;margin-bottom:7px;font-size:13px}
.rccnt{background:rgba(240,167,50,.16);color:var(--amber);font-weight:700;
  font-size:11px;padding:2px 8px;border-radius:20px}

/* ── BOTTOM NAV ── */
.bnav{position:fixed;bottom:0;left:0;right:0;height:var(--bnh);background:var(--bg2);
  border-top:.5px solid var(--b1);display:flex;align-items:center;padding:0 2px;
  padding-bottom:env(safe-area-inset-bottom,6px);z-index:60}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:3px;padding:5px 2px;cursor:pointer;color:var(--tx3);font-size:10px;font-weight:600;position:relative}
.tab i{font-size:21px}
.tab.active{color:var(--blue)}
.tabnew{color:var(--tx)}
.newfab{width:46px;height:46px;border-radius:13px;background:var(--blue);
  display:flex;align-items:center;justify-content:center;color:#fff;font-size:23px;margin-bottom:2px}
.tbb{position:absolute;top:2px;right:13px;background:var(--red);color:#fff;
  border-radius:20px;font-size:9px;font-weight:700;padding:1px 5px;min-width:16px;text-align:center}

/* ── MODAL ── */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.62);z-index:500;
  display:flex;align-items:flex-end;justify-content:center}
.ms{background:var(--bg2);border-radius:var(--r) var(--r) 0 0;
  border:.5px solid var(--b2);border-bottom:none;width:100%;max-width:600px;
  max-height:90vh;overflow-y:auto;
  padding:18px 15px calc(18px + env(safe-area-inset-bottom,0px))}
.mh{width:37px;height:4px;background:var(--b2);border-radius:2px;margin:0 auto 14px}
.drow2{display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;border-bottom:.5px solid var(--b1);font-size:13px}
.drow2:last-child{border-bottom:none}
.dlbl{color:var(--tx2)}
.sbtns{display:flex;gap:7px;flex-wrap:wrap;margin:11px 0}
.sbtns .btn{flex:1;min-width:76px;font-size:12px;padding:8px}
.tl{margin-top:5px}
.tli{display:flex;gap:11px;margin-bottom:11px;font-size:13px}
.tld{width:8px;height:8px;border-radius:50%;background:var(--blue);margin-top:5px;flex-shrink:0}
.tld.red{background:var(--red)}.tld.green{background:var(--green)}.tld.amber{background:var(--amber)}
.tlt{color:var(--tx2)}

/* ── ADMIN TABLE ── */
.atable{width:100%;border-collapse:collapse;font-size:13px}
.atable th{background:var(--bg3);padding:9px 11px;text-align:left;font-size:10px;
  font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:.04em;
  border-bottom:.5px solid var(--b2)}
.atable td{padding:9px 11px;border-bottom:.5px solid var(--b1);vertical-align:middle}
.atable tr:last-child td{border-bottom:none}

/* ── TOAST ── */
#toastzone{position:fixed;top:calc(var(--tbh) + 8px);left:9px;right:9px;
  z-index:9999;pointer-events:none}
.toast{background:var(--bg2);border:.5px solid var(--b2);border-radius:var(--rs);
  padding:11px 13px;margin-bottom:8px;display:flex;align-items:flex-start;gap:9px;
  font-size:13px;pointer-events:all;animation:sd .2s ease}
.toast.alert{border-color:var(--red);background:rgba(229,72,77,.12)}
.toast.success{border-color:var(--green)}
.toast i{font-size:17px;flex-shrink:0;margin-top:1px}
.toast.alert i{color:#f3868a}.toast.success i{color:#82c45d}
.toast-t{font-weight:700;font-size:13px}
.toast-m{color:var(--tx2);font-size:12px;margin-top:2px}
@keyframes sd{from{opacity:0;transform:translateY(-7px)}to{opacity:1;transform:translateY(0)}}
.empty{text-align:center;padding:32px 16px;color:var(--tx2)}
.empty i{font-size:34px;display:block;margin-bottom:9px;opacity:.4}

/* ── DESKTOP ── */
@media(min-width:768px){
  .sidebar{left:0;width:240px}
  .sbo{display:none!important}
  .topbar{left:240px}
  .topbar .icon-btn:first-child{display:none}
  .content{margin-left:240px;padding-bottom:24px}
  .bnav{display:none}
  .sr{grid-template-columns:repeat(4,1fr)}
  .mo{align-items:center}
  .ms{border-radius:var(--r);border-bottom:.5px solid var(--b2);max-width:550px}
}
</style>
</head>
<body>

<!-- SPLASH -->
<div id="splash">
  <div class="brand-icon-big"><i class="ti ti-building-factory-2"></i></div>
  <h2>ICB Plant</h2>
  <p>Loading team data...</p>
  <div class="spin"></div>
</div>

<!-- LOGIN -->
<div id="screen-login" style="display:none">
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;
    background:radial-gradient(circle at 30% 20%,#182030,#0d0f14)">
    <div class="login-card">
      <div class="login-logo">
        <div class="brand-icon"><i class="ti ti-building-factory-2"></i></div>
        <h1>ICB Plant</h1>
        <p>Issue Management System</p>
      </div>
      <div class="login-title">Sign In</div>
      <div id="login-err" class="ferr" style="display:none"></div>
      <div class="fg">
        <label class="fl"><i class="ti ti-phone"></i> Mobile Number</label>
        <input type="tel" class="fc" id="lphone" placeholder="10-digit number" maxlength="10" inputmode="numeric">
      </div>
      <div class="fg">
        <label class="fl"><i class="ti ti-lock"></i> Password</label>
        <div class="iw">
          <input type="password" class="fc" id="lpw" placeholder="Your password" onkeydown="if(event.key==='Enter')doLogin()">
          <button class="pwt" type="button" onclick="togglePw()"><i class="ti ti-eye" id="pweye"></i></button>
        </div>
      </div>
      <button class="btn btn-primary btn-full" id="login-btn" onclick="doLogin()">
        <i class="ti ti-login"></i> Sign In
      </button>
      <div style="margin-top:10px;padding-top:10px;border-top:0.5px solid rgba(255,255,255,0.08)">
        <button class="btn btn-full" id="setup-btn" onclick="forceSetup()"
          style="background:rgba(240,167,50,0.12);border-color:rgba(240,167,50,0.4);color:#F0A732;font-size:13px">
          <i class="ti ti-database-import"></i> First Time? Click Here to Setup Team Data
        </button>
      </div>
      <div class="hint">Contact HOD / Admin if you forgot your password.</div>
    </div>
  </div>
</div>

<!-- APP -->
<div id="screen-app" style="display:none">
  <header class="topbar">
    <button class="icon-btn" onclick="toggleSB()"><i class="ti ti-menu-2"></i></button>
    <span class="topbar-title" id="ptitle">Dashboard</span>
    <button class="icon-btn av-btn" id="topav" onclick="toggleSB()"></button>
  </header>

  <div class="sbo" id="sbo" onclick="closeSB()"></div>
  <nav class="sidebar" id="sidebar">
    <div class="sb-top">
      <div class="sb-brand">
        <div class="brand-icon sm"><i class="ti ti-building-factory-2"></i></div>
        <div><div class="sb-brand-name">ICB Plant</div><div class="sb-brand-sub">Issue Tracker</div></div>
      </div>
      <div class="sb-user" id="sbuser"></div>
    </div>
    <div class="sb-nav">
      <div class="ni active" data-p="dashboard" onclick="showP('dashboard',this)"><i class="ti ti-dashboard"></i><span>Dashboard</span></div>
      <div class="ni" data-p="tickets" onclick="showP('tickets',this)"><i class="ti ti-ticket"></i><span>All Tickets</span><span class="nb" id="nb">0</span></div>
      <div class="ni" data-p="new" onclick="showP('new',this)"><i class="ti ti-plus"></i><span>Raise Ticket</span></div>
      <div class="ni" data-p="team" onclick="showP('team',this)"><i class="ti ti-users"></i><span>Team</span></div>
      <div class="ni hod-only" data-p="reports" onclick="showP('reports',this)"><i class="ti ti-report-analytics"></i><span>Reports</span></div>
      <div class="ni hod-only" data-p="hod" onclick="showP('hod',this)"><i class="ti ti-chart-pie"></i><span>HOD View</span></div>
      <div class="ni hod-only" data-p="admin" onclick="showP('admin',this)"><i class="ti ti-settings"></i><span>Admin / Users</span></div>
    </div>
    <div class="sb-foot">
      <button class="btn btn-sm btn-ghost" onclick="reqNotif()"><i class="ti ti-bell"></i> Enable Alerts</button>
      <button class="btn btn-sm btn-ghost" onclick="doLogout()" style="margin-top:6px"><i class="ti ti-logout"></i> Logout</button>
    </div>
  </nav>

  <div class="content">
    <div class="ob" id="ob" style="display:none"><i class="ti ti-alarm"></i><span id="obtext"></span>
      <button class="btn btn-xs btn-danger" onclick="showP('tickets',null);document.getElementById('fs').value='Overdue';renderTickets()">View</button>
    </div>

    <!-- DASHBOARD -->
    <div class="page active" id="page-dashboard">
      <div class="sr" id="sr"></div>
      <div class="sh"><i class="ti ti-table"></i> Live Ticket Board</div>
      <div class="tw"><table class="tt">
        <thead><tr><th>Ticket ID</th><th>Issue</th><th>Dept</th><th>Assigned To</th><th>Priority</th><th>Status</th><th>Raised</th><th>Due</th></tr></thead>
        <tbody id="dash-tb"></tbody>
      </table></div>
    </div>

    <!-- ALL TICKETS -->
    <div class="page" id="page-tickets">
      <div class="frow">
        <select class="fsel" id="fs" onchange="renderTickets()"><option value="">All Status</option><option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option><option>Overdue</option></select>
        <select class="fsel" id="fp" onchange="renderTickets()"><option value="">All Priority</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
        <select class="fsel" id="fd" onchange="renderTickets()"><option value="">All Dept</option></select>
        <select class="fsel" id="fa" onchange="renderTickets()"><option value="">All Assignee</option></select>
      </div>
      <div class="tw"><table class="tt">
        <thead><tr><th>Ticket ID</th><th>Issue</th><th>Dept</th><th>Assigned To</th><th>Priority</th><th>Status</th><th>Raised</th><th>Due</th><th></th></tr></thead>
        <tbody id="all-tb"></tbody>
      </table></div>
    </div>

    <!-- RAISE TICKET -->
    <div class="page" id="page-new">
      <div class="fcard">
        <div class="fcard-title"><i class="ti ti-plus-circle"></i> Raise New Ticket</div>
        <div class="fg">
          <label class="fl">Problem Title <span class="req">*</span></label>
          <input type="text" class="fc" id="ft" placeholder="e.g. Machine stopped — Line 2">
        </div>
        <div class="fg">
          <label class="fl">Description <span class="req">*</span></label>
          <textarea class="fc" id="fdesc" rows="4" placeholder="What happened, where, when..."></textarea>
        </div>
        <div class="fr2">
          <div class="fg">
            <label class="fl">Department <span class="req">*</span></label>
            <select class="fc" id="fdept" onchange="onDeptChange()"><option value="">— Select —</option></select>
          </div>
          <div class="fg">
            <label class="fl">Priority <span class="req">*</span></label>
            <div class="pp" id="pp">
              <div class="po" data-v="Low" onclick="pickP(this)"><span class="pd low"></span>Low</div>
              <div class="po" data-v="Medium" onclick="pickP(this)"><span class="pd med"></span>Medium</div>
              <div class="po sel" data-v="High" onclick="pickP(this)"><span class="pd hi"></span>High</div>
              <div class="po" data-v="Critical" onclick="pickP(this)"><span class="pd crit"></span>Critical</div>
            </div>
          </div>
        </div>
        <div id="aan" class="fg" style="display:none">
          <div class="infopill"><i class="ti ti-user-check"></i> Auto-assigned to: <strong id="aaname"></strong></div>
        </div>
        <div class="fg">
          <label class="fl">Photo (optional)</label>
          <div class="photodrop" id="photodrop" onclick="document.getElementById('fphoto').click()">
            <i class="ti ti-camera-plus"></i>
            <div class="photodrop-t">Tap to take photo or choose file</div>
            <div class="photodrop-s">JPG, PNG — max 5 MB</div>
            <input type="file" id="fphoto" accept="image/*" capture="environment" onchange="prevPhoto(event)" style="display:none">
          </div>
          <div id="ppw" style="display:none">
            <img id="ppi" class="photopreview" alt="preview">
            <button class="btn btn-xs btn-danger" onclick="clearPhoto()"><i class="ti ti-x"></i> Remove</button>
          </div>
        </div>
        <div id="ferr" class="ferr" style="display:none"></div>
        <div class="factions">
          <button class="btn btn-ghost" onclick="resetTF()"><i class="ti ti-refresh"></i> Reset</button>
          <button class="btn btn-primary" onclick="submitTicket()"><i class="ti ti-send"></i> Submit Ticket</button>
        </div>
      </div>
    </div>

    <!-- TEAM -->
    <div class="page" id="page-team"><div id="team-grid"></div></div>

    <!-- REPORTS -->
    <div class="page" id="page-reports">
      <div class="sr" id="rsr"></div>
      <div class="sh"><i class="ti ti-calendar"></i> Daily Summary</div>
      <div class="tw"><table class="tt"><thead><tr><th>Date</th><th>Raised</th><th>Resolved</th><th>Avg Time</th></tr></thead><tbody id="daily-tb"></tbody></table></div>
      <div class="sh" style="margin-top:16px"><i class="ti ti-building"></i> By Department</div>
      <div id="dept-breakdown"></div>
      <div class="sh" style="margin-top:16px"><i class="ti ti-repeat"></i> Recurring Problems</div>
      <div id="recur-list"></div>
    </div>

    <!-- HOD -->
    <div class="page" id="page-hod">
      <div class="sr" id="hsr"></div>
      <div class="sh"><i class="ti ti-users"></i> Team Workload</div>
      <div id="wl"></div>
      <div class="sh" style="margin-top:18px"><i class="ti ti-list"></i> All Tickets</div>
      <div class="tw"><table class="tt"><thead><tr><th>Ticket ID</th><th>Issue</th><th>Dept</th><th>Assigned To</th><th>Priority</th><th>Status</th><th>Due</th></tr></thead><tbody id="hod-tb"></tbody></table></div>
    </div>

    <!-- ADMIN -->
    <div class="page" id="page-admin">
      <div class="infobox"><i class="ti ti-info-circle"></i>
        <span>Team members you add here are saved directly to Firebase. They can log in immediately using their mobile number and the password you set. No restart needed.</span>
      </div>
      <div class="fcard" style="max-width:540px;margin-bottom:18px">
        <div class="fcard-title"><i class="ti ti-user-plus"></i> Add New Team Member</div>
        <div class="fr2">
          <div class="fg"><label class="fl">Full Name <span class="req">*</span></label><input type="text" class="fc" id="aname" placeholder="e.g. Ravi Patel"></div>
          <div class="fg"><label class="fl">Mobile <span class="req">*</span></label><input type="tel" class="fc" id="aphone" placeholder="10-digit" maxlength="10" inputmode="numeric"></div>
        </div>
        <div class="fr2">
          <div class="fg"><label class="fl">Password <span class="req">*</span></label><input type="text" class="fc" id="apw" placeholder="e.g. ravi@1234"></div>
          <div class="fg"><label class="fl">Role <span class="req">*</span></label>
            <select class="fc" id="arole">
              <option value="">— Select Role —</option>
              <option>Store</option><option>Production</option><option>Operation Manager</option>
              <option>PPC</option><option>Quality</option><option>Purchase</option>
              <option>Maintenance</option><option>Admin (HOD)</option>
            </select>
          </div>
        </div>
        <div class="fg" style="margin-bottom:14px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--tx)">
            <input type="checkbox" id="adef" style="width:16px;height:16px;accent-color:#3B8EE8">
            Set as default assignee for this department (auto-assign tickets)
          </label>
        </div>
        <div id="aerr" class="ferr" style="display:none"></div>
        <button class="btn btn-primary" id="addbtn" onclick="addUser()"><i class="ti ti-user-plus"></i> Add Member</button>
      </div>
      <div class="sh"><i class="ti ti-users"></i> Current Team</div>
      <div class="tw"><table class="atable" id="admin-tbl">
        <thead><tr><th>Name</th><th>Mobile</th><th>Password</th><th>Role</th><th>Default</th><th>Actions</th></tr></thead>
        <tbody id="admin-tb"></tbody>
      </table></div>
    </div>
  </div><!-- end content -->

  <nav class="bnav">
    <div class="tab active" data-p="dashboard" onclick="showP('dashboard',this)"><i class="ti ti-dashboard"></i><span>Home</span></div>
    <div class="tab" data-p="tickets" onclick="showP('tickets',this)"><i class="ti ti-ticket"></i><span>Tickets</span><span class="tbb" id="tbb">0</span></div>
    <div class="tab tabnew" onclick="showP('new',null)"><div class="newfab"><i class="ti ti-plus"></i></div></div>
    <div class="tab" data-p="team" onclick="showP('team',this)"><i class="ti ti-users"></i><span>Team</span></div>
    <div class="tab hod-only" data-p="hod" onclick="showP('hod',this)"><i class="ti ti-chart-pie"></i><span>HOD</span></div>
  </nav>
</div><!-- end screen-app -->

<!-- MODAL -->
<div class="mo" id="mo" onclick="if(event.target===this)closeMo()" style="display:none">
  <div class="ms" id="ms"></div>
</div>
<div id="toastzone"></div>

<script>
// ============================================================
//  ICB PLANT — SINGLE HTML FILE
//  Firebase Realtime Database — team stored in Firebase
//  Login reads DIRECTLY from Firebase — always up to date
// ============================================================

// ── FIREBASE CONFIG ──────────────────────────────────────────
firebase.initializeApp({
  apiKey:            "AIzaSyBPPDVy4LaP93DyVXPC-cE4mqebDalFauk",
  authDomain:        "icb-plant.firebaseapp.com",
  databaseURL:       "https://icb-plant-default-rtdb.firebaseio.com",
  projectId:         "icb-plant",
  storageBucket:     "icb-plant.firebasestorage.app",
  messagingSenderId: "187289140811",
  appId:             "1:187289140811:web:0b5ab138432f7c2b2697ce"
});
const DB = firebase.database();

// ── CONSTANTS ────────────────────────────────────────────────
const DEPTS   = ["Store","Production","Operation Manager","PPC","Quality","Purchase","Maintenance"];
const COLORS  = ["avb","avt","ava","avco","avp","avpk","avg"];
const ESC_MIN = {reminder:30, hod:60, escalated:90};
const DEFAULT_TEAM = [
  {id:"u1",phone:"9000000001",pw:"admin123",name:"Sandeep R.", role:"Admin (HOD)",       dept:"",                  isHOD:true, color:"avp", isDef:false},
  {id:"u2",phone:"9000000002",pw:"pass123", name:"Pankaj S.",  role:"Store",              dept:"Store",             isHOD:false,color:"avb", isDef:true},
  {id:"u3",phone:"9000000003",pw:"pass123", name:"Amit M.",    role:"Production",         dept:"Production",        isHOD:false,color:"avt", isDef:true},
  {id:"u4",phone:"9000000004",pw:"pass123", name:"Kiran S.",   role:"Operation Manager",  dept:"Operation Manager", isHOD:false,color:"ava", isDef:true},
  {id:"u5",phone:"9000000005",pw:"pass123", name:"Priya P.",   role:"PPC",                dept:"PPC",               isHOD:false,color:"avco",isDef:true},
  {id:"u6",phone:"9000000006",pw:"pass123", name:"Nisha T.",   role:"Quality",            dept:"Quality",           isHOD:false,color:"avpk",isDef:true},
  {id:"u7",phone:"9000000007",pw:"pass123", name:"Manish P.",  role:"Purchase",           dept:"Purchase",          isHOD:false,color:"avg", isDef:true},
  {id:"u8",phone:"9000000008",pw:"pass123", name:"Suresh K.",  role:"Maintenance",        dept:"Maintenance",       isHOD:false,color:"ava", isDef:true},
];

// ── STATE ────────────────────────────────────────────────────
let TEAM       = [];   // always loaded fresh from Firebase
let tickets    = {};
let ME         = null; // currently logged-in user
let selPri     = "High";
let pendPhoto  = null;

// ── HELPERS ──────────────────────────────────────────────────
const ini   = n => n.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
const esc   = s => { const d=document.createElement("div"); d.textContent=s; return d.innerHTML; };
const ft    = ts => new Date(ts).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
const fdt   = ts => new Date(ts).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});
// Format a duration in milliseconds as "2h 15m" or "45m" or "3d 4h"
function durStr(ms) {
  if (ms < 0) ms = 0;
  const totalMin = Math.round(ms / 60000);
  const days  = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins  = totalMin % 60;
  if (days > 0)  return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
const getU  = id => TEAM.find(u=>u.id===id) || {id, name:"Unknown", color:"avb"};
const tList = () => Object.values(tickets).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
const efSt  = t  => (t.status!=="Resolved"&&t.status!=="Closed"&&Date.now()>t.dueAt)?"Overdue":t.status;

function pBadge(p){const m={Critical:"bc",High:"bh",Medium:"bm",Low:"bl"};return `<span class="badge ${m[p]||"bl"}">${p}</span>`;}
function sBadge(s){const m={Open:"bo","In Progress":"bp",Resolved:"br",Closed:"bcl",Overdue:"bov"};return `<span class="badge ${m[s]||"bo"}">${s}</span>`;}
function avHtml(id){const u=getU(id);return `<div class="avrow"><div class="av ${u.color}">${ini(u.name)}</div><span class="avn">${u.name}</span></div>`;}

// ── STARTUP ──────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", async () => {
  await loadTeam();
  const saved = localStorage.getItem("icb_me");
  if (saved) {
    const sv   = JSON.parse(saved);
    const fresh = TEAM.find(u => u.id === sv.id && u.phone === sv.phone);
    if (fresh) { ME = fresh; bootApp(); return; }
    localStorage.removeItem("icb_me");
  }
  showLogin();
});

async function loadTeam() {
  try {
    const snap = await DB.ref("team").once("value");
    if (snap.exists()) {
      TEAM = [];
      snap.forEach(child => TEAM.push({ id: child.key, ...child.val() }));
      // If only 1 member exists (partial seed) — re-seed all missing members
      if (TEAM.length < DEFAULT_TEAM.length) {
        for (const m of DEFAULT_TEAM) {
          const exists = TEAM.find(u => u.id === m.id);
          if (!exists) {
            await DB.ref("team/" + m.id).set(m);
            TEAM.push({...m});
          }
        }
      }
    } else {
      await seedTeam();
    }
  } catch(e) {
    console.warn("Firebase error, using default team:", e);
    TEAM = DEFAULT_TEAM.map(u => ({...u}));
  }
}

async function seedTeam() {
  TEAM = [];
  // Write all members in one atomic operation
  const teamData = {};
  for (const m of DEFAULT_TEAM) {
    teamData[m.id] = m;
    TEAM.push({...m});
  }
  await DB.ref("team").set(teamData);
}

// ── SHOW / HIDE SCREENS ──────────────────────────────────────
function showLogin() {
  document.getElementById("splash").style.display        = "none";
  document.getElementById("screen-login").style.display  = "flex";
  document.getElementById("screen-app").style.display    = "none";
}
function bootApp() {
  document.getElementById("splash").style.display       = "none";
  document.getElementById("screen-login").style.display = "none";
  document.getElementById("screen-app").style.display   = "block";

  if (ME.isHOD) document.body.classList.add("is-hod");
  else           document.body.classList.remove("is-hod");

  document.getElementById("sbuser").innerHTML = `
    <div class="av ${ME.color}" style="width:34px;height:34px;font-size:12px">${ini(ME.name)}</div>
    <div><div style="font-size:13px;font-weight:700">${ME.name}</div>
    <div style="font-size:11px;color:var(--tx2)">${ME.role}</div></div>`;
  document.getElementById("topav").textContent = ini(ME.name);

  populateDepts();
  populateFilters();
  listenTeam();
  listenTickets();
  setInterval(checkEsc, 30000);
}

// ── FORCE SETUP (run if team not loading) ───────────────────
async function forceSetup() {
  const btn = document.getElementById("setup-btn");
  btn.innerHTML = '<span class="spin" style="width:16px;height:16px;border-width:2px;margin-top:0"></span> Setting up team data...';
  btn.disabled = true;
  try {
    // Wipe and re-seed entire team
    const teamData = {};
    DEFAULT_TEAM.forEach(m => { teamData[m.id] = m; });
    await DB.ref("team").set(teamData);
    TEAM = DEFAULT_TEAM.map(u => ({...u}));
    btn.innerHTML = '<i class="ti ti-check"></i> Done! Team data saved. Now login below.';
    btn.style.background = 'rgba(76,154,42,0.15)';
    btn.style.borderColor = 'rgba(76,154,42,0.4)';
    btn.style.color = '#5DB335';
    // Show success message
    const err = document.getElementById("login-err");
    err.style.background = 'rgba(76,154,42,0.12)';
    err.style.borderColor = 'rgba(76,154,42,0.4)';
    err.style.color = '#5DB335';
    err.innerHTML = '<i class="ti ti-check"></i> Team data saved successfully! You can now login with mobile: 9000000001 and password: admin123';
    err.style.display = 'flex';
  } catch(e) {
    btn.innerHTML = '<i class="ti ti-alert-circle"></i> Setup failed — Check Firebase rules';
    btn.disabled = false;
    console.error("Setup error:", e);
  }
}

// ── LOGIN ────────────────────────────────────────────────────
function togglePw() {
  const i=document.getElementById("lpw"), e=document.getElementById("pweye");
  i.type = i.type==="password"?"text":"password";
  e.className = i.type==="password"?"ti ti-eye":"ti ti-eye-off";
}

async function doLogin() {
  const phone = document.getElementById("lphone").value.trim();
  const pw    = document.getElementById("lpw").value.trim();
  const err   = document.getElementById("login-err");
  const btn   = document.getElementById("login-btn");
  err.style.display = "none";

  if (!phone || phone.length !== 10) {
    err.innerHTML = '<i class="ti ti-alert-circle"></i> Enter your 10-digit mobile number.';
    err.style.display = "flex"; return;
  }
  if (!pw) {
    err.innerHTML = '<i class="ti ti-alert-circle"></i> Enter your password.';
    err.style.display = "flex"; return;
  }

  btn.innerHTML = '<span class="spin" style="width:18px;height:18px;border-width:2px;margin-top:0"></span> Checking...';
  btn.disabled  = true;

  try {
    // Fetch ALL team data fresh from Firebase
    const snap = await DB.ref("team").once("value");

    if (!snap.exists()) {
      // No team data at all - tell user to click setup button
      err.innerHTML = '<i class="ti ti-alert-circle"></i> No team data found. Please click the Setup button below first.';
      err.style.display = "flex";
      btn.innerHTML = '<i class="ti ti-login"></i> Sign In';
      btn.disabled  = false;
      return;
    }

    // Load all team members from Firebase into TEAM array
    TEAM = [];
    snap.forEach(child => {
      const member = child.val();
      // Handle both field names: pw and password
      if (!member.pw && member.password) member.pw = member.password;
      TEAM.push(member);
    });

    // Try to find user - check phone AND password
    const user = TEAM.find(u => {
      const phoneMatch = String(u.phone).trim() === String(phone).trim();
      const pwMatch    = String(u.pw || u.password || "").trim() === String(pw).trim();
      return phoneMatch && pwMatch;
    });

    btn.innerHTML = '<i class="ti ti-login"></i> Sign In';
    btn.disabled  = false;

    if (!user) {
      // Show what phones ARE registered to help debug
      const phones = TEAM.map(u => u.phone).join(", ");
      err.innerHTML = `<i class="ti ti-alert-circle"></i> Wrong mobile or password.<br>
        <small style="opacity:0.8">Registered mobiles: ${phones}</small>`;
      err.style.display = "flex";
      return;
    }

    ME = user;
    localStorage.setItem("icb_me", JSON.stringify({id: user.id, phone: user.phone}));
    bootApp();

  } catch(e) {
    console.error("Login error:", e);
    err.innerHTML = '<i class="ti ti-alert-circle"></i> Connection error: ' + e.message;
    err.style.display = "flex";
    btn.innerHTML = '<i class="ti ti-login"></i> Sign In';
    btn.disabled  = false;
  }
}

function doLogout() {
  localStorage.removeItem("icb_me");
  ME = null;
  document.body.classList.remove("is-hod");
  TEAM = []; tickets = {};
  showLogin();
}

// ── FIREBASE LISTENERS ────────────────────────────────────────
function listenTeam() {
  DB.ref("team").on("value", snap => {
    TEAM = [];
    snap.forEach(child => {
      const val = child.val() || {};
      TEAM.push({ ...val, id: child.key }); // Firebase key always wins as the id
    });
    populateDepts();
    populateFilters();
    renderAll();
  }, err => {
    console.error("listenTeam error:", err);
    toast("Sync error", "Could not load team — check Firebase rules", "alert");
  });
}
function listenTickets() {
  DB.ref("tickets").on("value", snap => {
    tickets = {};
    snap.forEach(child => { tickets[child.key] = { _key: child.key, ...child.val() }; });
    renderAll();
    checkEsc();
  });
}

// ── DEPT / FILTER SELECTS ─────────────────────────────────────
function populateDepts() {
  const sel = document.getElementById("fdept"); if (!sel) return;
  const v = sel.value;
  sel.innerHTML = '<option value="">— Select —</option>';
  DEPTS.forEach(d => { const o=document.createElement("option"); o.value=d; o.textContent=d; sel.appendChild(o); });
  sel.value = v;
  const fd = document.getElementById("fd"); if (!fd) return;
  const fv = fd.value;
  fd.innerHTML = '<option value="">All Dept</option>';
  DEPTS.forEach(d => { const o=document.createElement("option"); o.value=d; o.textContent=d; fd.appendChild(o); });
  fd.value = fv;
}
function populateFilters() {
  const sel = document.getElementById("fa"); if (!sel) return;
  const v = sel.value;
  sel.innerHTML = '<option value="">All Assignee</option>';
  TEAM.filter(u=>!u.isHOD).forEach(u => { const o=document.createElement("option"); o.value=u.id; o.textContent=u.name; sel.appendChild(o); });
  sel.value = v;
}
function onDeptChange() {
  const d=document.getElementById("fdept").value;
  const n=document.getElementById("aan");
  if (!d) { n.style.display="none"; return; }
  const def=TEAM.find(u=>u.dept===d&&u.isDef);
  if (def) { n.style.display="block"; document.getElementById("aaname").textContent=`${def.name} (${def.role})`; }
  else n.style.display="none";
}

// ── PRIORITY PICKER ──────────────────────────────────────────
function pickP(el) {
  document.querySelectorAll("#pp .po").forEach(o=>o.classList.remove("sel"));
  el.classList.add("sel");
  selPri = el.dataset.v;
}

// ── PHOTO ────────────────────────────────────────────────────
function prevPhoto(e) {
  const f=e.target.files[0]; if (!f) return;
  if (f.size > 5*1024*1024) { toast("Too large","Max 5 MB","alert"); return; }
  const r=new FileReader();
  r.onload=ev=>{
    pendPhoto=ev.target.result;
    document.getElementById("ppi").src=pendPhoto;
    document.getElementById("ppw").style.display="block";
    document.getElementById("photodrop").style.display="none";
  };
  r.readAsDataURL(f);
}
function clearPhoto() {
  pendPhoto=null;
  document.getElementById("fphoto").value="";
  document.getElementById("ppw").style.display="none";
  document.getElementById("photodrop").style.display="block";
}

// ── TICKET ID ─────────────────────────────────────────────────
function nextId() {
  const d=new Date();
  const mon=d.toLocaleString("en-US",{month:"short"}).toUpperCase();
  const cnt=Object.values(tickets).filter(t=>{
    const td=new Date(t.createdAt);
    return td.getFullYear()===d.getFullYear()&&td.getMonth()===d.getMonth();
  }).length;
  return `ISS-${mon}-${String(cnt+1).padStart(3,"0")}`;
}

// ── SUBMIT TICKET ─────────────────────────────────────────────
function submitTicket() {
  const title=document.getElementById("ft").value.trim();
  const desc =document.getElementById("fdesc").value.trim();
  const dept =document.getElementById("fdept").value;
  const err  =document.getElementById("ferr");
  if (!title||!desc||!dept) {
    err.innerHTML='<i class="ti ti-alert-circle"></i> Fill Title, Description and Department.';
    err.style.display="flex"; return;
  }
  err.style.display="none";
  const asgn=TEAM.find(u=>u.dept===dept&&u.isDef)||TEAM.find(u=>u.dept===dept);
  const now =Date.now();
  const dueMin=selPri==="Critical"?60:selPri==="High"?120:selPri==="Medium"?240:480;
  DB.ref("tickets").push({
    ticketId:nextId(), title, desc, dept, priority:selPri,
    assignedTo:asgn?.id||"", raisedBy:ME.id,
    status:"Open", createdAt:now, dueAt:now+dueMin*60000,
    photo:pendPhoto||null, updates:[], escLevel:0
  });
  toast("Ticket Submitted",`→ ${asgn?.name||"Unassigned"}`,"success");
  beep();
  resetTF();
  showP("dashboard",document.querySelector('[data-p="dashboard"]'));
}
function resetTF() {
  ["ft","fdesc"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("fdept").value="";
  document.getElementById("aan").style.display="none";
  document.querySelectorAll("#pp .po").forEach(o=>o.classList.remove("sel"));
  document.querySelector('#pp [data-v="High"]').classList.add("sel");
  selPri="High"; clearPhoto();
  document.getElementById("ferr").style.display="none";
}

// ── STATUS UPDATE ─────────────────────────────────────────────
function updateStatus(key,status) {
  const t = tickets[key]; if (!t) return;
  const now = Date.now();
  const fields = { status };

  // Record timestamp for whichever status is being set, only the first time it's reached
  if (status === "In Progress" && !t.inProgressAt) fields.inProgressAt = now;
  if (status === "Resolved"    && !t.resolvedAt)   fields.resolvedAt   = now;
  if (status === "Closed"      && !t.closedAt)     fields.closedAt     = now;

  DB.ref("tickets/"+key).update(fields);

  // Update local copy immediately so detail view reflects it without waiting for listener
  Object.assign(t, fields);

  toast("Status updated",status,status==="Resolved"||status==="Closed"?"success":"");
  closeMo();
}
function addTUpdate(key) {
  const msg=document.getElementById("utxt").value.trim(); if (!msg) return;
  const t=tickets[key]; if (!t) return;
  const upd=[...(t.updates||[]),{time:ft(Date.now()),by:ME.id,msg}];
  DB.ref("tickets/"+key).update({updates:upd});
  closeMo(); openDetail(key);
}

// ── ESCALATION ────────────────────────────────────────────────
function checkEsc() {
  const now=Date.now(); let over=0;
  Object.values(tickets).forEach(t=>{
    if (t.status==="Resolved"||t.status==="Closed") return;
    const min=(now-t.createdAt)/60000, lvl=t.escLevel||0;
    if (now>t.dueAt) over++;
    if (min>=ESC_MIN.escalated&&lvl<3) {
      DB.ref("tickets/"+t._key).update({escLevel:3,status:"Overdue"});
      toast(`ESCALATED: ${t.ticketId}`,t.title,"alert"); beep(true);
    } else if (min>=ESC_MIN.hod&&lvl<2) {
      DB.ref("tickets/"+t._key).update({escLevel:2});
      toast(`HOD Alert: ${t.ticketId}`,"Unresolved 1 hour","alert"); beep();
    } else if (min>=ESC_MIN.reminder&&lvl<1) {
      DB.ref("tickets/"+t._key).update({escLevel:1});
      toast(`Reminder: ${t.ticketId}`,"30 min passed — update status");
    }
  });
  const ob=document.getElementById("ob");
  if (over>0){ob.style.display="flex";document.getElementById("obtext").textContent=`${over} ticket${over>1?"s are":" is"} past due`;}
  else ob.style.display="none";
}

// ── BEEP ──────────────────────────────────────────────────────
function beep(u=false) {
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    (u?[0,250,500,750,1000]:[0,350,700]).forEach(d=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.frequency.setValueAtTime(u?1040:880,ctx.currentTime+d/1000);
      g.gain.setValueAtTime(0.4,ctx.currentTime+d/1000);
      g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+d/1000+0.28);
      o.start(ctx.currentTime+d/1000);o.stop(ctx.currentTime+d/1000+0.3);
    });
  }catch(e){}
}

function reqNotif() {
  if (!("Notification" in window)){toast("Not supported","Try Chrome","alert");return;}
  Notification.requestPermission().then(p=>{
    if (p==="granted") toast("Alerts enabled!","You will get notifications","success");
    else toast("Denied","Enable in browser settings","alert");
  });
}

// ── RENDER ────────────────────────────────────────────────────
function tRow(t,extra=false) {
  const es=efSt(t),ov=es==="Overdue";
  return `<tr onclick="openDetail('${t._key}')">
    <td class="tid">${t.ticketId}</td>
    <td class="tiss" title="${esc(t.title)}">${esc(t.title)}</td>
    <td style="font-size:12px;color:var(--tx2)">${t.dept}</td>
    <td>${avHtml(t.assignedTo)}</td>
    <td>${pBadge(t.priority)}</td>
    <td>${sBadge(es)}</td>
    <td style="font-size:12px;color:var(--tx2)">${ft(t.createdAt)}</td>
    <td style="font-size:12px;${ov?"color:#f3868a;font-weight:700":"color:var(--tx2)"}">${ft(t.dueAt)}</td>
    ${extra?`<td><button class="btn btn-xs" onclick="event.stopPropagation();openDetail('${t._key}')">View</button></td>`:""}
  </tr>`;
}

function renderAll() {
  const list=tList();
  const open=list.filter(t=>t.status==="Open").length;
  const prog=list.filter(t=>t.status==="In Progress").length;
  const res =list.filter(t=>t.status==="Resolved"||t.status==="Closed").length;
  const over=list.filter(t=>efSt(t)==="Overdue").length;
  const sh = `
    <div class="sc"><div class="sl">Open</div><div class="sv red">${open}</div></div>
    <div class="sc"><div class="sl">In Progress</div><div class="sv amber">${prog}</div></div>
    <div class="sc"><div class="sl">Resolved</div><div class="sv green">${res}</div></div>
    <div class="sc"><div class="sl">Overdue</div><div class="sv blue">${over}</div></div>`;
  ["sr","hsr","rsr"].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=sh;});
  const active=open+prog;
  document.getElementById("nb").textContent=active;
  document.getElementById("tbb").textContent=active;

  const dt=document.getElementById("dash-tb");
  if(dt) dt.innerHTML=list.slice(0,15).map(t=>tRow(t)).join("")||
    `<tr><td colspan="8"><div class="empty"><i class="ti ti-ticket"></i>No tickets yet</div></td></tr>`;

  renderTickets();
  renderTeam();
  renderHOD();
  renderAdmin();
}

function renderTickets() {
  const sf=document.getElementById("fs")?.value||"";
  const pf=document.getElementById("fp")?.value||"";
  const df=document.getElementById("fd")?.value||"";
  const af=document.getElementById("fa")?.value||"";
  const list=tList().filter(t=>(!sf||efSt(t)===sf)&&(!pf||t.priority===pf)&&(!df||t.dept===df)&&(!af||t.assignedTo===af));
  const tb=document.getElementById("all-tb");
  if(tb) tb.innerHTML=list.map(t=>tRow(t,true)).join("")||
    `<tr><td colspan="9"><div class="empty"><i class="ti ti-filter-off"></i>No tickets match</div></td></tr>`;
}

function renderTeam() {
  const list=tList();
  const el=document.getElementById("team-grid"); if(!el) return;
  el.innerHTML=TEAM.map(m=>{
    const mine=list.filter(t=>t.assignedTo===m.id);
    const act=mine.filter(t=>t.status!=="Resolved"&&t.status!=="Closed").length;
    return `<div class="tc"><div class="tctop">
      <div class="av ${m.color} tcav">${ini(m.name)}</div>
      <div style="flex:1"><div class="tcname">${m.name}</div><div class="tcrole">${m.role}${m.dept?" · "+m.dept:""}</div></div>
      ${m.isHOD?'<span class="hodtag">HOD</span>':m.isDef?'<span class="hodtag" style="background:rgba(76,154,42,.2);color:#82c45d">Default</span>':""}
    </div>
    <div style="display:flex;gap:13px;font-size:12px;color:var(--tx2)">
      <span><i class="ti ti-ticket" style="font-size:12px;vertical-align:-2px"></i> ${mine.length} total</span>
      <span style="color:${act>0?"var(--red)":"var(--greenm)"}"><i class="ti ti-loader" style="font-size:12px;vertical-align:-2px"></i> ${act} active</span>
    </div></div>`;
  }).join("");
}

function renderHOD() {
  const list=tList();
  const hb=document.getElementById("hod-tb");
  if(hb) hb.innerHTML=list.map(t=>tRow(t)).join("")||`<tr><td colspan="7"><div class="empty"><i class="ti ti-ticket"></i>No tickets</div></td></tr>`;
  const wl=document.getElementById("wl"); if(!wl) return;
  wl.innerHTML=TEAM.filter(u=>!u.isHOD).map(m=>{
    const cnt=list.filter(t=>t.assignedTo===m.id&&t.status!=="Resolved"&&t.status!=="Closed").length;
    const pct=Math.min(100,cnt*25);
    const col=pct>=75?"var(--red)":pct>=50?"var(--amber)":"var(--green)";
    return `<div class="wrow"><div class="wlabel"><span>${m.name}</span><span>${cnt} active</span></div>
      <div class="wbg"><div class="wfill" style="width:${pct}%;background:${col}"></div></div></div>`;
  }).join("");
}

function renderReports() {
  const list=tList();
  const today=new Date();today.setHours(0,0,0,0);
  const tl=list.filter(t=>t.createdAt>=today.getTime());

  // Use REAL closedAt/resolvedAt timestamps — fall back to whichever is set
  const res=list.filter(t=>t.resolvedAt||t.closedAt);
  let avgMin=0;
  if(res.length){
    const tot=res.reduce((s,t)=>{
      const endTime = t.closedAt || t.resolvedAt;
      return s + Math.max(0,(endTime - t.createdAt)/60000);
    },0);
    avgMin=Math.round(tot/res.length);
  }

  // Daily summary — compute per-day average close time from real timestamps
  const bd={};
  list.forEach(t=>{
    const d=new Date(t.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short"});
    bd[d]=bd[d]||{r:0,res:0,totalCloseMin:0,closedCount:0};
    bd[d].r++;
    if(t.status==="Resolved"||t.status==="Closed"){
      bd[d].res++;
      const endTime = t.closedAt || t.resolvedAt;
      if (endTime) {
        bd[d].totalCloseMin += Math.max(0,(endTime - t.createdAt)/60000);
        bd[d].closedCount++;
      }
    }
  });
  const dt=document.getElementById("daily-tb");
  if(dt) dt.innerHTML=Object.entries(bd).slice(0,7).map(([d,v])=>{
    const dayAvg = v.closedCount ? Math.round(v.totalCloseMin/v.closedCount) : 0;
    return `<tr><td>${d}</td><td>${v.r}</td><td>${v.res}</td><td>${dayAvg?durStr(dayAvg*60000):"—"}</td></tr>`;
  }).join("")||`<tr><td colspan="4"><div class="empty"><i class="ti ti-calendar"></i>No data</div></td></tr>`;

  const dptObj={};list.forEach(t=>{dptObj[t.dept]=(dptObj[t.dept]||0)+1;});
  const maxD=Math.max(1,...Object.values(dptObj));
  const dbd=document.getElementById("dept-breakdown");
  if(dbd) dbd.innerHTML=Object.entries(dptObj).sort((a,b)=>b[1]-a[1]).map(([d,c])=>`<div class="drow"><div class="dname">${d}</div><div class="dbg"><div class="dfill" style="width:${(c/maxD)*100}%"></div></div><div class="dcnt">${c}</div></div>`).join("")||`<div class="empty"><i class="ti ti-building"></i>No data</div>`;
  const byT={};list.forEach(t=>{const k=t.title.toLowerCase().split(" ").slice(0,3).join(" ");byT[k]=(byT[k]||0)+1;});
  const rl=document.getElementById("recur-list");
  if(rl){const rc=Object.entries(byT).filter(([,c])=>c>1).sort((a,b)=>b[1]-a[1]).slice(0,5);
    rl.innerHTML=rc.map(([k,c])=>`<div class="rcitem"><span>${esc(k)}...</span><span class="rccnt">${c}×</span></div>`).join("")||`<div class="empty"><i class="ti ti-check"></i>No recurring problems</div>`;}

  // Update the avg-close stat card with real duration format
  const avgCard = document.querySelector("#rsr .sv.amber");
  if (avgCard) avgCard.textContent = avgMin ? durStr(avgMin*60000) : "—";
}

function renderAdmin() {
  const tb=document.getElementById("admin-tb"); if (!tb) return;
  if (!TEAM.length) {tb.innerHTML=`<tr><td colspan="6"><div class="empty"><i class="ti ti-users"></i>No members</div></td></tr>`;return;}
  tb.innerHTML=TEAM.map(m=>`<tr>
    <td><div class="avrow"><div class="av ${m.color}">${ini(m.name)}</div><strong>${m.name}</strong>${m.isHOD?'<span class="hodtag" style="margin-left:6px">HOD</span>':""}</div></td>
    <td style="color:var(--blue);font-weight:600;font-size:12px">${m.phone}</td>
    <td style="font-family:monospace;font-size:12px;color:var(--tx2)">${m.pw}</td>
    <td style="font-size:12px;color:var(--tx2)">${m.role}</td>
    <td>${m.isDef?'<span class="badge br">Yes</span>':'<span class="badge bcl">No</span>'}</td>
    <td style="display:flex;gap:5px">
      <button class="btn btn-xs btn-primary" onclick="editUser('${m.id}')"><i class="ti ti-pencil"></i></button>
      ${m.id!==ME?.id?`<button class="btn btn-xs btn-danger" onclick="delUser('${m.id}')"><i class="ti ti-trash"></i></button>`:""}
    </td>
  </tr>`).join("");
}

// ── TICKET DETAIL ─────────────────────────────────────────────
function openDetail(key) {
  const t=tickets[key];if(!t)return;
  const es=efSt(t),ov=es==="Overdue";

  // Build the time tracking rows — only show steps that have actually happened
  let timeRows = `<div class="drow2"><span class="dlbl"><i class="ti ti-flag" style="font-size:13px;vertical-align:-2px;color:var(--bluel)"></i> Raised</span><span style="font-size:12px">${fdt(t.createdAt)}</span></div>`;

  if (t.inProgressAt) {
    const dur = durStr(t.inProgressAt - t.createdAt);
    timeRows += `<div class="drow2"><span class="dlbl"><i class="ti ti-player-play" style="font-size:13px;vertical-align:-2px;color:var(--amber)"></i> In Progress</span><span style="font-size:12px">${fdt(t.inProgressAt)} <span style="color:var(--tx3)">(${dur} after raised)</span></span></div>`;
  }
  if (t.resolvedAt) {
    const fromStart = durStr(t.resolvedAt - t.createdAt);
    timeRows += `<div class="drow2"><span class="dlbl"><i class="ti ti-check" style="font-size:13px;vertical-align:-2px;color:#82c45d"></i> Resolved</span><span style="font-size:12px">${fdt(t.resolvedAt)} <span style="color:var(--tx3)">(${fromStart} total)</span></span></div>`;
  }
  if (t.closedAt) {
    const fromStart = durStr(t.closedAt - t.createdAt);
    timeRows += `<div class="drow2"><span class="dlbl"><i class="ti ti-circle-check" style="font-size:13px;vertical-align:-2px;color:var(--tx2)"></i> Closed</span><span style="font-size:12px">${fdt(t.closedAt)} <span style="color:var(--tx3)">(${fromStart} total)</span></span></div>`;
  }

  setMo(`<div class="mh"></div>
    <div style="font-size:11px;color:var(--blue);font-weight:700;margin-bottom:5px">${t.ticketId}</div>
    <div style="font-size:17px;font-weight:700;margin-bottom:9px;line-height:1.3">${esc(t.title)}</div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:13px">${pBadge(t.priority)} ${sBadge(es)}</div>
    ${t.photo?`<img src="${t.photo}" class="photopreview" alt="photo">`:""}
    <div style="font-size:13px;color:var(--tx2);margin-bottom:13px;line-height:1.5">${esc(t.desc)}</div>
    <div>
      <div class="drow2"><span class="dlbl">Department</span><span>${t.dept}</span></div>
      <div class="drow2"><span class="dlbl">Raised By</span>${avHtml(t.raisedBy)}</div>
      <div class="drow2"><span class="dlbl">Assigned To</span>${avHtml(t.assignedTo)}</div>
      <div class="drow2"><span class="dlbl">Due By</span><span style="font-size:12px;${ov?"color:#f3868a;font-weight:700":""}">${fdt(t.dueAt)}${ov?" ⚠":""}</span></div>
    </div>
    <div style="margin-top:14px;background:rgba(59,142,232,.06);border:.5px solid rgba(59,142,232,.2);border-radius:var(--rs);padding:11px 13px">
      <div style="font-size:10px;font-weight:700;color:var(--bluel);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px"><i class="ti ti-clock-hour-4" style="font-size:13px;vertical-align:-2px"></i> Time Tracking</div>
      ${timeRows}
    </div>
    <div style="margin-top:13px">
      <div style="font-size:10px;font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Update Status</div>
      <div class="sbtns">
        <button class="btn ${t.status==="Open"?"btn-primary":""}" onclick="updateStatus('${key}','Open')">Open</button>
        <button class="btn ${t.status==="In Progress"?"btn-primary":""}" onclick="updateStatus('${key}','In Progress')">In Progress</button>
        <button class="btn ${t.status==="Resolved"?"btn-success":""}" onclick="updateStatus('${key}','Resolved')"><i class="ti ti-check"></i> Resolved</button>
        <button class="btn ${t.status==="Closed"?"btn-success":""}" onclick="updateStatus('${key}','Closed')">Closed</button>
      </div>
    </div>
    <button class="btn btn-danger btn-sm" onclick="manAlert('${key}')"><i class="ti ti-bell-ringing"></i> Alert Assignee</button>
    <div style="margin-top:14px">
      <div style="font-size:10px;font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Add Update</div>
      <textarea class="fc" id="utxt" rows="2" placeholder="What action was taken?"></textarea>
      <button class="btn btn-primary btn-sm" style="margin-top:8px" onclick="addTUpdate('${key}')"><i class="ti ti-send"></i> Post Update</button>
    </div>
    <div style="margin-top:14px">
      <div style="font-size:10px;font-weight:700;color:var(--tx2);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Activity</div>
      <div class="tl">
        <div class="tli"><div class="tld"></div><div><div style="font-size:11px;font-weight:600">${fdt(t.createdAt)}</div><div class="tlt">Raised by ${getU(t.raisedBy).name}</div></div></div>
        ${(t.updates||[]).map(u=>`<div class="tli"><div class="tld amber"></div><div><div style="font-size:11px;font-weight:600">${u.time} — ${getU(u.by).name}</div><div class="tlt">${esc(u.msg)}</div></div></div>`).join("")}
        ${t.status==="Resolved"||t.status==="Closed"?`<div class="tli"><div class="tld green"></div><div class="tlt" style="font-weight:600">Ticket ${t.status.toLowerCase()} ✓</div></div>`:""}
      </div>
    </div>
    <div style="margin-top:14px"><button class="btn" style="width:100%" onclick="closeMo()">Close</button></div>`);
}
function manAlert(key) {
  const t=tickets[key];if(!t)return;
  toast(`Alert: ${t.ticketId}`,getU(t.assignedTo).name,"alert"); beep();
}

// ── ADMIN — ADD ───────────────────────────────────────────────
async function addUser() {
  const name =document.getElementById("aname").value.trim();
  const phone=document.getElementById("aphone").value.trim();
  const pw   =document.getElementById("apw").value.trim();
  const role =document.getElementById("arole").value;
  const isDef=document.getElementById("adef").checked;
  const err  =document.getElementById("aerr");
  const btn  =document.getElementById("addbtn");
  err.style.display="none";

  if (!name)            {err.innerHTML='<i class="ti ti-alert-circle"></i> Name required.';         err.style.display="flex";return;}
  if (phone.length!==10){err.innerHTML='<i class="ti ti-alert-circle"></i> 10-digit mobile required.'; err.style.display="flex";return;}
  if (pw.length<4)      {err.innerHTML='<i class="ti ti-alert-circle"></i> Password min 4 characters.'; err.style.display="flex";return;}
  if (!role)            {err.innerHTML='<i class="ti ti-alert-circle"></i> Select a role.';          err.style.display="flex";return;}
  if (TEAM.some(u=>u.phone===phone)){err.innerHTML='<i class="ti ti-alert-circle"></i> Mobile already registered.'; err.style.display="flex";return;}

  btn.innerHTML='<span class="spin" style="width:16px;height:16px;border-width:2px;margin-top:0"></span> Adding...';
  btn.disabled=true;

  const uid ="u"+Date.now();
  const dept=role==="Admin (HOD)"?"":role;

  // If new user is default, clear default from others in same dept
  if (isDef && dept) {
    const updates={};
    TEAM.filter(u=>u.dept===dept&&u.isDef).forEach(u=>{updates["team/"+u.id+"/isDef"]=false;});
    if (Object.keys(updates).length) await DB.ref().update(updates);
  }

  // Save new member directly to Firebase — they can log in immediately
  const newMember = {
    id:uid, phone, pw, name, role, dept,
    isHOD:role==="Admin (HOD)", isDef, color:COLORS[TEAM.length%COLORS.length]
  };
  await DB.ref("team/"+uid).set(newMember);

  // ALSO update local TEAM array immediately — don't wait for listener round-trip
  TEAM.push(newMember);
  renderAdmin();
  renderTeam();
  populateFilters();

  ["aname","aphone","apw"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("arole").value="";
  document.getElementById("adef").checked=false;
  btn.innerHTML='<i class="ti ti-user-plus"></i> Add Member';
  btn.disabled=false;
  toast("Member Added!",`${name} (${phone}) can log in now`,"success");
}

// ── ADMIN — EDIT ──────────────────────────────────────────────
function editUser(uid) {
  const u=TEAM.find(t=>t.id===uid);if(!u)return;
  setMo(`<div class="mh"></div>
    <div style="font-size:15px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:9px">
      <div class="av ${u.color}" style="width:36px;height:36px;font-size:13px">${ini(u.name)}</div>
      Edit — ${u.name}
    </div>
    <div class="fg"><label class="fl">Full Name</label><input type="text" class="fc" id="en" value="${u.name}"></div>
    <div class="fr2">
      <div class="fg"><label class="fl">Mobile</label><input type="tel" class="fc" id="ep" value="${u.phone}" maxlength="10" inputmode="numeric"></div>
      <div class="fg"><label class="fl">Role</label>
        <select class="fc" id="er">${["Store","Production","Operation Manager","PPC","Quality","Purchase","Maintenance","Admin (HOD)"].map(r=>`<option ${u.role===r?"selected":""}>${r}</option>`).join("")}</select>
      </div>
    </div>
    <div class="fg">
      <label class="fl">New Password <span style="font-weight:400;text-transform:none;font-size:11px;color:var(--tx3)">(current: ${u.pw})</span></label>
      <input type="text" class="fc" id="epw" placeholder="Leave blank to keep current">
    </div>
    <div class="fg" style="margin-bottom:13px">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--tx)">
        <input type="checkbox" id="edef" ${u.isDef?"checked":""} style="width:16px;height:16px;accent-color:#3B8EE8">
        Set as default assignee for this department
      </label>
    </div>
    <div id="eerr" class="ferr" style="display:none"></div>
    <div style="display:flex;gap:9px">
      <button class="btn" onclick="closeMo()">Cancel</button>
      <button class="btn btn-primary" style="flex:1" id="savebtn" onclick="saveUser('${uid}')"><i class="ti ti-check"></i> Save Changes</button>
    </div>`);
}

async function saveUser(uid) {
  const u    =TEAM.find(t=>t.id===uid);if(!u)return;
  const name =document.getElementById("en").value.trim();
  const phone=document.getElementById("ep").value.trim();
  const role =document.getElementById("er").value;
  const newpw=document.getElementById("epw").value.trim();
  const isDef=document.getElementById("edef").checked;
  const err  =document.getElementById("eerr");
  const btn  =document.getElementById("savebtn");
  err.style.display="none";

  if (!name)            {err.innerHTML='<i class="ti ti-alert-circle"></i> Name required.'; err.style.display="flex";return;}
  if (phone.length!==10){err.innerHTML='<i class="ti ti-alert-circle"></i> Valid 10-digit mobile required.'; err.style.display="flex";return;}
  if (newpw&&newpw.length<4){err.innerHTML='<i class="ti ti-alert-circle"></i> Password min 4 characters.'; err.style.display="flex";return;}
  if (TEAM.some(t=>t.phone===phone&&t.id!==uid)){err.innerHTML='<i class="ti ti-alert-circle"></i> Mobile used by another member.'; err.style.display="flex";return;}

  btn.innerHTML='<span class="spin" style="width:16px;height:16px;border-width:2px;margin-top:0"></span> Saving...';
  btn.disabled=true;

  const dept=role==="Admin (HOD)"?"":role;
  if (isDef&&dept){
    const upd={};
    TEAM.filter(t=>t.id!==uid&&t.dept===dept&&t.isDef).forEach(t=>{upd["team/"+t.id+"/isDef"]=false;});
    if (Object.keys(upd).length) await DB.ref().update(upd);
  }

  const updatedFields = {
    name, phone, role, dept,
    isHOD:role==="Admin (HOD)", isDef,
    ...(newpw?{pw:newpw}:{})
  };
  await DB.ref("team/"+uid).update(updatedFields);

  // Update local TEAM array immediately — don't wait for listener round-trip
  Object.assign(u, updatedFields);
  renderAdmin();
  renderTeam();
  populateFilters();

  // Update local ME if editing ourselves
  if (ME?.id===uid) {
    if (newpw) ME.pw=newpw;
    ME.name=name; ME.phone=phone; ME.role=role;
    localStorage.setItem("icb_me",JSON.stringify({id:ME.id,phone:ME.phone}));
    document.getElementById("topav").textContent=ini(name);
  }

  closeMo();
  toast("Saved!",`${name} updated${newpw?" · new password: "+newpw:""}`,"success");
}

function delUser(uid) {
  const u=TEAM.find(t=>t.id===uid);if(!u)return;
  if (!confirm(`Delete ${u.name}?\nThey will no longer be able to log in.`)) return;
  DB.ref("team/"+uid).remove();

  // Update local TEAM array immediately
  TEAM = TEAM.filter(t => t.id !== uid);
  renderAdmin();
  renderTeam();
  populateFilters();

  toast("Deleted",`${u.name} removed`,"");
}

// ── MODAL ─────────────────────────────────────────────────────
function setMo(html){document.getElementById("ms").innerHTML=html;document.getElementById("mo").style.display="flex";}
function closeMo(){document.getElementById("mo").style.display="none";}

// ── NAVIGATION ────────────────────────────────────────────────
function showP(name, el) {
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".ni,.tab").forEach(n=>n.classList.remove("active"));
  document.getElementById("page-"+name).classList.add("active");
  document.querySelectorAll(`[data-p="${name}"]`).forEach(n=>n.classList.add("active"));
  const titles={dashboard:"Dashboard",tickets:"All Tickets",new:"Raise Ticket",team:"Team",reports:"Reports",hod:"HOD View",admin:"Admin / Users"};
  document.getElementById("ptitle").textContent=titles[name]||name;
  closeSB();
  if (name==="reports") renderReports();
  else renderAll();
}
function toggleSB(){document.getElementById("sidebar").classList.toggle("open");document.getElementById("sbo").classList.toggle("show");}
function closeSB(){document.getElementById("sidebar").classList.remove("open");document.getElementById("sbo").classList.remove("show");}

// ── TOAST ─────────────────────────────────────────────────────
function toast(title,msg,type=""){
  const icon=type==="alert"?"ti-bell-ringing":type==="success"?"ti-check":"ti-info-circle";
  const d=document.createElement("div");
  d.className=`toast ${type}`;
  d.innerHTML=`<i class="ti ${icon}"></i><div><div class="toast-t">${title}</div>${msg?`<div class="toast-m">${msg}</div>`:""}</div>`;
  document.getElementById("toastzone").appendChild(d);
  setTimeout(()=>d.remove(),5500);
}
</script>
</body>
</html>
