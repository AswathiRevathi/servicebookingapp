import React, { Component } from "react";
import { View,ActivityIndicator,BackHandler, AsyncStorage,NetInfo, Text, Image,ImageBackground, StyleSheet, Dimensions, FlatList, Button, Modal, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Alert } from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import NoDataFound from '../../components/ErrorItems/NoDataFound';
import { Actions } from "react-native-router-flux";



class CompanyInteriorView extends Component {
  state = {
    modalVisible    : false,
    numberOfColoumns: 2,
    mapResponse     : '',
    isLoading       : true,
    userId          : null,
    innerMapUrl     : 'http://api.kimsth.a2hosted.com/api/InnerMap',


idSelected: 0,
    // dummy: {
    //   "floorMapData": [
    //     {
    //       "id": "1",
    //       "title": "Floor 1",
    //       "image": "https://www.pennmedicine.org/-/media/images/locations/maps/hup_wayfinder_2017_01_web.ashx?la=en"
    //     },
    //     {
    //       "id": "2",
    //       "title": "Floor 2",
    //       "image": "https://www.beverlyhospital.org/media/159736/2008jan-bh@d-floor1map.jpg"
    //     },
    //     {
    //       "id": "3",
    //       "title": "Floor 3",
    //       "image": "https://www.mauryregional.com/media/Image/Map-MRMC-Ground-Floor.png"
    //     }
    //   ]
    // }

  };

  setModalVisible(visible, ids) {

    this.setState({
      modalVisible: visible,
      idSelected  : ids
    });
  }

  // state={
  // numberOfColoumns:2,

  //     dummy:{
  //         "floorMapData": [
  //           {
  //             "id": "1",
  //             "title": "Floor 1",
  //             "image": "https://www.pennmedicine.org/-/media/images/locations/maps/hup_wayfinder_2017_01_web.ashx?la=en"
  //           },
  //           {
  //             "id": "2",
  //             "title": "Floor 2",
  //             "image": "https://www.beverlyhospital.org/media/159736/2008jan-bh@d-floor1map.jpg"
  //           },
  //           {
  //             "id": "3",
  //             "title": "Floor 3",
  //             "image": "https://www.mauryregional.com/media/Image/Map-MRMC-Ground-Floor.png"
  //           }
  //         ]
  //       }



 
  
  componentWillUnmount() {
    // this.backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
  }
      
  backAndroid =()=> {
  
    if(this.props.nav==1){
      Actions.reset('Home');
      return true    }
    else{
      Actions.pop();
      return true    

    }
  
    // Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.backAndroid

      );
    


  NetInfo.getConnectionInfo().then((connectionInfo) => {
    if (connectionInfo.type === 'none') {
      alert("No internet connection")
  } else {
      // online
     // do something
     this.getMapData();

  }  });
  function handleFirstConnectivityChange(connectionInfo) {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }
  NetInfo.addEventListener(
    'connectionChange',
    this.getMapData
  );



  }

  getMapData = () => {

    return fetch(this.state.innerMapUrl, {
        method : 'POST',
        headers: {
          Accept        : 'application/json',
          'Content-Type': 'application/json',
        },

      }).then((response) => response.json())
      .then((responseJson) => {
        // return responseJson.servicesCategory;



        this.setState({
          isLoading  : false,
          mapResponse: responseJson.InnerMap,
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {

   
      if (this.state.isLoading) {
        return (<View style = {{flex   : 1,padding: 20 }} >
          <ActivityIndicator/>
          </View>
        )
      } 
      else {
        if (this.state.mapResponse.length != 0){
          return (
            <View style = {{ marginTop: 22 }}>
            <Modal
              animationType  = "slide"
              transparent    = {false}
              visible        = {this.state.modalVisible}
              onRequestClose = {() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
    
              <View      style       = {{ flexDirection: 'column', flex: 1 }}>
              <View      style       = {{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
              <ImageZoom cropWidth   = {500}
                         cropHeight  = {500}
                         imageWidth  = {200}
                         imageHeight = {200}>
              <Image     style       = {{ width: 200, height: 200 }}
                         source      = {{ uri: this.state.idSelected }} />
                  </ImageZoom>
                </View>
                {/* <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                  <View  style  = {{ justifyContent: 'center', alignItems: 'center', height: '20%', width: '100%' }}>
                  <Image source = {require("../../Images/close.png")} style = {{ alignItems: 'center', height: 30, width: 30 }} />
                  </View>
                </TouchableOpacity> */}
    
              </View>
    
            </Modal>
    
    
            <FlatList
    
    
    
    
              data       = {this.state.mapResponse}
              numColumns = {this.state.numberOfColoumns}
              renderItem = {
                ({ item }) => (
                  <TouchableHighlight onPress={() => {
                    this.setModalVisible(true, item.image);
                  }}
                  >
                    <View            style  = {{ flex: 1, flexDirection: 'column', marginLeft: 10, marginRight: 10 }}>
                    <ImageBackground source = { require('../../assets/Images/no_image.jpg')} style = {{ width: 120, height: 120, margin: 10 }}>
             
                      <Image
                        style  = {{ width: 120, height: 120, margin: 10 }}
                        source = {{ uri: item.image }}>
                      </Image>
                      </ImageBackground>
                      <View style = {{ margin: 15, flex: 1, flexDirection: 'column' }}>
                      <View style = {{ width: '100%', alignItems: 'center' }}>
                      <Text style = {{ fontWeight: "bold", fontSize: 17, color: 'black' }}>{item.title}</Text>
    
                        </View>
    
                      </View>
                      <View style={{
                        backgroundColor: '#c0c0',  justifyContent: 'center',
                        alignItems     : 'center',
                      }}>
    
                      </View>
    
                    </View>
                  </TouchableHighlight>
    
                )}
              keyExtractor = {item => item.id}
            />
    
    
    
          </View>
    
          );}
             else {
               return (
                 <NoDataFound  OnRetry={this.getMapData}/> )
        }
  
      }


     

      //           <FlatList




      //           data={this.state.dummy.floorMapData}
      // numColumns={this.state.numberOfColoumns}
      //           renderItem={
      //             ({item}) => 
      //             <View style={{flex:1,flexDirection:'column',marginLeft:10,marginRight:10}}>

      //                <Image
      //             style={{ width: 120, height: 120,margin:10 }}
      //             source={{ uri: item.image }}>
      //           </Image>
      //           <View style={{margin:15,flex:1,flexDirection:'column'}}>
      //           <View style={{width:'100%',alignItems:'center'}}>
      //           <Text style={{fontWeight:"bold",fontSize:17,color:'black'}}>{item.title}</Text>

      //           </View>

      // </View>
      //  <View style={{backgroundColor:'#c0c0', justifyContent: 'center',
      //     alignItems: 'center',}}>

      //           </View>

      //             </View>

      //         }
      //           keyExtractor={item=> item.id}
      //         />






      // <ImageZoom cropWidth={Dimensions.get('window').width}
      //            cropHeight={Dimensions.get('window').height}
      //            imageWidth={200}
      //            imageHeight={200}>
      //     <Image style={{width:200, height:200}}
      //            source={{uri:'https://www.beverlyhospital.org/media/159736/2008jan-bh@d-floor1map.jpg'}}/>
      // </ImageZoom>
    
  };
}
export default CompanyInteriorView;

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: '#fff',
    alignItems     : 'center',
    justifyContent : 'center',
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius   : 20,
    padding        : 1,
    marginBottom   : 20,
    shadowColor    : '#303838',
    shadowOffset   : { width: 0, height: 5 },
    shadowRadius   : 10,
    shadowOpacity  : 0.35,
  },
});