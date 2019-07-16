import React from "react";
import { StyleSheet, FlatList } from "react-native";

import CategoryListItem from "../ListItem/CategoryListItem";

const GalleryList = props => {



  return (
    <FlatList
      style={styles.listContainer}
      data={props.categories}
      renderItem={(info) => (
        <CategoryListItem
          categoryName={info.item.CategoryTitle}
          categoryImage={info.item.Categoryimage}
          onItemPressed={() => props.onItemSelected(info.item.Id)}
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

export default GalleryList;
