'use client'
import { missions } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const Mission = () => {
	return (
		<section className='max-w-7xl mx-auto px-6 py-20'>
			{/* Section Header */}
			<div className='flex items-center gap-3 text-primary-red mb-10'>
				<Icon icon='lucide:leaf' width={40} height={40} />
				<h2 className='text-4xl md:text-5xl font-extrabold text-gray-900'>
					Our Mission
				</h2>
			</div>

			{/* Mission Cards */}
			<div className='grid md:grid-cols-2 gap-10'>
				{missions.map((mission, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.2 }}
						viewport={{ once: true }}
						className='bg-white shadow-lg rounded-2xl p-8 border border-gray-300 hover:shadow-xl transition'
					>
						<h3 className='text-2xl font-semibold text-gray-900 mb-4'>
							{mission.title}
						</h3>
						<p className='text-gray-700 leading-relaxed'>
							{mission.body}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Mission;
