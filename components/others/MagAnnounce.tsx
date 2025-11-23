"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { saMag } from "@/assets";
import Link from "next/link";

const MagAnnounce = () => {
	const [open, setOpen] = useState(false);

	// Popup every 1 minute
	useEffect(() => {
		const showPopup = () => setOpen(true);

		// First popup after 5 seconds
		const first = setTimeout(showPopup, 5000);

		// Then every minute (60000ms)
		const interval = setInterval(showPopup, 60000);

		return () => {
			clearTimeout(first);
			clearInterval(interval);
		};
	}, []);

	return (
		<AnimatePresence>
			{open && (
				<>
					{/* BLUR OVERLAY */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40'
						onClick={() => setOpen(false)}
					/>

					{/* POPUP */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.85 }}
						transition={{ type: "spring", damping: 15 }}
						className='fixed inset-0 flex items-center justify-center z-50 p-4'
					>
						<div className='bg-white w-full max-w-md rounded-2xl shadow-2xl p-5 relative flex flex-col gap-4'>
							{/* CLOSE BUTTON */}
							<button
								onClick={() => setOpen(false)}
								className='absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg'
							>
								✕
							</button>

							{/* IMAGE */}
							<div className='w-full h-[380px] rounded-xl overflow-hidden'>
								<Image
									src={saMag}
									alt='Magazine'
									className='w-full h-full object-cover'
								/>
							</div>

							{/* TEXT */}
							<h2 className='text-xl font-bold text-gray-900'>
								Showcase Africa Magazine — Latest Issue
							</h2>

							<p className='text-gray-600 text-sm'>
								Get into the world of African culture, innovation,
								tech, and creativity — the fresh issue is now live.
							</p>

							{/* CTA */}
							<Link
								href='/magazines'
								onClick={() => setOpen(false)}
								className='bg-primary-red text-white text-center py-3 rounded-xl font-medium hover:bg-red-700 transition'
							>
								Read Now
							</Link>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default MagAnnounce;
