
const settings = [
  {
    env: "develop",
    base_url: "http://vnapi.asiaesolutions.com/cmsapi",
    media_url: "http://vnapi.asiaesolutions.com/mediacontent",
    media_img_url: "http://vnapi.asiaesolutions.com/content",
  },
  {
    env: "beta",
    base_url: "https://livethereapi.asiaesolutions.com/cmsapi",
    media_url: "https://livethereapi.asiaesolutions.com/mediaapi",
    media_img_url: "https://livethereapi.asiaesolutions.com/content",
  },
  {
    env: "production",
    base_url: "https://api.livethere.com/cms",
    media_url: "https://api.livethere.com/cmsmedia",
    media_img_url: "https://api.livethere.com/content/cms",
  },
];

export const CURRENT_ENV = "develop";
export const currentSettings = settings.find(
  (item) => item.env === CURRENT_ENV
);

export const appSettings = {
  baseURL: currentSettings!.base_url,
  siteName: "Livethere CMS",
};

export const appMedia = {
  baseURL: currentSettings!.media_url,
  siteName: "Livethere CMS",
};

export const appMedia_img_url = {
  baseURL: currentSettings!.media_img_url,
};

export const BETA_PUBLIC_URL = "https://livethere.asiaesolutions.com";
