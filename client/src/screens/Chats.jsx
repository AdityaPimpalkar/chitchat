import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../www/socket";
import SocketEvents from "../events/constants";
import { requestPinged, chatPinged } from "../store/navigation";
import { chatAdded, messageReceived } from "../store/entities/conversations";
import { requestReceived } from "../store/entities/requests";
import Container from "../layouts/Container";
import Sidebar from "../layouts/Sidebar";
import Content from "../layouts/Content";
import Header from "../components/sidebar/Header";
import Navigation from "../components/sidebar/Navigation";
import Entities from "../components/sidebar/Entities";
import DirectMessage from "../components/content/DirectMessage";
import UserDetails from "../components/content/UserDetails";

const Chats = () => {
  const chat = useSelector((state) => state.entity.chat);
  const userDetail = useSelector((state) => state.entity.user);
  const navigation = useSelector((state) => state.navigation.currentTab);
  const chatPing = useSelector((state) => state.navigation.chatPing);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(SocketEvents.PRIVATE_MESSAGE, ({ content, from, to, sentOn }) => {
      if (chat.userId !== from) {
        dispatch(messageReceived({ content, from, to, sentOn }));
        if (chatPing === false) dispatch(chatPinged());
      }
    });
    socket.on(SocketEvents.NEW_REQUEST, (request) => {
      dispatch(requestReceived(request));
      if (navigation !== "REQUESTS") dispatch(requestPinged());
    });
    socket.on(SocketEvents.NEW_FRIEND, (friend) => {
      dispatch(chatAdded(friend));
      if (navigation !== "CHATS") dispatch(chatPinged());
    });
    return () => {
      socket.off(SocketEvents.PRIVATE_MESSAGE);
      socket.off(SocketEvents.NEW_REQUEST);
      socket.off(SocketEvents.NEW_FRIEND);
    };
  }, [chat, chatPing, navigation, dispatch]);

  return (
    <Container>
      <Sidebar>
        <Header />
        <Navigation />
        <Entities />
      </Sidebar>
      <Content>
        {chat.userId && <DirectMessage />}
        {userDetail.userId && <UserDetails />}
      </Content>
    </Container>
  );
};

export default Chats;
