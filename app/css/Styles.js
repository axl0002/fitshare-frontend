import {StyleSheet} from 'react-native';

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
    alignItems: 'flex-end',
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
    backgroundColor: '#bfede2',
  },
  searchBarInput: {
    backgroundColor: '#9ce3d1',
  },
  roundedCorners: {
    borderRadius:35,
    marginLeft:35,
    marginRight:35,
    overflow: 'hidden'
  },
  challengeButton: {
    backgroundColor:'#4fd8b6',
    margin:15
  },
  challengeIcons: {
    marginLeft: 6,
  },
});
