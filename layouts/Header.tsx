"use client";

import { logo } from "@/assets";
import { headerLinks } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null); // controls both desktop & mobile

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		if (!isMobileMenuOpen) setOpenDropdown(null); // reset dropdown when closing mobile
	};

	const toggleDropdown = (title: any) => {
		setOpenDropdown(openDropdown === title ? null : title);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		setOpenDropdown(null);
	};

	return (
		<header className='sticky top-0 z-50 bg-primary-red border-b border-gray-200 shadow-md'>
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
								<Link
									href={link.link}
									className='text-white hover:text-gray-300 font-medium transition-colors duration-200'
								>
									{link.title}
								</Link>

								{/* Dropdown trigger */}
								{link.dropdownItems && (
									<button
										onClick={() => toggleDropdown(link.title)}
										className='ml-1 text-white hover:text-gray-300 transition-colors'
										aria-label={`${link.title} menu`}
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

								{/* Dropdown menu */}
								{link.dropdownItems &&
									openDropdown === link.title && (
										<ul className='absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-xl py-2 animate-fadeIn'>
											{link.dropdownItems.map((item) => (
												<li key={item.title}>
													<Link
														href={item.link}
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
								<button
									onClick={() =>
										link.dropdownItems
											? toggleDropdown(link.title)
											: closeMobileMenu()
									}
									className='flex justify-between items-center w-full px-3 py-3 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors duration-200'
								>
									{link.title}
									{link.dropdownItems && (
										<Icon
											icon={
												openDropdown === link.title
													? "mdi:chevron-up"
													: "mdi:chevron-down"
											}
											className='text-white text-lg'
										/>
									)}
								</button>

								{/* Mobile Dropdown */}
								{link.dropdownItems &&
									openDropdown === link.title && (
										<div className='ml-4 mt-1 space-y-1'>
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
