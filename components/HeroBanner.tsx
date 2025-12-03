"use client";

import Image from "next/image";
import { sabanner } from "@/assets";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const HeroBanner = () => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setShow((prev) => !prev); // Toggle every 5 seconds
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className='
        hidden lg:flex
        absolute top-10 left-1/2 -translate-x-1/2
        z-30 
        w-[70%] max-w-[1100px]
        rounded-2xl overflow-hidden
        shadow-[0_8px_40px_rgba(0,0,0,0.3)]
        backdrop-blur-xl
      '
		>
			<AnimatePresence mode='wait'>
				{show && (
					<motion.div
						key='banner'
						initial={{ opacity: 0, scale: 1.05 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{
							duration: 1,
							ease: "easeInOut",
						}}
						className='w-full h-full'
					>
						<Link href='/magazines'>
							<Image
								src={sabanner}
								alt='Hero Banner'
								width={5948}
								height={1705}
								className='w-full h-auto object-cover'
								priority
							/>
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default HeroBanner;
