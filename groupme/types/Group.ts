/**
 * Represents a group with various properties such as its ID, name, description, and more.
 * This interface is used to model a group in a system where users can join and interact in a community.
 * 
 * @interface Group
 */
interface Group {
    /**
     * The unique identifier for the group. This is usually the same as `group_id`.
     * @example "12345"
     */
    id: string;

    /**
     * A unique identifier for the group. This ID is used to distinguish groups in the system.
     * @example "12345"
     */
    group_id: string;

    /**
     * The name of the group. This is a display name that identifies the group to members.
     * @example "Tech Enthusiasts"
     */
    name: string;

    /**
     * A phone number used for SMS communication with group members.
     * @example "+1234567890"
     */
    phone_number: string;

    /**
     * Specifies whether the group is public or private.
     * - "public" means anyone can join.
     * - "private" means users need an invitation to join.
     * @example "public"
     */
    type: string;

    /**
     * A brief description of the group that is visible to potential members.
     * @example "A community for tech enthusiasts to share knowledge and ideas."
     */
    description: string;

    /**
     * The URL pointing to an image that represents the group, usually displayed as an avatar or banner.
     * @example "https://example.com/group-image.jpg"
     */
    image_url: string;

    /**
     * The unique identifier of the user who created the group.
     * @example "user_123"
     */
    creator_user_id: string;

    /**
     * The UNIX timestamp representing when the group was created.
     * @example 1609459200
     */
    created_at: number;

    /**
     * The UNIX timestamp representing the last time the group was updated.
     * @example 1609462800
     */
    updated_at: number;

    /**
     * The maximum number of members allowed in the group. Once this limit is reached, new members cannot join unless someone leaves.
     * @example 500
     */
    max_members: number;

    /**
     * The name of the theme being applied to the group. This could determine the visual style or design for the group's interface.
     * @example "dark-theme"
     */
    theme_name: string;

    /**
     * A boolean value that indicates whether new members need to be approved before joining the group.
     * @example true
     */
    requires_approval: boolean;

    /**
     * A boolean value that indicates whether new members must answer a question before joining the group.
     * @example false
     */
    show_join_question: boolean;

    /**
     * The URL that can be shared with others to invite them to join the group.
     * @example "https://example.com/invite/12345"
     */
    share_url: string;

    /**
     * The total number of members currently in the group.
     * @example 100
     */
    member_count: number;

    /**
     * The total number of messages that have been sent in the group.
     * @example 1200
     */
    message_count: number;
}

/**
 * Parses a JSON object into a Group instance.
 * @param {object} json - The raw JSON object.
 * @returns {Group} The parsed Group instance.
 */
function parseGroup(json: Record<string, any>): Group {
    return {
        id: json['id'],
        group_id: json['group_id'],
        name: json['name'],
        phone_number: json['phone_number'],
        type: json['type'],
        description: json['description'],
        image_url: json['image_url'],
        creator_user_id: json['creator_user_id'],
        created_at: json['created_at'],
        updated_at: json['updated_at'],
        max_members: json['max_members'],
        theme_name: json['theme_name'],
        requires_approval: json['requires_approval'],
        show_join_question: json['show_join_question'],
        share_url: json['share_url'],
        member_count: json['member_count'],
        message_count: json['message_count']
    };
}

export { Group, parseGroup }