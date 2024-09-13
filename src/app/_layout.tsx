import "@/styles/global.css"
import { Slot } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Stack } from "expo-router"
import Loading from "@/components/loading"
import { StatusBar } from "expo-status-bar"

export default function Layout(){
    return(
        <GestureHandlerRootView style={{flex: 1}}>
            {/* <Slot/> */}
            {/* <Loading/> */}
            <StatusBar style="dark"/>
            <Stack 
            screenOptions={{
                headerShown: false
            }}
            />
        </GestureHandlerRootView>
    )
}