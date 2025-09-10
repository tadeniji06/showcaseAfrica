"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

// YouTube video data based on your links
const youtubeVideos = [
	{
		id: "fGS785na8g4",
		title:
			"Showcase Africa TV – Episode 4 | Unlocking Opportunities Across Africa",
		description: `Episode 4 of Showcase Africa TV takes you inside Africa’s dynamic industries and creative spaces, showing how innovation, culture, and business are driving the continent forward.

			In this episode, we explore the realities and opportunities shaping Africa today insights you won’t want to miss.`,
		thumbnail: `https://img.youtube.com/vi/fGS785na8g4/maxresdefault.jpg`,
		duration: "28:45",
		publishedDate: "August 2025",
		views: "12K",
		featured: true,
	},
	{
		id: "KqzDZ_Fz4C0",
		title:
			"Nigeria to South Africa,Victoria Adasonla’s Journey in Business /African Business showcase Ep.3",
		description:
			"In this episode of African Business Showcase, we sit with Victoria Adesola, a Nigerian businesswoman making waves in South Africa. She opens up about the realities of running a business across borders and why social entrepreneurship is more than just profit it’s about creating impact that lasts. ",
		thumbnail: `https://img.youtube.com/vi/KqzDZ_Fz4C0/maxresdefault.jpg`,
		duration: "50:20",
		publishedDate: "July 2025",
		views: "8.5K",
	},
	{
		id: "Ef5uu0IHg-s",
		title:
			"Showcase Africa Podcast Ep.2 /Lea Abvajee on Growing& Building a Business in Africa",
		description:
			"In this episode of Showcase Africa, we sit down with Lea Abvajee,influencer, entrepreneur, and inspiring businesswoman, as she shares her journey of growth and how she transformed her passion into a thriving brand and business.",
		thumbnail: `https://img.youtube.com/vi/Ef5uu0IHg-s/maxresdefault.jpg`,
		duration: "42:15",
		publishedDate: "June 2025",
		views: "15K",
	},
	{
		id: "pDG_Ufh1bU0",
		title:
			"Showcase Africa Business Podcast Ep.1/Inside South Africa’s Economy & Market Opportunities",
		description:
			"Showcase Africa Business Podcast Ep.1/Inside South Africa’s Economy & Market Opportunities",
		thumbnail: `https://img.youtube.com/vi/pDG_Ufh1bU0/maxresdefault.jpg`,
		duration: "31:30",
		publishedDate: "May 2025",
		views: "11K",
	},
];

// YouTube Video Modal Component
const VideoModal = ({ videoId, onClose, title }) => {
	if (!videoId) return null;

	return (
		<div className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'>
			<div className='bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh]'>
				{/* Header */}
				<div className='flex items-center justify-between p-4 border-b'>
					<h3 className='font-semibold text-gray-900 truncate'>
						{title}
					</h3>
					<button
						onClick={onClose}
						className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
					>
						<Icon icon='mdi:close' className='w-5 h-5' />
					</button>
				</div>

				{/* Video Container */}
				<div className='relative aspect-video'>
					<iframe
						src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
						title={title}
						className='w-full h-full'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					/>
				</div>

				{/* Footer */}
				<div className='p-4 bg-gray-50 flex items-center justify-between'>
					<a
						href={`https://youtu.be/${videoId}`}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-2 text-red-600 hover:text-red-700 font-medium'
					>
						<Icon icon='mdi:youtube' className='w-5 h-5' />
						Watch on YouTube
					</a>
					<a
						href='https://youtube.com/@showcaseafricatv'
						target='_blank'
						rel='noopener noreferrer'
						className='text-sm text-gray-600 hover:text-gray-800'
					>
						Subscribe to Channel
					</a>
				</div>
			</div>
		</div>
	);
};

// Updated PodcastHero Component
const PodcastHero = () => {
	const [showVideo, setShowVideo] = useState(false);
	const featuredVideo =
		youtubeVideos.find((video) => video.featured) || youtubeVideos[0];

	return (
		<>
			<section className='mt-10 mb-8 bg-gradient-to-br from-red-50 to-gray-100 flex items-center p-6'>
				<div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
					{/* Left: Video Thumbnail */}
					<div className='flex justify-center'>
						<div
							className='relative group cursor-pointer'
							onClick={() => setShowVideo(true)}
						>
							<div className='relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg'>
								<Image
									src={featuredVideo.thumbnail}
									alt={featuredVideo.title}
									width={480}
									height={270}
									className='w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300'
								/>
								{/* Play Button Overlay */}
								<div className='absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors'>
									<div className='bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg'>
										<Icon
											icon='mdi:play'
											className='w-8 h-8 text-white ml-1'
										/>
									</div>
								</div>
								{/* Duration Badge */}
								<div className='absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium'>
									{featuredVideo.duration}
								</div>
							</div>
						</div>
					</div>

					{/* Right: Content */}
					<div className='flex flex-col gap-6'>
						<div className='flex items-center gap-2 text-red-600'>
							<Icon icon='mdi:youtube' className='w-6 h-6' />
							<span className='text-sm font-medium'>
								LATEST EPISODE
							</span>
						</div>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
							{featuredVideo.publishedDate}
						</h2>
						<span className='text-lg text-red-600 font-semibold'>
							{featuredVideo.description}
						</span>
						<p className='text-gray-700 leading-relaxed'>
							Join us as we explore the bold entrepreneurs changing
							how business is done in Africa, featuring inspiring
							stories and insights from across the continent.
						</p>
						<div className='flex flex-col sm:flex-row gap-3'>
							<button
								onClick={() => setShowVideo(true)}
								className='bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-red-700 transition flex items-center gap-2'
							>
								<Icon icon='mdi:play' className='w-5 h-5' />
								Watch Now
							</button>
							<a
								href='https://youtube.com/@showcaseafricatv'
								target='_blank'
								rel='noopener noreferrer'
								className='border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-600 hover:text-white transition flex items-center gap-2 justify-center'
							>
								<Icon icon='mdi:youtube' className='w-5 h-5' />
								Subscribe
							</a>
						</div>
						<div className='flex items-center gap-4 text-sm text-gray-600'>
							<span className='flex items-center gap-1'>
								<Icon icon='mdi:eye' className='w-4 h-4' />
								{featuredVideo.views} views
							</span>
							<span className='flex items-center gap-1'>
								<Icon icon='mdi:clock' className='w-4 h-4' />
								{featuredVideo.duration}
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Video Modal */}
			{showVideo && (
				<VideoModal
					videoId={featuredVideo.id}
					title={featuredVideo.description}
					onClose={() => setShowVideo(false)}
				/>
			)}
		</>
	);
};

// Updated PodcastBody Component
const PodcastBody = () => {
	const [showVideo, setShowVideo] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredVideos = youtubeVideos.filter(
		(video) =>
			video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			video.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<section className='max-w-6xl mx-auto px-6 py-10'>
				{/* Header */}
				<div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
					<div className='flex items-center gap-3'>
						<Icon
							icon='mdi:youtube'
							className='w-8 h-8 text-red-600'
						/>
						<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
							Showcase Africa Episodes
						</h2>
					</div>

					{/* Search */}
					<div className='relative w-full md:w-72'>
						<Icon
							icon='mdi:magnify'
							width={20}
							height={20}
							className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
						/>
						<input
							type='search'
							placeholder='Search episodes...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none'
						/>
					</div>
				</div>

				{/* Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredVideos.map((video, index) => (
						<article
							key={video.id}
							className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md hover:-translate-y-1 group cursor-pointer'
							onClick={() => setShowVideo(video.id)}
						>
							{/* Thumbnail */}
							<div className='relative w-full h-48 overflow-hidden'>
								<Image
									src={video.thumbnail}
									alt={video.title}
									fill
									className='object-cover group-hover:scale-105 transition-transform duration-300'
								/>
								{/* Play Button */}
								<div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
									<div className='bg-red-600 rounded-full p-3'>
										<Icon
											icon='mdi:play'
											className='w-6 h-6 text-white ml-0.5'
										/>
									</div>
								</div>
								{/* Duration */}
								<div className='absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium'>
									{video.duration}
								</div>
								{video.featured && (
									<div className='absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium'>
										Latest
									</div>
								)}
							</div>

							{/* Info */}
							<div className='p-4 flex flex-col gap-3'>
								<div>
									<p className='text-sm text-gray-600 mb-1'>
										{video.title}
									</p>
									<p className='text-base font-semibold text-gray-900 line-clamp-2'>
										{video.description}
									</p>
								</div>
								<div className='flex items-center justify-between text-sm text-gray-500'>
									<span>{video.views} views</span>
									<span>{video.publishedDate}</span>
								</div>
								<button className='mt-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition flex items-center gap-2 justify-center'>
									<Icon icon='mdi:play' className='w-4 h-4' />
									Watch Now
								</button>
							</div>
						</article>
					))}
				</div>

				{/* Channel CTA */}
				<div className='mt-12 text-center'>
					<div className='bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8'>
						<Icon
							icon='mdi:youtube'
							className='w-12 h-12 text-red-600 mx-auto mb-4'
						/>
						<h3 className='text-2xl font-bold text-gray-900 mb-2'>
							Don't miss any episodes!
						</h3>
						<p className='text-gray-600 mb-6'>
							Subscribe to our YouTube channel for the latest content
							on African innovation and culture.
						</p>
						<a
							href='https://youtube.com/@showcaseafricatv'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-700 transition'
						>
							<Icon icon='mdi:youtube' className='w-5 h-5' />
							Subscribe to ShowcaseAfrica TV
						</a>
					</div>
				</div>
			</section>

			{/* Video Modal */}
			{showVideo && (
				<VideoModal
					videoId={showVideo}
					title={
						youtubeVideos.find((v) => v.id === showVideo)?.description
					}
					onClose={() => setShowVideo(null)}
				/>
			)}
		</>
	);
};

// Updated NewPodcast Component
const NewPodcast = () => {
	const [showVideo, setShowVideo] = useState(null);

	// Get the 3 most recent videos (excluding the featured one)
	const recentEpisodes = youtubeVideos
		.filter((video) => !video.featured)
		.slice(0, 3);

	return (
		<>
			<section className='max-w-6xl mx-auto px-4 py-10'>
				{/* Header */}
				<div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-4'>
					{/* Left: Title */}
					<div className='flex items-center gap-3'>
						<div className='bg-red-100 p-2 rounded-xl'>
							<Icon
								icon='mdi:youtube'
								className='w-8 h-8 text-red-600'
							/>
						</div>
						<div>
							<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
								Recent Episodes
							</h2>
							<p className='text-sm text-gray-600 mt-1'>
								From ShowcaseAfrica TV
							</p>
						</div>
					</div>

					{/* Right: CTA */}
					<a
						href='https://youtube.com/@showcaseafricatv'
						target='_blank'
						rel='noopener noreferrer'
						className='bg-red-600 text-white rounded-xl py-3 px-5 text-sm md:text-base font-medium shadow-sm hover:bg-red-700 transition flex items-center gap-2'
					>
						<Icon icon='mdi:youtube' className='w-5 h-5' />
						Subscribe to Channel
					</a>
				</div>

				{/* Episodes Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					{recentEpisodes.map((episode, index) => (
						<article
							key={episode.id}
							className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-lg hover:-translate-y-1 group cursor-pointer'
							onClick={() => setShowVideo(episode.id)}
						>
							{/* Image */}
							<div className='relative w-full h-48 overflow-hidden'>
								<Image
									src={episode.thumbnail}
									alt={episode.title}
									fill
									className='object-cover group-hover:scale-105 transition-transform duration-500'
								/>
								{/* Play Button Overlay */}
								<div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
									<div className='bg-red-600 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform'>
										<Icon
											icon='mdi:play'
											className='w-6 h-6 text-white ml-0.5'
										/>
									</div>
								</div>
								{/* Duration Badge */}
								<div className='absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium'>
									{episode.duration}
								</div>
							</div>

							{/* Content */}
							<div className='p-5'>
								<div className='flex items-start justify-between gap-2 mb-3'>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-800 line-clamp-1 mb-1'>
											{episode.title}
										</h3>
										<p className='text-sm text-gray-600 leading-relaxed line-clamp-2'>
											{episode.description}
										</p>
									</div>
								</div>
								<div className='flex items-center justify-between text-sm text-gray-500 mb-3'>
									<span className='flex items-center gap-1'>
										<Icon icon='mdi:eye' className='w-4 h-4' />
										{episode.views} views
									</span>
									<span>{episode.publishedDate}</span>
								</div>
								<button
									className='w-full bg-red-50 text-red-600 py-2.5 rounded-lg font-medium hover:bg-red-100 transition flex items-center gap-2 justify-center group-hover:bg-red-600 group-hover:text-white'
									onClick={(e) => {
										e.stopPropagation();
										setShowVideo(episode.id);
									}}
								>
									<Icon icon='mdi:play' className='w-4 h-4' />
									Watch Episode
								</button>
							</div>
						</article>
					))}
				</div>
			</section>

			{/* Video Modal */}
			{showVideo && (
				<VideoModal
					videoId={showVideo}
					title={
						youtubeVideos.find((v) => v.id === showVideo)?.description
					}
					onClose={() => setShowVideo(null)}
				/>
			)}
		</>
	);
};

// Export all components
export { PodcastHero, PodcastBody, NewPodcast };

// Default export for demo
const App = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			<PodcastHero />
			<PodcastBody />
			<NewPodcast />
		</div>
	);
};

export default App;
