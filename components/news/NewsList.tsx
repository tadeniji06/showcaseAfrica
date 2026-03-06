"use client";

import { NewsPost, urlFor } from "@/utils/news";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface NewsListProps {
	posts: NewsPost[];
}

export default function NewsList({ posts }: NewsListProps) {
	if (!posts || posts.length === 0) {
		return (
			<div className='container mx-auto px-6 py-20 text-center'>
				<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
					<Icon
						icon='mdi:newspaper-variant-outline'
						className='text-2xl text-gray-400'
					/>
				</div>
				<h3 className='text-xl font-bold text-gray-900'>
					No news articles found
				</h3>
				<p className='text-gray-500 mt-2'>
					Check back later for updates.
				</p>
			</div>
		);
	}

	const heroPost = posts[0];
	const gridPosts = posts.slice(1);

	return (
		<div className='pb-20 bg-gray-50/20'>
			{/* Hero Section */}
			<section className='container mx-auto px-6 -mt-16 relative z-10 mb-24'>
				<Link
					href={`/news/${heroPost.slug.current}`}
					className='group block relative h-[550px] md:h-[650px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-700 hover:shadow-red-600/20 border border-white/20'
				>
					{heroPost.mainImage ? (
						<Image
							src={urlFor(heroPost.mainImage)
								.width(1600)
								.height(1000)
								.url()}
							alt={heroPost.title}
							fill
							className='object-cover transition-transform duration-[1.5s] group-hover:scale-110'
							priority
						/>
					) : (
						<div className='w-full h-full bg-slate-900 flex items-center justify-center'>
							<Icon
								icon='mdi:newspaper-variant-outline'
								className='text-white/10 text-9xl animate-pulse'
							/>
						</div>
					)}

					<div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100' />

					<div className='absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-20'>
						<div className='max-w-4xl'>
							<div className='flex items-center gap-4 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
								<span className='bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg shadow-xl shadow-red-600/30'>
									Featured Story
								</span>
								<span className='flex items-center gap-2 text-white/80 text-xs md:text-sm font-bold'>
									<Icon
										icon='mdi:calendar-multiselect'
										className='text-red-600 text-lg'
									/>
									{new Date(heroPost.publishedAt).toLocaleDateString(
										"en-US",
										{
											month: "long",
											day: "numeric",
											year: "numeric",
										},
									)}
								</span>
							</div>

							<h2 className='text-3xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75'>
								{heroPost.title}
							</h2>

							{heroPost.excerpt && (
								<p className='text-white/90 text-base md:text-2xl line-clamp-2 md:line-clamp-3 max-w-3xl mb-10 leading-relaxed font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150'>
									{heroPost.excerpt}
								</p>
							)}

							<div className='flex items-center justify-between border-t border-white/20 pt-8 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200'>
								{heroPost.author && (
									<div className='flex items-center gap-4'>
										<div className='relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50 group-hover:ring-red-600 transition-all'>
											{heroPost.author.image ? (
												<Image
													src={urlFor(heroPost.author.image)
														.width(100)
														.height(100)
														.url()}
													alt={heroPost.author.name}
													fill
													className='object-cover'
												/>
											) : (
												<div className='w-full h-full bg-red-600 text-white flex items-center justify-center font-bold text-lg'>
													{heroPost.author.name.charAt(0)}
												</div>
											)}
										</div>
										<div className='flex flex-col'>
											<span className='text-white text-sm font-black tracking-tight'>
												{heroPost.author.name}
											</span>
											<span className='text-white/60 text-[10px] uppercase tracking-widest font-bold'>
												Insight Lead
											</span>
										</div>
									</div>
								)}

								<div className='flex items-center gap-3 text-white font-black text-sm md:text-base uppercase tracking-widest'>
									Read Full Story
									<div className='bg-white text-black rounded-full p-2 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-xl'>
										<Icon
											icon='mdi:arrow-top-right'
											className='text-xl'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</section>

			{/* Grid Section */}
			{gridPosts.length > 0 && (
				<section className='container mx-auto px-6'>
					<div className='flex items-center gap-4 mb-16 px-4'>
						<div className='w-2 h-10 bg-red-600 rounded-full' />
						<h3 className='text-4xl font-black text-gray-900 tracking-tighter uppercase'>
							Latest Reports
						</h3>
						<div className='flex-1 h-px bg-gray-200' />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14'>
						{gridPosts.map((post) => (
							<Link
								href={`/news/${post.slug.current}`}
								key={post._id}
								className='group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100/80 hover:-translate-y-3'
							>
								<div className='relative h-72 w-full overflow-hidden bg-gray-50'>
									{post.mainImage ? (
										<Image
											src={urlFor(post.mainImage)
												.width(800)
												.height(600)
												.url()}
											alt={post.title}
											fill
											className='object-cover transition-transform duration-700 group-hover:scale-110'
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center'>
											<Icon
												icon='mdi:image-off-outline'
												className='text-gray-200 text-6xl'
											/>
										</div>
									)}
									<div className='absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-600 shadow-lg transform group-hover:-translate-y-1 transition-transform'>
										Article
									</div>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
								</div>

								<div className='p-8 lg:p-10 flex flex-col flex-1'>
									<div className='flex items-center gap-2 text-[10px] text-gray-400 mb-5 font-black uppercase tracking-[0.15em]'>
										<Icon
											icon='mdi:calendar-blank'
											className='text-red-600 text-base'
										/>
										{new Date(post.publishedAt).toLocaleDateString(
											"en-US",
											{
												month: "short",
												day: "numeric",
												year: "numeric",
											},
										)}
									</div>

									<h3 className='text-2xl font-black text-gray-900 mb-5 line-clamp-2 leading-[1.2] group-hover:text-red-600 transition-colors duration-300 tracking-tight'>
										{post.title}
									</h3>

									{post.excerpt && (
										<p className='text-gray-500 text-base md:text-lg line-clamp-3 mb-8 flex-1 leading-relaxed font-medium selection:bg-red-600/10'>
											{post.excerpt}
										</p>
									)}

									<div className='mt-auto pt-8 border-t border-gray-50 flex items-center justify-between'>
										{post.author ? (
											<div className='flex items-center gap-3'>
												<div className='relative w-9 h-9 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-50'>
													{post.author.image ? (
														<Image
															src={urlFor(post.author.image)
																.width(48)
																.height(48)
																.url()}
															alt={post.author.name}
															fill
															className='object-cover'
														/>
													) : (
														<div className='w-full h-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-black'>
															{post.author.name.charAt(0)}
														</div>
													)}
												</div>
												<span className='text-xs font-black text-gray-900 uppercase tracking-tighter'>
													{post.author.name}
												</span>
											</div>
										) : (
											<span className='text-[10px] font-black text-gray-300 uppercase tracking-widest'>
												Editorial Team
											</span>
										)}

										<div className='flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0'>
											Full View
											<Icon
												icon='mdi:arrow-right'
												className='text-base'
											/>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
