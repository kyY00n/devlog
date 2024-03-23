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
      posts,
    },
  };
};

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section className="mt-12 mb-10">
        <h1 className="font-bold text-2xl sm:text-4xl font-UhbeeSehyun">Posts</h1>
      </section>
      <PostList posts={posts} />
    </>
  );
}
