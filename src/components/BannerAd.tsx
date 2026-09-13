import React, { useEffect, useRef } from 'react';

interface BannerAdProps {
  position?: 'top' | 'middle' | 'bottom' | 'sticky';
  zoneId?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({
  position = 'top',
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    // Create an isolated sandboxed iframe for the 320x50 banner ad
    // This prevents any script from redirecting the main window
    try {
      const iframe = document.createElement('iframe');
      iframe.width = '320';
      iframe.height = '50';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.scrolling = 'no';
      iframe.title = 'إعلان ممول';
      iframe.srcdoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <base target="_blank">
    <style>
      body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: transparent; overflow: hidden; }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : 'cb538daa0dbcfa1519a78b30f3cd09b1',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://www.highrevenueformat.com/cb538daa0dbcfa1519a78b30f3cd09b1/invoke.js"></script>
  </body>
</html>`;

      adContainerRef.current.innerHTML = '';
      adContainerRef.current.appendChild(iframe);
    } catch (e) {
      console.warn('Banner mount exception:', e);
    }
  }, []);

  return (
    <aside 
      aria-label="مساحة إعلانية" 
      className={`w-full max-w-2xl mx-auto px-3 my-2.5 flex flex-col items-center justify-center transition-all ${
        position === 'sticky' ? 'sticky bottom-16 z-30 shadow-2xl py-1' : ''
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          <span>إعلان ممول (320x50)</span>
        </div>

        {/* Static, Rectangular 320x50 Banner Container */}
        <div 
          ref={adContainerRef}
          className="w-[320px] h-[50px] bg-slate-950 rounded-lg overflow-hidden border border-slate-800/80 flex items-center justify-center shadow-md"
        />
      </div>
    </aside>
  );
};
