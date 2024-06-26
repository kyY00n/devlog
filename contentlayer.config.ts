import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import { Pluggable } from 'unified';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// 원하는 코드 블록 테마가 있다면 찾아서 적용하면 된다.
const options = {
  theme: 'github-dark',
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/posts/*.mdx`,
  fields: {
    id: { type: 'number', required: true },
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    description: { type: 'string', required: true },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
  },
}));

export const Note = defineDocumentType(() => ({
  name: 'Note',
  contentType: 'mdx',
  filePathPattern: `**/notes/*.mdx`,
  fields: {
    id: { type: 'number', required: true },
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
  },
}));

export default makeSource({
  contentDirPath: 'documents',
  documentTypes: [Post, Note],
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, options]] as Pluggable[], // https://stackoverflow.com/questions/77344966/next-js13-contentlayer-syntax-highlight-error-issues
    remarkPlugins: [remarkGfm],
  },
});
