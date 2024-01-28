import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}
export default function Layout(props: LayoutProps) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="grow transition duration-500 bg-white dark:bg-[#111111] text-black dark:text-white">
          <div className="max-w-screen-lg flex flex-col px-10 m-auto">{props.children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
