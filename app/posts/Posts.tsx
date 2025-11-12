"use client";
import {
	getBlogPosts,
	getCategories,
	urlFor,
	BlogPost,
	Category,
} from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Posts = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<
		string | null
	>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [postsData, categoriesData] = await Promise.all([
					getBlogPosts(5000),
					getCategories(),
				]);
				setPosts(postsData);
				setCategories(categoriesData);
				setFilteredPosts(postsData);
			} catch (err) {
				setError("Failed to load posts");
				console.error("Error fetching posts:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		let filtered = posts;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(post) =>
					post.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					extractTextFromPortableText(post.body)
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			);
		}

		// Filter by category
		if (selectedCategory) {
			filtered = filtered.filter((post) =>
				post.categories?.some(
					(category) => category._id === selectedCategory
				)
			);
		}

		setFilteredPosts(filtered);
	}, [searchTerm, selectedCategory, posts]);

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

		const truncated = fullText.substring(0, maxLength);
		const lastSpaceIndex = truncated.lastIndexOf(" ");

		if (lastSpaceIndex > 0) {
			return truncated.substring(0, lastSpaceIndex) + "...";
		}

		return truncated + "...";
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-gray-50'>
				<div className='container mx-auto px-6 lg:px-12 py-24'>
					<div className='flex items-center justify-center'>
						<div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary-red'></div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen bg-gray-50'>
				<div className='container mx-auto px-6 lg:px-12 py-24 text-center'>
					<p className='text-red-600 text-lg'>{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className='bg-gradient-to-br from-gray-700 via-primary-red to-gray-700 text-white py-20'
			>
				<div className='container mx-auto px-6 lg:px-12'>
					<div className='max-w-4xl mx-auto text-center'>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'
						>
							Stories & Insights
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className='text-xl md:text-2xl mb-8 opacity-90'
						>
							Discover inspiring stories, insights, and perspectives
							from across Africa
						</motion.p>

						{/* Search Bar */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className='max-w-md mx-auto relative'
						>
							<input
								type='text'
								placeholder='Search posts...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full px-4 py-3 pl-12 rounded-lg text-white border-white border-2 focus:outline-none focus:ring-2 focus:ring-white'
							/>
							<Icon
								icon='lucide:search'
								className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
								width={20}
								height={20}
							/>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Filters Section */}
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='py-8 bg-white border-b border-gray-200'
			>
				<div className='container mx-auto px-6 lg:px-12'>
					<div className='flex flex-wrap items-center gap-4'>
						<span className='text-gray-700 font-medium'>
							Filter by category:
						</span>
						<button
							onClick={() => setSelectedCategory(null)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
								!selectedCategory
									? "bg-primary-red text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							All
						</button>
						{categories.map((category) => (
							<button
								key={category._id}
								onClick={() => setSelectedCategory(category._id)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
									selectedCategory === category._id
										? "bg-primary-red text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{category.title}
							</button>
						))}
					</div>
				</div>
			</motion.section>

			{/* Posts Grid */}
			<motion.section
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className='py-16'
			>
				<div className='container mx-auto px-6 lg:px-12'>
					{filteredPosts.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{filteredPosts.map((post, index) => (
								<motion.div
									key={post._id}
									variants={itemVariants}
									whileHover={{ y: -5 }}
									transition={{ duration: 0.3 }}
								>
									<Link
										href={`/posts/${post.slug.current}`}
										className='group block'
									>
										<article className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col'>
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

												{post.categories &&
													post.categories.length > 0 && (
														<div className='flex flex-wrap gap-2 mb-4'>
															{post.categories
																.slice(0, 2)
																.map((category) => (
																	<span
																		key={category._id}
																		className='px-3 py-1 bg-primary-red/10 text-primary-red text-xs font-medium rounded-full'
																	>
																		{category.title}
																	</span>
																))}
														</div>
													)}

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
								</motion.div>
							))}
						</div>
					) : (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='text-center py-12'
						>
							<Icon
								icon='lucide:search-x'
								className='mx-auto mb-4 text-gray-400'
								width={64}
								height={64}
							/>
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>
								No posts found
							</h3>
							<p className='text-gray-600'>
								{searchTerm || selectedCategory
									? "Try adjusting your search or filter criteria."
									: "No posts are available at the moment."}
							</p>
						</motion.div>
					)}
				</div>
			</motion.section>
		</div>
	);
};

export default Posts;
