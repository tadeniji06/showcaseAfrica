import { getBlogPost, urlFor } from "@/utils/sanity";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";
import type { Metadata } from "next";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({
	params,
}: Props): Promise<Metadata> {
	const post = await getBlogPost(params.slug);

	if (!post) {
		return {
			title: "Post Not Found | Showcase Africa",
		};
	}

	const extractTextFromPortableText = (body: any[]): string => {
		if (!body || !Array.isArray(body)) return "";

		return body
			.filter((block) => block._type === "block")
			.map((block) => {
				if (block.children && Array.isArray(block.children)) {
					return block.children
						.filter(
							(child: any) => child._type === "span" && child.text
						)
						.map((child: any) => child.text)
						.join("");
				}
				return "";
			})
			.join(" ")
			.trim();
	};

	const createExcerpt = (
		body: any[],
		maxLength: number = 160
	): string => {
		const fullText = extractTextFromPortableText(body);
		if (fullText.length <= maxLength) return fullText;

		const truncated = fullText.substring(0, maxLength);
		const lastSpaceIndex = truncated.lastIndexOf(" ");

		if (lastSpaceIndex > 0) {
			return truncated.substring(0, lastSpaceIndex) + "...";
		}

		return truncated + "...";
	};

	const description = createExcerpt(post.body);
	const imageUrl = post.mainImage
		? urlFor(post.mainImage).width(1200).height(630).url()
		: "/icon.jpg";
	const categories =
		post.categories?.map((cat) => cat.title.toLowerCase()) || [];

	return {
		title: `${post.title} | Showcase Africa`,
		description,
		keywords: [
			...categories,
			"africa",
			"african stories",
			"african insights",
			"showcase africa",
			...(post.author?.name ? [post.author.name] : []),
		],
		authors: post.author ? [{ name: post.author.name }] : undefined,
		creator: post.author?.name || "Showcase Africa Team",
		publisher: "Showcase Africa",
		applicationName: "Showcase Africa",
		alternates: {
			canonical: `https://showcaseafricaonline.com/posts/${post.slug.current}`,
		},
		openGraph: {
			title: post.title,
			description,
			url: `https://showcaseafricaonline.com/posts/${post.slug.current}`,
			siteName: "Showcase Africa",
			type: "article",
			locale: "en_US",
			publishedTime: post.publishedAt,
			authors: post.author ? [post.author.name] : undefined,
			tags: categories,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description,
			creator: "@Showcaseafrica_",
			images: [imageUrl],
		},
		icons: {
			icon: "/icon.jpg",
			shortcut: "/icon.jpg",
			apple: "/icon.jpg",
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

const page = async ({ params }: Props) => {
	const post = await getBlogPost(params.slug);

	if (!post) {
		notFound();
	}

	return <PostClient post={post} />;
};

export default page;
