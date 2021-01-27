import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  listItemSeparator,
  ListItemDeleteAction,
} from "../components/lists";
import ListingDetailsScreen from "./ListingDetailsScreen";
const initialMessages = [
  {
    id: 1,
    title: "Asad Baig",
    description: "Seller",
    image: require("../assets/asad.jpg"),
  },
  {
    id: 2,
    title: "Abdullah Najam",
    description: "Seller",
    image: require("../assets/asad.jpg"),
  },
  {
    id: 3,
    title: "Ali Zaib",
    description: "Seller",
    image: require("../assets/asad.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  // delete item function
  const handleDelete = (message) => {
    const newMessages = messages.filter((m) => m.id !== message.id);
    setMessages(newMessages);
  };
  return (
    <Screen styles={styles.screen}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={listItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 3,
              title: "Ali Zaib",
              description: "Seller",
              image: require("../assets/asad.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
