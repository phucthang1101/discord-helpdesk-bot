import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder().setName("ping1").setDescription('Replies with pong pong!')

export async function execute(interaction: CommandInteraction) {
    return interaction.reply("Pong Pong Pong 22!")
}