import { allPosts } from '@/.contentlayer/generated';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import PostList from '@/components/PostList';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return {
    props: {
      posts: posts.slice(0, 5),
    },
  };
};

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section className="my-10">
        <h1 className="text-2xl sm:text-4xl font-UhbeeSehyun">{"Hi, I'm Kayoung Yoon."}</h1>
      </section>
      <section className="my-5 mb-12 flex justify-center gap-8 items-center flex-wrap">
        <Image
          src={'/images/profile.jpeg'}
          alt="profile"
          width={150}
          height={150}
          className="rounded-2xl"
        />
        <div className="min-w-[250]">
          <blockquote className="p-4 mb-5 my-2 border-s-4 border-neutral-300 bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-700">
            <p className="text-2xl text-neutral-600 dark:text-white font-jejuMyeonjo">
              {'Greatest things never came from comfort zone.'}
            </p>
          </blockquote>
          <p>안녕하세요. SWE이자 학생 윤가영입니다.</p>
          <p>웹 BE 기술을 주로 공부했으며, FE / Cloud / Infra 등에 관심이 있습니다.</p>
          <p>
            <a href={'https://agilemanifesto.org/iso/ko/manifesto.html'}>애자일 정신</a>과
            클린코드를 의식적으로 연습합니다.
          </p>
          {/*<p>*/}
          {/*  SW 개발의 공유 문화 덕분에 성장했던만큼, 아는 것을 활발히 공유하여 개발 생태계에*/}
          {/*  기여하고 싶습니다.*/}
          {/*</p>*/}
          <div className="flex gap-5 items-center mt-4">
            <a
              href="mailto:dev.kayoung@gmail.com"
              className="flex gap-2 items-center hover:scale-110 transition-transform duration-500 hover:text-rose-400 hover:fill-green-500 dark:fill-white dark:hover:fill-rose-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
              </svg>
              <p className="font-uhbeeZziba text-lg ">Mail</p>
            </a>
            <a
              href="https://github.com/kyY00n"
              className="flex gap-2 items-center transition-transform duration-500 hover:scale-110 hover:text-rose-400 hover:fill-green-500 dark:fill-white dark:hover:fill-rose-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <p className="font-uhbeeZziba text-lg">GitHub</p>
            </a>
          </div>
        </div>
      </section>
      <section className="mt-12 mb-5">
        <h1 className="font-bold text-xl sm:text-2xl font-UhbeeSehyun dark:text-neutral-100">
          Recent Posts
        </h1>
      </section>
      <PostList posts={posts} />
    </>
  );
}
