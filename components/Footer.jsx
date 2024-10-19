import Link from "next/link";
import { FaDiscord, FaTwitch, FaYoutube, FaInstagram } from "react-icons/fa";
import styles from "@styles/Home.module.css";

const discordInviteLink = "https://discord.gg/u8zRKuK";
const twitchLink = "https://www.twitch.tv/gtalatam";
const youtubeLink = "https://youtube.com/@GTASpeedrunLatam";
const instagramLink = "https://instagram.com/gtaspeedrunlatam";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href={discordInviteLink} target="_blank" rel="noopener noreferrer">
        <FaDiscord size={36} />
      </Link>
      <Link href={twitchLink} target="_blank" rel="noopener noreferrer">
        <FaTwitch size={36} />
      </Link>
      <Link href={youtubeLink} target="_blank" rel="noopener noreferrer">
        <FaYoutube size={36} />
      </Link>
      <Link href={instagramLink} target="_blank" rel="noopener noreferrer">
        <FaInstagram size={36} />
      </Link>
    </footer>
  );
};

export default Footer;