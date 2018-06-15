import React, { Component } from 'react'
import {
  View,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'

import { URL } from '../../Constants/Url'
import LoadingIndicator from '../../CommonComponents/LoadingIndicator'
import MyListItem from '../../CommonComponents/ListItem'
import { styles } from '../style/Style'
const Spinner = LoadingIndicator(View)
export class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      searchText: '',
      shouldShowSearchBar: false,
      total_count: 0
    }
  }
  componentDidMount () {
    this.getUsersByUsername()
  }
  _keyExtractor = item => item.avatar_url

  getUsersByUsername = name => {
    const url = URL.searchUserURL + name
    this.setState({ loading: true })

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let responceData = []
        if (responseJson.items) {
          responceData = responseJson.items
          this.state.total_count = responseJson.total_count
        }
        this.setState({
          loading: false,
          data: responceData
        })
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  }

  onSubmitEditing () {
    this.getUsersByUsername(this.state.searchText)
  }

  renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      name={item.login}
      score={item.score}
      avatar_url={item.avatar_url}
    />
  )

  showSearchBar () {
    return (
      <View style={styles.searchBarContainerStyle}>
        <TextInput
        ref='serachBarInput'
          style={styles.searchBarTextInputStyle}
          placeholder='search'
          onChangeText={text => this.setState({ searchText: text })}
          onSubmitEditing={() => this.onSubmitEditing()}
          value={this.state.searchText}
          returnKeyType='search'
          autoFocus = {true}
        />
        <TouchableOpacity
          onPress={() =>
            this.setState({
              shouldShowSearchBar: false
            })}
          style={{
            height: 40,
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image source={require('../../resources/cancel_icon.png')} />
        </TouchableOpacity>
      </View>
    )
  }
  showSearchButton () {
    return (
      <View style={styles.searchButtonConatainerViewStyle}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              shouldShowSearchBar: true
            })}
          }
          style={styles.searchButtonStyle}
        >
          <Image
            style={styles.searchButtonIconStyle}
            source={require('../../resources/search_icon.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
  showNoDataLabel () {
    return (
      <View style={styles.noDataViewStyle}>
        <Text>No data available</Text>
      </View>
    )
  }
  renderActionSheet(){
    return(
      <View>
      <ActionSheet
      ref={o => this.ActionSheet = o}
          title={'Sort by ?'}
          options={['Name [A-Z]', 'Name [Z-A]', 'Accending Rank', 'Decending Rank','cancel']}
          cancelButtonIndex={5}
          onPress={(index) => { /* do something */ 
          this.sortArray(index)
          }}
        />
        </View>
    )
  }
  sortArray(index){
    switch (index) {
      case 0:
      let array = this.state.data;
  array.sort(function(a,b){
    return a.login.localeCompare(b.login);
})
  this.setState({
    data:array
  })      
        break;
      
    case 1:{
    let array = this.state.data;
  array.sort(function(a,b){
    return a.login.localeCompare(b.login);
})
array.reverse()
  this.setState({
    data:array
  })   
    }
    break;

    case 2:{
      let arrayt = this.state.data;
      arrayt.sort(function(a,b){
        return (a.score - b.score);
    })
      this.setState({
        data:arrayt
      })   
    }
    break;
    case 3: {
      let arrayt = this.state.data;
      arrayt.sort(function(a,b){
        return (b.score - a.score);
    })
      this.setState({
        data:arrayt
      })   
    }
     break;

      default:
        break;
    }
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  render () {
    return (
      <Spinner
        isLoading={this.state.loading}
        style={{ flex: 1, backgroundColor: '#ECECEC' }}
      >
        <View style={styles.headerContainerStyle}>
          {this.state.shouldShowSearchBar
            ? this.showSearchBar()
            : this.showSearchButton()}
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => {this.showActionSheet()
            
            }}
          >
            <Text>Sort by</Text>
{this.renderActionSheet()}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ margin: 10, fontSize: 12 }}>
            showing {this.state.total_count} results
          </Text>
        </View>
        {this.state.data && this.state.data.length > 0
          ? <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            />
          : this.showNoDataLabel()}
      </Spinner>
    )
  }
}
