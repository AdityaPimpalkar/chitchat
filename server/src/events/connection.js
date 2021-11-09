import directMessageEvents from "./directMessage";
import groupMessageEvents from "./groupMessage";
import onConnectionEvents from "./onConnection";
import onDisconnectEvents from "./onDisconnect";

export default async function connection(io,socket) {
    onConnectionEvents(socket);
    directMessageEvents(socket);
    groupMessageEvents(socket);
    onDisconnectEvents(io, socket);
}