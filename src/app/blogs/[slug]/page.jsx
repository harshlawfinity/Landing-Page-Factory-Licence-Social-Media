import { notFound } from 'next/navigation';
import Script from 'next/script';
import BlogsClientUI from '@/components/BlogsClientUI';

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

const BLOG_WEBSITE_URL = process.env.BLOG_WEBSITE_URL || "https://lawfinity-blogs-webiste-goyd9.ondigitalocean.app";

async function getBlog(slug) {
  const res = await fetch(`${BLOG_WEBSITE_URL}/api/blogs/${slug}`);
  if (!res.ok) return null;
  return await res.json();
}

export async function generateMetadata({ params }) {
  const res = await fetch(`${BLOG_WEBSITE_URL}/api/blogs/${params.slug}`);
  if (!res.ok) return {};

  const blog = await res.json();

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    alternates: {
      canonical: blog.canonicalUrl,
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: blog.canonicalUrl,
      images: [{ url: blog.image }],
    },
  };
}

export default async function BlogDetails({ params }) {
  const blog = await getBlog(params.slug);
  if (!blog) return notFound();

  return (
    <div>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17199345901" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17199345901');
        `}
      </Script>
      <BlogsClientUI key={blog._id} blog={blog} />
    </div>
  );
}
