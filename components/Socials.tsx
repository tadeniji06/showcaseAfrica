import { socialLinks } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";

const Socials = () => {
	return (
		<section className='w-full flex flex-col items-center py-6'>
			<h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center'>
				Follow Our Socials
			</h2>

			<div className='flex flex-wrap justify-center gap-5'>
				{socialLinks.map((social, idx) => (
					<a
						key={idx}
						href={social.link}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center w-12 h-12 rounded-full shadow-sm bg-gray-100 hover:bg-primary-red hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110'
						aria-label={social.title}
					>
						<Icon icon={social.icon} className='w-6 h-6' />
					</a>
				))}
			</div>
		</section>
	);
};

export default Socials;
