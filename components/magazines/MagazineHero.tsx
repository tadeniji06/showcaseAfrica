"use client";

import { useState } from "react";
import { saMag } from "@/assets";
import Image from "next/image";
import NewsLetterSub from "../others/NewsLetterSub";

const MagazineHero = () => {
	const [showForm, setShowForm] = useState(false);
	const [allowed, setAllowed] = useState(false);

	return (
		<section className='min-h-screen bg-slate-100 flex items-center mb-5'>
			<div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
				{/* Cover */}
				<div className='flex justify-center'>
					<Image
						src={saMag}
						alt='Magazine Cover'
						className='w-full max-w-sm h-auto rounded-xl shadow-lg object-cover'
					/>
				</div>

				{/* Right side */}
				<div className='flex flex-col gap-6'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
						October 2025
					</h2>

					<span className='text-lg text-primary-red font-semibold'>
						Enjoy exclusive content with Showcase Africa Magazine
					</span>

					<p className='text-gray-700 leading-relaxed'>
						Discover Africa through its vibrant mix of culture,
						innovation, entrepreneurship, fashion, tech and beyond.
					</p>

					{/* Button */}
					<button
						onClick={() => setShowForm(true)}
						disabled={allowed}
						className={`self-start bg-primary-red text-white px-6 py-3 rounded-lg font-medium shadow-sm transition ${
							allowed ? "hidden" : "hover:bg-red-600"
						}`}
					>
						Subscribe to Download
					</button>

					{/* Download unlocked */}
					{allowed && (
						<a
							href='/SAmagazine.pdf'
							download='Showcase_Africa_Magazine_October_2025.pdf'
							className='self-start bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-green-700 transition'
						>
							Download Now
						</a>
					)}
				</div>
			</div>

			{/* Modal */}
			{showForm && (
				<NewsLetterSub
					onComplete={() => setAllowed(true)}
					onClose={() => setShowForm(false)}
				/>
			)}
		</section>
	);
};

export default MagazineHero;
