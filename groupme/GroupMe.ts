import axios, { AxiosInstance } from 'axios';
import { Group, parseGroup } from './types/Group';
import EventEmitter from 'events';
import SmeeClient from 'smee-client';
import express from 'express';
import bodyParser from 'body-parser';
import { parseCallback } from './types/Callback';

/**
 * Class representing a GroupMe client for accessing group information.
 */
class GroupMe extends EventEmitter {
    /** The access token for authenticating with the GroupMe API. */
    private ACCESS_TOKEN: string;

    /** Axios instance for making HTTP requests. */
    private SESSION: AxiosInstance;

    /** Smee URL used to receive GroupMe callbacks. */
    private SMEE_URL: string;

    /** Port to open local webserver on */
    private PORT: number;

    /**
     * Creates an instance of GroupMe.
     * @param access_token - The access token for the GroupMe API.
     * @param smee_url - The Smee.io URL used to receive callbacks.
     * @param port - The port to open the local webserver on.
     */
    constructor(access_token: string, smee_url: string, port: number) {
        super();
        this.ACCESS_TOKEN = access_token;
        this.SESSION = axios.create({
            validateStatus: () => true,
        });
        this.SMEE_URL = smee_url;
        this.PORT = port;
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

    Start() {
        const smee = new SmeeClient({
            source: this.SMEE_URL,
            target: `http://localhost:${this.PORT}`,
            logger: {
                error: console.info.bind(console),
                info: () => {},
            },
        });

        smee.start();

        const app = express();
        app.use(bodyParser.json());

        app.post('/', (req, res) => {
            this.emit('raw_callback', req.body);
            this.emit('callback', parseCallback(req.body));
            res.status(200).send('');
        });

        app.listen(this.PORT, () => {
            this.emit('ready');
        });
    }
}

export default GroupMe;
