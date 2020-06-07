import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  statusText: {
    color: 'red',
    //fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 19,
  },
  navButtons: {
    flexDirection:'row',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  backgroundColoring: {
    backgroundColor:'#f2fcfa',
  },
  whiteBackgroundColoring: {
    backgroundColor:'#FFFFFF',
  },
  centerObject: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatar: {
    marginTop: 20,
    marginBottom: 10,
  },
  profileText: {
    //fontFamily: 'Segoe UI',
    fontSize: 25,
    fontWeight: 'normal',
    lineHeight: 25,
  },
  challengeFormLabel: {
    // fontFamily: "Segoe UI",
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888891',
  },
  challengeFormInput: {
    // fontFamily: "Segoe UI",
    fontSize: 19,
    fontWeight: 'normal',
    color: '#888891',
  },
  searchBarContainer: {
    backgroundColor: '#bfede2',
  },
  searchBarInput: {
    backgroundColor: '#9ce3d1',
  },
  searchBarLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bfede2',
  },
  roundedCorners: {
    borderRadius:35,
    marginLeft:35,
    marginRight:35,
    overflow: 'hidden',
  },
  challengeButton: {
    backgroundColor:'#4fd8b6',
    margin:15,
  },
  challengeIcons: {
    marginLeft: 6,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
});
