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
    /** The bot ID to allow the bot to send messages via the GroupMe API. */
    private BOT_ID: string;

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
     * @param bot_id - The bot ID to authenticate message requests.
     * @param access_token - The access token for the GroupMe API.
     * @param smee_url - The Smee.io URL used to receive callbacks.
     * @param port - The port to open the local webserver on.
     */
    constructor(
        bot_id: string,
        access_token: string,
        smee_url: string,
        port: number
    ) {
        super();
        this.BOT_ID = bot_id;
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

    /**
     * Starts the Smee client to listen for incoming callbacks from GroupMe
     * and sets up a local Express server to handle these callbacks.
     * Emits a 'ready' event when the server is successfully started.
     *
     * This method will create an endpoint at the specified PORT that listens
     * for POST requests. When a request is received, it emits both 'raw_callback'
     * and 'callback' events, allowing users to handle GroupMe events.
     *
     * @example
     * const groupMe = new GroupMe(botId, accessToken, smeeUrl, port);
     * groupMe.Start();
     */
    Start(): void {
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
            const callback = parseCallback(req.body);
            switch (callback.sender_type) {
                case 'user':
                    this.emit('user_msg', callback);
                    break;
                case 'system':
                    this.emit('system_msg', callback);
                    break;
                case 'bot':
                    this.emit('bot_msg', callback);
                    break;
            }
            res.status(200).send('');
        });

        app.listen(this.PORT, () => {
            this.emit('ready');
        });
    }

    /**
     * Sends a message to the GroupMe group using the bot ID.
     *
     * @param content - The text content of the message to be sent.
     * @returns A promise that resolves to a boolean indicating the success of the operation.
     * @throws Will throw an error if the server response status is not 202.
     *
     * @example
     * const success = await groupMe.SendMessage('Hello, GroupMe!');
     * if (success) {
     *     console.log('Message sent successfully!');
     * }
     */
    async SendMessage(content: string): Promise<boolean> {
        const body = { text: content, bot_id: this.BOT_ID };

        const response = await this.SESSION.post(
            'https://api.groupme.com/v3/bots/post',
            JSON.stringify(body),
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status != 202) {
            throw new Error(
                `Invalid server status code. Expected 202, received: ${response.status}`
            );
        }

        return true;
    }
}

export default GroupMe;
