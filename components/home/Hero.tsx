import { hero, culture } from "@/assets";
import Image from "next/image";

const Hero = () => {
	return (
		<section className=' py-12 px-6 lg:px-12 text-primary-red'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
					<div className='flex-1 text-center lg:text-left'>
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4'>
							Stories That Shape Africa
						</h1>
						<p className='text-lg md:text-xl leading-relaxed max-w-2xl'>
							Bringing you authentic voices, compelling narratives,
							and insightful analysis from across the African
							continent and different industries
						</p>
					</div>
					<div className='flex-1 flex justify-center lg:justify-end'>
						<div className='w-full max-w-md lg:max-w-lg'>
							<Image
								src={culture}
								alt='Stories from Africa illustration'
								className='w-full h-auto'
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
