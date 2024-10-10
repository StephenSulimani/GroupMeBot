import { Attachment, parseAttachment } from './Attachment';

interface Callback {
    /**
     * The attachments contained within a callback.
     * @example []
     */
    attachments: Attachment[];

    /**
     * The URL of the avatar of a partciular user. Can be null.
     * @example "https://i.groupme.com/866x866.jpeg."
     */
    avatar_url?: string;

    /**
     * The UNIX timestamp for when the callback was sent.
     * @example 1609459200
     */
    created_at: number;

    /**
     * The ID of the group that this callback was sent from.
     * @example 12345
     */
    group_id: string;

    /**
     * The unique identifier of the callback.
     * @example 12345
     */
    id: string;

    /**
     * The name of the user that initiated this callback.
     * @example "Sam"
     */
    name: string;

    /**
     * The unique number identifying the user who initiated this callback.
     * @example "12345"
     */
    sender_id: string;

    /**
     * The type of the user that initiated this callback.
     * - 'user' - A regular human user
     * - 'system' - A system message
     * - 'bot' - A bot message
     * @example "user"
     */
    sender_type: string;

    /**
     * Honestly no clue what this is used for.
     * @example "96f12dc06754023d2b483e43703b2954"
     */
    source_guid: string;

    /**
     * Whether or not this callback is a system message.
     * @example false
     */
    system: boolean;

    /**
     * The text of the callback. Message text if it is a message, or
     * notification text of a system message.
     * @example "Hello, world!"
     */
    text: string;

    /**
     * The unique number identifying the user who initiated this callback.
     * @example "12345"
     */
    user_id: string;
}

/**
 * Parses a JSON object into a Callback instance.
 * @param {object} json - The raw JSON object.
 * @returns {Callback} The parsed Callback instance.
 */
function parseCallback(json: Record<string, any>): Callback {
    return {
        attachments: json['attachments'].map((attach: object) =>
            parseAttachment(attach)
        ),
        avatar_url: json['avatar_url'],
        created_at: json['created_at'],
        group_id: json['group_id'],
        id: json['id'],
        name: json['name'],
        sender_id: json['sender_id'],
        sender_type: json['sender_type'],
        source_guid: json['source_guid'],
        system: json['system'],
        text: json['text'],
        user_id: json['user_id'],
    };
}

export { Callback, parseCallback };
