import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback,ImageBackground } from 'react-native';
import { Row, Button, Segment, Tab, Tabs,Right, Container, Header,Icon, Badge, Content, Card, CardItem, Body, Text,Item } from 'native-base';
import Moment from 'moment';

export default class ServiceListItem extends Component {


    render() {
        let modalContent = null;
        let modalContentStatus = null;
        let modalContentAvailability = null;

        var dateFormat = require('dateformat');
        var now = new Date();
        dateFormat("2018-09-12", "dddd, mmmm d, yyyy");

        let ll = this.props.idPassed;
        console.log('gg' + ll);
        console.log('VALUECHECK1' + this.props.serviceName);
        console.log('VALUECHECK2' + this.props.serviceImage);
        console.log('VALUECHECK3' + this.props.department);
        console.log('VALUECHECK4' + this.props.qualification);
        console.log('Token' + this.props.token);
        console.log('IsAllowBooking' + this.props.isallow);
        console.log('this.props.availabilityStatus' + this.props.availabilityStatus);




        if (this.props.idPassed) {
            if(this.props.idPassed!=='0')
            {
                if(this.props.isallow==false){
                    modalContent = (
                        <View>
 <View>
                             <Text style={{ fontSize: 12, marginTop: 5 }}>Next Available On {Moment(this.props.nextAvailableDate.split("T")[0]).format('DD-MM-YYYY')}</Text>

                        </View>
                        <View style={{
                            backgroundColor: '#c0c0', justifyContent: 'flex-start', flex: 1, flexDirection: 'row',
                            alignItems: 'center', marginTop: 10, marginLeft: 5
                        }}>
                            <Button rounded info onPress={this.props.OnBookingClicked} style={{ marginRight: 5, backgroundColor: '#2471A3', width: 90, height: 30, justifyContent: 'center' }} >
                                <Text style={{ fontSize: 10 }}>Book Now </Text>
                            </Button>
                            <Button rounded info onPress={this.props.OnItemClicked} style={{ marginLeft: 5, backgroundColor: '#2471A3', width: 90, height: 30, justifyContent: 'center' }} >
                                <Text style={{ fontSize: 10 }} >View</Text>
                            </Button>
                        </View>
                        </View>
                       
                    );
                }
                else{
                    modalContent = (

                        
                        <View style={{
                            backgroundColor: '#c0c0', justifyContent: 'flex-start', flex: 1, flexDirection: 'row',
                            alignItems: 'center', marginTop: 10, marginLeft: 5
                        }}>
                         
                            <Button rounded info onPress={this.props.OnItemClicked} style={{ marginLeft: 5, backgroundColor: '#2471A3', width: 90, height: 30, justifyContent: 'center' }} >
                                <Text style={{ fontSize: 10 }} >View</Text>
                            </Button>
                        </View>
                    );
                }
         
            }else{
                 modalContent = (
                    <View>
                    <View>
                                                <Text style={{ fontSize: 12, marginTop: 5 }}>Next Available On {Moment(this.props.nextAvailableDate.split("T")[0]).format('DD-MM-YYYY')}</Text>
                   
                                           </View>
                <View style={{
                   flexDirection: 'row',height:50,justifyContent:'flex-start',alignItems:'flex-start',
                }}>
                  <Body>
                    <Button rounded info onPress={this.props.onItemSelected} style={{ marginRight: 15,marginLeft:10,marginBottom:10, backgroundColor: '#2471A3', width: 120, height: 30, justifyContent: 'center' }} >
                        <Text style={{ fontSize: 10 }} >View Profile</Text>
                    </Button>
                    </Body>
                </View></View>
            );
            }
           
        }
        else if(this.props.statusPassed){

            modalContentStatus = (

                <View style={{
                    flexDirection: 'column',
                    marginTop:5, marginLeft: 5,
                }}>
                <View >

                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:12}}>{this.props.time} on : </Text>
                    <Text style={{fontWeight:'bold',fontSize:12}}>{Moment(this.props.date.split("T")[0]).format('DD-MM-YYYY')}</Text>

                    </View>
                    <Text style={{color:'black',fontSize:12,fontWeight:'bold'}}>Reference No : {this.props.token}</Text>

                </View>
                <View style={{marginRight:8,marginBottom:8,marginTop:8}}>
                <Badge style={{backgroundColor:"steelblue"}}>
                <Text style={{color:'white',fontSize:12}}>Token No : {this.props.Slot}</Text>
               
                </Badge>
               
                </View>
               
                
               
                <View style={{ marginLeft: 5,marginRight:5,marginBottom:10,justifyContent:'flex-start',alignItems:'flex-start' }}>
                                        <Item>
                                            <Icon style={{ color: '#2471A3' }} active name='person' />
                                            <View style={{ flexDirection: 'row', marginRight: 10,marginBottom:5 }}>
                                               
                                                <Text style={{ margin: 5 }}>{this.props.patientName}</Text>

                                            </View>
                                        </Item>
                                    </View>
                                   


                </View>
            );
        }

        return (
            <TouchableWithoutFeedback   >
                {/* onPress={this.props.click} */}
                <Content scrollEnabled={false}>
                <Card >
                    <CardItem button   >
                        <Body >
                            <View style={{flex:1}}>
                          {modalContentStatus} 
                            <View style={{flexDirection: 'row' ,flex:1,margin:5}}>
                            <View style={{ width: '25%',justifyContent:'center' }}>
                            <ImageBackground source = { require('../../assets/Images/no_image.jpg')} style={{ width: '100%', height: 100 ,borderRadius: 100/2}}>
<Image
 style={{width: '100%', height: 100, borderRadius: 100/2,resizeMode:'stretch', alignSelf: 'stretch'}}
 source={{ uri: this.props.serviceImage }}>
</Image>
</ImageBackground>
                            </View>

<View style={{ width: '75%', flexDirection: 'column', margin: 6,justifyContent:'center' }}>
    <Text style={{ fontWeight: "bold", fontSize: 13 }}>{this.props.serviceName}</Text>
    <Text style={{ fontSize: 13, marginTop: 5 }}>{this.props.department}</Text>
  
    <View>
        {modalContent}
    </View>

</View>


</View>


                            </View>

                           
                        </Body></CardItem></Card>
                        </Content>

            </TouchableWithoutFeedback>
        );
    };
}