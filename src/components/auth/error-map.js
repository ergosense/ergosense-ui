/*
 | Custom error map
 | ----------------
 | Copy of the aws-amplify-react AmplifyMessageMap, but since
 | it's not exported from node_modules, we have to duplicate it
 | here. This is where we will map AWS errors to more readable
 | error message.
 */
import { I18n } from '@aws-amplify/core';

export const MapEntries = [
    ['User does not exist', /user.*not.*exist/i],
    ['User already exists', /user.*already.*exist/i],
    ['Incorrect username or password', /incorrect.*username.*password/i],
    ['Password attempts exceeded', /password.*attempts.*exceeded/i],
    ['Invalid password format', /validation.*password/i],
    [
        'Invalid phone number format',
        /invalid.*phone/i,
        'Invalid phone number format. Please use a phone number format of +12345678900'
    ]
];

export default function ErrorMap(message) {
    const match = MapEntries.filter(entry => entry[1].test(message));
    if (match.length === 0) return message;

    const entry = match[0];
    const msg = entry.length > 2 ? entry[2] : entry[0];

    return I18n.get(entry[0], msg);
}