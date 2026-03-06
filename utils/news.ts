import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface NewsPost {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	mainImage?: SanityImageSource;
	publishedAt: string;
	body: any[];
	author?: {
		name: string;
		image?: SanityImageSource;
	};
	excerpt?: string;
}

export const client = createClient({
	projectId: "87y3pr85",
	dataset: "production",
	useCdn: true,
	apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) =>
	builder.image(source);

// Fetch all news posts
export const getNewsPosts = async (
	limit = 20,
	offset = 0,
): Promise<NewsPost[]> => {
	const query = `*[_type == "post"] | order(publishedAt desc) [${offset}...${
		offset + limit
	}] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{
        name,
        image
    },
    "excerpt": pt::text(body)[0...200]
  }`;

	return await client.fetch(query);
};

// Fetch single news post by slug
export const getNewsPost = async (
	slug: string,
): Promise<NewsPost | null> => {
	const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{
        name,
        image,
        bio
    },
    "excerpt": pt::text(body)[0...200]
  }`;

	return await client.fetch(query, { slug });
};

// Fetch latest news for Hero section (e.g. top 1)
export const getLatestNews = async (): Promise<NewsPost | null> => {
	const query = `*[_type == "post"] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{
        name,
        image,
    },
    "excerpt": pt::text(body)[0...300]
  }`;

	return await client.fetch(query);
};
