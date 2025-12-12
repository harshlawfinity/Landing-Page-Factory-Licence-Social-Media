"use client";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";

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
        {category && (
          <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      <div className="p-4">
        {/* ✅ Date • Read Time • Views */}
        <p className="text-xs text-gray-500 mb-2 flex flex-wrap items-center gap-2">
          <span>{date}</span>
          <span>• {readTime}</span>
          <span className="flex items-center gap-1">• <FaRegEye /> {views}</span>
        </p>

        <h3 className="text-lg font-medium mb-1 uppercase">
          {title.split(" ").length > 8
            ? title.split(" ").slice(0, 8).join(" ") + "..."
            : title}
        </h3>
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

export default BlogCard;
