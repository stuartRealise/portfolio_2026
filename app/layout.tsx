import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Raleway, DM_Mono } from 'next/font/google';
import { ContactModalProvider } from '@/lib/ContactModalContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaticContactModal from '@/components/ui/StaticContactModal';
import StaticLightbox from '@/components/ui/StaticLightbox';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Do NOT set maximumScale or userScalable — pinch-zoom must remain available for accessibility
};

export const metadata: Metadata = {
  title: 'Aitken Interactive — Decision Designer & Service Strategist',
  description:
    'Aitken Interactive helps founders and product leaders build better SaaS products through UX strategy, design systems, and decision design.',
  metadataBase: new URL('https://aitken-interactive.co.uk'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${raleway.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* Inline fallback: runs directly from SSR'd HTML before any JS bundle loads.
            — Mobile menu: open/close when React hasn't hydrated (data-react-mounted guards).
            — Contact modal: opens #contact-modal-static when React hasn't hydrated
              (data-contact-react-mounted on body guards). Steps aside the moment
              ContactModalContext mounts and sets that attribute. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){
  function initMenu(){
    var btn=document.querySelector('button[aria-label="Open menu"]');
    var menu=document.getElementById('mobile-menu');
    if(!btn||!menu)return;
    btn.addEventListener('click',function(){
      if(btn.getAttribute('data-react-mounted'))return;
      menu.classList.add('nav-open');
    });
    menu.addEventListener('click',function(e){
      if(btn.getAttribute('data-react-mounted'))return;
      var t=e.target;
      var lbl=t.getAttribute&&t.getAttribute('aria-label');
      if(lbl==='Close menu'){menu.classList.remove('nav-open');}
    });
  }

  function initContact(){
    var overlay=document.getElementById('contact-modal-static');
    var serviceSelect=document.getElementById('cmf-service');
    if(!overlay)return;

    function scrollLock(){
      var y=window.scrollY;
      document.body.dataset.scrollY=String(y);
      document.body.style.position='fixed';
      document.body.style.top='-'+y+'px';
      document.body.style.width='100%';
    }
    function scrollUnlock(){
      var y=parseInt(document.body.dataset.scrollY||'0',10);
      document.body.style.position='';
      document.body.style.top='';
      document.body.style.width='';
      delete document.body.dataset.scrollY;
      window.scrollTo(0,y);
    }

    function openModal(serviceId){
      if(document.body.hasAttribute('data-contact-react-mounted'))return;
      overlay.style.display='flex';
      overlay.setAttribute('aria-hidden','false');
      if(serviceId&&serviceSelect){serviceSelect.value=serviceId;}
      scrollLock();
      var firstEl=overlay.querySelector('button,input,select,textarea');
      if(firstEl)firstEl.focus();
    }

    function closeModal(){
      overlay.style.display='none';
      overlay.setAttribute('aria-hidden','true');
      scrollUnlock();
    }

    document.querySelectorAll('[data-contact-trigger]').forEach(function(btn){
      btn.addEventListener('click',function(){
        if(document.body.hasAttribute('data-contact-react-mounted'))return;
        var menu=document.getElementById('mobile-menu');
        if(menu)menu.classList.remove('nav-open');
        openModal(btn.getAttribute('data-service-id')||'');
      });
    });

    var closeBtn=document.getElementById('contact-modal-static-close');
    if(closeBtn)closeBtn.addEventListener('click',closeModal);

    overlay.addEventListener('click',function(e){if(e.target===overlay)closeModal();});

    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&overlay.style.display==='flex')closeModal();
    });
  }

  function initLightbox(){
    var overlay=document.getElementById('lightbox-static');
    if(!overlay)return;
    var img=document.getElementById('lightbox-static-img');
    var cap=document.getElementById('lightbox-static-caption');
    var ctr=document.getElementById('lightbox-static-counter');
    var prevBtn=document.getElementById('lightbox-static-prev');
    var nextBtn=document.getElementById('lightbox-static-next');
    var closeBtn=document.getElementById('lightbox-static-close');
    var imgs=[];var idx=0;var touchX=null;

    function show(i){
      idx=((i%imgs.length)+imgs.length)%imgs.length;
      if(img){img.src=imgs[idx].src;img.alt=imgs[idx].cap;}
      if(cap)cap.textContent=imgs[idx].cap;
      if(ctr)ctr.textContent=imgs.length>1?(idx+1)+' / '+imgs.length:'';
      var multi=imgs.length>1;
      if(prevBtn)prevBtn.style.display=multi?'':'none';
      if(nextBtn)nextBtn.style.display=multi?'':'none';
    }

    function open(images,startIdx){
      if(document.body.hasAttribute('data-lightbox-react-mounted'))return;
      imgs=images;show(startIdx);
      overlay.style.display='flex';overlay.setAttribute('aria-hidden','false');
      var y=window.scrollY;
      document.body.dataset.lbY=String(y);
      document.body.style.position='fixed';document.body.style.top='-'+y+'px';document.body.style.width='100%';
      if(closeBtn)closeBtn.focus();
    }

    function close(){
      overlay.style.display='none';overlay.setAttribute('aria-hidden','true');
      var y=parseInt(document.body.dataset.lbY||'0',10);
      document.body.style.position='';document.body.style.top='';document.body.style.width='';
      delete document.body.dataset.lbY;
      window.scrollTo(0,y);
    }

    document.addEventListener('click',function(e){
      var t=e.target;
      var trigger=t&&t.closest&&t.closest('[data-lightbox-src]');
      if(!trigger)return;
      if(document.body.hasAttribute('data-lightbox-react-mounted'))return;
      e.preventDefault();
      var gallery=trigger.closest('[data-lightbox-gallery]');
      var all=gallery?gallery.querySelectorAll('[data-lightbox-src]'):[trigger];
      var images=Array.from(all).map(function(el){
        return{src:el.getAttribute('data-lightbox-src')||'',cap:el.getAttribute('data-lightbox-caption')||''};
      });
      open(images,parseInt(trigger.getAttribute('data-lightbox-index')||'0',10));
    });

    if(closeBtn)closeBtn.addEventListener('click',close);
    if(prevBtn)prevBtn.addEventListener('click',function(){show(idx-1);});
    if(nextBtn)nextBtn.addEventListener('click',function(){show(idx+1);});
    overlay.addEventListener('click',function(e){if(e.target===overlay)close();});

    document.addEventListener('keydown',function(e){
      if(overlay.style.display!=='flex')return;
      if(e.key==='Escape')close();
      if(e.key==='ArrowLeft')show(idx-1);
      if(e.key==='ArrowRight')show(idx+1);
    });

    overlay.addEventListener('touchstart',function(e){touchX=e.touches[0].clientX;},{passive:true});
    overlay.addEventListener('touchend',function(e){
      if(touchX===null)return;
      var dx=e.changedTouches[0].clientX-touchX;
      if(Math.abs(dx)>50){dx<0?show(idx+1):show(idx-1);}
      touchX=null;
    },{passive:true});
  }

  function setNavHeight(){
    var nav=document.querySelector('header[role="banner"]');
    if(!nav)return;
    document.documentElement.style.setProperty('--navbar-height-actual',nav.getBoundingClientRect().height+'px');
  }
  window.addEventListener('resize',setNavHeight,{passive:true});

  function init(){initMenu();initContact();initLightbox();setNavHeight();}
  document.readyState==='loading'
    ?document.addEventListener('DOMContentLoaded',init)
    :init();
})();` }} />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <StaticContactModal />
        <StaticLightbox />
        <ContactModalProvider>
          <Navbar />
          <ScrollReveal />
          {children}
          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}
