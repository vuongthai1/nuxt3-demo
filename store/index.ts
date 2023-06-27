// import { ActionContext } from "vuex";
// import { RootState } from "@/store"; // Update with your store module type

export const actions = {
  async nuxtServerInit(
    { dispatch }: any,
    { req, $auth }: { req: any; $auth: any }
  ): Promise<void> {
    const loggedIn: boolean = $auth.loggedIn;
    console.log({ nuxtServerInit: loggedIn });

    if (loggedIn) {
      await dispatch("site/getPublishedEntries");
      await dispatch("user/getAuthenIfo");
      await dispatch("role/getRoles");
    }
  },
};
