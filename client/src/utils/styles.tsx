import { StyleSheet } from "react-native"
import { colors } from "./colors"
import { useTheme } from 'react-native-paper';

var theme=false;
export function setAppTheme(AppTheme:boolean){
    theme=AppTheme;
    console.log(theme)
} 

export const AppStyles=StyleSheet.create({
    textInput:{
        marginTop:40,
        borderWidth:2,
        borderRadius:10,
        width:250,
        height:50,
        paddingHorizontal:20,
        backgroundColor:colors.white,
        fontSize:16,
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
        justifyContent:'center'
    },
    heading:{
        color:theme?colors.dark:colors.white,
        fontSize:24
    }
})
