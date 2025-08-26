import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { episodes } from "@/utils/dummy";

const NewPodcasts = () => {
	return (
		<section className='max-w-6xl mx-auto px-4 py-10'>
			{/* Header */}
			<div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-4'>
				{/* Left: Title */}
				<div className='flex items-center gap-3 text-primary-red'>
					<Icon icon='mdi:podcast' width={36} height={36} />
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
						Podcasts
					</h2>
				</div>

				{/* Right: CTA */}
				<button className='bg-primary-red text-white rounded-xl py-3 px-5 text-sm md:text-base font-medium shadow-sm hover:bg-red-600 transition'>
					Subscribe to our channels
				</button>
			</div>

			{/* Episodes Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{episodes.map((episode, index) => (
					<article
						key={index}
						className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md hover:-translate-y-1'
					>
						{/* Image */}
						<div className='relative w-full h-48'>
							<Image
								src={episode.image}
								alt={episode.title}
								fill
								className='object-cover cursor-pointer'
							/>
						</div>

						{/* Content */}
						<div className='p-5'>
							<div className='flex items-center gap-2 mb-2'>
								<h3 className='text-lg font-semibold text-gray-800'>
									{episode.title}
								</h3>
								<Icon
									className='text-primary-red text-2xl cursor-pointer'
									icon={"ei:play"}
								/>
							</div>
							<p className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
								{episode.description}
							</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default NewPodcasts;
