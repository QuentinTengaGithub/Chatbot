import { BOT } from '../../Actions/Bot/types';
import { constructChatMessage } from '../../utils';

export const initialState = {
  chatArray: [],
}

const botReducer = (state = initialState, action) => { //NOSONAR
  switch (action.type) {
    case BOT.ADD_MSG_TO_CHAT_FROM: {
      let { payload } = action;
      // Three types are there, either "me" (asked by the user) || "bot1" from bot1
      const newMsg = constructChatMessage(payload)
      return {
        ...state,
        chatArray: [...state.chatArray, newMsg],
      }
    }
    default:
      return state;
  };
};

export default botReducer;
