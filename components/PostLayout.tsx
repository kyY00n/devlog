import Comment from '@/components/Comment';
import { toDate, toTag } from '@/pages/posts/[slug]';
import { useMDXComponent } from 'next-contentlayer/hooks';

interface LayoutProps {
  // children: ReactNode;
  post: any;
}

export default function PostLayout(props: LayoutProps) {
  const { post } = props;
  const MDXComponent = useMDXComponent(post.body.code);

  return (
    <>
      <div>
        {/*<div className="flex flex-col h-screen">*/}
        <main>
          {/*<main className="grow transition duration-500 bg-white dark:bg-[#111111] text-black dark:text-white">*/}
          {/*<div>{props.children}</div>*/}
          <div className="mt-10 pb-10 border-b-2 mb-10 prose dark:prose-invert">
            <h1 className="font-extrabold text-4xl -mb-6">{post.title}</h1>
            <h2 className="font-medium text-base dark:text-neutral-300">
              {toDate(post.date)} 작성
            </h2>
            <div className="mb-12">{post.tags?.map((tag: string) => toTag(tag))}</div>
            <MDXComponent />
          </div>
          {/*<div className="max-w-screen-md flex flex-col px-10 m-auto">{props.children}</div>*/}
        </main>
        <Comment />
      </div>
    </>
  );
}
