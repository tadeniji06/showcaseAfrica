"use client";
import { BlogPost, urlFor, getRelatedPosts } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PostClientProps {
	post: BlogPost;
}

const PostClient = ({ post }: PostClientProps) => {
	const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchRelatedPosts = async () => {
			if (post.categories && post.categories.length > 0) {
				try {
					setLoading(true);
					const related = await getRelatedPosts(
						post.categories,
						post._id,
						3
					);
					setRelatedPosts(related);
				} catch (error) {
					console.error("Error fetching related posts:", error);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchRelatedPosts();
	}, [post]);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const shareUrl =
		typeof window !== "undefined" ? window.location.href : "";
	const encodedUrl = encodeURIComponent(shareUrl);
	const encodedTitle = encodeURIComponent(post.title);

	const socialLinks = [
		{
			name: "Twitter",
			icon: "lucide:twitter",
			url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
		},
		{
			name: "Facebook",
			icon: "lucide:facebook",
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		},
		{
			name: "LinkedIn",
			icon: "lucide:linkedin",
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		},
		{
			name: "WhatsApp",
			icon: "lucide:message-circle",
			url: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
		},
	];

	const portableTextComponents = {
		types: {
			image: ({ value }: any) => (
				<div className='my-8'>
					<Image
						src={urlFor(value).width(800).height(450).url()}
						alt={value.alt || "Post image"}
						width={800}
						height={450}
						className='rounded-lg w-full h-auto'
					/>
					{value.caption && (
						<p className='text-sm text-gray-600 text-center mt-2 italic'>
							{value.caption}
						</p>
					)}
				</div>
			),
		},
		block: {
			h2: ({ children }: any) => (
				<h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8'>
					{children}
				</h2>
			),
			h3: ({ children }: any) => (
				<h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6'>
					{children}
				</h3>
			),
			h4: ({ children }: any) => (
				<h4 className='text-lg md:text-xl font-semibold text-gray-900 mb-2 mt-4'>
					{children}
				</h4>
			),
			normal: ({ children }: any) => (
				<p className='text-gray-700 leading-relaxed mb-4 text-base md:text-lg'>
					{children}
				</p>
			),
			blockquote: ({ children }: any) => (
				<blockquote className='border-l-4 border-primary-red pl-6 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r-lg'>
					{children}
				</blockquote>
			),
		},
		marks: {
			strong: ({ children }: any) => (
				<strong className='font-bold text-gray-900'>
					{children}
				</strong>
			),
			em: ({ children }: any) => (
				<em className='italic text-gray-700'>{children}</em>
			),
			link: ({ children, value }: any) => (
				<a
					href={value.href}
					target='_blank'
					rel='noopener noreferrer'
					className='text-primary-red hover:text-red-700 underline transition-colors duration-200'
				>
					{children}
				</a>
			),
		},
		list: {
			bullet: ({ children }: any) => (
				<ul className='list-disc pl-6 mb-4 space-y-1'>{children}</ul>
			),
			number: ({ children }: any) => (
				<ol className='list-decimal pl-6 mb-4 space-y-1'>
					{children}
				</ol>
			),
		},
		listItem: {
			bullet: ({ children }: any) => (
				<li className='text-gray-700 leading-relaxed'>{children}</li>
			),
			number: ({ children }: any) => (
				<li className='text-gray-700 leading-relaxed'>{children}</li>
			),
		},
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

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='min-h-screen bg-gray-50'
		>
			{/* Header */}
			<motion.header
				variants={itemVariants}
				className='bg-white border-b border-gray-200'
			>
				<div className='container mx-auto px-6 lg:px-12 py-6'>
					<Link
						href='/posts'
						className='inline-flex items-center gap-2 text-primary-red hover:text-red-700 transition-colors duration-200'
					>
						<Icon icon='lucide:arrow-left' width={20} height={20} />
						Back to Posts
					</Link>
				</div>
			</motion.header>

			{/* Hero Image */}
			{post.mainImage && (
				<motion.div
					variants={itemVariants}
					className='relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden'
				>
					<Image
						src={urlFor(post.mainImage).width(1200).height(600).url()}
						alt={post.title}
						fill
						className='object-cover'
						priority
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
				</motion.div>
			)}

			{/* Main Content */}
			<main className='container mx-auto px-6 lg:px-12 py-12'>
				<div className='max-w-4xl mx-auto'>
					{/* Article Header */}
					<motion.article
						variants={itemVariants}
						className='bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8'
					>
						<header className='mb-8'>
							{/* Categories */}
							{post.categories && post.categories.length > 0 && (
								<div className='flex flex-wrap gap-2 mb-6'>
									{post.categories.map((category) => (
										<span
											key={category._id}
											className='px-3 py-1 bg-primary-red/10 text-primary-red text-sm font-medium rounded-full'
										>
											{category.title}
										</span>
									))}
								</div>
							)}

							{/* Title */}
							<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
								{post.title}
							</h1>

							{/* Meta Information */}
							<div className='flex flex-wrap items-center gap-6 text-gray-600 mb-6'>
								<time
									dateTime={post.publishedAt}
									className='flex items-center gap-2'
								>
									<Icon
										icon='lucide:calendar'
										width={16}
										height={16}
									/>
									{formatDate(post.publishedAt)}
								</time>
								{post.estimatedReadingTime > 0 && (
									<span className='flex items-center gap-2'>
										<Icon
											icon='lucide:clock'
											width={16}
											height={16}
										/>
										{post.estimatedReadingTime} min read
									</span>
								)}
							</div>

							{/* Author */}
							{post.author && (
								<div className='flex items-center gap-4 pb-6 border-b border-gray-200'>
									{post.author.image && (
										<div className='relative w-12 h-12 rounded-full overflow-hidden'>
											<Image
												src={urlFor(post.author.image)
													.width(48)
													.height(48)
													.url()}
												alt={post.author.name}
												fill
												className='object-cover'
											/>
										</div>
									)}
									<div>
										<p className='font-semibold text-gray-900'>
											{post.author.name}
										</p>
										{post.author.bio && (
											<p className='text-sm text-gray-600'>
												{post.author.bio}
											</p>
										)}
									</div>
								</div>
							)}
						</header>

						{/* Article Content */}
						<div className='prose prose-lg max-w-none'>
							<PortableText
								value={post.body}
								components={portableTextComponents}
							/>
						</div>

						{/* Share Buttons */}
						<footer className='mt-12 pt-8 border-t border-gray-200'>
							<div className='flex items-center justify-between flex-wrap gap-4'>
								<h3 className='text-lg font-semibold text-gray-900'>
									Share this post
								</h3>
								<div className='flex items-center gap-3'>
									{socialLinks.map((social) => (
										<a
											key={social.name}
											href={social.url}
											target='_blank'
											rel='noopener noreferrer'
											className='p-3 bg-gray-100 hover:bg-primary-red hover:text-white rounded-full transition-colors duration-200'
											aria-label={`Share on ${social.name}`}
										>
											<Icon
												icon={social.icon}
												width={20}
												height={20}
											/>
										</a>
									))}
								</div>
							</div>
						</footer>
					</motion.article>

					{/* Related Posts */}
					{relatedPosts.length > 0 && (
						<motion.section
							variants={itemVariants}
							className='bg-white rounded-lg shadow-sm p-8'
						>
							<h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center'>
								<Icon
									icon='lucide:bookmark'
									className='mr-3 text-primary-red'
									width={28}
									height={28}
								/>
								Related Posts
							</h2>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{relatedPosts.map((relatedPost, index) => (
									<motion.div
										key={relatedPost._id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										whileHover={{ y: -5 }}
										className='group'
									>
										<Link href={`/posts/${relatedPost.slug.current}`}>
											<article className='bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300'>
												{relatedPost.mainImage && (
													<div className='aspect-video relative overflow-hidden'>
														<Image
															src={urlFor(relatedPost.mainImage)
																.width(300)
																.height(200)
																.url()}
															alt={relatedPost.title}
															fill
															className='object-cover group-hover:scale-105 transition-transform duration-300'
															sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
														/>
													</div>
												)}

												<div className='p-4'>
													<h3 className='font-semibold text-gray-900 group-hover:text-primary-red transition-colors duration-200 line-clamp-2 mb-2'>
														{relatedPost.title}
													</h3>

													<div className='flex items-center gap-4 text-sm text-gray-500'>
														<time dateTime={relatedPost.publishedAt}>
															{formatDate(relatedPost.publishedAt)}
														</time>
														{relatedPost.estimatedReadingTime > 0 && (
															<>
																<span>•</span>
																<span>
																	{relatedPost.estimatedReadingTime}{" "}
																	min read
																</span>
															</>
														)}
													</div>
												</div>
											</article>
										</Link>
									</motion.div>
								))}
							</div>
						</motion.section>
					)}

					{/* Navigation */}
					<motion.div
						variants={itemVariants}
						className='mt-8 text-center'
					>
						<Link
							href='/posts'
							className='inline-flex items-center gap-2 bg-primary-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium'
						>
							<Icon icon='lucide:grid-3x3' width={20} height={20} />
							View All Posts
						</Link>
					</motion.div>
				</div>
			</main>
		</motion.div>
	);
};

export default PostClient;
