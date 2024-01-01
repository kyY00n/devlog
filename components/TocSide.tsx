'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export interface Toc {
  level: 1 | 2 | 3;
  text: string;
  slug: string;
}

const numberToStringMap = {
  1: 'one',
  2: 'two',
  3: 'three',
};

function getScrollTop() {
  if (!document.body) return 0;
  if (document.documentElement && 'scrollTop' in document.documentElement) {
    return document.documentElement.scrollTop || document.body.scrollTop;
  } else {
    return document.body.scrollTop;
  }
}

interface IHeadingTops {
  slug: string;
  top: number;
}

interface TocSideProps {
  tableOfContents: Toc[];
}

export default function TocSide({ tableOfContents }: TocSideProps) {
  const [activeToc, setActiveToc] = useState('');
  const [headingTops, setHeadingTops] = useState<null | IHeadingTops[]>([]);

  const settingHeadingTops = useCallback(() => {
    const scrollTop = getScrollTop(); // 200 빼줌
    const headingTops = tableOfContents.map(({ slug }) => {
      const el = document.getElementById(slug);
      const top = el ? el.getBoundingClientRect().top + scrollTop - 200 : 0;
      return { slug, top };
    });
    setHeadingTops(headingTops);
  }, [tableOfContents]);

  useEffect(() => {
    settingHeadingTops();
    let prevScrollHeight = document.body.scrollHeight;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const trackScrollHeight = () => {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        settingHeadingTops();
      }
      prevScrollHeight = scrollHeight;
      timeoutId = setTimeout(trackScrollHeight, 250);
    };

    timeoutId = setTimeout(trackScrollHeight, 250);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [settingHeadingTops]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop();
      if (!headingTops) return;
      const currentHeading = headingTops
        .slice()
        .reverse()
        .find((headingTop) => scrollTop >= headingTop.top - 4);

      if (currentHeading) {
        setActiveToc(currentHeading.slug);
      } else {
        setActiveToc('');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headingTops]);

  const handleTocClick = (event: any, tocSlug: string) => {
    event.preventDefault(); // 기본 스크롤 동작 중단
    const headerHeight = 150;
    const element = document.getElementById(tocSlug);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: elementTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      {tableOfContents.length ? (
        <ul className="px-1">
          <div className="text-lg font-medium border-b border-gray-100 dark:border-gray-700 pb-1">
            목차
          </div>
          {tableOfContents.map((toc, i) => (
            <li
              data-level={numberToStringMap[toc.level]}
              key={i}
              className={`first-of-type:pt-2 py-1 data-[level=two]:pl-3 data-[level=three]:pl-5 text-gray-400 text-sm hover:text-gray-800 dark:hover:text-gray-200 transition-all ${
                activeToc === toc.slug
                  ? 'scale-105 text-gray-700 dark:text-gray-200'
                  : 'mt-0 scale-100'
              }`}
            >
              <Link href={`#${toc.slug}`} onClick={(e) => handleTocClick(e, toc.slug)}>
                {toc.text}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
