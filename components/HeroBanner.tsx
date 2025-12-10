"use client";

import Image from "next/image";
import { sabanner } from "@/assets";
import Link from "next/link";

const HeroBanner = () => {
	return (
		<div className='w-full bg-black'>
			<Link href='/magazines' className='block w-full'>
				<Image
					src={sabanner}
					alt='Hero Banner'
					width={2000}
					height={600}
					className='w-full h-auto object-cover max-h-[200px] md:max-h-screen'
					priority
				/>
			</Link>
		</div>
	);
};

export default HeroBanner;