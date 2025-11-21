import { saMag, savm } from "@/assets";
import Image from "next/image";

const MagazineHero = () => {
	return (
		<section className='min-h-screen bg-slate-100 flex items-center mb-5'>
			<div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
				{/* Left: Magazine Cover */}
				<div className='flex justify-center'>
					<Image
						src={saMag}
						alt='Magazine Cover'
						className='w-full max-w-sm h-auto rounded-xl shadow-lg object-cover'
					/>
				</div>

				{/* Right: Content */}
				<div className='flex flex-col gap-6'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
						October 2025
					</h2>
					<span className='text-lg text-primary-red font-semibold'>
						Enjoy exclusive content with Showcase Africa Magazine
					</span>
					<p className='text-gray-700 leading-relaxed'>
						Discover Africa through its vibrant blend of culture,
						innovation, and creativity — from entertainment and
						entrepreneurship to fashion, tech, and beyond. Showcase
						Africa celebrates the stories shaping the continent’s
						pulse.
					</p>

					{/* Download Button */}
					<a
						href='/SAmagazine.pdf'
						download='Showcase_Africa_Magazine_October_2025.pdf'
						className='self-start bg-primary-red text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-red-600 transition'
					>
						Download Now
					</a>
				</div>
			</div>
		</section>
	);
};

export default MagazineHero;
