import { hero } from "@/assets";
import Image from "next/image";

const AboutHero = () => {
	return (
		<section className='py-12 px-6 lg:px-12 text-white bg-light-red'>
			<div className='max-w-[1440px] mx-auto'>
				<div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
					<div className='flex-1 text-center lg:text-left'>
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4'>
							Showcasing Africa’s Stories, Voices, and Innovations
						</h1>
						<p className='text-lg md:text-xl leading-relaxed max-w-2xl'>
							we’re a platform that highlights Africa’s culture,
							business, lifestyle, politics, and entertainment for a
							global audiencewe’re a platform that highlights Africa’s
							culture, business, lifestyle, politics, and
							entertainment for a global audience
						</p>
						<button className='bg-white text-primary-red px-5 py-3 rounded-md mt-6 font-semibold hover:bg-gray-100 transition'>
							Connect With Us
						</button>
					</div>
					<div className='flex-1 flex justify-center lg:justify-end'>
						<div className='w-full max-w-md lg:max-w-lg'>
							<Image
								src={hero}
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
export default AboutHero;
