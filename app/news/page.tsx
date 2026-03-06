import { getNewsPosts } from "@/utils/news";
import NewsList from "@/components/news/NewsList";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Newsroom - Showcase Africa",
	description: "Latest news and updates from Showcase Africa.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function NewsPage() {
	const posts = await getNewsPosts(21); // Fetch 21 items (1 hero + 20 grid)

	return (
		<main className='min-h-screen bg-white'>
			{/* Header */}
			<div className='bg-black text-white py-20 lg:py-32 relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90' />
				<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

				<div className='container mx-auto px-6 relative z-10 text-center'>
					<span className='text-red-600 font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in'>
						Stay Informed
					</span>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight'>
						Newsroom
					</h1>
					<p className='text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed'>
						The latest updates, press releases, and announcements from
						our team.
					</p>
				</div>

				{/* Decorative elements */}
				<div className='absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none' />
				<div className='absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none' />
			</div>

			<NewsList posts={posts} />
		</main>
	);
}
