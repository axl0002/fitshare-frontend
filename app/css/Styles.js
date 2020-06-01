import {StyleSheet} from 'react-native';

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}

export default StyleSheet.create({
  statusText: {
    color: 'red',
    fontFamily: 'Segoe UI',
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
    fontFamily: 'Segoe UI',
    fontSize: 25,
    fontWeight: 'normal',
    lineHeight: 25,
  }
});
