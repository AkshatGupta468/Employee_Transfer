import { StatusBar, StyleSheet } from "react-native"
import { colors } from "./colors"

export const AppStyles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    topMostItem:{
        marginTop:(StatusBar.currentHeight||40)+40
    },
    button:{
        width:125,
        height:40,
        marginTop:40,
        backgroundColor:'#25D366',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10
    },
    buttonText:{
        color:colors.white,
        fontWeight:'bold',
        fontSize:16
    },
    textInput:{
        alignSelf:'center',
        marginTop:40,
        borderWidth:2,
        borderRadius:10,
        width:250,
        height:50,
        paddingHorizontal:20,
        backgroundColor:colors.white,
        fontSize:16,
    },
    searchBar:{
        alignSelf:'center',
        borderWidth:2,
        borderRadius:10,
        maxHeight:70,
        width:300,
        marginTop:(StatusBar.currentHeight||20),
        backgroundColor:colors["light-grey"],
        fontSize:16, 
        overflow:'hidden'       
    },
    linkText:{
        color:colors.green,
        fontSize:16
    },
    roundIcon:{
        backgroundColor:colors.green,
        width:80,
        height:80,
        borderRadius:40,
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    heading:{
        alignSelf:'center',
        color:colors.dark,
        fontSize:24
    },
    infoText:{
        fontSize:16,
        color:colors.black
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex:1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      },
      badgeStyles:{
        borderRadius:4,
        paddingHorizontal:10,
        margin:0,
        backgroundColor:colors['dark-grey']
    }
})