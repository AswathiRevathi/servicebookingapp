import React, { Component } from 'react';
import { Text, View,FlatList } from 'react-native';
//  import AddressListItems from '../ListItem/AddressListItems';
// import AddressListItem from '../ListItem/AddressListItem';
import AddressListItems from '../ListItem/AddressListItems';

import GridView from 'react-native-gridview';
import { Button } from 'native-base';
const itemsPerRow = 1;
const AddressList=(props)=>{


//   render()
//   {
      var va=props.dummyData

      for(var i in va){
                  console.log("Testing status value","--"+va[i].isSelected);

      }

    //  for(var i in va){

    //       console.log("INLISTING","--"+va[i].Name);
    //       console.log("INLISTING","--"+va[i].Id);
    //       console.log("INLISTING","--"+va[i].Age);
    //       console.log("INLISTING","--"+va[i].MobileNumber);
    //       console.log("INLISTING","--"+va[i].Gender);
    //       console.log("INLISTING","--"+va[i].DateofBirth);
    //       console.log("INLISTING","--"+va[i].HouseName);
    //       console.log("INLISTING","--"+va[i].Locality);
    //       console.log("INLISTING","--"+va[i].Distric);
    //       console.log("INLISTING","--"+va[i].State);
    //       console.log("INLISTING","--"+va[i].Pincode);
          
    //  }
    console.log("RadioId is","--"+props.radioId);
    return (
      <View>
       <GridView 
                data={props.dummyData}
                dataSource={props.randomizeRows ? dataSource : null}
      itemsPerRow={itemsPerRow}
      renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
        return (
         
          <AddressListItems   
          namee={item.Name}
             id={item.Id}
             age={item.Age}
             mobileNumber={item.MobileNumber}
             gender={item.Gender}
             dob={item.DateofBirth}
             houseName={item.HouseName}
             locality={item.Locality}
             district={item.Distric}
             statee={item.State}
             selectStatus={item.isSelected}

             pin={item.Pincode}
             radioselected={props.radioId}
            onItemPressed={() =>props.onItemSelected(item.Id,itemID,item.isSelected)}
                          

          
        /> 
    
        );
      }}
    />
   
    </View>
  );








// //              <FlatList
// //               data={props.dummyData}
// //               extraData={props}
// //               // renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
// //               renderItem={({item,index})=>
               
                 
// //                 <AddressListItem   
// //                 namee={item.Name}
// //                    id={item.Id}
// //                    age={item.Age}
// //                    mobileNumber={item.MobileNumber}
// //                    gender={item.Gender}
// //                    dob={item.DateofBirth}
// //                    houseName={item.HouseName}
// //                    locality={item.Locality}
// //                    district={item.Distric}
// //                    statee={item.State}
// //                    pin={item.Pincode}
// //                    radio={index}

// //                    radioselected={props.radioId}
// //                   //  selectStatus={item.isSelected}
// //                   //  status={item.Status}
// // // inde={item.index}
// //                   onItemPressed={() =>props.onItemSelected(index)}
                                
  
                
// //               /> 
          
// //                } 
// //              keyExtractor={item => item.Id.toString() }
// //             />
  
//             
                }
   export default AddressList;
    
               

            // );
           // };
        // }
    

     
    



  