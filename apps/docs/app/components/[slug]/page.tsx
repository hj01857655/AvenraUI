import { notFound } from 'next/navigation';

import { ComponentDocView } from '../component-doc-view';
import { componentDocList, getComponentDoc } from '../component-docs';

export function generateStaticParams() {
  return componentDocList.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) {
    return {
      title: 'Component not found'
    };
  }

  return {
    title: doc.title
  };
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) {
    notFound();
  }

  const index = componentDocList.findIndex((item) => item.slug === doc.slug);
  const previous = index > 0 ? componentDocList[index - 1] : null;
  const next = index < componentDocList.length - 1 ? componentDocList[index + 1] : null;

  return <ComponentDocView doc={doc} previous={previous} next={next} />;
}
