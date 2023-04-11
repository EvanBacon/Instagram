import { Link } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import NavigationService from '../navigation/NavigationService';
import IconBar from "./IconBar";

interface Props {
  item: {
    account: string;
    description: string;
    date: string;
    comments?: Array<string>;
  };
}

export const ItemFooter: React.FC<Props> = ({ item }) => {
  // const openComments = () => {
  //   NavigationService.navigate('Profile_Comments', {
  //     item: {
  //       date: 'April 2',
  //       ...item,
  //     },
  //   });
  // };
  const { account, description, date, comments } = item;
  return (
    <View style={styles.container}>
      <IconBar />
      <Text style={styles.itemText}>
        <Text style={styles.itemAccount}>{account}</Text> {description}
      </Text>
      {comments && comments.length > 0 && (
        <Link asChild href="/(post-modal)/p/123">
          <TouchableOpacity style={styles.commentLink}>
            <Text style={styles.commentLinkText}>
              View all {comments.length} comments
            </Text>
          </TouchableOpacity>
        </Link>
      )}
      <Text style={styles.dateText}>{date?.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  itemText: {
    marginTop: 6,
    fontSize: 14,
    color: "#262626",
    fontWeight: "600",
  },
  itemAccount: {
    fontWeight: "600",
    color: "#262626",
    fontSize: 14,
  },
  commentLink: {
    paddingVertical: 8,
  },
  commentLinkText: {
    fontSize: 14,
    opacity: 0.6,
  },
  dateText: {
    fontSize: 10,
    color: "#999",
  },
});

export default ItemFooter;
