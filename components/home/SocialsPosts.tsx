import { Icon } from "@iconify/react/dist/iconify.js";
import { latestPosts } from "@/utils/dummy";

const SocialsPosts = () => {
	return (
		<section className='max-w-6xl mx-auto px-4 py-10'>
			{/* Header */}
			<div className='flex items-center gap-3 mb-8'>
				<Icon
					icon='lucide:leaf'
					className='text-primary-red'
					width={36}
					height={36}
				/>
				<h2 className='text-2xl md:text-4xl font-bold text-gray-900'>
					Social Media Picks
				</h2>
			</div>

			{/* Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{latestPosts.map((post, index) => (
					<article
						key={index}
						className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between transition duration-200 hover:shadow-lg hover:-translate-y-1'
					>
						{/* Time */}
						<p className='text-xs text-gray-400 mb-2'>{post.time}</p>

						{/* Body */}
						<p className='text-sm md:text-base text-gray-700 leading-relaxed line-clamp-4'>
							{post.body}
						</p>

						{/* Call to Action (Optional) */}
						<button className='mt-4 text-primary-red text-sm font-medium hover:underline self-start cursor-pointer'>
							Check Post →
						</button>
					</article>
				))}
			</div>
		</section>
	);
};

export default SocialsPosts;
