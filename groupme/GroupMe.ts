import axios, { AxiosInstance } from 'axios';
import { Group, parseGroup } from './types/Group';

/**
 * Class representing a GroupMe client for accessing group information.
 */
class GroupMe {
    /** The access token for authenticating with the GroupMe API. */
    ACCESS_TOKEN: string;

    /** Axios instance for making HTTP requests. */
    SESSION: AxiosInstance;

    /**
     * Creates an instance of GroupMe.
     * @param access_token - The access token for the GroupMe API.
     */
    constructor(access_token: string) {
        this.ACCESS_TOKEN = access_token;
        this.SESSION = axios.create({
            validateStatus: () => true,
        });
    }

    /**
     * Fetches the groups associated with the access token.
     * @returns A promise that resolves to an array of Group objects.
     * @throws Will throw an error if the server response status is not 200.
     * @throws Will throw an error if the API response meta code is not 200.
     */
    async FindGroups(): Promise<Group[]> {
        const response = await this.SESSION.get(
            `https://api.groupme.com/v3/groups?token=${this.ACCESS_TOKEN}`
        );

        if (response.status != 200) {
            throw new Error(
                `Invalid server status code. Expected 200, received: ${response.status}`
            );
        }

        const json: Record<string, any> = response.data;

        if (json['meta']['code'] != 200) {
            throw new Error(
                `Invalid meta code. Expected 200, received: ${json['meta']['code']}`
            );
        }

        const groups: Group[] = [];

        for (const raw_group of json['response']) {
            groups.push(parseGroup(raw_group));
        }

        return groups;
    }
}

export default GroupMe;
