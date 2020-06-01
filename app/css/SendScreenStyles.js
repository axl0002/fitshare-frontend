import {StyleSheet} from 'react-native';

export default sendStyles = StyleSheet.create({
    name: {
       fontSize: 20,
       color: "#fff",
       textAlign: "center",
       marginBottom: 10
     },
     loader: {
       flex: 1, 
       justifyContent: "center",
       alignItems: "center",
       backgroundColor: "#fff"
     },
     list: {
       paddingVertical: 5,
       margin: 3,
       flexDirection: "row",
       backgroundColor: "#fff",
       justifyContent: "flex-start",
       alignItems: "center",
       zIndex: -1
     },
     lightText: {
       color: "#000",
       width: 200,
       paddingLeft: 15,
       fontSize: 12
     },
     icon: {
       position: "absolute",  
       bottom: 20,
       width: "100%", 
       left: 290, 
       zIndex: 1
     },
     numberBox: {
       position: "absolute",
       bottom: 75,
       width: 30,
       height: 30,
       borderRadius: 15,  
       left: 330,
       zIndex: 3,
       backgroundColor: "#e3e3e3",
       justifyContent: "center",
       alignItems: "center"
     },
     number: {fontSize: 14,color: "#000"},
     selected: {backgroundColor: "#628072"},
  });
  