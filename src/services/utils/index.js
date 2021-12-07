export function hashDoodle(doodle) {
    let doodleString = doodle.name + doodle.title + doodle.url;
    let hash = getHashCode(doodleString);
    return Math.abs(hash);
}

export function getHashCode(toHash) {
    var hash = 0;
    if (toHash.length === 0) {
        return hash;
    }
    for (var i = 0; i < toHash.length; i++) {
        var char = toHash.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

