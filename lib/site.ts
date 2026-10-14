/** Names, links and the download URLs every page uses. */
export const SITE = {
  name: "Noodle LLM",
  // The company behind it, as noodletechnology.com and the Terms name it.
  company: "Noodle Technology, LLC",
  companyUrl: "https://noodletechnology.com",
  // The live domain -- this also feeds canonical URLs and the sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://noodlellm.com",
  // The download buttons point straight here: GitHub serves the newest release's file.
  installerUrl: "https://github.com/HearthLabs/noodlellm-website/releases/latest/download/NoodleLLM-Setup.exe",
  macInstallerUrl: "https://github.com/HearthLabs/noodlellm-website/releases/latest/download/NoodleLLM-mac.dmg",
};
