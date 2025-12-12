"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/BlogCard";
 import Image from "next/image";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // ← shimmer control
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [filterType, setFilterType] = useState("Most Recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("All");

  const router = useRouter();

  const BLOG_WEBSITE_URL =
    process.env.BLOG_WEBSITE_URL || "https://lawfinity-blogs-webiste-goyd9.ondigitalocean.app";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true); // ← start shimmer
        const res = await fetch(`${BLOG_WEBSITE_URL}/api/published-fl`, {
          cache: "no-store",
        });
        if (!res.ok) {
          console.error("Failed to fetch blogs:", res.status, res.statusText);
          return;
        }
        const data = await res.json();

        console.log("Fetched blogs data:", data);

        if (data?.success) {
          const list = Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.blogs)
            ? data.blogs
            : [];

          const formatted = list.map((blog) => ({
            id: blog._id,
            image: blog.image,
            category: blog.category,
            subCategory: blog.subCategory || "",
            subSubCategory: blog.subSubCategory || "",
            date: new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            readTime: `${Math.ceil(
              (blog.content || "").split(" ").length / 200
            )} min read`,
            title: blog.title,
            summary: blog.metaDescription,
            authorName: blog.author || "Team Lawfinity",
            authorImage: "/authors/default.jpg",
            timestamp: new Date(blog.createdAt).getTime(),
            views: blog.views || 0,
            slug: blog.urlSlug,
            publishAt: blog.publishAt,
          }));

          setBlogs(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false); // ← stop shimmer
      }
    };

    fetchBlogs();
  }, [BLOG_WEBSITE_URL]);

  const categoryOptions = useMemo(() => {
    const set = new Set(
      blogs.map((b) => (b.category || "").trim()).filter(Boolean)
    );
    return ["All", ...Array.from(set).sort()];
  }, [blogs]);

  const subCategoryOptions = useMemo(() => {
    const set = new Set(
      blogs
        .filter(
          (b) => selectedCategory === "All" || b.category === selectedCategory
        )
        .map((b) => (b.subCategory || "").trim())
        .filter(Boolean)
    );
    return ["All", ...Array.from(set).sort()];
  }, [blogs, selectedCategory]);

  const subSubCategoryOptions = useMemo(() => {
    const set = new Set(
      blogs
        .filter(
          (b) =>
            (selectedCategory === "All" || b.category === selectedCategory) &&
            (selectedSubCategory === "All" ||
              b.subCategory === selectedSubCategory)
        )
        .map((b) => (b.subSubCategory || "").trim())
        .filter(Boolean)
    );
    return ["All", ...Array.from(set).sort()];
  }, [blogs, selectedCategory, selectedSubCategory]);

  const filteredPosts = useMemo(() => {
    let filtered = blogs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    if (selectedSubCategory !== "All") {
      filtered = filtered.filter(
        (post) => post.subCategory === selectedSubCategory
      );
    }
    if (selectedSubSubCategory !== "All") {
      filtered = filtered.filter(
        (post) => post.subSubCategory === selectedSubSubCategory
      );
    }

    if (submittedSearch.trim() !== "") {
      const term = submittedSearch.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          (post.summary || "").toLowerCase().includes(term) ||
          (post.category || "").toLowerCase().includes(term) ||
          (post.subCategory || "").toLowerCase().includes(term) ||
          (post.subSubCategory || "").toLowerCase().includes(term)
      );
    }

    if (filterType === "Most Viewed") {
      filtered = filtered.sort((a, b) => b.views - a.views);
    } else {
      filtered =
        sortBy === "Newest"
          ? filtered.sort((a, b) => b.timestamp - a.timestamp)
          : filtered.sort((a, b) => a.timestamp - b.timestamp);
    }

    return filtered;
  }, [
    blogs,
    selectedCategory,
    sortBy,
    submittedSearch,
    filterType,
    selectedSubCategory,
    selectedSubSubCategory,
  ]);

  return (
    <div>
      <BlogHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={() => setSubmittedSearch(searchTerm)}
      />

      <BlogHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={(val) => {
          setSelectedCategory(val);
          setSelectedSubCategory("All");
          setSelectedSubSubCategory("All");
        }}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={(val) => {
          setSelectedSubCategory(val);
          setSelectedSubSubCategory("All");
        }}
        selectedSubSubCategory={selectedSubSubCategory}
        setSelectedSubSubCategory={setSelectedSubSubCategory}
        categoryOptions={categoryOptions}
        subCategoryOptions={subCategoryOptions}
        subSubCategoryOptions={subSubCategoryOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterType={filterType}
        setFilterType={setFilterType}
        visibleCount={filteredPosts.length}
        onClearFilters={() => {
          setSelectedCategory("All");
          setSelectedSubCategory("All");
          setSelectedSubSubCategory("All");
          setSubmittedSearch("");
        }}
      />

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-8">
        {loading ? (
          // Shimmer placeholders
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="cursor-pointer group mt-4">
              <div onClick={() => router.push(`/blogs/${post.slug}`)}>
                <BlogCard
                  image={post.image}
                  category={post.category}
                  date={post.date}
                  readTime={post.readTime}
                  title={post.title}
                  summary={post.summary}
                  authorName={post.authorName}
                  views={post.views}
                />
              </div>
              {/* Category chips under the card */}
              {/* <div className="flex flex-wrap gap-2 mt-2">
                {post.category ? (
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-zinc-100 text-zinc-700 border">
                    {post.category}
                  </span>
                ) : null}
                {post.subCategory ? (
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-zinc-100 text-zinc-700 border">
                    {post.subCategory}
                  </span>
                ) : null}
                {post.subSubCategory ? (
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-zinc-100 text-zinc-700 border">
                    {post.subSubCategory}
                  </span>
                ) : null}
              </div> */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

// --------------------- Components ---------------------

const BlogHero = ({ searchTerm, setSearchTerm, onSearch }) => (
  <section className="relative w-full overflow-hidden pt-28 text-white bg-gradient-to-br from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6]">
    {/* Decorative blobs */}
    <div className="pointer-events-none absolute -top-24 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
      {/* Copy */}
      <div className="md:max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs md:text-sm">
          <span className="h-2 w-2 rounded-full bg-fuchsia-300 inline-block" />
          Curated insights for founders & teams
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
          Level‑up your <span className="underline decoration-fuchsia-300/60 decoration-4 underline-offset-8">legal ops</span>
        </h1>
        <p className="mt-4 text-white/80 text-base md:text-lg max-w-xl">
          Practical explainers on registrations, compliance, and business law—written for startups and fast‑growing SMEs.
        </p>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-stretch gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        >
          <div className="flex items-center gap-2 px-3">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-white/70">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search topics: GST, trademark, contracts…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white placeholder-white/60 flex-1 bg-transparent px-1 py-3 text-sm md:text-base outline-none"
            aria-label="Search blog"
          />
          <button
            type="submit"
            className="px-4 py-3 text-sm md:text-base font-medium rounded-xl bg-white text-violet-800 hover:bg-fuchsia-50 active:scale-[0.99] transition"
          >
            Search
          </button>
        </form>

        {/* Helper links */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/80">
          <span className="opacity-80">Popular:</span>
          {['Company Registration','Trademark','GST','Compliance Calendar'].map((chip) => (
            <span key={chip} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20">{chip}</span>
          ))}
        </div>
      </div>

      {/* Right side card */}
      <div className="w-full md:w-[40%]">
        <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 shadow-2xl">
          <div className="text-sm text-white/70">This week on the Journal</div>
          <div className="mt-3 text-2xl font-semibold leading-snug">How to pick the right entity type in India (2025 guide)</div>
          <div className="mt-3 flex items-center gap-3 text-white/80 text-sm">
            <span className="inline-flex -space-x-2 overflow-hidden">
              <span className="h-6 w-6 rounded-full bg-fuchsia-300/70 border border-white/40" />
              <span className="h-6 w-6 rounded-full bg-pink-300/70 border border-white/40" />
              <span className="h-6 w-6 rounded-full bg-violet-300/70 border border-white/40" />
            </span>
            <span>12k+ reads · ~5 min</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-white/5 border border-white/15 p-3">
              <div className="text-2xl font-semibold">1.2k</div>
              <div className="text-xs text-white/70">Articles</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-3">
              <div className="text-2xl font-semibold">40+</div>
              <div className="text-xs text-white/70">Topics</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-3">
              <div className="text-2xl font-semibold">Trusted</div>
              <div className="text-xs text-white/70">by founders</div>
            </div>
          </div>
          <div className="pointer-events-none absolute -top-8 -right-6 h-28 w-28 rounded-full bg-fuchsia-200/30 blur-2xl" />
        </div>
      </div>
    </div>
  </section>
);

const BlogHeader = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedSubSubCategory,
  setSelectedSubSubCategory,
  categoryOptions,
  subCategoryOptions,
  subSubCategoryOptions,
  sortBy,
  setSortBy,
  filterType,
  setFilterType,
  visibleCount,
  onClearFilters,
}) => {
  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedSubCategory !== "All" ||
    selectedSubSubCategory !== "All";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
      {/* Filter Card */}
      <div className="bg-white/90 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Browse Articles
            </h2>
          </div>

          {/* Meta actions */}
          <div className="flex items-center flex-wrap md:flex-nowrap gap-3">
            <span className="text-sm text-zinc-600">
              Showing{" "}
              <span className="font-medium text-zinc-900">{visibleCount}</span>{" "}
              result{visibleCount === 1 ? "" : "s"}
            </span>
            <div className="hidden md:block h-5 w-px bg-zinc-200" />

            {/* Sort controls (mobile: select, desktop: segmented) */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600">Sort</span>

              {/* Mobile select */}
              <div className="md:hidden relative">
                <select
                  className="appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  aria-label="Sort posts"
                >
                  <option value="Most Recent">Most Recent</option>
                  <option value="Most Viewed">Most Viewed</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-1 text-zinc-500">▾</span>
              </div>

              {/* Desktop segmented control */}
              <div className="hidden md:flex items-center">
                <div className="inline-flex rounded-lg overflow-hidden border border-zinc-200" role="tablist" aria-label="Sort posts">
                  <button
                    onClick={() => setFilterType("Most Recent")}
                    className={`px-3 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 ${
                      filterType === "Most Recent"
                        ? "mainBg text-white"
                        : "bg-white hover:bg-zinc-50"
                    }`}
                    aria-pressed={filterType === "Most Recent"}
                    role="tab"
                    aria-selected={filterType === "Most Recent"}
                  >
                    Most Recent
                  </button>
                  <button
                    onClick={() => setFilterType("Most Viewed")}
                    className={`px-3 py-1.5 text-sm transition border-l border-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 ${
                      filterType === "Most Viewed"
                        ? "mainBg text-white"
                        : "bg-white hover:bg-zinc-50"
                    }`}
                    aria-pressed={filterType === "Most Viewed"}
                    role="tab"
                    aria-selected={filterType === "Most Viewed"}
                  >
                    Most Viewed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category */}
          <label className="block">
            <span className="block text-xs font-medium text-zinc-600 mb-1">
              Category
            </span>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Category filter"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-1 text-zinc-500">
                ▾
              </span>
            </div>
          </label>

          {/* Sub Category */}
          
          <label className="block">
            <span className="block text-xs font-medium text-zinc-600 mb-1">Subcategory</span>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 disabled:bg-zinc-50 disabled:text-zinc-400"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                disabled={subCategoryOptions.length <= 1}
                aria-label="Subcategory filter"
              >
                {subCategoryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-1 text-zinc-500">▾</span>
            </div>
          </label>
         

          {/* Sub-Sub Category */}
          {/*
          <label className="block">
            <span className="block text-xs font-medium text-zinc-600 mb-1">Sub‑subcategory</span>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 disabled:bg-zinc-50 disabled:text-zinc-400"
                value={selectedSubSubCategory}
                onChange={(e) => setSelectedSubSubCategory(e.target.value)}
                disabled={subSubCategoryOptions.length <= 1}
                aria-label="Sub-subcategory filter"
              >
                {subSubCategoryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-1 text-zinc-500">▾</span>
            </div>
          </label>
          */}
        </div>

        {/* Active filters + Clear */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              >
                <span className="font-medium">Category:</span>{" "}
                {selectedCategory}
                <span aria-hidden>×</span>
              </button>
            )}
            {selectedSubCategory !== "All" && (
              <button
                onClick={() => setSelectedSubCategory("All")}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              >
                <span className="font-medium">Sub:</span> {selectedSubCategory}
                <span aria-hidden>×</span>
              </button>
            )}
            {selectedSubSubCategory !== "All" && (
              <button
                onClick={() => setSelectedSubSubCategory("All")}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              >
                <span className="font-medium">Sub‑sub:</span>{" "}
                {selectedSubSubCategory}
                <span aria-hidden>×</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900 underline underline-offset-4"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Skeleton shimmer that matches BlogCard's layout */
const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
    {/* image area */}
    <div className="h-52 w-full bg-gray-200" />

    <div className="p-4 space-y-3">
      {/* meta line */}
      <div className="h-3 w-3/4 bg-gray-200 rounded" />
      {/* title */}
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
      {/* author row */}
      <div className="h-3 w-1/3 bg-gray-200 rounded mt-3" />
    </div>
  </div>
);

export default Page;
