import React, { Component } from 'react';
import { Text, View,FlatList } from 'react-native';
import AddressDetailListItem from '../ListItem/AddressDetailListItem';
import { Button } from 'native-base';

const AddressList=(props)=>{


//   render()
//   {
      var va=props.dummyData

     for(var i in va){

          console.log("INLISTING","--"+va[i].Name);
          console.log("INLISTING","--"+va[i].Id);
          console.log("INLISTING","--"+va[i].Age);
          console.log("INLISTINGDETAILSSS","--"+va[i].MobileNumber);
          console.log("INLISTING","--"+va[i].Gender);
          console.log("INLISTING","--"+va[i].DateofBirth);
          console.log("INLISTING","--"+va[i].HouseName);
          console.log("INLISTING","--"+va[i].Locality);
          console.log("INLISTING","--"+va[i].Distric);
          console.log("INLISTING","--"+va[i].State);
          console.log("INLISTING","--"+va[i].Pincode);
          
     }
            return (
               
                <FlatList
                data={props.dummyData}
                extraData={props}
                // renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
                renderItem={({item,index})=>
                 
                   
                  <AddressDetailListItem   
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
                     pin={item.Pincode}
                    //  selectStatus={item.isSelected}
                    //  status={item.Status}
// inde={item.index}
                    // onItemPressed={() =>props.onItemSelected(index)}
                                  
    
                  
                /> 
            
                 } 
               keyExtractor={item => item.Id.toString()}
              />
    
            );
           // };
        }
    

    
      export default AddressList;



  