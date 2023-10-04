import { StyleSheet } from "react-native"
import { StatusBar } from "react-native"
import { colors } from "./colors"
import { useTheme } from 'react-native-paper';

var theme=false;
export function setAppTheme(AppTheme:boolean){
    theme=AppTheme;
    console.log(theme)
} 


export const AppStyles=StyleSheet.create({
    container:{
        marginTop:40,
        flex:1,
        backgroundColor:colors.white,
    },
    topMostItem:{
        marginTop:(StatusBar.currentHeight||40)
    },
    button:{
        width:125,
        height:40,
        marginTop:40,
        backgroundColor:'#25D366',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,
    },
    
    buttonText:{
        color:colors.white,
        fontWeight:'bold',
        fontSize:16,
    },
    textInput:{
        alignSelf:'center',
        marginTop:40,
        borderWidth:2,
        borderRadius:10,
        borderColor:colors["light-grey"],
        width:250,
        height:50,
        paddingHorizontal:20,
        backgroundColor:'#c0c0c0',
        fontSize:16,
        elevation:15
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



export const MessagingStyles = StyleSheet.create({
    loginscreen: {
        flex: 1,
        backgroundColor: "#EEF1FF",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        width: "100%",
    },
    loginheading: {
        fontSize: 26,
        marginBottom: 10,
    },
    logininputContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    logininput: {
        borderWidth: 1,
        width: "90%",
        padding: 8,
        borderRadius: 2,
    },
    loginbutton: {
        backgroundColor: "green",
        padding: 12,
        marginVertical: 10,
        width: "60%",
        borderRadius: "50%",
        elevation: 1,
    },
    loginbuttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "600",
    },
    chatscreen: {
        backgroundColor: "#F7F7F7",
        flex: 1,
        padding: 10,
        position: "relative",
        marginTop:20
    },
    chatheading: {
        fontSize: 24,
        fontWeight: "bold",
        paddingHorizontal:10,
    },
    chattopContainer: {
        backgroundColor: "#F7F7F7",
        width: "100%",
        padding: 10,
        justifyContent: "center",
        elevation: 2,
    },
    chatheader: {
        minHeight:50,
        flexDirection: "row",
        alignItems: "center",
    },
    chatlistContainer: {
        paddingHorizontal: 10,
    },
    chatemptyContainer: {
        width: "100%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
    },
    chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
    messagingscreen: {
        flex: 1,
    },
    messaginginputContainer: {
        width: "100%",
        elevation: 2,
        backgroundColor: "#F7F7F7",
        paddingVertical: 8,
        paddingHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    messaginginput: {
        borderWidth: 0.4,
        backgroundColor:'white',
        padding: 10,
        flex: 1,
        includeFontPadding:true,
        marginRight: 10,
        borderRadius: 40,
    },
    messagingbuttonContainer: {
        width: "25%",
        backgroundColor: "green",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    mmessageWrapper: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: 15,
        padding:1,
        paddingHorizontal:10,
    },
    mmessage: {
        maxWidth: "70%",
        backgroundColor: "rgb(194, 243, 194)",
        padding: 12,
        borderWidth:0.4,
        borderColor:'#709AA0',
        borderCurve:'continuous',
        borderRadius: 10,
        marginBottom: 2,
        minWidth:40,
        elevation:3,
    },
    mvatar: {
        marginRight: 5,
    },
    cchat: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth:1,
        borderRadius: 5,
        padding:2,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        height: 80,
        marginBottom: 10
    },
    cavatar: {
        marginRight: 15,
    },
    cusername: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    cmessage: {
        fontSize: 14,
        opacity: 0.7,
        maxHeight:"60%",
        overflow:'hidden'
    },
    crightContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    ctime: {
        opacity: 0.5,
    },
});