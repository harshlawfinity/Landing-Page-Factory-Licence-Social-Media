"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { FaPlus, FaMinus } from "react-icons/fa";
import EditorJsRenderer from "./EditorJsRenderer";
import BlogSidebarContactForm from "./BlogSidebarContactForm";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { FaRegCopy, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
 import { IoClose } from "react-icons/io5";

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-md">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50"
      >
        <span className="font-medium text-gray-800">{faq.question}</span>
        <span className="text-blue-600">{open ? <FaMinus /> : <FaPlus />}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-700 text-sm">{faq.answer}</div>
      )}
    </div>
  );
}

export default function BlogsClientUI({ blog }) {
  const [currentUrl, setCurrentUrl] = useState("");
  const hasTrackedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const BLOG_WEBSITE_URL =
    process.env.BLOG_WEBSITE_URL ||
    "https://lawfinity-blogs-webiste-goyd9.ondigitalocean.app";

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }

    if (!hasTrackedRef.current) {
      fetch(`${BLOG_WEBSITE_URL}/api/blogs/by-slug/${blog.urlSlug}/views`, {
        method: "POST",
      });
      hasTrackedRef.current = true;
    }

    const liked = localStorage.getItem(`liked-${blog.urlSlug}`);
    if (liked) {
      setHasLiked(true);
    }
  }, [blog.urlSlug]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `${BLOG_WEBSITE_URL}/api/blogs/by-slug/${blog.urlSlug}/comments?approved=1`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      }
     };
    fetchComments();
  }, [blog.urlSlug]);

  const handleLike = async () => {
    try {
      const res = await fetch(
        `${BLOG_WEBSITE_URL}/api/blogs/by-slug/${blog.urlSlug}/like`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error("Like request failed");

      const data = await res.json();
      setLikes(data.likes);
      localStorage.setItem(`liked-${blog.urlSlug}`, "true");
      setHasLiked(true);
    } catch (err) {
      console.error(err);
      alert("Failed to like the blog.");
    }
  };

  const handleCommentSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("user");
    const email = "";
    const content = formData.get("content");

    const res = await fetch(
      `${BLOG_WEBSITE_URL}/api/blogs/by-slug/${blog.urlSlug}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ name, email, content }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      setShowPopup(true);
      // setTimeout(() => setShowPopup(false), 3001);
      e.target.reset();
      setIsSubmitting(false);
    } else {
      alert("Failed to submit comment.");
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen md:mt-30 mt-24">
      <Head>
        <title>{blog.metaTitle}</title>
        <meta name="description" content={blog.metaDescription} />
        <meta property="og:title" content={blog.metaTitle} />
        <meta property="og:description" content={blog.metaDescription} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:url" content={`https://lawfinity-blogs-webiste-goyd9.ondigitalocean.app/blog/${blog.urlSlug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lawfinity" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.metaTitle} />
        <meta name="twitter:description" content={blog.metaDescription} />
        <meta name="twitter:image" content={blog.image} />
      </Head>
       {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto overflow-hidden">
  {/* 16:9 aspect ratio box */}
  <div className="pt-[56.25%]"></div>

  <img
    src={blog.image}
    alt={blog.title}
    className="absolute inset-0 w-full h-full object-cover brightness-50"
  />

  <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-4 pb-10 text-white max-w-7xl mx-auto">
    <div>
      <span className="bg-white text-black backdrop-blur px-3 py-1 rounded-full md:text-sm text-xs font-medium w-fit mb-3">
        {blog.category}
      </span>
      {blog.subCategory && (
        <>
          <span className="px-2">›</span>
          <span className="bg-white text-black backdrop-blur px-3 py-1 rounded-full md:text-sm text-xs font-medium w-fit mb-3">
            {blog.subCategory}
          </span>
        </>
      )}
      {blog.subSubCategory && (
        <>
          <span className="px-2">›</span>
          <span className="bg-white text-black backdrop-blur px-3 py-1 rounded-full md:text-sm text-xs font-medium w-fit mb-3">
            {blog.subSubCategory}
          </span>
        </>
      )}
    </div>

    <h1 className="text-xl md:text-5xl font-semibold my-3">{blog.title}</h1>
    <p className="md:text-sm text-xs text-gray-300">
      {blog.author || "Unknown"} •{" "}
      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </p>
  </div>
</section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:mt-10 mt-0 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4">
          <EditorJsRenderer
            content={
              typeof blog.content === "string"
                ? JSON.parse(blog.content)
                : blog.content
            }
          />
        </div>
        <aside className="w-full lg:w-1/4 space-y-10 sticky top-20">
          <BlogSidebarContactForm />
        </aside>
      </div>

      {/* Connected Services */}
      {blog.connectedServices?.length > 0 && (
        <section className="max-w-7xl mx-auto py-10 px-4">
          <h2 className="text-2xl font-medium mb-4">Connected Services</h2>
          <ul className="list-disc list-inside">
            {blog.connectedServices.map((service, index) => (
              <li key={index}>
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQs */}
      {blog.faqs?.length > 0 && (
        <section className="max-w-7xl mx-auto py-10 px-4">
          <h2 className="text-2xl font-medium mb-4">FAQs</h2>
          <div className="space-y-4">
            {blog.faqs.map((faq) => (
              <FaqItem key={faq._id} faq={faq} />
            ))}
          </div>
        </section>
      )}

      {/* Related Blogs */}
      {blog.relatedBlog?.length > 0 && (
        <section className="max-w-7xl mx-auto py-10 px-4">
          <h2 className="text-2xl font-medium mb-4">Related Blogs</h2>
          <ul className="list-disc list-inside">
            {blog.relatedBlog.map((slug, index) => (
              <li key={index}>
                <a href={`/blog/${slug}`} className="text-blue-600 underline">
                  {slug.replace(/-/g, " ")}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Like Button */}
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="mt-4">
          {hasLiked ? (
            <p className="text-blue-700 font-medium flex gap-3 items-center">
              Liked <AiTwotoneLike />
            </p>
          ) : (
            <button
              onClick={handleLike}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white flex gap-3 items-center"
            >
              <AiOutlineLike /> Like ({likes})
            </button>
          )}
        </div>
      </div>

      {/* Share Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-lg font-medium mb-2">Share this blog</h2>
        <div className="flex gap4 flex-wrap">
          <button
            onClick={() => {
              navigator.clipboard.writeText(currentUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="text-gray-600 text-3xl px-4 py-2 rounded hover:scale-110 flex items-center gap-2"
          >
            <FaRegCopy />
          {copied && <span className="text-green-500 text-xs  mt-1 absolute -bottom-4 lef t-0">Copied!</span>}
          </button>


          {typeof navigator !== "undefined" && navigator.share && (
            <button
              onClick={() => {
                navigator
                  .share({
                    title: blog.title,
                    text: "Check out this blog!",
                    url: currentUrl,
                  })
                  .catch((err) => console.error("Sharing failed", err));
              }}
              className="text-blue-600  text-3xl px-4 py-2 rounded  "
            >
              <FaRegShareFromSquare />
            </button>
          )}

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800  text-3xl px-4 py-2 rounded  "
          >
            <FaFacebook />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 text-3xl   px-4 py-2 rounded  "
          >
            <FaLinkedin />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500   px-4 py-2 rounded text-3xl"
          >
            <FaTwitter />
          </a>
         
        </div>
      </div>

      {/* Comments Section */}
      <section className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-medium mb-4">Comments</h2>

        {/* Render Comments */}
        <div className="space-y-4 mb-8">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="border rounded p-4 bg-gray-50 shadow-sm"
              >
                <p className="font-semibold text-gray-800">{comment.name}</p>
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <input
            name="user"
            placeholder="Your Name"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            name="content"
            placeholder="Your Comment"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </section>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative">
            <p onClick={()=> setShowPopup(false)} className="absolute text-red-500 top-0 right-0 p-4  text-2xl  cursor-pointer">
            <IoClose />

          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center animate-fadeIn">
            <h3 className="text-lg font-semibold mb-2">Thank you!</h3>
            <p className="text-gray-700">Your comment has been submitted and will appear shortly.</p>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
