import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createFeed(
    feedName: string,
    url: string,
    userId: string
) {
    const result = await db
        .insert(feeds)
        .values({
            name: feedName,
            url: url,
            userId: userId,
        })
        .returning();

    return firstOrUndefined(result);
}

export async function getFeedByUrl(url: string) {
    const result = await db.select().from(feeds).where(eq(feeds.url, url));
    return firstOrUndefined(result);
}

export async function getFeeds() {
    return db.select().from(feeds);
}

export async function getNextFeedToFetch() {
    const result = await db
        .select()
        .from(feeds)
        .orderBy(sql`${feeds.lastFetchedAt} NULLS FIRST`)
        .limit(1);
    
    return firstOrUndefined(result);
}

export async function markFeedFetched(feedId: string) {
    const result = await db
        .update(feeds)
        .set({
            lastFetchedAt: new Date(),
        })
        .where(eq(feeds.id, feedId))
        .returning();
    
    return firstOrUndefined(result);
}
