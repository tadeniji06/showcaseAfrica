import React from "react";
import { Icon } from "@iconify/react";
import {
	bizz,
	culture,
	ent,
	politics,
	sports,
	travel,
} from "@/assets";
import Image from "next/image";
import Link from "next/link";

const mockImages = {
	bizz: bizz,
	culture: culture,
	entertainment: ent,
	politics: politics,
	sports: sports,
	travel: travel,
};

// Define the props interface
interface CategoryCardProps {
	icon: string;
	title: string;
	image: any;
	description: string;
	detailedDescription: string;
	articleCount: number;
	spotlights: string[];
	trending?: boolean;
	className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
	icon,
	title,
	image,
	description,
	detailedDescription,
	articleCount,
	spotlights,
	trending = false,
	className = "",
}) => {
	return (
		<section
			className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white shadow-lg lg:shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] mb-8 lg:mb-12 ${className}`}
		>
			{/* Trending Badge */}
			{trending && (
				<div className='absolute top-3 right-3 lg:top-6 lg:right-6 z-20 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg'>
					<Icon
						icon='mdi:trending-up'
						className='w-3 h-3 lg:w-4 lg:h-4'
					/>
					<span className='hidden sm:inline'>Trending Now</span>
					<span className='sm:hidden'>Hot</span>
				</div>
			)}

			{/* Mobile-First Layout: Image First, then Content */}
			<div className='flex flex-col lg:flex-row'>
				{/* Image Section - Appears first on mobile */}
				<div className='w-full lg:w-96 xl:w-[480px] relative lg:order-2'>
					<div className='h-48 sm:h-56 lg:h-full relative overflow-hidden lg:rounded-r-3xl'>
						<Image
							src={image}
							alt={title}
							className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000'
						/>
						<div className='absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/50 via-black/10 to-transparent lg:from-black/40' />

						{/* Stats Overlay - Simplified on mobile */}
						<div className='absolute bottom-3 left-3 right-3 lg:bottom-6 lg:left-6 lg:right-6'>
							<div className='bg-white/95 backdrop-blur-sm rounded-lg lg:rounded-xl p-3 lg:p-4'>
								<div className='flex items-center justify-between text-xs lg:text-sm'>
									<div className='flex items-center gap-2 lg:gap-4'>
										<span className='flex items-center gap-1 text-gray-700'>
											<Icon
												icon='mdi:clock-outline'
												className='w-3 h-3 lg:w-4 lg:h-4 text-[#990100]'
											/>
											5 min
										</span>
										<span className='flex items-center gap-1 text-gray-700'>
											<Icon
												icon='mdi:heart'
												className='w-3 h-3 lg:w-4 lg:h-4 text-[#990100]'
											/>
											{Math.floor(Math.random() * 500) + 100}
										</span>
									</div>
									<div className='flex items-center gap-1 lg:gap-2'>
										<div className='w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-[#990100]'></div>
										<div className='w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-[#ce3a3a] -ml-1 lg:-ml-2'></div>
										<div className='w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-orange-500 -ml-1 lg:-ml-2'></div>
										<span className='ml-1 lg:ml-2 text-xs font-semibold'>
											<span className='hidden sm:inline'>
												+24 contributors
											</span>
											<span className='sm:hidden'>+24</span>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Content Section - Appears after image on mobile */}
				<div className='flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 lg:order-1'>
					{/* Header */}
					<div className='flex items-start sm:items-center gap-3 lg:gap-4 mb-4 lg:mb-6'>
						<div className='w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br from-[#990100] to-[#ce3a3a] flex items-center justify-center shadow-lg lg:shadow-xl group-hover:scale-110 transition-transform duration-500 flex-shrink-0'>
							<Icon
								icon={icon}
								className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white'
							/>
						</div>
						<div className='flex-1 min-w-0'>
							<h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 group-hover:text-[#990100] transition-colors duration-300 leading-tight'>
								{title}
							</h2>
							<p className='text-sm sm:text-base lg:text-lg text-gray-600 mt-1'>
								{articleCount} exclusive stories
							</p>
						</div>
					</div>

					{/* Description */}
					<div className='mb-6 lg:mb-8'>
						<p className='text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-3 lg:mb-4'>
							{description}
						</p>
						<p className='text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed'>
							{detailedDescription}
						</p>
					</div>

					{/* Spotlights */}
					<div className='mb-6 lg:mb-8'>
						<h3 className='text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2'>
							<Icon
								icon='mdi:star'
								className='w-4 h-4 lg:w-5 lg:h-5 text-[#990100]'
							/>
							Featured Spotlights
						</h3>
						<div className='flex flex-wrap gap-2 lg:gap-3'>
							{spotlights.map((spotlight, index) => (
								<span
									key={index}
									className='px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-[#990100]/10 to-[#ce3a3a]/10 text-[#990100] rounded-full text-xs sm:text-sm font-semibold border border-[#990100]/20 hover:bg-gradient-to-r hover:from-[#990100] hover:to-[#ce3a3a] hover:text-white transition-all duration-300 cursor-pointer'
								>
									{spotlight}
								</span>
							))}
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-3 lg:gap-4'>
						<Link href={"/posts"} className='flex-1 sm:flex-initial'>
							<button className='w-full sm:w-auto flex items-center justify-center gap-2 lg:gap-3 bg-gradient-to-r from-[#990100] to-[#ce3a3a] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg lg:rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
								<Icon
									icon='mdi:eye'
									className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6'
								/>
								<span className='sm:hidden'>Explore</span>
								<span className='hidden sm:inline'>
									Explore Stories
								</span>
							</button>
						</Link>
						<button className='w-full sm:w-auto flex items-center justify-center gap-2 lg:gap-3 bg-white border-2 border-[#990100] text-[#990100] px-6 py-3 sm:px-8 sm:py-4 rounded-lg lg:rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-[#990100] hover:text-white transition-all duration-300'>
							<Icon
								icon='mdi:bookmark-outline'
								className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6'
							/>
							<span className='sm:hidden'>Save</span>
							<span className='hidden sm:inline'>Save Category</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

// Business Component
const Business: React.FC = () => {
	return (
		<CategoryCard
			icon='mdi:business'
			title='Business & Finance'
			image={mockImages.bizz}
			description='Discover the entrepreneurial spirit driving Africa forward with comprehensive coverage of business innovations, financial markets, and economic development across the continent.'
			detailedDescription='From startup ecosystems in Lagos and Nairobi to mining operations in South Africa, we showcase the diverse business landscape that defines modern Africa. Our coverage includes market analysis, investment opportunities, and profiles of business leaders shaping the future of African commerce.'
			articleCount={247}
			spotlights={[
				"Fintech Revolution",
				"Investment Opportunities",
				"Startup Ecosystem",
				"Mining & Resources",
				"Banking Innovation",
				"Trade & Commerce",
			]}
			trending={true}
		/>
	);
};

// Culture Component
const Culture: React.FC = () => {
	return (
		<CategoryCard
			icon='mdi:palette'
			title='Arts & Culture'
			image={mockImages.culture}
			description='Immerse yourself in the rich tapestry of African culture, from traditional heritage to contemporary artistic expressions that captivate global audiences.'
			detailedDescription='Experience the vibrant world of African arts, music, literature, and cultural traditions. We celebrate both ancestral wisdom and modern creative movements, showcasing how African culture continues to influence and inspire worldwide artistic communities.'
			articleCount={189}
			spotlights={[
				"Traditional Arts",
				"Modern Literature",
				"Music & Dance",
				"Film & Cinema",
				"Fashion Design",
				"Cultural Heritage",
			]}
		/>
	);
};

// Entertainment Component
const Entertainment: React.FC = () => {
	return (
		<CategoryCard
			icon='mdi:movie'
			title='Entertainment'
			image={mockImages.entertainment}
			description='Stay connected with the pulse of African entertainment, from Nollywood blockbusters to Afrobeats sensations taking the world by storm.'
			detailedDescription='Dive into the dynamic entertainment industry across Africa, featuring exclusive interviews with celebrities, behind-the-scenes content, movie reviews, music releases, and coverage of entertainment events that showcase African talent on the global stage.'
			articleCount={356}
			spotlights={[
				"Nollywood Films",
				"Afrobeats Music",
				"Celebrity Interviews",
				"Entertainment Events",
				"Streaming Content",
				"Awards & Recognition",
			]}
			trending={true}
		/>
	);
};

// Politics Component
const Politics: React.FC = () => {
	return (
		<CategoryCard
			icon='mdi:account-group'
			title='Politics & Governance'
			image={mockImages.politics}
			description='Navigate the complex political landscape of Africa with in-depth analysis of governance, policy developments, and democratic processes shaping the continent.'
			detailedDescription='Our political coverage provides balanced reporting on governmental affairs, election updates, policy analysis, and diplomatic relations. We examine how political decisions impact communities and explore the evolving democratic institutions across African nations.'
			articleCount={198}
			spotlights={[
				"Democratic Processes",
				"Policy Analysis",
				"International Relations",
				"Governance Reform",
				"Election Coverage",
				"Pan-African Unity",
			]}
		/>
	);
};

// Sports Component
const Sports: React.FC = () => {
	return (
		<CategoryCard
			icon='mdi:soccer'
			title='Sports & Athletics'
			image={mockImages.sports}
			description='Celebrate African athletic excellence with comprehensive coverage of sports achievements, from local competitions to international championships.'
			detailedDescription='Follow the journey of African athletes as they excel in various sports disciplines. Our coverage spans from football leagues across the continent to Olympic achievements, providing insights into training, competitions, and the growing sports infrastructure in Africa.'
			articleCount={412}
			spotlights={[
				"Football Leagues",
				"Olympic Champions",
				"Athletics & Running",
				"Basketball Growth",
				"Rugby Development",
				"Sports Infrastructure",
			]}
		/>
	);
};

// Travel Component
const Travel: React.FC = () => {
	return (
		<CategoryCard
			icon='mdi:airplane'
			title='Travel & Tourism'
			image={mockImages.travel}
			description='Explore the breathtaking destinations across Africa, from pristine beaches to magnificent wildlife reserves and vibrant cultural centers.'
			detailedDescription='Discover Africa through our comprehensive travel guides, featuring hidden gems, luxury destinations, adventure tourism, and cultural experiences. We highlight sustainable tourism practices and showcase the natural beauty and hospitality that make Africa a premier travel destination.'
			articleCount={156}
			spotlights={[
				"Safari Adventures",
				"Beach Destinations",
				"Cultural Tours",
				"Adventure Tourism",
				"Eco-Tourism",
				"Luxury Resorts",
			]}
		/>
	);
};

const App: React.FC = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
			{/* Header Section */}
			<div className='bg-gradient-to-r from-[#990100] to-[#ce3a3a] text-white py-8 sm:py-12 lg:py-16'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<div className='flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6'>
						<Icon
							icon='mdi:africa'
							className='w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12'
						/>
						<h1 className='text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold'>
							ShowcaseAfrica
						</h1>
					</div>
					<p className='text-sm sm:text-lg lg:text-xl xl:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed px-4'>
						Your premier destination for authentic African stories,
						celebrating the continent's rich diversity, innovation,
						and cultural heritage through comprehensive journalism.
					</p>
				</div>
			</div>

			{/* Categories Section */}
			<div className='max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
				<div className='flex flex-col space-y-0'>
					<Business />
					<Culture />
					<Entertainment />
					<Politics />
					<Sports />
					<Travel />
				</div>
			</div>

			{/* Footer */}
			<div className='bg-gray-900 text-white py-6 sm:py-8 lg:py-12'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<div className='flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 lg:mb-4'>
						<Icon
							icon='mdi:africa'
							className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#990100]'
						/>
						<span className='text-lg sm:text-xl lg:text-2xl font-bold'>
							ShowcaseAfrica
						</span>
					</div>
					<p className='text-xs sm:text-sm lg:text-base text-gray-400 px-4'>
						Celebrating African Excellence • Connecting Communities •
						Inspiring the World
					</p>
				</div>
			</div>
		</div>
	);
};

export default App;
