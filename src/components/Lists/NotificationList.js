import React from "react";
import { StyleSheet, FlatList } from "react-native";

import NotificationListItem from "../ListItem/NotificationListItem";

const NotificationList = props => {



  return (
    <FlatList
      style={styles.listContainer}
      data={props.categories}
      renderItem={(info) => (
        <NotificationListItem
          categoryName={info.item.Title}
          categoryImage={info.item.Image}
           Description={info.item.Description}
           Date={info.item.NewsDate}
         
        />
      )}
      keyExtractor={item => item.Id.toString() }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default NotificationList;
