import React, {
    Component 
} from "react";
import {
    Text,
    View,Button,
    Alert,ActivityIndicator,BackHandler
,NetInfo} from "react-native";
import ServiceCategoryList from '../../components/Lists/CategoryList';
import {
    Actions
} from 'react-native-router-flux';

class ServiceCategoryListing extends Component {
    state = {
        isLoading                : true,
        val                      : "ServiceCategory",
        serviceCategories        : '',
        serviceCategoryListingUrl: 'http://api.kimsth.a2hosted.com/api/DepartmentList'

    };
    itemSelectedHandler = key => {

      console.log("category");

        const selCategory = this.state.serviceCategories.find(category => {
            return category.Id === key;
        });
console.log("category");
console.log("categoryId"+selCategory.Id);

Actions.Service({id:selCategory.Id,nav:null,category:selCategory.CategoryTitle,description:selCategory.Description})

    }


    
backAndroid= ()=> {
console.log("nav in category",this.props.nav);
  if(this.props.nav!=null){
    Actions.reset('Home')

  
    return true;
  }
  else{
    Actions.reset('Home');
    return true;

  }

  return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
}
componentWillUnmount() {
  // this.backHandler.remove();
  BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);

}
    componentDidMount() {
          console.log('checkk----', this.props);
          BackHandler.addEventListener('hardwareBackPress',this.backAndroid

  
  
  );

         

            NetInfo.getConnectionInfo().then((connectionInfo) => {
                if (connectionInfo.type === 'none') {
                  alert("No internet connection")
              } else {
                  // online
                 // do something
                 this.getServiceCategoryDetails();
            
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
                this.getServiceCategoryDetails
              );


    }
    getServiceCategoryDetails = () => {

        return fetch(this.state.serviceCategoryListingUrl, {
            method : 'POST',
            headers: {
              Accept        : 'application/json',
              'Content-Type': 'application/json',
            },
    
          }).then((response) => response.json())
          .then((responseJson) => {
            // return responseJson.servicesCategory;
    
    
    
            this.setState({
              isLoading        : false,
              serviceCategories: responseJson.serviceCategories,


            }, function () {
    
            });
          })
          .catch((error) => {
            console.error(error);
          });
      };
    render() {
        if(this.state.isLoading){
            return(
              <View style = {{flex: 1, padding: 20}}>
                <ActivityIndicator  />
              </View>
            )
          }


          else {
            if (this.state.serviceCategories.length != 0){
              return ( 
                <View >
                
                <ServiceCategoryList categories = {
                    this.state.serviceCategories
                }
                onItemSelected = {
                    this.itemSelectedHandler
                }
                />
    
                </View>
              )}
                 else {
                   return (
                     <NoDataFound  OnRetry={this.getServiceCategoryDetails}/> )
            }
      
          }



      
    }
}
export default ServiceCategoryListing;