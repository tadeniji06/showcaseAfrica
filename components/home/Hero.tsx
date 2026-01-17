"use client";

import { getBlogPosts, urlFor, BlogPost } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import HeroBanner from "../HeroBanner";

const Hero = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// FETCH POSTS
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const latestPosts = await getBlogPosts(5);
				setPosts(latestPosts);
			} catch (err) {
				console.error("Error fetching posts:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	// AUTOPLAY
	useEffect(() => {
		if (!isAutoPlaying || posts.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % posts.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [posts.length, isAutoPlaying]);

	// HELPERS
	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

	const extractTextFromPortableText = (body: any[]): string => {
		if (!body || !Array.isArray(body)) return "";

		return body
			.filter((block) => block._type === "block")
			.map(
				(block) =>
					block.children
						?.filter(
							(child: any) => child._type === "span" && child.text
						)
						.map((child: any) => child.text)
						.join("") || ""
			)
			.join(" ")
			.trim();
	};

	const createExcerpt = (body: any[], maxLength = 180): string => {
		const fullText = extractTextFromPortableText(body);
		if (fullText.length <= maxLength) return fullText;

		const short = fullText.substring(0, maxLength);
		const lastSpace = short.lastIndexOf(" ");
		return (
			(lastSpace > 0 ? short.substring(0, lastSpace) : short) + "..."
		);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % posts.length);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prev) => (prev - 1 + posts.length) % posts.length
		);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	// LOADING STATE
	if (loading) {
		return (
			<>
				{/* <HeroBanner /> */}
				<section className='relative h-[80vh] bg-gradient-to-br from-gray-100 to-gray-200'>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='animate-spin rounded-full h-16 w-16 border-b-4 border-primary-red' />
					</div>
				</section>
			</>
		);
	}

	// NO POSTS
	if (posts.length === 0) {
		return (
			<>
				{/* <HeroBanner /> */}
				<section className='relative h-[80vh] bg-gradient-to-br from-primary-red/10 to-primary-red/20 flex items-center justify-center'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold text-primary-red mb-4'>
							Stories That Shape Africa
						</h1>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Bringing you authentic voices, compelling narratives,
							and insightful analysis.
						</p>
					</div>
				</section>
			</>
		);
	}

	// MAIN POST
	const currentPost = posts[currentIndex];
	const categories = currentPost.categories ?? [];

	// MAIN HERO
	return (
		<>
			{/* Banner - Clean separation from hero */}
			{/* <HeroBanner /> */}

			{/* Hero Section - Starts immediately after banner */}
			<section className='relative h-[85vh] min-h-[600px] overflow-hidden bg-black'>
				{/* BACKGROUND IMAGE */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentPost._id}
						initial={{ opacity: 0, scale: 1.1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.8, ease: "easeInOut" }}
						className='absolute inset-0'
					>
						{currentPost.mainImage && (
							<Image
								src={urlFor(currentPost.mainImage)
									.width(1600)
									.height(900)
									.url()}
								alt={currentPost.title}
								fill
								className='object-cover'
								sizes='100vw'
								priority
							/>
						)}

						{/* GRADIENT OVERLAYS */}
						<div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent' />
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
					</motion.div>
				</AnimatePresence>

				{/* CONTENT */}
				<div className='relative z-10 h-full flex items-center'>
					<div className='max-w-7xl mx-auto px-6 lg:px-12 w-full'>
						<div className='max-w-3xl'>
							<AnimatePresence mode='wait'>
								<motion.div
									key={currentPost._id}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -30 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									{/* CATEGORIES */}
									{categories.length > 0 && (
										<div className='flex flex-wrap gap-3 mb-6'>
											{categories.slice(0, 2).map((category) => (
												<span
													key={category._id}
													className='px-4 py-2 bg-primary-red/90 text-white text-sm font-semibold rounded-full'
												>
													{category.title}
												</span>
											))}
										</div>
									)}

									{/* TITLE */}
									<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
										{currentPost.title}
									</h1>

									{/* EXCERPT */}
									{currentPost.body?.length > 0 && (
										<p className='text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl'>
											{createExcerpt(currentPost.body)}
										</p>
									)}

									{/* META */}
									<div className='flex items-center gap-6 mb-8 text-white/80'>
										<time className='flex items-center gap-2'>
											<Icon
												icon='lucide:calendar'
												width={18}
												height={18}
											/>
											{formatDate(currentPost.publishedAt)}
										</time>

										{currentPost.estimatedReadingTime > 0 && (
											<span className='flex items-center gap-2'>
												<Icon
													icon='lucide:clock'
													width={18}
													height={18}
												/>
												{currentPost.estimatedReadingTime} min read
											</span>
										)}

										{currentPost.author && (
											<span className='flex items-center gap-2'>
												<Icon
													icon='lucide:user'
													width={18}
													height={18}
												/>
												{currentPost.author.name}
											</span>
										)}
									</div>

									{/* CTA */}
									<Link
										href={`/posts/${currentPost.slug.current}`}
										className='inline-flex items-center gap-3 bg-primary-red hover:bg-primary-red/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl'
									>
										Read Full Story
										<Icon
											icon='lucide:arrow-right'
											width={20}
											height={20}
										/>
									</Link>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* SLIDER CONTROLS */}
				{posts.length > 1 && (
					<>
						<button
							onClick={prevSlide}
							className='absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all'
							aria-label='Previous slide'
						>
							<Icon
								icon='lucide:chevron-left'
								width={24}
								height={24}
							/>
						</button>

						<button
							onClick={nextSlide}
							className='absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all'
							aria-label='Next slide'
						>
							<Icon
								icon='lucide:chevron-right'
								width={24}
								height={24}
							/>
						</button>

						{/* DOTS */}
						<div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3'>
							{posts.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={`w-3 h-3 rounded-full transition-all ${
										index === currentIndex
											? "bg-white scale-125"
											: "bg-white/40 hover:bg-white/60"
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>

						{/* PROGRESS BAR */}
						<div className='absolute bottom-0 left-0 right-0 z-20 h-1 bg-black/20'>
							<motion.div
								className='h-full bg-primary-red'
								initial={{ width: "0%" }}
								animate={{
									width: isAutoPlaying ? "100%" : "0%",
								}}
								transition={{
									duration: isAutoPlaying ? 5 : 0,
									ease: "linear",
									repeat: isAutoPlaying ? Infinity : 0,
								}}
								key={`progress-${currentIndex}-${isAutoPlaying}`}
							/>
						</div>
					</>
				)}

				{/* SCROLL HINT */}
				<motion.div
					className='absolute bottom-8 left-8 z-20 flex items-center gap-2 text-white/60'
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					<span className='text-sm font-medium'>Scroll for more</span>
					<Icon icon='lucide:chevron-down' width={20} height={20} />
				</motion.div>
			</section>
		</>
	);
};

export default Hero;
