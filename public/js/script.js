// ── IMAGE INJECTION ──
// To add hero background: set window.HERO_IMAGE = 'data:image/...base64...' or a URL
// The user can paste their image URL/base64 here or via upload
if(window.HERO_IMAGE){
  document.getElementById('heroBg').style.backgroundImage = 'url('+window.HERO_IMAGE+')';
}

// function showPage(name){
//   document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
//   document.getElementById('page-'+name).classList.add('active');
//   window.scrollTo({top:0,behavior:'smooth'});
//   document.querySelectorAll('.demo-nav button').forEach(b=>b.classList.remove('active'));
//   var btn = document.getElementById('btn-'+name);
//   if(btn) btn.classList.add('active');
// }

function toggleMenu(){
  var h = document.getElementById('hamburger');
  var m = document.getElementById('mobileMenu');
  h.classList.toggle('open');
  m.classList.toggle('open');
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

function submitForm(){
  var pseudo=document.getElementById('pseudo').value.trim();
  var email=document.getElementById('email').value.trim();
  var age=document.getElementById('age18').checked;
  var profil=document.getElementById('profil').value;
  if(!pseudo||!email||!age||!profil){alert('Veuillez remplir tous les champs et confirmer votre majorité.');return;}
  document.getElementById('inscriptionForm').style.display='none';
  document.getElementById('successBox').style.display='block';
}

// Close mobile menu on outside click
document.addEventListener('click', function(e){
  var menu = document.getElementById('mobileMenu');
  var hamburger = document.getElementById('hamburger');
  if(menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)){
    closeMenu();
  }
});