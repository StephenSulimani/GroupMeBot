/**
 * Represents an attachment with type and url properties.
 * This interface is used when receiving callbacks.
 *
 * @interface Attachment
 */
interface Attachment {
    /**
     * The type of attachment.
     * @example "image"
     */
    type: string;

    /**
     * The URL linking to the particular attachment.
     * @example "https://i.groupme.com/2048x1477.jpeg.5b3171578c254fed93bf3d40de413f9e"
     */
    url: string;
}

/**
 * Parses a JSON object into an Attachment instance.
 * @param {object} json - The raw JSON oject.
 * @returns {Attachment} The parsed Attachment instance.
 */
function parseAttachment(json: Record<string, any>): Attachment {
    return {
        type: json['type'],
        url: json['url'],
    };
}

export { Attachment, parseAttachment };
