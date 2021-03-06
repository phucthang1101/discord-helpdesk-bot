import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription('Creates a new help ticket.')
    .addStringOption(option =>
        option
            .setName("description")
            .setDescription("Describe your problems")
            .setRequired(true)
    );


export async function execute(interaction: CommandInteraction, client: Client) {
    if(!interaction?.channelId){
        return
    }
    const channel = await client.channels.fetch(interaction.channelId)

    // check the current must be the normal channel and a text channel, or else we will return;
    if(!channel || channel.type !== "GUILD_TEXT"){
        return 
    }

    const thread = await (channel as TextChannel).threads.create({
        name: `support-${Date.now()}`,
        reason: `Support ticket ${Date.now()}`
    })

    const problemDescription = interaction.options.getString("description")!

    const {user } = interaction;
    thread.send(`**User:** <${user}>
    **Problem:** ${problemDescription}`)

    //TODO: create the ticket and store it in the firestore

    return interaction.reply({
        content: "Help is on the way!",
        ephemeral: true,
    })
}