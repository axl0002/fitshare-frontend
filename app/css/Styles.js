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
  login: {
    flex: 1,
    backgroundColor:'#44d8c2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColoring: {
    backgroundColor:'#d4f7f2',
  },
  whiteBackgroundColoring: {
    backgroundColor:'#FFFFFF',
  },
  centerObject: {
    display: 'flex',
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
  challengeFormText: {
    // fontFamily: "Segoe UI",
    fontSize: 20,
    fontWeight: 'normal',
  },
  searchBarContainer: {
    backgroundColor: '#a9efe5',
  },
  searchBarInput: {
    backgroundColor: '#7ee7d7',
  },
  searchBarLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9efe5',
  },
  roundedCorners: {
    borderRadius:35,
    marginLeft:35,
    marginRight:35,
    overflow: 'hidden',
  },
  challengeButton: {
    backgroundColor:'#7ee7d7',
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
