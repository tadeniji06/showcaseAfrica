import { mag } from "@/assets";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

const LatestMagazines = () => {
	return (
		<section className='max-w-6xl mx-auto px-4 py-10'>
			{/* Header */}
			<div className='flex justify-between items-center mb-8'>
				<div className='flex items-center gap-2 text-primary-red'>
					<Icon icon='lucide:leaf' width={28} height={28} />
					<h2 className='text-xl md:text-2xl font-bold text-gray-900'>
						Latest Magazines
					</h2>
				</div>

				<Link href='/magazines'>
					<button className='text-sm md:text-base font-medium bg-primary-red text-white rounded-lg px-4 py-2 hover:bg-red-600 transition'>
						See all
					</button>
				</Link>
			</div>

			{/* Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
				{[1, 2, 3, 4].map((_, i) => (
					<article
						key={i}
						className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md hover:-translate-y-1'
					>
						<div className='relative w-full h-80'>
							<Image
								src={mag}
								alt={`Magazine cover ${i + 1}`}
								fill
								className='object-cover'
							/>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default LatestMagazines;
