import { headerLinks, categories, regions } from "@/utils/data";
import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<div className='bg-primary-red text-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<footer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
					{/* Brand Section */}
					<div className='md:col-span-2 lg:col-span-1 space-y-4'>
						<Link href='/' className='inline-block'>
							<Image
								src={logo}
								alt='Showcase Africa Logo'
								width={150}
								height={50}
								className='h-auto'
							/>
						</Link>
						<p className='text-gray-200 text-sm leading-relaxed max-w-sm'>
							Bringing you authentic voices, compelling narratives,
							and insightful analysis from across the African
							continent and different industries.
						</p>
					</div>

					{/* Company Links */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>Company</h3>
						<nav className='space-y-3'>
							{headerLinks.map((link) => (
								<Link
									key={link.title}
									href={link.link}
									className='block text-gray-200 hover:text-white text-sm transition-colors duration-200 hover:underline'
								>
									{link.title}
								</Link>
							))}
						</nav>
					</div>

					{/* Sections */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>Sections</h3>
						<nav className='space-y-3'>
							{categories.map((category) => (
								<Link
									key={category.title}
									href={category.link}
									className='block text-gray-200 hover:text-white text-sm transition-colors duration-200 hover:underline'
								>
									{category.title}
								</Link>
							))}
						</nav>
					</div>

					{/* Regions */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>Regions</h3>
						<div className='space-y-3'>
							{regions.map((region) => (
								<p
									key={region.title}
									className='text-gray-200 text-sm cursor-default'
								>
									{region.title}
								</p>
							))}
						</div>
					</div>
				</footer>
			</div>

			{/* Bottom Bar */}
			<div className='border-t border-white/20'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-200'>
						<p>
							© {new Date().getFullYear()} Showcase Africa. All rights
							reserved.
						</p>
						<p>
							Developed by{" "}
							<Link
								href='https://olutunmise.vercel.app/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-white hover:underline font-medium transition-colors duration-200'
							>
								Olutunmise
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
