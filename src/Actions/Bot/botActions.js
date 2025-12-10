import { BOT } from "./types";

export const addMessageToChatFrom = (msg, type) => ({
  type: BOT.ADD_MSG_TO_CHAT_FROM,
  payload: { msg, type },
});
