import GroupMe from './groupme/GroupMe';
import { Callback } from './groupme/types/Callback';

const groupMe = new GroupMe(
    '448ff6a2137e682cb6e478710b',
    '1My7L658ugPeMzRLCF6GkF4ulXJAlkTf6WZI4cY8',
    'https://smee.io/xJU7MWXmHW10X1s',
    5000
);

groupMe.on('ready', () => {
    console.log('Ready to go!');
});

groupMe.on('user_msg', (callback: Callback) => {
    console.log(callback);
    groupMe.SendMessage('alhumdulilah');
});

groupMe.Start();

// groupMe
//     .FindGroups()
//     .then((groups) => {
//         console.log(`Total Groups: ${groups.length}`);
//         console.log();
//         for (const group of groups) {
//             console.log(`Group Name: ${group.name}`);
//             console.log(`Description: ${group.description}`);
//             console.log(`Members: ${group.members.length}`);
//             console.log(`Messages: ${group.message_count}`);
//         }
//     })
//     .catch((e) => {
//         console.log(e);
//     });

// Stop forwarding events
// events.close();
