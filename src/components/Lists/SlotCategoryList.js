import React, { Component } from "react";
import SlotList from '../../components/Lists/SlotList';
import { Container,  Content, Accordion ,View,Text,Card ,CardItem,Body} from "native-base";
const dataArray = [
 { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
export default class AccordionExample extends Component {
      state = {
    val: "slotpicking",
    Slots:[
        {
            "Id":"1",
            "SlotTittle":"10.00 AM - 10.30 AM"
            
        },
        {
            "Id":"2",
            "SlotTittle":"10.30 AM - 11.00 AM"
        },
        {
            "Id":"3",
            "SlotTittle":"11.00 AM - 11.30 AM"
        },
        {
            "Id":"4",
            "SlotTittle":"11.30 AM - 12.00 PM"
        }
    ]
  };
    _renderHeader(title, expanded) {
    return (
      <View
        style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "#A9DAD6" }}
      >
        <Text style={{ fontWeight: "600" }}>
         Hiii
        </Text>
       
      </View>
    );
  }
  _renderContent(content) {
    return (
      <Text
        style={{ backgroundColor: "#e3f1f1", padding: 10, fontStyle: "italic" }}
      >
        Content
      </Text>
    );
  }
  render() {
    return (
      <Container>
       
        <Content padder>
          <Accordion dataArray={dataArray} 
            expanded={0} 
            renderHeader={(info) => <View>
            <Text>{info.title}</Text>
            </View>}
            
             renderItem={(info) => (
                 <View>
                 <Text>{info.content}</Text>
                 </View>
        //  <SlotList slotList={this.state.Slots}/>
      )}
             renderContent={this._renderContent}
            headerStyle={{ backgroundColor: "#b7daf8" }}
            contentStyle={{ backgroundColor: "#ddecf8" }}/>
        </Content>
      </Container>
    );
  }
}
