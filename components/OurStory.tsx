import { Icon } from "@iconify/react/dist/iconify.js";
import { pod } from "@/assets";
import Image from "next/image";

const OurStory = () => {
	return (
		<section className='bg-slate-50 py-20'>
			<div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
				{/* Left: Text */}
				<div className='space-y-6'>
					{/* Title */}
					<div className='flex items-center gap-3 text-primary-red'>
						<Icon icon='lucide:leaf' width={36} height={36} />
						<h2 className='text-4xl md:text-5xl font-extrabold text-gray-900'>
							Our Story
						</h2>
					</div>

					{/* Content */}
					<div className='space-y-5 text-lg text-gray-700 leading-relaxed'>
						<p>
							Founded in 2025, <strong>Showcase Africa Media</strong>{" "}
							emerged from a simple but powerful belief: Africa&apos;s
							voices deserve to be heard by Africans, for the world to
							understand and appreciate. What started as a small team
							of passionate journalists and content creators in Lagos
							has grown into a continental network of storytellers,
							podcasters, and digital innovators committed to changing
							the narrative about Africa.
						</p>
						<p>
							We recognized that mainstream media often portrayed
							Africa through a narrow lens, focusing primarily on
							challenges while overlooking the innovation, creativity,
							and resilience that define our continent.
						</p>
						<p>
							Today, we reach millions of readers and listeners across
							different countries, providing in-depth analysis,
							compelling human interest stories, and thought-provoking
							podcasts that celebrate African excellence while
							addressing real challenges with nuance and context.
						</p>
					</div>
				</div>

				{/* Right: Image */}
				<div className='flex justify-center'>
					<Image
						src={pod}
						alt='Podcast illustration'
						className='rounded-2xl shadow-xl w-full max-w-lg h-auto object-cover'
					/>
				</div>
			</div>
		</section>
	);
};

export default OurStory;
