"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Link from "next/link";

const YouTubeBanner = () => {
	const [isVisible, setIsVisible] = useState(true);
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		// Show banner after a brief delay for dramatic effect
		const timer = setTimeout(() => {
			setHasAnimated(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) return null;

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ x: "-100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: "100%", opacity: 0 }}
					transition={{
						type: "spring",
						stiffness: 100,
						damping: 20,
						duration: 0.8,
					}}
					className='fixed top-24 left-0 right-0 z-50 pointer-events-none'
				>
					<div className='max-w-7xl mx-auto px-6 lg:px-12'>
						<motion.div
							animate={{
								y: [0, -8, 0],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className='pointer-events-auto relative'
						>
							{/* Main Banner Container */}
							<div className='relative overflow-hidden rounded-2xl shadow-2xl border-2 border-red-600'>
								{/* Animated Background Gradient - Black to Red */}
								<motion.div
									animate={{
										background: [
											"linear-gradient(135deg, #000000 0%, #1a0000 25%, #FF0000 50%, #1a0000 75%, #000000 100%)",
											"linear-gradient(135deg, #1a0000 0%, #FF0000 25%, #000000 50%, #FF0000 75%, #1a0000 100%)",
											"linear-gradient(135deg, #000000 0%, #1a0000 25%, #FF0000 50%, #1a0000 75%, #000000 100%)",
										],
									}}
									transition={{
										duration: 4,
										repeat: Infinity,
										ease: "linear",
									}}
									className='absolute inset-0'
								/>

								{/* Red Accent Overlay */}
								<div className='absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20' />

								{/* Animated Shine Effect - White */}
								<motion.div
									animate={{
										x: ["-100%", "200%"],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: "linear",
										repeatDelay: 1,
									}}
									className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12'
								/>

								{/* Content */}
								<div className='relative px-6 py-4 flex items-center justify-between gap-4 backdrop-blur-sm'>
									{/* Left Section - Icon & Text */}
									<div className='flex items-center gap-4 flex-1'>
										{/* Animated YouTube Icon */}
										<motion.div
											animate={{
												scale: [1, 1.1, 1],
												rotate: [0, 5, -5, 0],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: "easeInOut",
											}}
											className='flex-shrink-0'
										>
											<div className='bg-white rounded-full p-3 shadow-lg'>
												<Icon
													icon='mdi:youtube'
													className='text-red-600'
													width={32}
													height={32}
												/>
											</div>
										</motion.div>

										{/* Text Content */}
										<div className='flex-1 min-w-0'>
											<motion.h3
												animate={{
													opacity: [1, 0.8, 1],
												}}
												transition={{
													duration: 2,
													repeat: Infinity,
													ease: "easeInOut",
												}}
												className='text-white font-bold text-lg md:text-xl leading-tight'
											>
												🎬 Join Our Community on YouTube!
											</motion.h3>
											<p className='text-white/90 text-sm md:text-base hidden sm:block'>
												Subscribe to{" "}
												<span className='font-semibold'>B360Tv</span>{" "}
												for exclusive content
											</p>
										</div>
									</div>

									{/* Right Section - CTA Buttons */}
									<div className='flex items-center gap-3 flex-shrink-0'>
										{/* Subscribe Button */}
										<Link
											href='https://www.youtube.com/@B360Tv?sub_confirmation=1'
											target='_blank'
											rel='noopener noreferrer'
										>
											<motion.button
												whileHover={{
													scale: 1.05,
													boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
												}}
												whileTap={{ scale: 0.95 }}
												animate={{
													boxShadow: [
														"0 0 20px rgba(255,255,255,0.5)",
														"0 0 30px rgba(255,255,255,0.8)",
														"0 0 20px rgba(255,255,255,0.5)",
													],
												}}
												transition={{
													boxShadow: {
														duration: 2,
														repeat: Infinity,
														ease: "easeInOut",
													},
												}}
												className='bg-white text-red-600 px-6 py-3 rounded-full font-bold text-sm md:text-base shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2'
											>
												<Icon
													icon='mdi:youtube-subscription'
													width={20}
													height={20}
												/>
												<span className='hidden sm:inline'>
													Subscribe Now
												</span>
												<span className='sm:hidden'>Subscribe</span>
											</motion.button>
										</Link>

										{/* Close Button */}
										<motion.button
											whileHover={{ scale: 1.1, rotate: 90 }}
											whileTap={{ scale: 0.9 }}
											onClick={() => setIsVisible(false)}
											className='bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors'
											aria-label='Close banner'
										>
											<Icon icon='mdi:close' width={20} height={20} />
										</motion.button>
									</div>
								</div>

								{/* Animated Bottom Border */}
								<motion.div
									animate={{
										scaleX: [0, 1, 0],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className='h-1 bg-gradient-to-r from-transparent via-white to-transparent origin-center'
								/>
							</div>

							{/* Floating Particles Effect */}
							<div className='absolute inset-0 pointer-events-none overflow-hidden rounded-2xl'>
								{[...Array(8)].map((_, i) => (
									<motion.div
										key={i}
										animate={{
											y: [0, -120],
											opacity: [0, 1, 0],
											scale: [0, 1.2, 0],
										}}
										transition={{
											duration: 3.5,
											repeat: Infinity,
											delay: i * 0.4,
											ease: "easeOut",
										}}
										className={`absolute bottom-0 w-2 h-2 rounded-full ${
											i % 2 === 0 ? "bg-red-500" : "bg-white"
										}`}
										style={{
											left: `${10 + i * 11}%`,
										}}
									/>
								))}
							</div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default YouTubeBanner;
