import { allPosts } from '@/.contentlayer/generated';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

// todo: 반응형 폰트 사이즈
const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <>
      <div className="mt-10 pb-10 border-b-2 mb-10 prose dark:prose-invert">
        <h1 className="font-extrabold text-4xl -mb-6">{post.title}</h1>
        <h2 className="font-medium text-base dark:text-neutral-300">{toDate(post.date)} 작성</h2>
        <div className="mb-12">{post.tags?.map((tag: string) => toTag(tag))}</div>
        <MDXComponent />
      </div>
      {/*<Utterances />*/}
    </>
  );
};

export const toTag = (tag: string) => {
  return (
    <>
      <span
        className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
        key={tag}
      >
        {tag}
      </span>
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
    paths: allPosts.map((p) => ({ params: { slug: p._raw.flattenedPath } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params?.slug);
  return {
    props: {
      post,
    },
  };
};

export default Post;