"use client";

import { logo } from "@/assets";
import { headerLinks } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null); // currently open dropdown title or null
	const headerRef = useRef(null);

	// toggle mobile menu (fix: properly clear dropdown only when closing mobile menu)
	const toggleMobileMenu = () =>
		setIsMobileMenuOpen((prev) => {
			const next = !prev;
			if (!next) setOpenDropdown(null); // closing -> clear any open dropdown
			return next;
		});

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		setOpenDropdown(null);
	};

	const toggleDropdown = (title) => {
		setOpenDropdown((prev) => (prev === title ? null : title));
	};

	// Click-outside -> close menus
	useEffect(() => {
		function handleDocClick(e) {
			if (!headerRef.current) return;
			if (!headerRef.current.contains(e.target)) {
				setOpenDropdown(null);
				setIsMobileMenuOpen(false);
			}
		}

		function handleKey(e) {
			if (e.key === "Escape") {
				setOpenDropdown(null);
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
			className='sticky top-0 z-50 bg-primary-red border-b border-gray-200 shadow-md'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<nav className='flex items-center justify-between md:h-[120px] h-24'>
					{/* Logo/Brand */}
					<Link href={"/"}>
						<Image
							className='md:h-[90px] md:w-[200px] h-[70px] w-[150px]'
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
								{/* If no dropdown -> clickable Link. If has dropdown -> static label, chevron toggles */}
								{!link.dropdownItems ? (
									<Link
										href={link.link}
										onClick={() => {
											// close any open dropdown (if user clicked a link in desktop while a dropdown was open)
											setOpenDropdown(null);
										}}
										className='text-white hover:text-gray-300 font-medium transition-colors duration-200'
									>
										{link.title}
									</Link>
								) : (
									<span className='text-white font-medium'>
										{link.title}
									</span>
								)}

								{/* Chevron trigger for items with dropdown */}
								{link.dropdownItems && (
									<button
										type='button'
										aria-expanded={openDropdown === link.title}
										aria-controls={`${link.title}-menu`}
										onClick={(e) => {
											e.stopPropagation(); // avoid bubbling weirdness
											toggleDropdown(link.title);
										}}
										className='ml-1 text-white hover:text-gray-300 transition-colors'
									>
										<Icon
											icon={
												openDropdown === link.title
													? "mdi:chevron-up"
													: "mdi:chevron-down"
											}
											className='text-lg'
										/>
									</button>
								)}

								{/* Dropdown menu (desktop) */}
								{link.dropdownItems &&
									openDropdown === link.title && (
										<ul
											id={`${link.title}-menu`}
											role='menu'
											className='absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-xl py-2 z-50 transition-opacity duration-150'
										>
											{link.dropdownItems.map((item) => (
												<li key={item.title}>
													<Link
														href={item.link}
														onClick={() => setOpenDropdown(null)} // close after clicking
														className='block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-red transition-colors'
													>
														{item.title}
													</Link>
												</li>
											))}
										</ul>
									)}
							</li>
						))}
					</ul>

					{/* Desktop Action Buttons */}
					<div className='hidden md:flex items-center gap-3 lg:gap-4'>
						<button
							className='p-2 hover:bg-white/10 rounded-lg transition-colors duration-200'
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
							<button className='cursor-pointer bg-white text-primary-red rounded-lg shadow-md px-3 py-2 lg:px-5 lg:py-3 text-sm lg:text-base font-medium hover:bg-gray-50 transition-colors duration-200'>
								Get In Touch
							</button>
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						onClick={toggleMobileMenu}
						className='md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10 transition-colors duration-200'
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
					<div className='px-2 pt-2 pb-4 space-y-1 bg-primary-red border-t border-white/20'>
						{/* Mobile Navigation Links */}
						{headerLinks.map((link) => (
							<div key={link.title}>
								{link.dropdownItems ? (
									<>
										{/* Parent with dropdown toggle */}
										<button
											type='button'
											onClick={(e) => {
												e.stopPropagation();
												toggleDropdown(link.title);
											}}
											className='flex justify-between items-center w-full px-3 py-3 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200'
											aria-expanded={openDropdown === link.title}
											aria-controls={`${link.title}-mobile-menu`}
										>
											{link.title}
											<Icon
												icon={
													openDropdown === link.title
														? "mdi:chevron-up"
														: "mdi:chevron-down"
												}
												className='text-white text-lg'
											/>
										</button>

										{/* Mobile Dropdown */}
										{openDropdown === link.title && (
											<div
												id={`${link.title}-mobile-menu`}
												className='ml-4 mt-1 space-y-1'
											>
												{link.dropdownItems.map((item) => (
													<Link
														key={item.title}
														href={item.link}
														onClick={closeMobileMenu}
														className='block px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 rounded-md transition-colors duration-200'
													>
														{item.title}
													</Link>
												))}
											</div>
										)}
									</>
								) : (
									<Link
										href={link.link}
										onClick={closeMobileMenu}
										className='block px-3 py-3 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200'
									>
										{link.title}
									</Link>
								)}
							</div>
						))}

						{/* Mobile Action Buttons */}
						<div className='pt-3 border-t border-white/20 mt-3'>
							<div className='flex items-center gap-3 px-3'>
								<button
									className='flex-1 flex items-center justify-center gap-2 bg-white/10 text-white rounded-lg px-4 py-3 hover:bg-white/20 transition-colors duration-200'
									onClick={closeMobileMenu}
								>
									<Icon
										icon={"ic:baseline-search"}
										className='text-white text-lg'
									/>
									<span className='text-sm font-medium'>Search</span>
								</button>
								<Link
									target='_blank'
									href='https://www.instagram.com/showcaseafrica_?igsh=MWZ1N2QzZzU5Z3JiNQ=='
								>
									<button
										className='flex-1 bg-white text-primary-red rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors duration-200'
										onClick={closeMobileMenu}
									>
										Get In Touch
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
