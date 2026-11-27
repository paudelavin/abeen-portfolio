import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { caseStudies } from "@/lib/resume-data";

export const dynamic = "force-dynamic";

const SITE = "https://www.abeenpoudel.com.np";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/resume",
    "/portfolio",
    "/blog",
    "/now",
    "/contact",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE}/portfolio/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  let postPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    postPages = posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // If the database is unreachable, still serve the static pages.
  }

  return [...staticPages, ...caseStudyPages, ...postPages];
}