import React, { Component } from 'react';
import { Text, View,FlatList } from 'react-native';

import ServiceListItem from '../ListItem/ServiceListItem';
const ServiceList=props=> {

//   state={
//     numOfColumns:3
//   }

//     render() {

// let passedData=this.props.dummyData;
// console.log("data passed"+passedData.length);
console.log("length od arrr",props.dummyData.length);
        return (
            <FlatList
            data={props.dummyData}


            renderItem={
              ({item}) => 
              <ServiceListItem   
                serviceName={item.ServiceName}
                serviceImage={item.ServiceImage}
                department={item.ServiceCategory}
                qualification={item.ServiceQualification}
                date={item.DateOfBooking}
                nextAvailableDate={item.NextAvailableDate}


                time={props.cStatus}
                isallow={item.IsAllowBooking}
                token={item.Token}
                Slot={item.Slot}
                patientName={item.PatientName}
                idPassed={props.id} 
                statusPassed={props.status}
                OnItemClicked={() => props.onItemSelected(item.Id)}
               OnBookingClicked={() => props.OnBookingClicked(item.Id)}

              
            />
    
         
           
          }
          removeClippedSubviews={true}
          initialNumToRender={props.dummyData.length}
            keyExtractor={item=> item.Id.toString()}
          />

        );
    // };

};

export default ServiceList;