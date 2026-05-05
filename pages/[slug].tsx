import { getAllPageSlugs, getPageBySlug } from '../lib/service'
import type { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
  page: { title: string; content: string }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPageSlugs()

  const excluded = ['contatti'] // add any slugs with dedicated pages

  return {
    paths: slugs
      .filter(({ slug }) => !excluded.includes(slug))
      .map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = await getPageBySlug(params?.slug as string)
  if (!page) return { notFound: true }
  return { props: { page } }
}

export default function Page({ page }: Props) {
  return (
    <div className="container">
      <header className="text-center my-8 pb-8">
        <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-forest-green-700">{page.title}</h1>
      </header>
        <div className="wp-block-post-content entry-content" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  )
}