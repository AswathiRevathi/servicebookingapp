import React, {Component} from "react";
import {Text, View ,StyleSheet,TouchableOpacity} from "react-native";
import { Card} from 'native-base';

class SlotListItem extends Component{


render(){
    let val = this.props.slotStatus;
        console.log('STATUSVAL' + val);
    
    if(this.props.selectStatus)
    {
        itemContent=(
                        <Card>
                    <View style={styles.itemContainerSelected} pointerEvents="none">
                    
                    <Text style={styles.selctedTitleText}>{this.props.slotText}</Text>
                    
                    </View>
                    </Card>
                    );
    }else{
    if(this.props.slotStatus==='Not Reserved')
        {
            itemContent=(
                <Card>
            <View style={styles.itemContainerNotReserved} pointerEvents="none">
            
            <Text style={styles.TitleText}>{this.props.slotText}</Text>
            
            </View>
            </Card>
            );
        }else{
            itemContent=(
                <Card>
            <View style={styles.itemContainerReserved} pointerEvents="none">
            
            <Text style={styles.TitleText}>{this.props.slotText}</Text>
            
            </View>
            </Card>
            );
        
        
        }
    }
    
   

    return(
       <TouchableOpacity onPress={this.props.onItemPressed}>
    
          {itemContent}
   
  </TouchableOpacity>
    );
}
}
const styles = StyleSheet.create({
  itemContainerReserved: {
    
    padding:5,
    alignItems:'center',
    backgroundColor:'#aab7ad'
  },
  itemContainerNotReserved: {
   
    padding:5,
    alignItems:'center',
     backgroundColor:'powderblue'
  },
  itemContainerSelected: {
   
    padding:5,
    alignItems:'center',
     backgroundColor:'steelblue'
  },
  TitleText:{
      fontSize:12,
      color:'black'
  },
  selctedTitleText:{
      fontSize:12,
      color:'white'
  }
  
});
export default SlotListItem;