import directMessageEvents from "./directMessage.js";
import FriendsEvents from "./Friends.js";
import groupMessageEvents from "./groupMessage.js";

import onConnectionEvents from "./onConnection.js";
import onDisconnectEvents from "./onDisconnect.js";

export default async function connection() {
  onConnectionEvents();
  directMessageEvents();
  groupMessageEvents();
  onDisconnectEvents();
  FriendsEvents();
}
