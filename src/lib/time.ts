export function parseDuration(durationStr: string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);

    if (!match) {
        return;
    }

    if (match.length !== 3) {
        return;
    }

    const value: number = parseInt(match[1], 10);
    const unit: string = match[2];

    switch (unit) {
        case "ms":
            return value;
        case "s":
            return value * 1000;
        case "m":
            return value * 1000 * 60;
        case "h":
            return value * 1000 * 60 * 60;
        default:
            return;
    }
}