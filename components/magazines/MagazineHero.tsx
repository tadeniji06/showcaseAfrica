"use client";

import { useState } from "react";
import { saMag, sav2, v3 } from "@/assets";
import Image, { StaticImageData } from "next/image";
import NewsLetterSub from "../others/NewsLetterSub";

// Type definitions
interface MagazineCardProps {
	volume: string;
	month: string;
	year: string;
	pdfPath?: string;
	driveFileId?: string;
	imageSrc: StaticImageData | string;
}

interface Magazine {
	volume: string;
	month: string;
	year: string;
	pdfPath?: string;
	driveFileId?: string;
	imageSrc: StaticImageData | string;
}

// Helper function to convert Google Drive link to direct download
const getDriveDownloadUrl = (fileId: string): string => {
	return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

const MagazineCard = ({
	volume,
	month,
	year,
	pdfPath,
	driveFileId,
	imageSrc,
}: MagazineCardProps) => {
	const [showForm, setShowForm] = useState<boolean>(false);
	const [allowed, setAllowed] = useState<boolean>(false);

	// Determine the download URL (Drive or local)
	const downloadUrl = driveFileId
		? getDriveDownloadUrl(driveFileId)
		: pdfPath || "";

	const handleDownload = () => {
		if (driveFileId) {
			window.open(downloadUrl, "_blank");
		}
	};

	return (
		<>
			<div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow'>
				{/* Cover Image */}
				<div className='relative aspect-[3/4] bg-gray-200'>
					<Image
						src={imageSrc}
						alt={`Magazine Cover - ${volume}`}
						className='object-cover'
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>

				{/* Content */}
				<div className='p-6 flex flex-col gap-4'>
					<div>
						<h3 className='text-2xl font-bold text-gray-900 mb-1'>
							{month} {year}
						</h3>
						<span className='text-sm text-gray-500 font-medium'>
							{volume}
						</span>
					</div>

					<p className='text-gray-600 text-sm leading-relaxed'>
						Discover Africa through its vibrant mix of culture,
						innovation, entrepreneurship, fashion, tech and beyond.
					</p>

					{/* Action Buttons */}
					{!allowed ? (
						<button
							onClick={() => setShowForm(true)}
							className='w-full bg-primary-red text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-red-600 transition'
						>
							Subscribe to Download
						</button>
					) : driveFileId ? (
						<button
							onClick={handleDownload}
							className='w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-green-700 transition'
						>
							Download from Drive
						</button>
					) : (
						<a
							href={downloadUrl}
							download={pdfPath?.split("/").pop()}
							className='w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-green-700 transition text-center block'
						>
							Download Now
						</a>
					)}
				</div>
			</div>

			{/* Modal */}
			{showForm && (
				<NewsLetterSub
					onComplete={() => {
						setAllowed(true);
						setShowForm(false);
					}}
					onClose={() => setShowForm(false)}
				/>
			)}
		</>
	);
};

const MagazineHero = () => {
	const magazines: Magazine[] = [
		{
			volume: "Volume 1, Issue 1",
			month: "November",
			year: "2025",
			pdfPath: "/showcase_africa_vol1_issue1.pdf",
			imageSrc: saMag,
		},
		{
			volume: "Volume 1, Issue 2",
			month: "December",
			year: "2025",
			driveFileId: "12-Jzht8f8s5qbGqAh31pWNbu9EM2HKo7",
			imageSrc: sav2,
		},
		{
			volume: "Volume 1, Issue 3",
			month: "January",
			year: "2026",
			pdfPath: "/showcase_africa_vol1_issue3.pdf",
			imageSrc: v3,
		}
	];

	return (
		<section className='min-h-screen bg-slate-100 py-16 px-6 mb-5'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Showcase Africa Magazine
					</h1>
					<p className='text-lg text-primary-red font-semibold'>
						Enjoy exclusive content with every issue
					</p>
				</div>

				{/* Magazine Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{magazines.map((mag, index) => (
						<MagazineCard
							key={`${mag.volume}-${index}`}
							volume={mag.volume}
							month={mag.month}
							year={mag.year}
							pdfPath={mag.pdfPath}
							driveFileId={mag.driveFileId}
							imageSrc={mag.imageSrc}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default MagazineHero;
