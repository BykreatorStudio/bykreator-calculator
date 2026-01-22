(function(){
var data=[{id:'branding',n:'Branding',p:3500,d:'$3,500',desc:'Build a memorable brand identity. Includes logo suite, strategic positioning, visual guidelines, and core brand elements. Timeline: 3-4 weeks.',a:[{id:'refresh',n:'Refresh Mode',p:-1000,det:'For existing brands; focuses on updates only; 1-2 weeks.'},{id:'bs',n:'Brand Strategy',p:2000,det:'Deep market research, positioning framework; +2-3 weeks.'},{id:'sw',n:'Storytelling Workshop',p:2000,det:'Facilitated session + narrative deck; +1-2 weeks.'},{id:'eg',n:'Extended Guidelines',p:1200,det:'Comprehensive brand book with usage rules; +1 week.'},{id:'ill',n:'Illustrations',p:800,det:'Custom illustration vectors; enhances visuals.'},{id:'icons',n:'Icons (up to 10)',p:400,det:'Custom icon set; enhances visuals.'}]},{id:'print',n:'Print Design',p:1500,d:'$1,500',desc:'Professional print collateral for comprehensive needs (minimum 5 items). Timeline: 2-3 weeks.',a:[{id:'pack',n:'Packaging Per Product Line',p:1200,det:'Custom boxes/labels; dielines included.'},{id:'lf',n:'Large-Format (Set of 3)',p:1000,det:'Banners, posters; event-optimized.'},{id:'pb',n:'Additional Batch (5 items)',p:800,det:'Scale up; volume pricing.'},{id:'prod',n:'Production Coordination',p:600,det:'Vendor liaison/proofs; excludes fees.'}]},{id:'digital',n:'Digital Design',p:1500,d:'$1,500',desc:'Campaign-ready digital assets (up to 10 static designs). Perfect for ads, social, email. Timeline: 1-2 weeks.',a:[{id:'lp',n:'Landing Page (per page)',p:1200,det:'Single conversion-focused page; +1-2 weeks.'},{id:'nt',n:'Newsletter Templates (5)',p:1200,det:'Custom email templates; automation-ready.'},{id:'av',n:'Ad Size Variations (6)',p:1000,det:'Multiple dimensions for same design.'},{id:'anim',n:'Animated HTML5 Ads (10)',p:1800,det:'Dynamic animated banners; +1-2 weeks.'}]},{id:'web',n:'Web Design/Dev',p:4000,d:'$4,000',desc:'Professional business website (up to 5 pages). Responsive design, WordPress/Webflow, basic SEO. Timeline: 4-6 weeks.',a:[{id:'dyn',n:'Dynamic Features',p:2500,det:'Forms, databases, user logins; +2-3 weeks.'},{id:'ec',n:'E-commerce Setup',p:5000,det:'Full shop functionality; +3-4 weeks.'},{id:'saas',n:'SaaS/App Build',p:12000,det:'Custom web app; starting point; +8-12 weeks.'},{id:'ep',n:'Additional Pages (per 5)',p:2000,det:'Expand beyond base 5 pages; +1-2 weeks.'},{id:'mnt',n:'Monthly Maintenance',p:250,det:'Updates, security, support; min 3 months.',m:1}]},{id:'social',n:'SMM',p:1200,d:'$1,200/mo',m:1,desc:'15-20 posts/month on 2 platforms. Content calendar, scheduling, basic engagement. Minimum 6 months.',a:[{id:'ep2',n:'Additional Platform',p:600,det:'10-15 posts/month per platform.',m:1},{id:'psa',n:'Paid Social Ads',p:800,det:'Campaign management; up to $5K spend.',m:1},{id:'ana',n:'Advanced Analytics',p:400,det:'Custom dashboards, ROI tracking.',m:1}]},{id:'ppc',n:'PPC/Display Ads',p:2000,d:'$2,000/mo',m:1,desc:'Campaign setup, 1-2 platforms, up to 10 ad creatives. Minimum 3-6 months. Ad spend excluded.',a:[{id:'dex',n:'Visual/Display Expansion',p:1000,det:'Display network campaigns with creatives.',m:1},{id:'mp',n:'Multi-Platform Expansion',p:1200,det:'Add 2-3 platforms with unified tracking.',m:1},{id:'ret',n:'Retargeting Campaign',p:800,det:'Custom audiences, dynamic ads.',m:1},{id:'asm',n:'Ad Spend Management',p:800,det:'For budgets up to $10K/month.',m:1},{id:'cr',n:'Creative Refresh (10/mo)',p:600,det:'Monthly new ad variations for A/B testing.',m:1}]},{id:'seo',n:'SEO',p:2000,d:'$2,000/mo',m:1,desc:'Audit, keyword strategy, on-page optimization, link building. Minimum 6-12 months.',a:[{id:'sc',n:'Content Creation (4-6/mo)',p:1200,det:'Keyword-optimized articles, 1K-2K words.',m:1},{id:'lb',n:'Link Building Campaign',p:1200,det:'5-10 quality backlinks/month.',m:1},{id:'ts',n:'Advanced Technical SEO',p:600,det:'Site speed, Core Web Vitals, schema.',m:1},{id:'ls',n:'Local SEO',p:600,det:'Google Business, citations, local rankings.',m:1}]},{id:'email',n:'Email Marketing',p:1500,d:'$1,500/mo',m:1,desc:'Sequence setup (4-8 emails), templates, automation, A/B testing. Minimum 3-6 months.',a:[{id:'ee',n:'Sequence Expansion (5-10)',p:1200,det:'Extended drip campaigns; one-time setup.'},{id:'crm',n:'CRM/Platform Integration',p:800,det:'Advanced workflows, segmentation.',m:1},{id:'lbs',n:'List Building Strategy',p:600,det:'Lead magnets, opt-ins, growth tactics.',m:1},{id:'ea',n:'Advanced Analytics',p:400,det:'Heatmaps, conversion tracking, reports.',m:1}]},{id:'portal',n:'Client Portal',p:1500,pm:150,d:'$1,500 + $150/mo',desc:'Real-time project tracking, consolidated analytics, file repository, communication hub. Setup: $1,500 one-time + $150/month access.'},{id:'wl',n:'White Label Add-On',p:0,d:'+20%',pct:20,desc:'Resell our work as your own. Includes NDAs, secure delivery, full confidentiality. Perfect for agencies and consultants.'}];
window.st={s:new Map(),a:new Map()};
window.data=data;
var tiers=[{min:0,max:8000,disc:0,nxt:8000,nd:5},{min:8000,max:13000,disc:5,nxt:13000,nd:10},{min:13000,max:19000,disc:10,nxt:19000,nd:15},{min:19000,max:Infinity,disc:15,nxt:null,nd:null}];
window.calculatorData={oneTime:0,oneTimeOriginal:0,monthly:0,discountAmount:0,discountPercent:0,hasDiscount:false};

function initMobile(){
var html=window.data.map(function(s){
return '<div class="svc-card"><div class="svc-header"><div class="svc-check" id="mc'+s.id+'" onclick="toggleServiceMobile(\''+s.id+'\')"></div><div class="svc-name" onclick="toggleServiceMobile(\''+s.id+'\')">'+s.n+'</div><div style="flex:1;min-height:20px" onclick="toggleExpandMobile(\''+s.id+'\')"></div><div class="svc-price-wrap" onclick="toggleExpandMobile(\''+s.id+'\')"><div class="from">from</div><div class="svc-price">'+s.d+'</div></div>'+(s.a||s.desc?'<svg class="arrow" id="marr'+s.id+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:0" onclick="toggleExpandMobile(\''+s.id+'\')"><path d="M6 9l6 6 6-6"/></svg>':'')+'</div>'+(s.a||s.desc?'<div class="svc-expand" id="mexp'+s.id+'"><div class="svc-expand-inner">'+(s.desc?'<div class="svc-desc">'+s.desc+'</div>':'')+(s.a?'<div class="addon-section"><div class="addon-header">Add-ons</div>'+s.a.map(function(a){return '<div class="addon-item disabled" id="mai'+a.id+'" onclick="toggleAddonMobile(\''+a.id+'\',\''+s.id+'\')"><div class="addon-top"><div class="addon-left"><div class="addon-check" id="mac'+a.id+'"></div><div class="addon-name">'+a.n+'</div></div><div class="addon-price '+(a.p<0?'neg':'')+'">'+(a.p<0?'-':'+')+' $'+Math.abs(a.p).toLocaleString()+(a.m?'/mo':'')+'</div></div><div class="addon-det">'+a.det+'</div></div>';}).join('')+'<div class="disclaimer">*Final pricing determined after discovery call based on project scope and requirements.</div></div>':'')+'</div></div>':'')+'</div>';
}).join('');
document.getElementById('mobileServices').innerHTML=html;
updateUIMobile();
calcMobile();
}

function initDesktop(){
var html=window.data.map(function(s){
return '<div class="svc-card light-black-bg" id="dcard'+s.id+'"><div class="svc-top" onclick="expandDesktop(\''+s.id+'\')"><div class="svc-check" id="dc'+s.id+'" onclick="event.stopPropagation();toggleServiceDesktop(\''+s.id+'\')"></div><div class="svc-info"><div class="svc-header"><div class="svc-name" onclick="event.stopPropagation();toggleServiceDesktop(\''+s.id+'\')" style="cursor:pointer">'+s.n+'</div><div class="svc-price-box"><div class="from">from</div><div class="svc-price">'+s.d+'</div></div></div>'+(s.a?'<div class="addons" id="dad'+s.id+'"><div class="addons-inner" onclick="event.stopPropagation()">'+(s.desc?'<div class="svc-desc">'+s.desc+'</div>':'')+'<div class="addon-header"><div>ADD-ON</div><div>PRICE</div><div>DETAILS</div></div>'+s.a.map(function(a){return '<div class="addon-row disabled" id="dar'+a.id+'" onclick="event.stopPropagation();toggleAddonDesktop(\''+a.id+'\',\''+s.id+'\')"><div class="addon-left"><div class="addon-check" id="dac'+a.id+'"></div><div class="addon-name">'+a.n+'</div></div><div class="addon-price '+(a.p<0?'neg':'')+'">'+(a.p<0?'-':'+')+' $'+Math.abs(a.p).toLocaleString()+(a.m?'/mo':'')+'</div><div class="addon-det">'+a.det+'</div></div>';}).join('')+'<div class="disclaimer">*Final pricing determined after discovery call based on project scope and requirements.</div></div></div>':s.desc?'<div class="addons" id="dad'+s.id+'"><div class="addons-inner" onclick="event.stopPropagation()"><div class="svc-desc">'+s.desc+'</div></div></div>':'')+'</div><svg class="arrow" id="darr'+s.id+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></div></div>';
}).join('');
document.getElementById('desktopServices').innerHTML=html;
calcDesktop();
}

window.toggleServiceMobile=function(id){
var svc=window.data.find(function(s){return s.id===id});
if(window.st.s.has(id)){
window.st.s.delete(id);
if(id==='portal')window.st.s.delete('portal_m');
if(svc.a)svc.a.forEach(function(a){window.st.a.delete(a.id)});
}else{
window.st.s.set(id,svc);
if(id==='portal')window.st.s.set('portal_m',{p:svc.pm,m:1});
}
updateUIMobile();
calcMobile();
};

window.toggleAddonMobile=function(aid,sid){
if(!window.st.s.has(sid))return;
var svc=window.data.find(function(s){return s.id===sid});
var addon=svc.a.find(function(a){return a.id===aid});
if(window.st.a.has(aid))window.st.a.delete(aid);
else window.st.a.set(aid,addon);
updateUIMobile();
calcMobile();
};

window.toggleExpandMobile=function(id){
var exp=document.getElementById('mexp'+id);
var arr=document.getElementById('marr'+id);
if(exp){
exp.classList.toggle('open');
if(arr)arr.classList.toggle('open');
}
};

function updateUIMobile(){
window.data.forEach(function(s){
var cb=document.getElementById('mc'+s.id);
if(cb){
if(window.st.s.has(s.id))cb.classList.add('on');
else cb.classList.remove('on');
}
if(s.a){
s.a.forEach(function(a){
var row=document.getElementById('mai'+a.id);
var acb=document.getElementById('mac'+a.id);
if(row&&acb){
if(window.st.s.has(s.id))row.classList.remove('disabled');
else row.classList.add('disabled');
if(window.st.a.has(a.id))acb.classList.add('on');
else acb.classList.remove('on');
}
});
}
});
}

function calcMobile(){
var onetime=0,monthly=0,pct=0;
window.st.s.forEach(function(v,k){
if(k==='wl')pct=v.pct;
else if(k==='portal_m')monthly+=v.p;
else if(v.m)monthly+=v.p;
else onetime+=v.p;
});
window.st.a.forEach(function(v){v.m?monthly+=v.p:onetime+=v.p});
if(pct>0){onetime*=(1+pct/100);monthly*=(1+pct/100)}
var tier=tiers.find(function(t){return onetime>=t.min&&onetime<t.max})||tiers[3];
var discAmt=onetime*(tier.disc/100);
var otFinal=onetime-discAmt;
var total=otFinal+monthly;
var prog=0;
if(onetime===0)prog=0;
else if(onetime<8000)prog=(onetime/8000)*33.33;
else if(onetime>=8000&&onetime<13000)prog=33.33+((onetime-8000)/5000)*33.33;
else if(onetime>=13000&&onetime<19000)prog=66.66+((onetime-13000)/6000)*33.34;
else prog=100;
window.calculatorData={
oneTime:Math.round(otFinal),
oneTimeOriginal:Math.round(onetime),
monthly:Math.round(monthly),
discountAmount:Math.round(discAmt),
discountPercent:tier.disc,
hasDiscount:tier.disc>0
};
updateCartMobile(otFinal,monthly,discAmt,tier,prog,total);
}

function updateCartMobile(otf,mo,disc,tier,prog,tot){
var cnt=window.st.s.size+window.st.a.size;
var hasService = window.st.s.size > 0 && (window.st.s.size > 1 || !window.st.s.has('wl'));
var ctaBtn=document.getElementById('mobileCtaBtn');
document.getElementById('mobileSummaryInfo').textContent=cnt+' item'+(cnt===1?'':'s');
if(!hasService){
ctaBtn.disabled=true;
ctaBtn.style.opacity='0.5';
ctaBtn.style.cursor='not-allowed';
ctaBtn.title='Please select at least one service to continue';
}else{
ctaBtn.disabled=false;
ctaBtn.style.opacity='1';
ctaBtn.style.cursor='pointer';
ctaBtn.title='';
}
if(cnt===0){
document.getElementById('mobileSummaryTotal').textContent='$0';
}else{
var summaryOTHtml='';
if(tier.disc>0){
summaryOTHtml='<span class="price-discounted" style="font-size:22px">$'+Math.round(otf).toLocaleString()+'</span>';
}else{
summaryOTHtml='<span style="font-size:22px">$'+Math.round(otf).toLocaleString()+'</span>';
}
var summaryMoHtml=mo>0?' <span style="font-size:22px">+ $'+Math.round(mo).toLocaleString()+'/mo</span>':'';
document.getElementById('mobileSummaryTotal').innerHTML=summaryOTHtml+summaryMoHtml;
}
document.getElementById('mobileSummaryProgFill').style.width=prog+'%';
if(tier.nxt)document.getElementById('mobileSummaryDiscText').textContent='Reach $'+(tier.nxt/1000).toFixed(0)+'k for '+tier.nd+'% off';
else document.getElementById('mobileSummaryDiscText').textContent='15% off unlocked!';
if(tier.disc>0){
document.getElementById('mobileSummaryBadge').style.display='inline-block';
document.getElementById('mobileSummaryBadge').textContent=tier.disc+'% off';
}else document.getElementById('mobileSummaryBadge').style.display='none';
document.getElementById('mobileExpandedProgFill').style.width=prog+'%';
document.querySelectorAll('.mobile-calc .expanded-prog-label').forEach(function(l){
var t=parseInt(l.dataset.t);
tier.disc>=t?l.classList.add('on'):l.classList.remove('on');
});
if(tier.nxt)document.getElementById('mobileExpandedDiscText').textContent='Reach $'+(tier.nxt/1000).toFixed(0)+'k for '+tier.nd+'% off one-time projects';
else document.getElementById('mobileExpandedDiscText').textContent='15% off unlocked on one-time projects!';
if(tier.disc>0){
document.getElementById('mobileExpandedDiscBadge').style.display='inline-flex';
document.getElementById('mobileExpandedBadgeText').textContent=tier.disc+'% off applied';
}else document.getElementById('mobileExpandedDiscBadge').style.display='none';
var h='';
window.st.s.forEach(function(v,k){
if(k==='wl')return;
if(k==='portal_m'){h+='<div class="panel-item"><span class="panel-item-name">Portal (Monthly)</span><span class="panel-item-price">$'+v.p+'/mo</span></div>';return}
var svc=window.data.find(function(s){return s.id===k});
var pr=v.m?'$'+v.p+'/mo':'$'+v.p.toLocaleString();
h+='<div class="panel-item"><span class="panel-item-name">'+svc.n+'</span><span class="panel-item-price">'+pr+'</span></div>';
});
window.st.a.forEach(function(v,k){
var addon=null;
for(var s of data){
if(s.a){
var f=s.a.find(function(a){return a.id===k});
if(f){addon=f;break}
}
}
if(!addon)return;
var pr=v.m?'$'+Math.abs(v.p)+'/mo':'$'+Math.abs(v.p).toLocaleString();
var sg=v.p<0?'-':'+';
var negClass=v.p<0?' neg':'';
h+='<div class="panel-item"><span class="panel-item-name">*'+addon.n+'</span><span class="panel-item-price'+negClass+'">'+sg+pr+'</span></div>';
});
if(window.st.s.has('wl'))h+='<div class="panel-item"><span class="panel-item-name">White Label</span><span class="panel-item-price">+20%</span></div>';
document.getElementById('mobilePanelItems').innerHTML=cnt===0?'<div class="empty-cart">Select services to see estimate</div>':h;
if(cnt>0){
document.getElementById('mobileSubtotalBox').style.display='block';
var subtotalOT = Math.round(otf+disc);
var subtotalMo = Math.round(mo);
var subtotalHtml = '$'+subtotalOT.toLocaleString();
if(subtotalMo>0) subtotalHtml += ' + $'+subtotalMo.toLocaleString()+'/mo';
document.getElementById('mobileSubtotal').innerHTML=subtotalHtml;
}else document.getElementById('mobileSubtotalBox').style.display='none';
if(tier.disc>0){
document.getElementById('mobilePanelDiscLine').style.display='flex';
document.getElementById('mobilePanelDiscAmt').textContent='-$'+Math.round(disc).toLocaleString();
}else document.getElementById('mobilePanelDiscLine').style.display='none';
if(cnt>0){
document.getElementById('mobilePanelFinal').style.display='block';
var otHtml='';
if(tier.disc>0){
var originalOT=otf+disc;
otHtml='<span class="price-original">$'+Math.round(originalOT).toLocaleString()+'</span><span class="price-discounted">$'+Math.round(otf).toLocaleString()+'</span>';
}else{
otHtml='$'+Math.round(otf).toLocaleString();
}
var moHtml=mo>0?' + $'+Math.round(mo).toLocaleString()+'/mo':'';
document.getElementById('mobilePanelFinalTotal').innerHTML=otHtml+moHtml;
}else document.getElementById('mobilePanelFinal').style.display='none';
}

window.toggleCartMobile=function(){
var panel=document.getElementById('mobilePanel');
var overlay=document.getElementById('mobileOverlay');
if(panel.classList.contains('open')){
panel.classList.remove('open');
overlay.classList.remove('open');
document.body.style.overflow='';
}else{
panel.classList.add('open');
overlay.classList.add('open');
document.body.style.overflow='hidden';
}
};

window.closeCartMobile=function(){
document.getElementById('mobilePanel').classList.remove('open');
document.getElementById('mobileOverlay').classList.remove('open');
document.body.style.overflow='';
};

window.toggleServiceDesktop=function(id){
var svc=window.data.find(function(s){return s.id===id});
if(window.st.s.has(id)){
window.st.s.delete(id);
if(id==='portal')window.st.s.delete('portal_m');
if(svc.a)svc.a.forEach(function(a){window.st.a.delete(a.id)});
}else{
window.st.s.set(id,svc);
if(id==='portal')window.st.s.set('portal_m',{p:svc.pm,m:1});
}
updateUIDesktop();
calcDesktop();
};

window.toggleAddonDesktop=function(aid,sid){
if(!window.st.s.has(sid))return;
var svc=window.data.find(function(s){return s.id===sid});
var addon=svc.a.find(function(a){return a.id===aid});
if(window.st.a.has(aid))window.st.a.delete(aid);
else window.st.a.set(aid,addon);
updateUIDesktop();
calcDesktop();
};

window.expandDesktop=function(id){
var ad=document.getElementById('dad'+id);
var ar=document.getElementById('darr'+id);
if(ad){
ad.classList.toggle('open');
ar.classList.toggle('open');
}
};

function updateUIDesktop(){
window.data.forEach(function(s){
var cb=document.getElementById('dc'+s.id);
if(window.st.s.has(s.id))cb.classList.add('on');
else cb.classList.remove('on');
if(s.a){
s.a.forEach(function(a){
var row=document.getElementById('dar'+a.id);
var acb=document.getElementById('dac'+a.id);
if(window.st.s.has(s.id))row.classList.remove('disabled');
else row.classList.add('disabled');
if(window.st.a.has(a.id))acb.classList.add('on');
else acb.classList.remove('on');
});
}
});
}

function calcDesktop(){
var onetime=0,monthly=0,pct=0;
window.st.s.forEach(function(v,k){
if(k==='wl')pct=v.pct;
else if(k==='portal_m')monthly+=v.p;
else if(v.m)monthly+=v.p;
else onetime+=v.p;
});
window.st.a.forEach(function(v){v.m?monthly+=v.p:onetime+=v.p});
if(pct>0){onetime*=(1+pct/100);monthly*=(1+pct/100)}
var tier=tiers.find(function(t){return onetime>=t.min&&onetime<t.max})||tiers[3];
var discAmt=onetime*(tier.disc/100);
var otFinal=onetime-discAmt;
var total=otFinal+monthly;
var prog=0;
if(onetime===0)prog=0;
else if(onetime<8000)prog=(onetime/8000)*33.33;
else if(onetime>=8000&&onetime<13000)prog=33.33+((onetime-8000)/5000)*33.33;
else if(onetime>=13000&&onetime<19000)prog=66.66+((onetime-13000)/6000)*33.34;
else prog=100;
window.calculatorData={
oneTime:Math.round(otFinal),
oneTimeOriginal:Math.round(onetime),
monthly:Math.round(monthly),
discountAmount:Math.round(discAmt),
discountPercent:tier.disc,
hasDiscount:tier.disc>0
};
updateSidebarDesktop(otFinal,monthly,discAmt,tier,prog,total);
}

function updateSidebarDesktop(otf,mo,disc,tier,prog,tot){
var cnt=window.st.s.size+window.st.a.size;
var hasService = window.st.s.size > 0 && (window.st.s.size > 1 || !window.st.s.has('wl'));
var ctaBtn=document.getElementById('desktopCtaBtn');
if(!hasService){
ctaBtn.disabled=true;
ctaBtn.style.opacity='0.5';
ctaBtn.style.cursor='not-allowed';
ctaBtn.title='Please select at least one service to continue';
}else{
ctaBtn.disabled=false;
ctaBtn.style.opacity='1';
ctaBtn.style.cursor='pointer';
ctaBtn.title='';
}
var h='';
window.st.s.forEach(function(v,k){
if(k==='wl')return;
if(k==='portal_m'){h+='<div class="item"><span>Portal (Monthly)</span><span>$'+v.p+'/mo</span></div>';return}
var svc=window.data.find(function(s){return s.id===k});
var pr=v.m?'$'+v.p+'/mo':'$'+v.p.toLocaleString();
h+='<div class="item"><span>'+svc.n+'</span><span>'+pr+'</span></div>';
});
window.st.a.forEach(function(v,k){
var addon=null;
for(var s of data){
if(s.a){
var f=s.a.find(function(a){return a.id===k});
if(f){addon=f;break}
}
}
if(!addon)return;
var pr=v.m?'$'+Math.abs(v.p)+'/mo':'$'+Math.abs(v.p).toLocaleString();
var sg=v.p<0?'-':'+';
var negClass=v.p<0?' class="neg-price"':'';
h+='<div class="item"><span>*'+addon.n+'</span><span'+negClass+'>'+sg+pr+'</span></div>';
});
if(window.st.s.has('wl'))h+='<div class="item"><span>White Label</span><span>+20%</span></div>';
document.getElementById('desktopItems').innerHTML=cnt===0?'<div class="empty">Select services to see estimate</div>':h;
document.getElementById('desktopProgFill').style.width=prog+'%';
document.querySelectorAll('.desktop-calc .prog-label').forEach(function(l){
var t=parseInt(l.dataset.t);
tier.disc>=t?l.classList.add('on'):l.classList.remove('on');
});
if(tier.nxt)document.getElementById('desktopDiscInfo').innerHTML='<span>Reach <strong>$'+(tier.nxt/1000).toFixed(0)+'k</strong> for <strong>'+tier.nd+'% off</strong> one-time projects.</span><div class="info-icon">i</div>';
else document.getElementById('desktopDiscInfo').innerHTML='<span><strong>15% off</strong> unlocked on one-time projects!</span><div class="info-icon">i</div>';
if(tier.disc>0){
document.getElementById('desktopDiscBadgeBox').style.display='flex';
document.getElementById('desktopDiscBadge').innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg><span>'+tier.disc+'% off applied</span>';
document.getElementById('desktopDiscLine').style.display='flex';
document.getElementById('desktopDiscAmt').textContent='-$'+Math.round(disc).toLocaleString();
}else{
document.getElementById('desktopDiscBadgeBox').style.display='none';
document.getElementById('desktopDiscLine').style.display='none';
}
if(cnt>0){
document.getElementById('desktopSubtotalBox').style.display='block';
var subtotalOT = Math.round(otf+disc);
var subtotalMo = Math.round(mo);
var subtotalHtml = '$'+subtotalOT.toLocaleString();
if(subtotalMo>0) subtotalHtml += ' + $'+subtotalMo.toLocaleString()+'/mo';
document.getElementById('desktopSubtotal').innerHTML=subtotalHtml;
document.getElementById('desktopFinalBox').style.display='block';
var otHtml='';
if(tier.disc>0){
var originalOT=otf+disc;
otHtml='<span class="price-original">$'+Math.round(originalOT).toLocaleString()+'</span><span class="price-discounted">$'+Math.round(otf).toLocaleString()+'</span>';
}else{
otHtml='$'+Math.round(otf).toLocaleString();
}
var moHtml=mo>0?' + $'+Math.round(mo).toLocaleString()+'/mo':'';
document.getElementById('desktopFinalTotal').innerHTML=otHtml+moHtml;
}else {
document.getElementById('desktopSubtotalBox').style.display='none';
document.getElementById('desktopFinalBox').style.display='none';
}
}

document.addEventListener('DOMContentLoaded',function(){
if(window.innerWidth<768){
initMobile();
var infoIcon=document.getElementById('mobileInfoIcon');
if(infoIcon){
infoIcon.addEventListener('click',function(e){
e.stopPropagation();
this.classList.toggle('active');
});
document.addEventListener('click',function(){
infoIcon.classList.remove('active');
});
}
document.getElementById('mobilePanelHeader').addEventListener('click',function(e){
if(e.target.id!=='mobileCloseBtn')toggleCartMobile();
});
document.getElementById('mobileCloseBtn').addEventListener('click',function(e){
e.stopPropagation();
closeCartMobile();
});
document.getElementById('mobileOverlay').addEventListener('click',closeCartMobile);
}else{
initDesktop();
}
});
})();

// Multi-step navigation
function goToStep(stepNum) {
  console.log('goToStep called with stepNum:', stepNum);
  
  document.querySelectorAll('.step-container').forEach(function(step) {
    step.classList.remove('active');
  });
  document.getElementById('step' + stepNum).classList.add('active');
  
  // Scroll to top - simple direct approach
  console.log('Attempting scroll to top...');
  try {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.scrollTo(0, 0); // Fallback
    
    // Tell parent page to scroll (if embedded)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'scrollToCalculator' }, '*');
    }
    
    console.log('Scroll executed');
  } catch(e) {
    console.error('Scroll error:', e);
  }
  
  // Mobile progress bars
  var line1M = document.getElementById('progressLine1Mobile');
  var line2M = document.getElementById('progressLine2Mobile');
  var line3M = document.getElementById('progressLine3Mobile');
  var stepLabelM = document.getElementById('currentStepLabelMobile');
  
  // Desktop progress bars
  var line1D = document.getElementById('progressLine1Desktop');
  var line2D = document.getElementById('progressLine2Desktop');
  var line3D = document.getElementById('progressLine3Desktop');
  
  // Reset all
  [line1M, line2M, line3M, line1D, line2D, line3D].forEach(function(line) {
    if (line) {
      line.classList.remove('active', 'completed');
    }
  });
  
  if (stepNum === 1) {
    line1M.classList.add('active');
    line1D.classList.add('active');
    stepLabelM.textContent = 'Calculate Your Estimate';
  } else if (stepNum === 2) {
    line1M.classList.add('completed');
    line2M.classList.add('active');
    line1D.classList.add('completed');
    line2D.classList.add('active');
    stepLabelM.textContent = 'Share Your Details';
    updateStep2Total();
  } else if (stepNum === 3) {
    line1M.classList.add('completed');
    line2M.classList.add('completed');
    line3M.classList.add('active');
    line1D.classList.add('completed');
    line2D.classList.add('completed');
    line3D.classList.add('active');
    stepLabelM.textContent = 'Book a Call';
  }
  
  window.scrollTo(0, 0);
}

function updateStep2Total() {
  console.log('updateStep2Total called');
  console.log('calculatorData:', window.calculatorData);
  
  var totalAmountEl = document.getElementById('step2MobileTotalAmount');
  var totalBreakdownEl = document.getElementById('step2MobileTotalBreakdown');
  
  if (!totalAmountEl || !totalBreakdownEl) {
    console.error('Step 2 elements not found!');
    return;
  }
  
  var data = window.calculatorData;
  
  var displayHTML = '';
  if (data.hasDiscount && data.discountAmount > 0) {
    displayHTML = '<span style="text-decoration:line-through;color:rgba(255,255,255,.35);font-size:22px;font-weight:400;margin-right:8px">$' + 
                  data.oneTimeOriginal.toLocaleString() + 
                  '</span><span style="color:#CFFF54">$' + 
                  data.oneTime.toLocaleString() + 
                  '</span>';
    if (data.monthly > 0) {
      displayHTML += ' <span style="font-size:22px">+ $' + data.monthly.toLocaleString() + '/mo</span>';
    }
  } else {
    displayHTML = '$' + data.oneTime.toLocaleString();
    if (data.monthly > 0) {
      displayHTML += ' + $' + data.monthly.toLocaleString() + '/mo';
    }
  }
  
  console.log('Setting displayHTML:', displayHTML);
  totalAmountEl.innerHTML = displayHTML;
  
  // Build breakdown
  var breakdownParts = [];
  if (data.oneTime > 0) {
    breakdownParts.push('$' + data.oneTime.toLocaleString() + ' one-time');
  }
  if (data.monthly > 0) {
    breakdownParts.push('$' + data.monthly.toLocaleString() + '/mo retainer');
  }
  if (data.hasDiscount && data.discountPercent > 0) {
    breakdownParts.push(data.discountPercent + '% discount applied');
  }
  
  var breakdownText = breakdownParts.length > 0 ? breakdownParts.join(' • ') : 'Select services to see estimate';
  console.log('Setting breakdown:', breakdownText);
  totalBreakdownEl.textContent = breakdownText;
}

document.getElementById('mobileCtaBtn').addEventListener('click', function(e) {
  e.preventDefault();
  goToStep(2);
});

document.getElementById('desktopCtaBtn').addEventListener('click', function(e) {
  e.preventDefault();
  goToStep(2);
});

document.getElementById('step2MobileBackBtn').addEventListener('click', function(e) {
  e.preventDefault();
  goToStep(1);
});

// Step 2 form validation
function validateStep2Form() {
  var nameInput = document.querySelector('#step2MobileForm input[name="name"]');
  var emailInput = document.querySelector('#step2MobileForm input[name="email"]');
  var descInput = document.querySelector('#step2MobileForm textarea[name="description"]');
  var continueBtn = document.getElementById('step2MobileContinueBtn');
  
  // Email format validation regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  var isValid = nameInput.value.trim() !== '' && 
                emailInput.value.trim() !== '' && 
                emailRegex.test(emailInput.value.trim()) &&
                descInput.value.trim() !== '';
  
  if (isValid) {
    continueBtn.disabled = false;
    continueBtn.style.opacity = '1';
    continueBtn.style.cursor = 'pointer';
    continueBtn.title = '';
    emailInput.style.borderColor = 'rgba(255,255,255,.15)';
  } else {
    continueBtn.disabled = true;
    continueBtn.style.opacity = '0.5';
    continueBtn.style.cursor = 'not-allowed';
    
    // Show specific error message
    if (nameInput.value.trim() === '' || descInput.value.trim() === '') {
      continueBtn.title = 'Please fill in all required fields';
    } else if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value.trim())) {
      continueBtn.title = 'Please enter a valid email address';
      emailInput.style.borderColor = 'rgba(255,100,100,.5)';
    } else {
      continueBtn.title = 'Please fill in all required fields';
    }
  }
}

// Add input listeners when going to Step 2
var originalGoToStep = goToStep;
goToStep = function(stepNum) {
  originalGoToStep(stepNum);
  if (stepNum === 2) {
    setTimeout(function() {
      var nameInput = document.querySelector('#step2MobileForm input[name="name"]');
      var emailInput = document.querySelector('#step2MobileForm input[name="email"]');
      var descInput = document.querySelector('#step2MobileForm textarea[name="description"]');
      
      if (nameInput) nameInput.addEventListener('input', validateStep2Form);
      if (emailInput) emailInput.addEventListener('input', validateStep2Form);
      if (descInput) descInput.addEventListener('input', validateStep2Form);
      
      validateStep2Form();
    }, 100);
  }
};

document.getElementById('step2MobileContinueBtn').addEventListener('click', function(e) {
  e.preventDefault();
  populateStep3Summary();
  goToStep(3);
});

document.getElementById('step3BackBtn').addEventListener('click', function(e) {
  e.preventDefault();
  goToStep(2);
});

// Summary dropdown toggle
document.getElementById('step3SummaryToggle').addEventListener('click', function() {
  var content = document.getElementById('step3SummaryContent');
  var arrow = document.getElementById('step3SummaryArrow');
  
  // Get computed max-height
  var currentMaxHeight = window.getComputedStyle(content).maxHeight;
  
  console.log('Summary toggle clicked. Current maxHeight:', currentMaxHeight);
  console.log('ScrollHeight:', content.scrollHeight);
  
  if (currentMaxHeight === '0px') {
    // Expand - keep overflow hidden during animation
    content.style.maxHeight = content.scrollHeight + 'px';
    arrow.style.transform = 'rotate(180deg)';
    console.log('Expanding to:', content.scrollHeight + 'px');
    
    // Only set overflow visible after animation completes
    setTimeout(function() {
      content.style.overflow = 'visible';
      content.style.maxHeight = content.scrollHeight + 'px';
    }, 300);
  } else {
    // Collapse - set overflow hidden immediately
    content.style.overflow = 'hidden';
    content.style.maxHeight = '0px';
    arrow.style.transform = 'rotate(0deg)';
    console.log('Collapsing');
  }
});

// Helper function to update summary height when inner content changes
function updateSummaryHeight() {
  var content = document.getElementById('step3SummaryContent');
  if (content.style.maxHeight !== '0px' && content.style.maxHeight !== '') {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

// Message toggle
var messageFullText = '';
document.getElementById('step3MessageToggle').addEventListener('click', function() {
  var textEl = document.getElementById('step3MessageText');
  var toggle = document.getElementById('step3MessageToggle');
  
  if (toggle.textContent === 'View full message') {
    textEl.textContent = messageFullText;
    toggle.textContent = 'Show less';
  } else {
    textEl.textContent = messageFullText.substring(0, 120) + '...';
    toggle.textContent = 'View full message';
  }
  
  // Update summary height after message expansion
  setTimeout(updateSummaryHeight, 50);
});

// Services toggle
document.getElementById('step3ServicesToggle').addEventListener('click', function() {
  var hidden = document.getElementById('step3ServicesHidden');
  var toggle = document.getElementById('step3ServicesToggle');
  if (hidden.style.display === 'none' || hidden.style.display === '') {
    hidden.style.display = 'flex';
    toggle.textContent = 'Show less';
  } else {
    hidden.style.display = 'none';
    toggle.textContent = document.getElementById('step3ServicesToggle').dataset.text;
  }
  
  // Update summary height after services expansion
  setTimeout(updateSummaryHeight, 50);
});

function populateStep3Summary() {
  // Get form data
  var form = document.getElementById('step2MobileForm');
  var formData = new FormData(form);
  
  // Populate contact info
  document.getElementById('step3Name').textContent = formData.get('name') || '—';
  document.getElementById('step3Email').textContent = formData.get('email') || '—';
  
  var company = formData.get('company');
  if (company) {
    document.getElementById('step3Company').textContent = company;
    document.getElementById('step3CompanyRow').style.display = 'flex';
  } else {
    document.getElementById('step3CompanyRow').style.display = 'none';
  }
  
  // Message with truncation
  var message = formData.get('description') || '';
  var messageText = document.getElementById('step3MessageText');
  var messageToggle = document.getElementById('step3MessageToggle');
  
  // Store full message globally for toggle
  messageFullText = message;
  
  if (message.length > 120) {
    messageText.textContent = message.substring(0, 120) + '...';
    messageToggle.style.display = 'block';
  } else {
    messageText.textContent = message || '—';
    messageToggle.style.display = 'none';
  }
  
  // Populate services with show more/less
  var servicesVisible = [];
  var servicesHidden = [];
  var serviceIndex = 0;
  
  window.st.s.forEach(function(v, k) {
    if (k === 'wl' || k === 'portal_m') return;
    var svc = window.data.find(function(s) { return s.id === k; });
    var pr = v.m ? '$' + v.p + '/mo' : '$' + v.p.toLocaleString();
    var html = '<div style="display:flex;justify-content:space-between;font-size:14px"><span style="color:rgba(255,255,255,.85)">' + svc.n + '</span><span style="font-weight:500;color:#fff">' + pr + '</span></div>';
    
    if (serviceIndex < 2) {
      servicesVisible.push(html);
    } else {
      servicesHidden.push(html);
    }
    serviceIndex++;
  });
  
  window.st.a.forEach(function(v, k) {
    var addon = null;
    for (var s of window.data) {
      if (s.a) {
        var f = s.a.find(function(a) { return a.id === k; });
        if (f) { addon = f; break; }
      }
    }
    if (!addon) return;
    var pr = v.m ? '$' + Math.abs(v.p) + '/mo' : '$' + Math.abs(v.p).toLocaleString();
    var sign = v.p < 0 ? '- ' : '+ ';
    var html = '<div style="display:flex;justify-content:space-between;font-size:14px"><span style="color:rgba(255,255,255,.65);padding-left:12px">• ' + addon.n + '</span><span style="font-weight:500;color:#fff">' + sign + pr + '</span></div>';
    
    if (serviceIndex < 2) {
      servicesVisible.push(html);
    } else {
      servicesHidden.push(html);
    }
    serviceIndex++;
  });
  
  if (window.st.s.has('wl')) {
    var html = '<div style="display:flex;justify-content:space-between;font-size:14px"><span style="color:rgba(255,255,255,.85)">White Label</span><span style="font-weight:500;color:#fff">+20%</span></div>';
    if (serviceIndex < 2) {
      servicesVisible.push(html);
    } else {
      servicesHidden.push(html);
    }
    serviceIndex++;
  }
  
  var visibleEl = document.getElementById('step3ServicesVisible');
  var hiddenEl = document.getElementById('step3ServicesHidden');
  var toggleEl = document.getElementById('step3ServicesToggle');
  
  if (servicesVisible.length === 0) {
    visibleEl.innerHTML = '<div style="font-size:14px;color:rgba(255,255,255,.4)">No services selected</div>';
    hiddenEl.style.display = 'none';
    toggleEl.style.display = 'none';
  } else {
    visibleEl.innerHTML = servicesVisible.join('');
    if (servicesHidden.length > 0) {
      hiddenEl.innerHTML = servicesHidden.join('');
      toggleEl.style.display = 'block';
      toggleEl.textContent = 'View ' + servicesHidden.length + ' more service' + (servicesHidden.length === 1 ? '' : 's');
      toggleEl.dataset.text = 'View ' + servicesHidden.length + ' more service' + (servicesHidden.length === 1 ? '' : 's');
    } else {
      hiddenEl.style.display = 'none';
      toggleEl.style.display = 'none';
    }
  }
  
  // Populate pricing breakdown
  var calcData = window.calculatorData;
  
  // Subtotal
  var subtotalHtml = '$' + calcData.oneTimeOriginal.toLocaleString();
  if (calcData.monthly > 0) {
    subtotalHtml += ' + $' + calcData.monthly.toLocaleString() + '/mo';
  }
  document.getElementById('step3Subtotal').innerHTML = subtotalHtml;
  
  // Discount
  if (calcData.hasDiscount) {
    document.getElementById('step3DiscountRow').style.display = 'flex';
    document.getElementById('step3Discount').textContent = '-$' + calcData.discountAmount.toLocaleString() + ' (' + calcData.discountPercent + '%)';
  } else {
    document.getElementById('step3DiscountRow').style.display = 'none';
  }
  
  // Total - one-time price green if discounted, monthly always white
  var totalEl = document.getElementById('step3Total');
  var totalHtml = '';
  
  if (calcData.hasDiscount) {
    totalHtml = '<span style="color:#CFFF54">$' + calcData.oneTime.toLocaleString() + '</span>';
  } else {
    totalHtml = '$' + calcData.oneTime.toLocaleString();
  }
  
  if (calcData.monthly > 0) {
    totalHtml += ' <span style="color:#fff">+ $' + calcData.monthly.toLocaleString() + '/mo</span>';
  }
  
  totalEl.innerHTML = totalHtml;
  
  // Reset color to white (since we're using innerHTML with inline styles)
  totalEl.style.color = '#fff';
  
  // Summary starts collapsed - user can click to expand if needed
  
  // Load calendar
  loadCalendar();
}

function loadCalendar() {
  var currentDate = new Date();
  var selectedDate = null;
  var selectedTime = null;
  var availableSlots = [];
  
  var WORKER_URL = 'https://bykreator-calendar.staycozy.workers.dev';
  
  // Render month
  function renderMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    
    document.getElementById('currentMonth').textContent = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var startDay = firstDay.getDay();
    
    var grid = document.getElementById('dateGrid');
    grid.innerHTML = '';
    
    // Day headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(function(day) {
      var header = document.createElement('div');
      header.style.cssText = 'text-align:center;font-size:12px;color:rgba(255,255,255,.5);font-weight:600;padding:8px 0';
      header.textContent = day;
      grid.appendChild(header);
    });
    
    // Empty cells before month starts
    for (var i = 0; i < startDay; i++) {
      var empty = document.createElement('div');
      grid.appendChild(empty);
    }
    
    // Date cells
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (var day = 1; day <= lastDay.getDate(); day++) {
      var dateObj = new Date(year, month, day);
      var dateBtn = document.createElement('button');
      dateBtn.textContent = day;
      // Fix timezone offset issue - adjust for local timezone
      var tzOffset = dateObj.getTimezoneOffset() * 60000;
      var localDate = new Date(dateObj.getTime() - tzOffset);
      dateBtn.dataset.date = localDate.toISOString().split('T')[0];
      
      var isPast = dateObj < today;
      var isSelected = selectedDate === dateBtn.dataset.date;
      
      var btnStyle = 'padding:12px;border-radius:8px;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;transition:all .2s;';
      
      if (isPast) {
        btnStyle += 'background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.2);cursor:not-allowed;';
        dateBtn.disabled = true;
      } else if (isSelected) {
        btnStyle += 'background:#CFFF54;border:1px solid #CFFF54;color:#000;';
      } else {
        btnStyle += 'background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;';
      }
      
      dateBtn.style.cssText = btnStyle;
      
      if (!isPast) {
        dateBtn.addEventListener('click', function() {
          selectedDate = this.dataset.date;
          selectedTime = null;
          // Switch to time selection view
          document.getElementById('dateSelectionView').style.display = 'none';
          document.getElementById('timeSelectionView').style.display = 'block';
          loadTimeSlotsForDate(selectedDate);
        });
      }
      
      grid.appendChild(dateBtn);
    }
  }
  
  // Load time slots for selected date
  function loadTimeSlotsForDate(date) {
    var timeSlotsGrid = document.getElementById('timeSlotsGrid');
    var selectedDateDisplay = document.getElementById('selectedDateDisplay');
    
    selectedDateDisplay.textContent = 'Available times for ' + new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    timeSlotsGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,.4)">Loading slots...</div>';
    
    // Fetch availability from API
    fetch(WORKER_URL + '/api/availability?date=' + date, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(res) { 
        console.log('API Response status:', res.status);
        if (!res.ok) {
          throw new Error('API returned status ' + res.status);
        }
        return res.json(); 
      })
      .then(function(data) {
        console.log('API Response data:', data);
        if (data.slots && data.slots.length > 0) {
          renderTimeSlots(data.slots);
        } else {
          timeSlotsGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,.4)">No available slots for this date</div>';
        }
      })
      .catch(function(err) {
        console.error('Error loading slots:', err);
        console.log('Using mock slots as fallback');
        // Generate mock slots for demo (9 AM - 7 PM Serbian time, converted to user's timezone)
        var mockSlots = [];
        var selectedDateObj = new Date(date + 'T09:00:00+01:00'); // Serbian time (UTC+1)
        
        for (var hour = 9; hour < 19; hour++) {
          for (var min = 0; min < 60; min += 30) {
            var slotTime = new Date(date + 'T' + String(hour).padStart(2, '0') + ':' + String(min).padStart(2, '0') + ':00+01:00');
            mockSlots.push({
              start: slotTime.toISOString(),
              available: true
            });
          }
        }
        
        renderTimeSlots(mockSlots);
      });
  }
  
  // Render time slots
  function renderTimeSlots(slots) {
    var timeSlotsGrid = document.getElementById('timeSlotsGrid');
    timeSlotsGrid.innerHTML = '';
    
    slots.forEach(function(slot) {
      var slotTime = new Date(slot.start);
      var timeBtn = document.createElement('button');
      var timeStr = slotTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      timeBtn.textContent = timeStr;
      timeBtn.dataset.time = slot.start;
      
      var isSelected = selectedTime === slot.start;
      
      var btnStyle = 'padding:12px;border-radius:8px;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;transition:all .2s;';
      
      if (isSelected) {
        btnStyle += 'background:#CFFF54;border:1px solid #CFFF54;color:#000;';
      } else {
        btnStyle += 'background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;';
      }
      
      timeBtn.style.cssText = btnStyle;
      
      timeBtn.addEventListener('click', function() {
        selectedTime = this.dataset.time;
        renderTimeSlots(slots);
        
        // Activate Book Discovery Call button
        var bookBtn = document.getElementById('bookDiscoveryBtn');
        bookBtn.disabled = false;
        bookBtn.style.opacity = '1';
        bookBtn.style.cursor = 'pointer';
        bookBtn.title = '';
      });
      
      timeSlotsGrid.appendChild(timeBtn);
    });
  }
  
  // Back to date selection
  document.getElementById('backToDateBtn').addEventListener('click', function() {
    document.getElementById('timeSelectionView').style.display = 'none';
    document.getElementById('dateSelectionView').style.display = 'block';
    selectedTime = null;
    
    // Deactivate book button
    var bookBtn = document.getElementById('bookDiscoveryBtn');
    bookBtn.disabled = true;
    bookBtn.style.opacity = '0.5';
    bookBtn.style.cursor = 'not-allowed';
    bookBtn.title = 'Please select a date and time';
  });
  
  // Book a Call button
  document.getElementById('bookDiscoveryBtn').addEventListener('click', function() {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }
    
    var btn = this;
    btn.textContent = 'Booking...';
    btn.disabled = true;
    btn.style.opacity = '0.5';
    
    var form = document.getElementById('step2MobileForm');
    var formData = new FormData(form);
    
    // Find the selected slot to get both start and end times
    var selectedSlot = availableSlots.find(function(slot) { return slot.start === selectedTime; });
    
    // Build notes with all the booking details
    var notesText = 'Company: ' + (formData.get('company') || 'N/A') + '\n' +
                    'Description: ' + formData.get('description') + '\n' +
                    'Services: ' + Array.from(window.st.s.keys()).join(', ') + '\n' +
                    'Estimate: ' + window.calculatorData.oneTime + (window.calculatorData.monthly > 0 ? ' + $' + window.calculatorData.monthly + '/mo' : '');
    
    var bookingData = {
      name: formData.get('name'),
      email: formData.get('email'),
      start: selectedTime,
      end: selectedSlot ? selectedSlot.end : new Date(new Date(selectedTime).getTime() + 30*60000).toISOString(),
      notes: notesText
    };
    
    fetch(WORKER_URL + '/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          showConfirmationScreen();
        } else {
          alert('Booking failed: ' + (data.error || 'Unknown error'));
          btn.textContent = 'Book a Call';
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      })
      .catch(function(err) {
        console.error('Booking error:', err);
        // Show confirmation anyway for demo (remove this in production)
        showConfirmationScreen();
      });
  });
  
  // Show confirmation screen
  function showConfirmationScreen() {
    // Update title and show confirmation text
    document.getElementById('step3Title').textContent = "You're all set!";
    document.getElementById('step3ConfirmationText').style.display = 'block';
    document.getElementById('currentStepLabelMobile').textContent = "You're all set!";
    
    // Turn progress bars green (both mobile and desktop)
    document.getElementById('progressLine3Mobile').classList.add('completed');
    document.getElementById('progressLine3Mobile').classList.remove('active');
    document.getElementById('progressLine3Desktop').classList.add('completed');
    document.getElementById('progressLine3Desktop').classList.remove('active');
    
    // Hide calendar section (it's the 2nd child div after summary)
    var mobileStep = document.querySelector('#step3 .mobile-step');
    var children = mobileStep.children;
    // children[0] = header, children[1] = summary, children[2] = calendar, children[3] = buttons
    if (children[2]) children[2].style.display = 'none'; // Hide calendar
    if (children[3]) children[3].style.display = 'none'; // Hide buttons
    
    // Show booking details in summary
    var bookingDetails = document.getElementById('step3BookingDetails');
    bookingDetails.style.display = 'flex';
    
    var bookedDate = new Date(selectedDate);
    document.getElementById('step3BookedDate').textContent = bookedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    
    var bookedTime = new Date(selectedTime);
    document.getElementById('step3BookedTime').textContent = bookedTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    // Force expand summary content and show all sections
    var summaryContent = document.getElementById('step3SummaryContent');
    var summaryToggle = document.getElementById('step3SummaryToggle');
    
    // Make summary permanently visible
    summaryContent.style.maxHeight = '9999px';
    summaryContent.style.overflow = 'visible';
    summaryContent.style.transition = 'none';
    
    // Show any hidden message/services sections
    var messageToggle = document.getElementById('step3MessageToggle');
    var servicesToggle = document.getElementById('step3ServicesToggle');
    
    // If message is truncated, expand it
    if (messageToggle && messageToggle.style.display !== 'none') {
      var messageText = document.getElementById('step3MessageText');
      messageText.textContent = messageFullText;
      messageToggle.style.display = 'none'; // Hide toggle
    }
    
    // If services are hidden, show them all
    if (servicesToggle && servicesToggle.style.display !== 'none') {
      var servicesHidden = document.getElementById('step3ServicesHidden');
      servicesHidden.style.display = 'flex';
      servicesToggle.style.display = 'none'; // Hide toggle
    }
    
    // Remove toggle functionality from summary header
    summaryToggle.style.cursor = 'default';
    summaryToggle.style.pointerEvents = 'none';
    document.getElementById('step3SummaryArrow').style.display = 'none';
  }
  
  
  // Month navigation
  document.getElementById('prevMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDate = null;
    selectedTime = null;
    document.getElementById('dateSelectionView').style.display = 'block';
    document.getElementById('timeSelectionView').style.display = 'none';
    
    var bookBtn = document.getElementById('bookDiscoveryBtn');
    bookBtn.disabled = true;
    bookBtn.style.opacity = '0.5';
    bookBtn.style.cursor = 'not-allowed';
    bookBtn.title = 'Please select a date and time';
    
    renderMonth(currentDate);
  });
  
  document.getElementById('nextMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDate = null;
    selectedTime = null;
    document.getElementById('dateSelectionView').style.display = 'block';
    document.getElementById('timeSelectionView').style.display = 'none';
    
    var bookBtn = document.getElementById('bookDiscoveryBtn');
    bookBtn.disabled = true;
    bookBtn.style.opacity = '0.5';
    bookBtn.style.cursor = 'not-allowed';
    bookBtn.title = 'Please select a date and time';
    
    renderMonth(currentDate);
  });
  
  // Initialize
  document.getElementById('calendarLoading').style.display = 'none';
  renderMonth(currentDate);
}
