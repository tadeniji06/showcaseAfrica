"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { showcaseCategories } from "@/utils/data";

const CategoryGrid = () => {
	return (
		<section className='py-20 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<span className='text-red-600 font-semibold tracking-wider uppercase text-sm mb-3 block'>
							Explore Categories
						</span>
						<h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							Showcasing Africa
						</h2>
						<p className='text-lg text-gray-600 leading-relaxed'>
							From business and politics to culture and entertainment
							— discover the stories that matter across the continent.
						</p>
					</motion.div>
				</div>

				{/* Categories Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{showcaseCategories.map((category, index) => (
						<motion.div
							key={category.slug}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Link
								href={`/category/${category.slug}`}
								className='group relative block h-full bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden'
							>
								{/* Gradient Line Top */}
								<div
									className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
								/>

								<div className='flex items-start justify-between mb-6'>
									<div
										className={`p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors ${category.textColor}`}
									>
										<Icon
											icon={category.icon}
											width={32}
											height={32}
										/>
									</div>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-transparent group-hover:bg-gray-900 group-hover:text-white transition-all duration-300`}
									>
										<Icon
											icon='mdi:arrow-top-right'
											width={18}
											height={18}
										/>
									</div>
								</div>

								<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors'>
									{category.title}
								</h3>
								<p className='text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-gray-600'>
									{category.description}
								</p>

								{/* Decorative corner blob */}
								<div
									className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500`}
								/>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CategoryGrid;
