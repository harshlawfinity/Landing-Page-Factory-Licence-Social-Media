"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";

const BlogSection = () => {
  const BLOG_WEBSITE_URL =
    process.env.BLOG_WEBSITE_URL ||
    "https://lawfinity-blogs-webiste-goyd9.ondigitalocean.app";

  const [blogs, setBlogs] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  const visibleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;

  const truncateSummary = (text, wordLimit = 7) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BLOG_WEBSITE_URL}/api/blogs`);
        const data = await res.json();

        if (data.success) {
          const formatted = data.blogs.map((blog) => ({
            id: blog._id,
            likes: blog.likes,
            views: blog.views,
            title: blog.title,
            summary: blog.metaDescription,
            author: blog.author || "Unknown",
            date: new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            image: blog.image,
            slug: blog.urlSlug,
          }));

          setBlogs(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch blog data", err);
      }
    };

    fetchBlogs();
  }, [cardIndex]);

  const maxCardIndex = blogs.length - visibleCount;

  useEffect(() => {
    if (!blogs.length || isPaused) return;
    const interval = setInterval(() => {
      setCardIndex((prev) => (prev >= maxCardIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [blogs, isPaused, maxCardIndex]);

  useEffect(() => {
    if (containerRef.current && blogs.length) {
      const shift = (100 / blogs.length) * cardIndex;
      containerRef.current.style.transform = `translateX(-${shift}%)`;
    }
  }, [cardIndex, blogs.length]);

  const handlePrev = () => {
    setCardIndex((prev) => (prev === 0 ? maxCardIndex : prev - 1));
  };

  const handleNext = () => {
    setCardIndex((prev) => (prev >= maxCardIndex ? 0 : prev + 1));
  };

  if (blogs.length === 0) return null;

  return (
    <section
      className="py-6 border-t bg-[#F5F5F5] px-4 mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
       <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-lime-200 text-sm font-medium px-4 py-1 rounded-full mb-4">
            Blog
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-2">
            Fresh Insights From Our Blog
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Stay ahead with the latest trends, industry updates and practical
            business solutions.
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <FaChevronRight />
          </button>

          <div className="overflow-hidden w-full">
            <div
              ref={containerRef}
              className="flex transition-transform duration-700 ease-in-out"
              style={{ width: `${(blogs.length * 100) / visibleCount}%` }}
            >
              {blogs.map((post, i) => (
                <div
                  key={i}
                  className="w-full sm:w-1/2 lg:w-1/3 px-2 cursor-pointer"
                  onClick={() => router.push(`/blogs/${post.slug}`)}
                >
                  <BlogCard
                    image={post.image}
                    category={post.category}
                    date={post.date}
                    readTime={post.readTime}
                    title={post.title}
                    summary={post.summary}
                    authorName={post.author}
                    views={post.likes}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: blogs.length - visibleCount + 1 }).map(
              (_, i) => (
                <span
                  key={i}
                  onClick={() => setCardIndex(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    i === cardIndex
                      ? "bg-blue-600 scale-110"
                      : "bg-blue-300 opacity-50"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 mb-4">
          <Link
            href="/blogs"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            See All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

const BlogCard = ({
  image,
  category,
  date,
  readTime,
  title,
  summary,
  authorName,
  authorImage,
  views = 0, // ✅ New prop
}) => {
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="relative h-52 w-full">
        <img
          src={image}
          alt={title}
          fill
          className="w-full object-cover h-52"
        />
        {/* <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span> */}
      </div>

      <div className="p-4">
        {/* ✅ Date • Read Time • Views */}
        <p className="text-xs text-gray-500 mb-2 flex flex-wrap items-center gap-2">
          <span>{date}</span>
          <span></span>
           <span className="flex items-center gap-1">
           </span>
        </p>

        <h3 className="text- font-medium mb-1 uppercase">{(title)}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{summary}</p>

         <div className="flex items-center justify-between w-full gap-2 text-xs mt-4">
          <p className="text-sm font-medium text-gray-500">{authorName}</p>
          
        <p className=" text-blue-600 font-medium  text-base  underline cursor-pointer">
          Read More →
        </p>
        </div>
      </div>
    </div>
  );
};
