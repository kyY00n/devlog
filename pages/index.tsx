import { allPosts } from '@/.contentlayer/generated';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import PostList from '@/components/post/PostList';
export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort((a, b) => {
    const dateDiff = Number(new Date(b.date)) - Number(new Date(a.date));
    return dateDiff === 0 ? b.id - a.id : dateDiff;
  });

  return {
    props: {
      posts: posts.slice(0, 3),
    },
  };
};

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section className="mt-10 mb-5">
        <h1 className="text-2xl sm:text-4xl font-UhbeeSehyun">휘뚜루 마뚜루</h1>
      </section>
      <section className="mb-7 sm:mb-12">
        <p className="sm:text-xl font-UhbeeSehyun">개발하는 이야기</p>
      </section>

      <section className="mt-12 mb-2 sm:mb-5">
        <h1 className="font-bold text-xl sm:text-2xl font-UhbeeSehyun dark:text-neutral-100">
          최근 글
        </h1>
      </section>
      <PostList posts={posts} />
    </>
  );
}
