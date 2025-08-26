"use client";
import { getBlogPosts, urlFor, BlogPost } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const LatestPosts = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const latestPosts = await getBlogPosts(6);
				setPosts(latestPosts);
			} catch (err) {
				setError("Failed to load posts");
				console.error("Error fetching posts:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Function to extract plain text from Portable Text
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

	// Function to create a preview excerpt
	const createExcerpt = (
		body: any[],
		maxLength: number = 150
	): string => {
		const fullText = extractTextFromPortableText(body);
		if (fullText.length <= maxLength) return fullText;

		// Find the last complete word within the limit
		const truncated = fullText.substring(0, maxLength);
		const lastSpaceIndex = truncated.lastIndexOf(" ");

		if (lastSpaceIndex > 0) {
			return truncated.substring(0, lastSpaceIndex) + "...";
		}

		return truncated + "...";
	};

	if (loading) {
		return (
			<section className='py-16 px-6 lg:px-12 bg-gray-50'>
				<div className='max-w-7xl mx-auto'>
					<div className='flex items-center justify-center'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red'></div>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='py-16 px-6 lg:px-12 bg-gray-50'>
				<div className='max-w-7xl mx-auto text-center'>
					<p className='text-red-600'>{error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className='py-16 px-6 lg:px-12 bg-gray-50'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center'>
						<Icon
							icon='lucide:leaf'
							className='mr-3 text-primary-red'
							width={32}
							height={32}
						/>
						Latest Posts
					</h2>
					<p className='text-lg text-gray-600 max-w-2xl'>
						Stay updated with our most recent stories and insights
						from across Africa
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{posts.map((post) => (
						<Link
							key={post._id}
							href={`/posts/${post.slug.current}`}
							className='group'
						>
							<article className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col'>
								{post.mainImage && (
									<div className='aspect-video relative overflow-hidden'>
										<Image
											src={urlFor(post.mainImage)
												.width(400)
												.height(250)
												.url()}
											alt={post.title}
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-300'
											sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
										/>
									</div>
								)}

								<div className='p-6 flex-1 flex flex-col'>
									<div className='flex items-center gap-4 mb-3 text-sm text-gray-500'>
										<time dateTime={post.publishedAt}>
											{formatDate(post.publishedAt)}
										</time>
										{post.estimatedReadingTime > 0 && (
											<>
												<span>•</span>
												<span className='flex items-center gap-1'>
													<Icon
														icon='lucide:clock'
														width={14}
														height={14}
													/>
													{post.estimatedReadingTime} min read
												</span>
											</>
										)}
									</div>

									<h3 className='text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-red transition-colors duration-200 line-clamp-2'>
										{post.title}
									</h3>

									{post.categories && post.categories.length > 0 && (
										<div className='flex flex-wrap gap-2 mb-4'>
											{post.categories.slice(0, 2).map((category) => (
												<span
													key={category._id}
													className='px-3 py-1 bg-primary-red/10 text-primary-red text-xs font-medium rounded-full'
												>
													{category.title}
												</span>
											))}
										</div>
									)}

									{/* Post content preview */}
									{post.body && post.body.length > 0 && (
										<div className='mb-4 flex-1'>
											<p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
												{createExcerpt(post.body, 120)}
											</p>
										</div>
									)}

									{post.author && (
										<div className='flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto'>
											{post.author.image && (
												<div className='relative w-8 h-8 rounded-full overflow-hidden'>
													<Image
														src={urlFor(post.author.image)
															.width(32)
															.height(32)
															.url()}
														alt={post.author.name}
														fill
														className='object-cover'
													/>
												</div>
											)}
											<span className='text-sm text-gray-600 font-medium'>
												{post.author.name}
											</span>
										</div>
									)}
								</div>
							</article>
						</Link>
					))}
				</div>

				{posts.length === 0 && (
					<div className='text-center py-12'>
						<Icon
							icon='lucide:file-text'
							className='mx-auto mb-4 text-gray-400'
							width={48}
							height={48}
						/>
						<p className='text-gray-600 text-lg'>
							No posts available at the moment.
						</p>
					</div>
				)}

				{posts.length > 0 && (
					<div className='text-center mt-12'>
						<Link
							href='/posts'
							className='inline-flex items-center gap-2 bg-primary-red text-white px-8 py-3 rounded-lg hover:bg-primary-red/90 transition-colors duration-200 font-medium'
						>
							View All Posts
							<Icon
								icon='lucide:arrow-right'
								width={20}
								height={20}
							/>
						</Link>
					</div>
				)}
			</div>
		</section>
	);
};

export default LatestPosts;
