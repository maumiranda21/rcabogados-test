const S=window.SITE,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$$(".nombre").forEach(e=>e.textContent=S.nombreComercial);$$(".dir").forEach(e=>e.textContent=S.direccion);$$(".anio").forEach(e=>e.textContent=new Date().getFullYear());
$$(".correo").forEach(e=>e.textContent=S.correo||"Correo por confirmar");
const bg=$(".burger"),ul=$("nav ul");
if(bg){bg.onclick=()=>{const o=ul.classList.toggle("open");bg.setAttribute("aria-expanded",o)};$$("nav a").forEach(a=>a.addEventListener("click",()=>{ul.classList.remove("open");bg.setAttribute("aria-expanded",false)}))}
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});$$(".rv").forEach(e=>io.observe(e))}else $$(".rv").forEach(e=>e.classList.add("in"));
const wa=$(".wa");
if(wa){if(S.whatsapp){wa.href="https://wa.me/"+S.whatsapp+"?text="+encodeURIComponent(S.whatsappMensaje)}else{wa.setAttribute("aria-disabled","true");wa.title="WhatsApp pendiente de configurar";wa.onclick=e=>{e.preventDefault();alert("El número de WhatsApp aún no está configurado (assets/js/config.js).")}}}
const ck=$("#cookies"),KEY="rc_cookies";
const getC=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}};
const setC=v=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}ck.hidden=true};
if(ck){if(!getC())ck.hidden=false;
$("#ck-all").onclick=()=>setC({prefs:true,analiticas:true,publicidad:true});
$("#ck-none").onclick=()=>setC({prefs:false,analiticas:false,publicidad:false});
$("#ck-cfg").onclick=()=>{$("#ck-panel").hidden=!$("#ck-panel").hidden};
$("#ck-save").onclick=()=>setC({prefs:$("#c-p").checked,analiticas:$("#c-a").checked,publicidad:$("#c-u").checked});
$$(".ck-open").forEach(b=>b.onclick=e=>{e.preventDefault();ck.hidden=false;$("#ck-panel").hidden=false})}
const rules={nombre:v=>v.trim().length>=3||"Escribe tu nombre completo.",correo:v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)||"Escribe un correo válido, por ejemplo nombre@correo.com.",tel:v=>/^[+\d\s()-]{7,}$/.test(v)||"Escribe un teléfono de al menos 7 dígitos.",area:v=>!!v||"Elige un tipo de consulta.",detalle:v=>v.trim().length>=15||"Cuéntanos en al menos 15 caracteres qué necesitas.",priv:(v,el)=>el.checked||"Debes aceptar la política de privacidad para continuar.",dni:v=>/^[A-Za-z0-9]{8,12}$/.test(v)||"Escribe un documento de 8 a 12 caracteres.",hechos:v=>v.trim().length>=20||"Describe los hechos en al menos 20 caracteres.",pedido:v=>v.trim().length>=5||"Indica qué solicitas.",tipo:v=>!!v||"Elige reclamo o queja.",serv:v=>v.trim().length>=5||"Describe el servicio."};
function validar(f){let ok=true;$$("[data-r]",f).forEach(el=>{const res=rules[el.dataset.r](el.value,el),er=el.parentElement.querySelector(".err"),bad=res!==true;if(bad)ok=false;el.setAttribute("aria-invalid",bad);if(er)er.textContent=bad?res:""});return ok}
async function enviar(f,ep,out,okTxt){
 if(!validar(f)){out.className="msg bad";out.textContent="Revisa los campos marcados.";$("[aria-invalid=true]",f)?.focus();return null}
 if(!ep){out.className="msg";out.textContent="Envío aún no habilitado: falta configurar el servicio de recepción (ver README). Tu solicitud NO ha sido enviada.";return null}
 const data=Object.fromEntries(new FormData(f)),b=$("button[type=submit]",f);b.disabled=true;out.className="msg";out.textContent="Enviando…";
 try{const r=await fetch(ep,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)});if(!r.ok)throw 0;out.className="msg ok";out.textContent=okTxt;f.reset();return data}
 catch(e){out.className="msg bad";out.textContent="No pudimos enviar el formulario. Inténtalo de nuevo más tarde.";return null}finally{b.disabled=false}}
const fc=$("#form-contacto");
if(fc){fc.onsubmit=e=>{e.preventDefault();enviar(fc,S.formEndpoint,$("#out-c"),"Recibimos tu solicitud. El estudio se pondrá en contacto contigo.")};$$("a[data-area]").forEach(a=>a.addEventListener("click",()=>{fc.area.value=a.dataset.area}))}
const cal=$("#cal");
if(cal){let d=new Date(),sel=null,hora=null;const hs=["09:00","10:30","12:00","15:00","16:30"];
 const slots=()=>{const s=$("#slots");s.innerHTML="";if(!sel)return;hs.forEach(h=>{const b=document.createElement("button");b.type="button";b.textContent=h;b.setAttribute("aria-pressed",hora===h);b.onclick=()=>{hora=h;slots();$("#cal-sel").textContent="Preferencia anotada (no es una cita confirmada): "+sel.toLocaleDateString("es-PE",{weekday:"long",day:"numeric",month:"long"})+", "+h+"."};s.append(b)})};
 const draw=()=>{const y=d.getFullYear(),m=d.getMonth(),first=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate(),hoy=new Date();hoy.setHours(0,0,0,0);
  $("#cal-t").textContent=d.toLocaleDateString("es-PE",{month:"long",year:"numeric"});
  cal.innerHTML=["L","M","M","J","V","S","D"].map(x=>"<b>"+x+"</b>").join("")+"<span></span>".repeat(first);
  for(let i=1;i<=n;i++){const dt=new Date(y,m,i),b=document.createElement("button");b.type="button";b.textContent=i;b.disabled=dt<hoy||dt.getDay()==0;b.setAttribute("aria-pressed",!!sel&&+sel==+dt);b.onclick=()=>{sel=dt;hora=null;draw();slots()};cal.append(b)}};
 $("#prev").onclick=()=>{d.setMonth(d.getMonth()-1);draw()};$("#next").onclick=()=>{d.setMonth(d.getMonth()+1);draw()};
 $("#cal-add").onclick=()=>{if(!sel||!hora){$("#cal-sel").textContent="Elige una fecha y un horario.";return}fc.detalle.value=($("#cal-sel").textContent+"\n"+fc.detalle.value).trim();fc.scrollIntoView({behavior:"smooth"})};draw()}
const fl=$("#form-libro");
if(fl){$("#fecha").textContent=new Date().toLocaleString("es-PE");
 fl.onsubmit=async e=>{e.preventDefault();const code="LR-"+new Date().toISOString().slice(0,10).replace(/-/g,"")+"-"+Math.random().toString(36).slice(2,8).toUpperCase();
  fl.codigo.value=code;fl.fecha_hora.value=new Date().toISOString();
  const r=await enviar(fl,S.reclamosEndpoint,$("#out-l"),"Registro recibido. Código: "+code+". Plazo máximo de respuesta: 15 días hábiles improrrogables.");if(r)$("#imprimir").hidden=false};
 $("#imprimir").onclick=()=>window.print()}
