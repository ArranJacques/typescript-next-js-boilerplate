import { NextSeo } from 'next-seo';
import React, { FC } from 'react';

interface Props {
  canonicalUrl?: string
  description?: string
  openGraphImage?: {
    alt: string
    height: number
    width: number
    url: string
  }
  title?: string
}

const SEO: FC<Props> = ({ canonicalUrl, description, openGraphImage, title }) => {

  const pageTitle = title || 'Hello World';
  const pageDescription = description || undefined;
  const canonical = canonicalUrl || undefined;
  const ogImage = openGraphImage || undefined;

  return <NextSeo
    title={pageTitle}
    canonical={canonical}
    description={pageDescription}
    openGraph={{
      description: pageDescription,
      site_name: 'Hello World',
      title: pageTitle,
      type: 'website',
      url: canonical,
      images: ogImage ? [ogImage] : undefined
    }}
  />;
};

export default SEO;
