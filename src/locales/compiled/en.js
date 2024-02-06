import { messages as root_messages } from '../en.ts';
import { messages as login_messages } from '../login/en.ts';
const messages = {
  ...root_messages,
  ...login_messages
};
export { messages };
