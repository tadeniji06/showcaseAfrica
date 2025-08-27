'use client'

import { values } from "@/utils/data";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

const Values = () => {
	return (
		<section className='max-w-7xl mx-auto px-6 py-20'>
			{/* Section Header */}
			<div className='flex items-center gap-3 text-primary-red mb-10'>
				<Icon icon='lucide:star' width={40} height={40} />
				<h2 className='text-4xl md:text-5xl font-extrabold text-gray-900'>
					Our Core Values
				</h2>
			</div>

			{/* Values Grid */}
			<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{values.map((value, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.15 }}
						viewport={{ once: true }}
						className='bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition'
					>
						<h3 className='text-xl font-semibold text-gray-900 mb-3'>
							{value.title}
						</h3>
						<p className='text-gray-700 leading-relaxed'>
							{value.body}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Values;
