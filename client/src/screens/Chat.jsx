import React, { Component } from "react";
import socket from "../www/socket";
import ChatEvents from "../events/ChatEvents";
import Header from "../components/Header";
import ChatContainer from "../components/ChatContainer";
import NavigationButtons from "../components/NavigationButtons";
import Users from "../components/Users";
class Chat extends ChatEvents {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      users: this.props.users,
      groups: this.props.groups,
      friendRequests: this.props.friendRequests,
      selectedUser: {},
      selectedGroup: {},
      directMessage: true,
      directMessageNotification: false,
      group: false,
      groupNotification: false,
      newGroup: false,
      friends: false,
      friendsNotification: false,
      message: "",
      messages: [],
      search: "",
    };
  }

  componentDidMount() {
    // socket.on("user connected", (user) => this.userConnected(user));
    // socket.on("user disconnected", (user) => this.userDisconnected(user));
    // socket.on("private message", (message) => this.privateMessage(message));
    socket.on("user messages", (messages) => this.userMessages(messages));
    // socket.on("newRequest", (friend) => this.newRequest(friend));
    //socket.on("newFriend", (friend) => this.newFriend(friend));
  }

  selectUser = (selectedUser) => {
    this.setState({
      selectedUser,
      message: "",
      messages: [],
    });
    const socket = this.state.socket;
    socket.emit("user messages", selectedUser);
    this.newDirectMessage(selectedUser.userId, false);
  };

  render() {
    return (
      <ChatContainer>
        <div class="w-30 flex flex-col bg-gray-100 bg-purple-900">
          <Header user={this.state.user} />
          <NavigationButtons
            toggleChats={this.toggleChats}
            toggleGroups={this.toggleGroups}
            toggleFriends={this.toggleFriends}
            directMessage={this.state.directMessage}
            directMessageNotification={this.state.directMessageNotification}
            group={this.state.group}
            groupNotification={this.state.groupNotification}
            friends={this.state.friends}
            friendsNotification={this.state.friendsNotification}
          />
          <Users users={this.state.users} selectUser={this.selectUser} />
        </div>
        <div class="w-70 flex flex-1 flex-col">
          <div class="flex bg-gray-300 h-16 p-4">Header</div>
          <div class="flex flex-1 bg-blue-300 overflow-y-auto paragraph px-4">
            Creative Writing Generating random paragraphs can be an excellent
            way for writers to get their creative flow going at the beginning of
            the day. The writer has no idea what topic the random paragraph will
            be about when it appears. This forces the writer to use creativity
            to complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. Creative Writing
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. The writer can use
            the paragraph as the first one of a short story and build upon it. A
            second option is to use the random paragraph somewhere in a short
            story they create. The third option is to have the random paragraph
            be the ending paragraph in a short story. No matter which of these
            challenges is undertaken, the writer is forced to use creativity to
            incorporate the paragraph into their writing. Tackle Writers' Block
            A random paragraph can also be an excellent way for a writer to
            tackle writers' block. Writing block can often happen due to being
            stuck with a current project that the writer is trying to complete.
            By inserting a completely random paragraph from which to begin, it
            can take down some of the issues that may have been causing the
            writers' block in the first place. Beginning Writing Routine Another
            productive way to use this tool to begin a daily writing routine.
            One way is to generate a random paragraph with the intention to try
            to rewrite it while still keeping the original meaning. The purpose
            here is to just get the writing started so that when the writer goes
            onto their day's writing projects, words are already flowing from
            their fingers. Writing Challenge Another writing challenge can be to
            take the individual sentences in the random paragraph and
            incorporate a single sentence from that into a new paragraph to
            create a short story. Unlike the random sentence generator, the
            sentences from the random paragraph will have some connection to one
            another so it will be a bit different. You also won't know exactly
            how many sentences will appear in the random paragraph. Creative
            Writing Generating random paragraphs can be an excellent way for
            writers to get their creative flow going at the beginning of the
            day. The writer has no idea what topic the random paragraph will be
            about when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. The writer can use
            the paragraph as the first one of a short story and build upon it. A
            second option is to use the random paragraph somewhere in a short
            story they create. The third option is to have the random paragraph
            be the ending paragraph in a short story. No matter which of these
            challenges is undertaken, the writer is forced to use creativity to
            incorporate the paragraph into their writing. Tackle Writers' Block
            A random paragraph can also be an excellent way for a writer to
            tackle writers' block. Writing block can often happen due to being
            stuck with a current project that the writer is trying to complete.
            By inserting a completely random paragraph from which to begin, it
            can take down some of the issues that may have been causing the
            writers' block in the first place. Beginning Writing Routine Another
            productive way to use this tool to begin a daily writing routine.
            One way is to generate a random paragraph with the intention to try
            to rewrite it while still keeping the original meaning. The purpose
            here is to just get the writing started so that when the writer goes
            onto their day's writing projects, words are already flowing from
            their fingers. Writing Challenge Another writing challenge can be to
            take the individual sentences in the random paragraph and
            incorporate a single sentence from that into a new paragraph to
            create a short story. Unlike the random sentence generator, the
            sentences from the random paragraph will have some connection to one
            another so it will be a bit different. You also won't know exactly
            how many sentences will appear in the random paragraph. Creative
            Writing Generating random paragraphs can be an excellent way for
            writers to get their creative flow going at the beginning of the
            day. The writer has no idea what topic the random paragraph will be
            about when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. The writer can use
            the paragraph as the first one of a short story and build upon it. A
            second option is to use the random paragraph somewhere in a short
            story they create. The third option is to have the random paragraph
            be the ending paragraph in a short story. No matter which of these
            challenges is undertaken, the writer is forced to use creativity to
            incorporate the paragraph into their writing. Tackle Writers' Block
            A random paragraph can also be an excellent way for a writer to
            tackle writers' block. Writing block can often happen due to being
            stuck with a current project that the writer is trying to complete.
            By inserting a completely random paragraph from which to begin, it
            can take down some of the issues that may have been causing the
            writers' block in the first place. Beginning Writing Routine Another
            productive way to use this tool to begin a daily writing routine.
            One way is to generate a random paragraph with the intention to try
            to rewrite it while still keeping the original meaning. The purpose
            here is to just get the writing started so that when the writer goes
            onto their day's writing projects, words are already flowing from
            their fingers. Writing Challenge Another writing challenge can be to
            take the individual sentences in the random paragraph and
            incorporate a single sentence from that into a new paragraph to
            create a short story. Unlike the random sentence generator, the
            sentences from the random paragraph will have some connection to one
            another so it will be a bit different. You also won't know exactly
            how many sentences will appear in the random paragraph.
          </div>
          <div class="flex">Footer</div>
        </div>
        {/* <div class="flex">Footer</div> */}
      </ChatContainer>
    );
  }
}

export default Chat;
