"use client";

import { logo } from "@/assets";
import { headerLinks } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const headerRef = useRef<HTMLElement>(null);

	// toggle mobile menu
	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	// Click-outside -> close menus
	useEffect(() => {
		function handleDocClick(e: MouseEvent | TouchEvent) {
			if (!headerRef.current) return;
			if (
				e.target instanceof Node &&
				!headerRef.current.contains(e.target)
			) {
				setIsMobileMenuOpen(false);
			}
		}

		function handleKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setIsMobileMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleDocClick);
		document.addEventListener("touchstart", handleDocClick); // for mobile taps
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handleDocClick);
			document.removeEventListener("touchstart", handleDocClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	// If user resizes to desktop, ensure mobile menu is closed
	useEffect(() => {
		function onResize() {
			if (window.innerWidth >= 1024) {
				setIsMobileMenuOpen(false);
			}
		}
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	return (
		<header
			ref={headerRef}
			className='sticky top-0 z-50 bg-primary-red border-b border-red-800 shadow-md'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<nav className='flex items-center justify-between md:h-[120px] h-24'>
					{/* Logo/Brand */}
					<Link href={"/"}>
						<Image
							className='md:h-[100px] md:w-[250px] h-[80px] w-[180px]'
							width={150}
							alt='logo'
							src={logo}
						/>
					</Link>

					{/* Desktop Navigation */}
					<ul className='hidden lg:flex items-center space-x-6'>
						{headerLinks.map((link) => (
							<li
								key={link.title}
								className='relative flex items-center'
							>
								<Link
									href={link.link}
									className='text-white hover:text-gray-200 font-medium transition-colors duration-200'
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>

					{/* Desktop Action Buttons */}
					<div className='hidden md:flex items-center gap-3 lg:gap-4'>
						<button
							className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
							aria-label='Search'
						>
							<Icon
								icon={"ic:baseline-search"}
								className='text-white text-xl lg:text-2xl'
							/>
						</button>
						<Link
							target='_blank'
							href='https://www.instagram.com/showcaseafrica_?igsh=MWZ1N2QzZzU5Z3JiNQ=='
						>
							<Icon
								icon={"mdi:instagram"}
								className='text-white text-xl lg:text-2xl hover:text-gray-200 transition-colors'
							/>
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						onClick={toggleMobileMenu}
						className='md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200'
						aria-expanded={isMobileMenuOpen}
						aria-label='Toggle navigation menu'
						type='button'
					>
						<Icon
							icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
							className='h-6 w-6 text-white'
						/>
					</button>
				</nav>

				{/* Mobile Navigation Menu */}
				<div
					className={`md:hidden transition-all duration-300 ease-in-out ${
						isMobileMenuOpen
							? "max-h-[600px] opacity-100 visible"
							: "max-h-0 opacity-0 invisible overflow-hidden"
					}`}
				>
					<div className='px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200'>
						{/* Mobile Navigation Links */}
						{headerLinks.map((link) => (
							<div key={link.title}>
								<Link
									href={link.link}
									onClick={closeMobileMenu}
									className='block px-3 py-3 text-base font-medium text-primary-red hover:bg-gray-50 rounded-md transition-colors duration-200'
								>
									{link.title}
								</Link>
							</div>
						))}

						{/* Mobile Action Buttons */}
						<div className='pt-3 border-t border-gray-200 mt-3'>
							<div className='flex items-center gap-3 px-3'>
								<button
									className='flex-1 flex items-center justify-center gap-2 bg-gray-100 text-primary-red rounded-lg px-4 py-3 hover:bg-gray-200 transition-colors duration-200'
									onClick={closeMobileMenu}
								>
									<Icon
										icon={"ic:baseline-search"}
										className='text-primary-red text-lg'
									/>
									<span className='text-sm font-medium'>Search</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
