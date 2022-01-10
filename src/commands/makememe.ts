import { Discord, Slash, SlashGroup, SlashOption } from "discordx";

@Discord()
@SlashGroup('makememe', 'makes a meme from a selection of templates')
abstract class Command {
    @Slash('topbottomtext', { 'description': 'Make a top text/bottom text meme with an image' })
    async topbottomtext(
        @SlashOption('image', {'description': 'The image url', 'type': 'STRING'})
        image_url: string,
        @SlashOption('toptext', {'description': 'The top text', 'type': 'STRING'})
        toptext: string,
        @SlashOption('bottomtext', {'description': 'The bottom text', 'type': 'STRING'})
        bottomtext: string,
    ) {
        throw 'Not impl';
    }
}