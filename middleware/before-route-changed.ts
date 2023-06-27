// import { Context } from "@nuxt/types"

import { Context } from "@nuxt/types";

export default async function ({
  $fetch,
  redirect,
  store,
  app,
  route,
}: Context): Promise<void> {
  // const loggedIn = $auth.loggedIn;
  const siteIdCookie = app.$cookies.get("siteId");
  const publishedSites = store.state.site.publishedEntries;
  const userInfo = store.state.user.authenInfo;
  const currentPath = route.path;

  store.commit("role/setCurrentRole", userInfo);
  if (publishedSites.length > 0) {
    let activeSite;
    if (siteIdCookie !== undefined) {
      activeSite =
        publishedSites.find((site: { id: any }) => site.id === siteIdCookie) ??
        null;
    } else {
      activeSite = publishedSites[0];
    }
    store.commit("site/setActiveSite", activeSite);
  } else {
    return redirect("/auth/signin");
  }
}
