import { 
  Group, 
  Text, 
  Container, 
  Anchor, 
  Divider, 
  rem,
  AppShell
} from '@mantine/core';
import { 
  IconBrandDiscord, 
  IconBrandTwitch, 
  IconBrandYoutube, 
  IconBrandInstagram 
} from '@tabler/icons-react';
const discordInviteLink = "https://discord.gg/u8zRKuK";
const twitchLink = "https://www.twitch.tv/gtalatam";
const youtubeLink = "https://youtube.com/@GTASpeedrunLatam";
const instagramLink = "https://instagram.com/gtaspeedrunlatam";

const Footer = () => {
  const iconSize = 24;
  
  return (
    <div>
      <Container size="lg" py="md">
        <Divider my="sm" />
        <Group justify="space-between" align="center">
          <Group gap="md">
            <Anchor href={discordInviteLink} target="_blank" rel="noopener noreferrer">
              <IconBrandDiscord size={iconSize} stroke={1.5} />
            </Anchor>
            <Anchor href={twitchLink} target="_blank" rel="noopener noreferrer">
              <IconBrandTwitch size={iconSize} stroke={1.5} />
            </Anchor>
            <Anchor href={youtubeLink} target="_blank" rel="noopener noreferrer">
              <IconBrandYoutube size={iconSize} stroke={1.5} />
            </Anchor>
            <Anchor href={instagramLink} target="_blank" rel="noopener noreferrer">
              <IconBrandInstagram size={iconSize} stroke={1.5} />
            </Anchor>
          </Group>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;