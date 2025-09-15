"use client";
import { getBlogPosts, urlFor, BlogPost } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
				const allPosts = await getBlogPosts(11); 
				const latestPosts = allPosts.slice(0, 6); 
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
		maxLength: number = 150
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

	if (loading) {
		return (
			<section className='py-20 px-6 lg:px-12 bg-white'>
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
			<section className='py-20 px-6 lg:px-12 bg-white'>
				<div className='max-w-7xl mx-auto text-center'>
					<p className='text-red-600'>{error}</p>
				</div>
			</section>
		);
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<section className='py-20 px-6 lg:px-12 bg-white'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					className='mb-16 text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
						More Stories
					</h2>
					<div className='w-24 h-1 bg-primary-red mx-auto mb-6'></div>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
						Continue exploring our collection of authentic voices and
						compelling narratives from across Africa
					</p>
				</motion.div>

				{posts.length > 0 ? (
					<>
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'
							variants={containerVariants}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
						>
							{posts.map((post, index) => (
								<motion.div key={post._id} variants={itemVariants}>
									<Link
										href={`/posts/${post.slug.current}`}
										className='group block h-full'
									>
										<article className='bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-100'>
											{post.mainImage && (
												<div className='aspect-[4/3] relative overflow-hidden'>
													<Image
														src={urlFor(post.mainImage)
															.width(400)
															.height(300)
															.url()}
														alt={post.title}
														fill
														className='object-cover group-hover:scale-110 transition-transform duration-500'
														sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
													/>
													<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
												</div>
											)}

											<div className='p-6 lg:p-8 flex-1 flex flex-col'>
												{/* Categories */}
												{post.categories &&
													post.categories.length > 0 && (
														<div className='flex flex-wrap gap-2 mb-4'>
															{post.categories
																.slice(0, 2)
																.map((category) => (
																	<span
																		key={category._id}
																		className='px-3 py-1 bg-primary-red/10 text-primary-red text-xs font-semibold rounded-full'
																	>
																		{category.title}
																	</span>
																))}
														</div>
													)}

												{/* Title */}
												<h3 className='text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-red transition-colors duration-200 line-clamp-2 leading-tight'>
													{post.title}
												</h3>

												{/* Excerpt */}
												{post.body && post.body.length > 0 && (
													<div className='mb-6 flex-1'>
														<p className='text-gray-600 leading-relaxed line-clamp-3'>
															{createExcerpt(post.body, 140)}
														</p>
													</div>
												)}

												{/* Meta Info */}
												<div className='flex items-center justify-between pt-4 border-t border-gray-100 mt-auto'>
													<div className='flex items-center gap-4 text-sm text-gray-500'>
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
																	{post.estimatedReadingTime} min
																</span>
															</>
														)}
													</div>

													{post.author && (
														<div className='flex items-center gap-2'>
															{post.author.image && (
																<div className='relative w-6 h-6 rounded-full overflow-hidden'>
																	<Image
																		src={urlFor(post.author.image)
																			.width(24)
																			.height(24)
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
											</div>
										</article>
									</Link>
								</motion.div>
							))}
						</motion.div>

						{/* View All Posts CTA */}
						<motion.div
							className='text-center mt-16'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<Link
								href='/posts'
								className='inline-flex items-center gap-3 bg-primary-red hover:bg-primary-red/90 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
							>
								Explore All Stories
								<Icon
									icon='lucide:arrow-right'
									width={20}
									height={20}
								/>
							</Link>
						</motion.div>
					</>
				) : (
					<motion.div
						className='text-center py-16'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<Icon
							icon='lucide:file-text'
							className='mx-auto mb-6 text-gray-400'
							width={64}
							height={64}
						/>
						<h3 className='text-2xl font-semibold text-gray-600 mb-4'>
							No additional posts available
						</h3>
						<p className='text-gray-500 text-lg'>
							Check back soon for more compelling stories from Africa.
						</p>
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default LatestPosts;
