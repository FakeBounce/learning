import { messages as root_messages } from '../fr.ts';
import { messages as login_messages } from '../login/fr.ts';

const messages = {
  ...root_messages,
  ...login_messages
};
export { messages };
