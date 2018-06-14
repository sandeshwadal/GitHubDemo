import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

export default class MyListItem extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const name = this.props.name
    const score = this.props.score
    return (
      <View style={{ margin: 0, padding: 20, borderBottomWidth: 0.25,backgroundColor:'white' }}>
        <TouchableOpacity onPress={this._onPress}>
          <View style={{flexDirection:'row'}}>
            <Image
              style={{ width: 50, height: 50, borderRadius:25 }}
              source={{ uri: this.props.avatar_url }}
            />
             <View style={{margin:10}}>
            <Text>
              {name}
            </Text>
            <Text>
             score: {Math.floor(score)}
            </Text>
          </View>
          </View>
         
        </TouchableOpacity>
      </View>
    );
  }
}