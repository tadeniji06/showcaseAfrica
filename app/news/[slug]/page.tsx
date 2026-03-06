import { getNewsPost, urlFor } from "@/utils/news";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";

type Props = {
	params: { slug: string };
};

export async function generateMetadata({
	params,
}: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = await getNewsPost(slug);
	if (!post) return { title: "Not Found" };

	return {
		title: `${post.title} - Newsroom`,
		description:
			post.excerpt || `Read the latest news: ${post.title}`,
		openGraph: {
			images: post.mainImage
				? [urlFor(post.mainImage).width(1200).height(630).url()]
				: [],
		},
	};
}

const portableTextComponents = {
	types: {
		image: ({ value }: any) => (
			<div className='my-8 md:my-12'>
				<div className='relative overflow-hidden rounded-2xl shadow-lg border border-gray-100'>
					<Image
						src={urlFor(value).width(1200).height(675).url()}
						alt={value.alt || "News image"}
						width={1200}
						height={675}
						className='w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105'
					/>
				</div>
				{value.caption && (
					<p className='text-sm text-gray-500 text-center mt-4 italic font-medium'>
						{value.caption}
					</p>
				)}
			</div>
		),
	},
	block: {
		h2: ({ children }: any) => (
			<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-12 leading-tight tracking-tight border-l-4 border-red-600 pl-5'>
				{children}
			</h2>
		),
		h3: ({ children }: any) => (
			<h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-5 mt-10 leading-snug'>
				{children}
			</h3>
		),
		h4: ({ children }: any) => (
			<h4 className='text-lg md:text-xl font-bold text-gray-800 mb-4 mt-8'>
				{children}
			</h4>
		),
		normal: ({ children }: any) => (
			<p className='text-gray-600 leading-[1.8] mb-6 text-lg md:text-xl font-light selection:bg-red-600/10'>
				{children}
			</p>
		),
		blockquote: ({ children }: any) => (
			<blockquote className='border-l-4 border-red-600 pl-8 py-4 my-10 italic text-gray-700 bg-gray-50/50 rounded-r-2xl font-serif text-xl md:text-2xl'>
				{children}
			</blockquote>
		),
	},
	marks: {
		strong: ({ children }: any) => (
			<strong className='font-bold text-gray-900'>{children}</strong>
		),
		em: ({ children }: any) => (
			<em className='italic text-gray-800'>{children}</em>
		),
		link: ({ children, value }: any) => (
			<a
				href={value.href}
				target='_blank'
				rel='noopener noreferrer'
				className='text-red-600 hover:underline decoration-2 underline-offset-4 transition-all'
			>
				{children}
			</a>
		),
	},
	list: {
		bullet: ({ children }: any) => (
			<ul className='list-none pl-0 mb-8 space-y-4'>{children}</ul>
		),
		number: ({ children }: any) => (
			<ol className='list-decimal pl-6 mb-8 space-y-4 text-gray-600'>
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }: any) => (
			<li className='flex items-start gap-3 text-gray-600 text-lg md:text-xl leading-relaxed'>
				<span className='mt-2 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0' />
				<span>{children}</span>
			</li>
		),
		number: ({ children }: any) => (
			<li className='text-gray-600 text-lg md:text-xl leading-relaxed pl-2'>
				{children}
			</li>
		),
	},
};

export default async function NewsPostPage({ params }: Props) {
	const { slug } = await params;
	const post = await getNewsPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<article className='min-h-screen bg-gray-50/30'>
			{/* Top Bar Navigation */}
			<div className='bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50'>
				<div className='container mx-auto px-6 py-4'>
					<Link
						href='/news'
						className='inline-flex items-center gap-3 text-gray-600 hover:text-black transition-all font-semibold uppercase tracking-widest text-xs group'
					>
						<span className='p-2 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300'>
							<Icon icon='mdi:arrow-left' />
						</span>
						Back to Newsroom
					</Link>
				</div>
			</div>

			{/* Hero Image Section */}
			<div className='relative w-full aspect-video md:h-[60vh] max-h-[800px] overflow-hidden bg-black'>
				{post.mainImage ? (
					<Image
						src={urlFor(post.mainImage)
							.width(1920)
							.height(1080)
							.url()}
						alt={post.title}
						fill
						className='object-cover opacity-80'
						priority
					/>
				) : (
					<div className='absolute inset-0 bg-gradient-to-br from-gray-900 to-black' />
				)}
				<div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />

				<div className='absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 z-10'>
					<div className='container mx-auto max-w-5xl text-center md:text-left'>
						<div className='inline-flex items-center gap-2 bg-red-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 shadow-2xl'>
							<Icon icon='mdi:newspaper' />
							Showcase Africa News
						</div>
						<h1 className='text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl'>
							{post.title}
						</h1>

						<div className='flex flex-wrap items-center justify-center md:justify-start gap-8'>
							{post.author && (
								<div className='flex items-center gap-4 group'>
									<div className='relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-white/10 group-hover:ring-red-600/50 transition-all'>
										{post.author.image ? (
											<Image
												src={urlFor(post.author.image)
													.width(112)
													.height(112)
													.url()}
												alt={post.author.name}
												fill
												className='object-cover'
											/>
										) : (
											<div className='w-full h-full bg-red-600 flex items-center justify-center text-white text-xl font-bold'>
												{post.author.name.charAt(0)}
											</div>
										)}
									</div>
									<div className='text-left'>
										<p className='text-xs text-white/50 uppercase tracking-widest font-bold mb-0.5'>
											Reporter
										</p>
										<p className='text-white text-lg font-bold leading-none'>
											{post.author.name}
										</p>
									</div>
								</div>
							)}

							<div className='h-12 w-px bg-white/20 hidden md:block' />

							<div className='flex items-center gap-4'>
								<div className='p-3 bg-white/10 rounded-2xl backdrop-blur-md'>
									<Icon
										icon='mdi:calendar-month'
										className='text-white text-2xl'
									/>
								</div>
								<div className='text-left'>
									<p className='text-xs text-white/50 uppercase tracking-widest font-bold mb-0.5'>
										Published
									</p>
									<p className='text-white text-lg font-bold leading-none'>
										{new Date(post.publishedAt).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "long",
												day: "numeric",
											},
										)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Article Content Body */}
			<div className='container mx-auto px-6 py-20 lg:py-32'>
				<div className='max-w-4xl mx-auto'>
					{/* Main Text Content */}
					<div className='prose-container bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 lg:p-24 border border-gray-100/50 relative'>
						{/* Subtle top decoration */}
						<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
							<div className='bg-red-600 w-16 h-1 rounded-full' />
						</div>

						<div className='prose prose-news max-w-none'>
							<PortableText
								value={post.body}
								components={portableTextComponents}
							/>
						</div>

						{/* Newsletter / CTA Section */}
						<div className='mt-20 pt-16 border-t border-gray-100 text-center md:text-left'>
							<div className='flex flex-col md:flex-row items-center justify-between gap-10 bg-gray-50/50 p-10 rounded-3xl border border-gray-100'>
								<div className='max-w-md'>
									<h3 className='text-2xl font-bold text-gray-900 mb-3 tracking-tight'>
										Enjoyed this coverage?
									</h3>
									<p className='text-gray-500 text-base leading-relaxed'>
										Stay ahead of the curve with our weekly briefing
										on Africa's business landscape.
									</p>
								</div>
								<button className='bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl hover:-translate-y-1 shrink-0'>
									Join the Network
								</button>
							</div>
						</div>

						{/* Navigation and Socials Footer */}
						<div className='mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 pt-10'>
							<div className='flex items-center gap-6'>
								<p className='text-xs font-black uppercase tracking-widest text-gray-400'>
									Distribute
								</p>
								<div className='flex gap-3'>
									{[
										{
											icon: "mdi:twitter",
											color: "hover:bg-[#1DA1F2] hover:text-white",
										},
										{
											icon: "mdi:linkedin",
											color: "hover:bg-[#0077b5] hover:text-white",
										},
										{
											icon: "mdi:facebook",
											color: "hover:bg-[#4267B2] hover:text-white",
										},
										{
											icon: "mdi:whatsapp",
											color: "hover:bg-[#25D366] hover:text-white",
										},
									].map((social, idx) => (
										<button
											key={idx}
											className={`p-3 bg-gray-50 rounded-xl text-gray-400 ${social.color} transition-all duration-300 shadow-sm hover:shadow-lg`}
										>
											<Icon icon={social.icon} className='text-2xl' />
										</button>
									))}
								</div>
							</div>

							<Link
								href='/news'
								className='group flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-bold tracking-tight transition-all hover:bg-red-600 hover:shadow-2xl hoverShadow-red-600/20 active:scale-95'
							>
								Back to Hub
								<Icon
									icon='mdi:newspaper'
									className='text-xl group-hover:rotate-12 transition-transform'
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}
