"use client";

import React from "react";

/**
 * EditorJsRenderer - Renders Editor.js JSON content
 * Supports common block types: paragraph, header, list, quote, code, image, table
 */
export default function EditorJsRenderer({ content }) {
    if (!content || !content.blocks) {
        return <div className="text-gray-500">No content available</div>;
    }

    const renderBlock = (block) => {
        switch (block.type) {
            case "header":
                const HeaderTag = `h${block.data.level}`;
                const headerClasses = {
                    1: "text-4xl font-bold mb-6 mt-8",
                    2: "text-3xl font-semibold mb-5 mt-7",
                    3: "text-2xl font-semibold mb-4 mt-6",
                    4: "text-xl font-medium mb-3 mt-5",
                    5: "text-lg font-medium mb-2 mt-4",
                    6: "text-base font-medium mb-2 mt-3",
                };
                return React.createElement(
                    HeaderTag,
                    { className: headerClasses[block.data.level] || headerClasses[2] },
                    block.data.text
                );

            case "paragraph":
                return (
                    <p
                        className="text-gray-700 mb-4 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: block.data.text }}
                    />
                );

            case "list":
                const ListTag = block.data.style === "ordered" ? "ol" : "ul";
                const listClass =
                    block.data.style === "ordered"
                        ? "list-decimal list-inside mb-4 space-y-2"
                        : "list-disc list-inside mb-4 space-y-2";
                return (
                    <ListTag className={listClass}>
                        {block.data.items.map((item, idx) => (
                            <li
                                key={idx}
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{ __html: item }}
                            />
                        ))}
                    </ListTag>
                );

            case "quote":
                return (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600">
                        <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        {block.data.caption && (
                            <footer className="text-sm text-gray-500 mt-2">
                                — {block.data.caption}
                            </footer>
                        )}
                    </blockquote>
                );

            case "code":
                return (
                    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
                        <code>{block.data.code}</code>
                    </pre>
                );

            case "image":
                return (
                    <figure className="my-6">
                        <img
                            src={block.data.file?.url || block.data.url}
                            alt={block.data.caption || "Image"}
                            className="w-full rounded-lg"
                        />
                        {block.data.caption && (
                            <figcaption className="text-center text-sm text-gray-500 mt-2">
                                {block.data.caption}
                            </figcaption>
                        )}
                    </figure>
                );

            case "table":
                return (
                    <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-gray-300">
                            <tbody>
                                {block.data.content?.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="border-b border-gray-300">
                                        {row.map((cell, cellIdx) => (
                                            <td
                                                key={cellIdx}
                                                className="border border-gray-300 px-4 py-2 text-gray-700"
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "delimiter":
                return <hr className="my-8 border-gray-300" />;

            case "raw":
                return (
                    <div
                        className="my-4"
                        dangerouslySetInnerHTML={{ __html: block.data.html }}
                    />
                );

            case "embed":
                return (
                    <div className="my-6">
                        <iframe
                            src={block.data.embed}
                            className="w-full aspect-video rounded-lg"
                            frameBorder="0"
                            allowFullScreen
                            title={block.data.caption || "Embedded content"}
                        />
                        {block.data.caption && (
                            <p className="text-center text-sm text-gray-500 mt-2">
                                {block.data.caption}
                            </p>
                        )}
                    </div>
                );

            case "warning":
                return (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                        <p className="font-semibold text-yellow-800">{block.data.title}</p>
                        <p className="text-yellow-700">{block.data.message}</p>
                    </div>
                );

            default:
                console.warn(`Unknown block type: ${block.type}`, block);
                return (
                    <div className="bg-gray-100 p-4 rounded my-2 text-sm text-gray-600">
                        Unsupported block type: {block.type}
                    </div>
                );
        }
    };

    return (
        <article className="prose prose-lg max-w-none">
            {content.blocks.map((block, index) => (
                <div key={block.id || index}>{renderBlock(block)}</div>
            ))}
        </article>
    );
}
