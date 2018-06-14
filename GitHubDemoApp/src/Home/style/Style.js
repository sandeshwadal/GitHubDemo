import {
  StyleSheet
} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headerContainerStyle: {
    backgroundColor: 'gray',
    height: 80
  },
  noDataViewStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  searchButtonConatainerViewStyle: {
    justifyContent: 'center',
    backgroundColor: '#4B70AF',
    flex: 1
  },
  searchButtonStyle: {
    marginRight: 15,
    alignSelf: 'flex-end'
  },
  searchButtonIconStyle: {
    height: 30,
    width: 30
  },
  searchBarContainerStyle: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  searchBarTextInputStyle: {
    height: 40,
    padding: 10,
    width: '80%'
  }
});