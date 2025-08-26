import Image from "next/image";
import { p1 } from "@/assets";

const PodcastHero = () => {
	return (
		<section className='mt-10 mb-8 bg-slate-100 flex items-center p-6'>
			<div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
				{/* Left: Magazine Cover */}
				<div className='flex justify-center'>
					<Image
						src={p1}
						alt='Magazine Cover'
						className='w-full max-w-sm h-auto rounded-xl shadow-lg object-cover'
					/>
				</div>

				{/* Right: Content */}
				<div className='flex flex-col gap-6'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
						August 2025
					</h2>
					<span className='text-lg text-primary-red font-semibold'>
						The Jollof Economy: Startups Redefining West Africa
					</span>
					<p className='text-gray-700 leading-relaxed'>
						In this episode, we explore the bold entrepreneurs
						changing how business is done in Africa.
					</p>
					<button className='self-start bg-primary-red text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-red-600 transition'>
						Watch Now
					</button>
				</div>
			</div>
		</section>
	);
};
export default PodcastHero;
