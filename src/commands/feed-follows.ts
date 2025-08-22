import { getFeedByUrl } from "../lib/db/queries/feeds";
import {
    createFeedFollow,
    getFeedFollowsForUser
} from "../lib/db/queries/feed-follows";
import { User } from "../lib/db/schema";

export async function handlerFollow(
    cmdName: string,
    user: User,
    ...args: string[]
) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <feed_url>`);
    }

    const feedUrl = args[0];
    const feed = await getFeedByUrl(feedUrl);

    if (!feed) {
        throw new Error(`Feed not found: ${feedUrl}`);
    }

    const ffRow = await createFeedFollow(user.id, feed.id);
    console.log("Feed follow created:");
    printFeedFollow(ffRow.userName, ffRow.feedName);
}

export async function handlerListFeedFollows(_: string, user: User) {
    const feedFollows = await getFeedFollowsForUser(user.id);

    if (feedFollows.length === 0) {
        console.log("No feed follows found for this user.");
        return;
    }

    console.log(`Feed follows for user %s:`, user.name);
    
    for (const ff of feedFollows) {
        console.log(`* ${ff.feedName}`);
    }
}

export function printFeedFollow(userName: string, feedName: string) {
    console.log(`* User:  ${userName}`);
    console.log(`* Feed:  ${feedName}`);
}
