![GroupMe Logo](https://149354979.v2.pressablecdn.com/wp-content/uploads/2013/08/groupme_logo_lockup_horizontal.jpg)

# GroupMeBot

A TypeScript library to allow for the creation of GroupMe bots, without the need for opening a port to receive callbacks.

## Features

-   Receive user, bot, and system messages- FAST
-   Pull information from up to 10 groups
-   Send messages

## Installation

Head over to [smee.io](https://smee.io/new) to generate a new channel URL to be used for callbacks. Keep this URL safe and secure, and make sure to pass it to the GroupMe constructor.

```bash
  npm install
```

## Usage/Examples

```typescript
import GroupMe from './groupme/GroupMe';
import { Callback } from './groupme/types/Callback';

const groupMe = new GroupMe(
    'BOT_ID',
    'ACCESS_TOKEN',
    'SMEE_URL',
    <PORT>
);

groupMe.on('ready', () => {
    console.log('Ready to go!');
});

groupMe.on('user_msg', (callback: Callback) => {
    console.log(callback);
    groupMe.SendMessage('It works!');
});

groupMe.Start();
```

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/StephenSulimani/GroupMeBot/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![GroupMeBot](https://img.shields.io/github/stars/StephenSulimani/GroupMeBot)](https://github.com/StephenSulimani/GroupMeBot)

## Contributing

Contributions are always welcome!

Please try to maintain the current code style.

## License

[MIT](https://github.com/StephenSulimani/GroupMeBot/blob/master/LICENSE)
