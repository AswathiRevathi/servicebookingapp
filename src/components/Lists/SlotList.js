import React from 'react';
import { Text, View } from 'react-native';
import GridView from 'react-native-gridview';
import SlotListItem from '../ListItem/SlotListItem'
 
const itemsPerRow = 5;
 
export default function SlotList(props) {
  return (
      <View>
       <GridView 
      data={props.slotList}
      dataSource={props.randomizeRows ? dataSource : null}
      itemsPerRow={itemsPerRow}
      renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
        return (
        <SlotListItem
          slotTitile={item.SlotTittle}
          slotText={item.SlotText}
           slotStatus={item.SlotStatus}
           selectStatus={item.isSelected}
           color={item.SlotColor}
          onItemPressed={() => props.onItemSelected(item.SlotTittle, itemID,item.SlotStatus)}
        />
        );
      }}
    />
    {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10}}>
         <View style={{width:10,height:10,backgroundColor:'#aab7ad'}}></View>
         <Text style={{marginLeft:10,marginRight:10}}>Reserved</Text>
         <View style={{width:10,height:10,backgroundColor:'powderblue'}}></View>
          <Text style={{marginLeft:10}}>Not Reserved</Text>
         </View> */}
    </View>
  );
}