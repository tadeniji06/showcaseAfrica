import React from "react";
import { Icon } from "@iconify/react";
import CategoryGrid from "./CategoryGrid";

const App: React.FC = () => {
	return (
		<div className='min-h-screen bg-white'>
			{/* HEADER */}
			<div className='bg-gradient-to-r from-[#990100] to-[#ce3a3a] text-white py-12'>
				<div className='max-w-6xl mx-auto px-6 text-center'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<Icon icon='mdi:africa' className='w-10 h-10' />
						<h1 className='text-4xl lg:text-5xl font-extrabold'>
							ShowcaseAfrica
						</h1>
					</div>
					<p className='text-gray-100 text-lg max-w-2xl mx-auto opacity-90'>
						Your premier destination for authentic African stories,
						celebrating the continent's rich diversity, innovation,
						and cultural heritage.
					</p>
				</div>
			</div>

			{/* CATEGORIES GRID */}
			<div className='pb-10 pt-4 bg-gray-50'>
				<CategoryGrid />
			</div>
		</div>
	);
};

export default App;
