import { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '@/hook/useDarkMode';

export default function Comment() {
  const ref = useRef<HTMLDivElement>(null);
  const [theme] = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('useEffect가 이런게 아닌건가? ' + theme);
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'kyY00n/devlog');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOK9Ry2g');
    scriptElem.setAttribute('data-category', 'General');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOK9Ry2s4Cb-Y0');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', theme ?? 'light');
    scriptElem.setAttribute('data-lang', 'en');

    ref.current.appendChild(scriptElem);

    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  // useEffect(() => {
  //   if (!mounted) return;
  //   const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
  //   iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  //   setMounted(false);
  // }, [mounted]);

  return <section ref={ref} />;
}
