const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const msg=form.querySelector('[data-form-message]');if(msg)msg.textContent='Thank you. This demonstration form is ready to be connected to your preferred CRM or email platform before launch.';form.reset();}));