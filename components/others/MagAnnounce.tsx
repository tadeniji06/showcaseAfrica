"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MagAnnounce = () => {
	const [open, setOpen] = useState(false);

	// Show popup every 1 minute
	useEffect(() => {
		const showPopup = () => setOpen(true);

		// First popup after 7 seconds
		const first = setTimeout(showPopup, 7000);

		const interval = setInterval(showPopup, 60000);

		return () => {
			clearTimeout(first);
			clearInterval(interval);
		};
	}, []);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 40 }}
					transition={{ duration: 0.25, ease: "easeOut" }}
					className="fixed bottom-6 right-6 z-[999] 
					bg-white/60 backdrop-blur-xl border border-white/30 
					shadow-2xl rounded-xl p-4 w-[260px] flex flex-col gap-3"
				>
					{/* Close Button */}
					<button
						onClick={() => setOpen(false)}
						className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg"
					>
						✕
					</button>

					{/* Title */}
					<h3 className="text-base font-semibold text-gray-900">
						New Magazine Issue ✨
					</h3>

					{/* Text */}
					<p className="text-sm text-gray-700 leading-snug">
						Your October edition is now live. Tap in to explore the latest stories.
					</p>

					{/* CTA Button */}
					<Link
						href="#magazine"
						onClick={() => setOpen(false)}
						className="bg-primary-red text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
					>
						Check it Out
					</Link>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MagAnnounce;
