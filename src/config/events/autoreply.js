/*
# format:
# delay guild_id_match channel_id_match author_match ignore_case message_match_type message_match_value message_response reply_direct
# delay in ms
# first two can be * for all or start with !<id> to exclude
# message match type can be whole - whole matches, contains - if the message contains, or regex for regex - not implemented, or any to match everything
*/

export const config = {
    'replies': [
        {
            // todo: 'delay': 50,
            // 'server': '846400341108850708',
            // 'channel': '*',
            'user': '603276095483150358',
            'ignore_case': true,
            'match_type': 'any',
            'match_value': '',
            'response': '<:omegaclown:913547445747728405> man!',
            'negate': [],
            'reply_direct': false,
        },
        {
            'user': '692350815679152179',
            'ignore_case': true,
            'match_type': 'contains',
            'match_value': 'javascript',
            'response': 'i am running on js, it makes me suicidal',
            'negate': ['user'],
            'reply_direct': false,
        },
        {
            'user': '692350815679152179',
            'ignore_case': true,
            'match_type': 'contains',
            'match_value': 'windows',
            'response': 'windows feels like trying to type on a brick wall',
            'negate': ['user'],
            'reply_direct': false,
        },
        {
            'user': '692350815679152179',
            'ignore_case': true,
            'match_type': 'contains',
            'match_value': 'typescript',
            'response': 'typescript is as much of a scam as windows',
            'negate': [],
            'reply_direct': false,
        },
        {
            'user': '692350815679152179',
            'ignore_case': true,
            'match_type': 'contains',
            'match_value': '<@692350815679152179>',
            'response': 'who pinged me',
            'negate': [],
            'reply_direct': false,
        },
        {
            'ignore_case': true,
            'match_type': 'contains',
            'match_value': '<@488063040621641736>',
            'response': 'warning: you may have pinged someone who is a degenerate who plays fortnite - https://up.tesscat.me/cchr',
            'negate': [],
            'reply_direct': false,
        },
    ]
}