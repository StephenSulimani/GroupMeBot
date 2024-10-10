/**
 * Represents a member with various properties such as its ID, name, nickname, and more.
 * THis interface is used to model a member in an individual GroupMe group.
 *
 * @interface Member
 */
interface Member {
    /**
     * The unique identifier to identify a user across all of GroupMe.
     * @example "12345"
     */
    user_id: string;

    /**
     * The nickname chosen by the user for a certain group.
     * @example "Sam"
     */
    nickname: string;

    /**
     * The unique identifier to identify a user in a given group.
     * This value is not constant across the entire platform.
     * @example "12345"
     */
    id: string;

    /**
     * Whether or not the user has the current group muted.
     * @example false
     */
    muted: boolean;

    /**
     * Whether or not the user was automatically kicked.
     * @example false
     */
    autokicked: boolean;

    /**
     * The roles the user currently holds
     * - "admin" - the user has the ability to change group settings, and moderate chat.
     * - "owner" - the user has all admin powers, but has the ability to delete the group.
     * - "user" - the user is a regular user and exists in the group.
     * @example ["admin", "owner"]
     */
    roles: string[];

    /**
     * The default name of the user when they join new GroupMe communities.
     * @example "Samuel"
     */
    name: string;
}

/**
 * Parses a JSON object into a Member instance.
 * @param {object} json - The raw JSON object.
 * @returns {Member} The parsed Member instance.
 */
function parseMember(json: Record<string, any>): Member {
    return {
        user_id: json['user_id'],
        nickname: json['nickname'],
        id: json['id'],
        muted: json['muted'],
        autokicked: json['autokicked'],
        roles: json['roles'],
        name: json['name'],
    };
}

export { Member, parseMember };
