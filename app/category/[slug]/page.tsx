import { getPostsByCategory, urlFor } from "@/utils/sanity";
import { showcaseCategories } from "@/utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
};

// Generate Metadata
export async function generateMetadata({
	params,
}: Props): Promise<Metadata> {
	const { slug } = await params;
	const category = showcaseCategories.find((c) => c.slug === slug);
	const title = category
		? category.title
		: slug.replace(/-/g, " ").toUpperCase();

	return {
		title: `${title} - Showcase Africa`,
		description:
			category?.description ||
			`Read the latest news and insights on ${title}.`,
	};
}

export default async function CategoryPage({ params }: Props) {
	const { slug } = await params;
	const category = showcaseCategories.find((c) => c.slug === slug);
	// Use cmsTitle if available, otherwise title or formatted slug
	const categoryTitle =
		category?.cmsTitle || category?.title || slug.replace(/-/g, " ");

	const posts = await getPostsByCategory(categoryTitle);

	// Default theme if not found in categories
	const theme = category || {
		title: slug.replace(/-/g, " "),
		description: "Read the latest stories and updates.",
		icon: "mdi:folder-open-outline",
		gradient: "from-gray-700 to-black",
		textColor: "text-gray-900",
		borderColor: "border-gray-200",
		color: "bg-gray-800",
	};

	const extractText = (body: any[]) => {
		if (!body || !Array.isArray(body)) return "";
		return body
			.filter((block) => block._type === "block")
			.map(
				(block) =>
					block.children?.map((child: any) => child.text).join("") ||
					"",
			)
			.join(" ");
	};

	return (
		<main className='min-h-screen bg-gray-50 pb-20'>
			{/* HERO SECTION */}
			<section className='relative bg-black text-white overflow-hidden'>
				{/* Background Gradients */}
				<div
					className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`}
				/>
				<div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

				<div className='relative max-w-7xl mx-auto px-6 py-24 lg:py-32'>
					<div className='max-w-4xl'>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6'>
							<Icon
								icon={theme.icon}
								className='text-white/80'
								width={18}
								height={18}
							/>
							<span className='text-sm font-medium text-white/90 uppercase tracking-wide'>
								Category
							</span>
						</div>

						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight'>
							{theme.title}
						</h1>
						<p className='text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed'>
							{theme.description}
						</p>
					</div>
				</div>

				{/* Decorative Bottom Curve */}
				<div className='absolute bottom-0 left-0 w-full overflow-hidden leading-[0]'>
					<svg
						data-name='Layer 1'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 1200 120'
						preserveAspectRatio='none'
						className='relative block h-[60px] w-full fill-gray-50'
					>
						<path d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'></path>
					</svg>
				</div>
			</section>

			{/* CONTENT SECTION */}
			<section className='max-w-7xl mx-auto px-6 -mt-10 relative z-10'>
				{posts.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
						{posts.map((post, index) => (
							<Link
								href={`/posts/${post.slug.current}`}
								key={post._id}
								className='group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
							>
								{/* Image Container */}
								<div className='relative h-60 w-full overflow-hidden bg-gray-200'>
									{post.mainImage ? (
										<Image
											src={urlFor(post.mainImage)
												.width(800)
												.height(600)
												.url()}
											alt={post.title}
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-500'
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										/>
									) : (
										<div
											className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${theme.gradient} opacity-50`}
										>
											<Icon
												icon='mdi:image-off-outline'
												className='text-white/50 w-12 h-12'
											/>
										</div>
									)}

									{/* Category Badge */}
									<div className='absolute top-4 left-4'>
										<span className='px-3 py-1 bg-white/90 backdrop-blur text-black text-xs font-bold rounded-full shadow-sm'>
											{theme.title.split(" ")[0]}
										</span>
									</div>
								</div>

								{/* Content */}
								<div className='flex flex-col flex-1 p-6'>
									{/* Meta */}
									<div className='flex items-center gap-3 text-xs text-gray-500 mb-3 font-medium'>
										<span className='flex items-center gap-1'>
											<Icon
												icon='mdi:calendar-blank-outline'
												width={14}
											/>
											{new Date(post.publishedAt).toLocaleDateString(
												undefined,
												{
													month: "short",
													day: "numeric",
													year: "numeric",
												},
											)}
										</span>
										<span>•</span>
										<span className='flex items-center gap-1'>
											<Icon icon='mdi:clock-outline' width={14} />
											{post.estimatedReadingTime || 4} min read
										</span>
									</div>

									<h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors'>
										{post.title}
									</h3>

									{post.body && (
										<p className='text-gray-600 text-sm line-clamp-3 mb-4 flex-1'>
											{extractText(post.body).substring(0, 150) +
												(extractText(post.body).length > 150
													? "..."
													: "")}
										</p>
									)}

									{/* Author & Arrow */}
									<div className='mt-auto pt-4 border-t border-gray-100 flex items-center justify-between'>
										{post.author ? (
											<div className='flex items-center gap-2'>
												{/* Author Image if available, or placeholder */}
												<div className='w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative'>
													{post.author.image && (
														<Image
															src={urlFor(post.author.image)
																.width(40)
																.height(40)
																.url()}
															alt={post.author.name}
															fill
															className='object-cover'
														/>
													)}
												</div>
												<span className='text-xs font-semibold text-gray-700'>
													{post.author.name}
												</span>
											</div>
										) : (
											<span className='text-xs font-medium text-gray-500'>
												By Showcase Africa
											</span>
										)}

										<span
											className={`text-gray-400 group-hover:${theme.textColor} transition-colors`}
										>
											<Icon icon='mdi:arrow-right' width={20} />
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className='bg-white rounded-2xl p-12 text-center shadow-sm'>
						<div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
							<Icon
								icon='mdi:file-document-outline'
								width={40}
								height={40}
								className='text-gray-400'
							/>
						</div>
						<h3 className='text-2xl font-bold text-gray-900 mb-2'>
							No articles yet
						</h3>
						<p className='text-gray-600 mb-8 max-w-md mx-auto'>
							We haven't published any stories in this category yet.
							Check back soon for updates.
						</p>
						<Link
							href='/'
							className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors'
						>
							Return Home
						</Link>
					</div>
				)}
			</section>
		</main>
	);
}
