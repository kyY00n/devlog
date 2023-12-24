import { Html, Head, Main, NextScript } from 'next/document';

function setInitialColorMode() {
  // 내부에 저장되어 있는 값 혹은 mediaQuery의 값을 찾아서 적용해준다.
  function getInitialColorMode() {
    const preference = window.localStorage.getItem('theme');
    const hasExplicitPreference = typeof preference === 'string';

    if (hasExplicitPreference) {
      return preference;
    }

    const mediaQuery = '(prefers-color-scheme: dark)';
    const mql = window.matchMedia(mediaQuery);
    const hasImplicitPreference = typeof mql.matches === 'boolean';
    if (hasImplicitPreference) {
      return mql.matches ? 'dark' : 'light';
    }

    return 'dark';
  }
  const colorMode = getInitialColorMode();
  document.body.className = colorMode;
}

const blockingSetInitialColorMode = `(function() {
    ${setInitialColorMode.toString()}
    setInitialColorMode();
})()
`;

export default function Document() {
  return (
    <Html lang="ko">
      <Head></Head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: blockingSetInitialColorMode,
          }}
        ></script>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
