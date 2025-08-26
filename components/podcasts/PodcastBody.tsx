import { podcasts } from "@/utils/dummy";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

const PodcastBody = () => {
	return (
		<section className='max-w-6xl mx-auto px-6 py-10'>
			{/* Header */}
			<div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
				<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
					Showcase Africa Podcasts
				</h2>

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
						placeholder='Search editions...'
						className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:outline-none'
					/>
				</div>
			</div>

			{/* Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
				{podcasts.map((mag, index) => (
					<article
						key={index}
						className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md hover:-translate-y-1'
					>
						{/* Cover */}
						<div className='relative w-full h-64'>
							<Image
								src={mag.image}
								alt={`Podcast cover ${mag.title}`}
								fill
								className='object-cover'
							/>
						</div>

						{/* Info */}
						<div className='p-4 flex flex-col gap-2'>
							<p className='text-sm text-gray-600'>{mag.title}</p>
							<p className='text-base font-semibold text-gray-900'>
								{mag.description}
							</p>
							<button className='mt-2 bg-primary-red text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-600 transition'>
								Listen Now
							</button>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};
export default PodcastBody;
