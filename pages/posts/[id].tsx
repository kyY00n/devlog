import { allPosts } from '@/.contentlayer/generated';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import PostLayout from '@/components/post/PostLayout';
import Head from 'next/head';

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{`${post.title}`}</title>
      </Head>
      <PostLayout post={post} />
    </>
  );
};

export const toDate = (date: string) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = allPosts.find((p) => String(p.id) === params?.id);
  return {
    props: {
      post,
    },
  };
};

export default Post;
