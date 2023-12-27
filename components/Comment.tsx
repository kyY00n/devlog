import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '@/hook/state/themeState';

export default function Comment() {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useRecoilValue(themeState);

  useEffect(() => {
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

    scriptElem.onload = () => {
      // iframe이 로드되면 메시지를 보냅니다.
      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: theme ?? 'light' } } },
        'https://giscus.app',
      );
    };

    ref.current.appendChild(scriptElem);

    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');

    // 컴포넌트 언마운트 시 스크립트 제거를 위한 클린업 함수
    return () => {
      if (ref.current) {
        ref.current.removeChild(scriptElem);
      }
    };
  }, []);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    // 테마가 변경되면 메시지를 보냅니다.
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]); // theme가 변경될 때마다 실행됩니다.

  return <section ref={ref} />;
}
