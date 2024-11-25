import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../../components/Logo";


export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#1e3a8a',
                },
            }} >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                    header: () =>
                        <SafeAreaView className="flex-row justify-between items-center p-1 border-b bg-blue-900 border-slate-300 w-full">
                            <Logo />
                        </SafeAreaView>
                }}
            />

            <Tabs.Screen
                name="Profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                    header: () =>
                        <SafeAreaView style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.25rem',
                            borderBottomWidth: 1,
                            borderBottomStyle: 'solid',
                            backgroundColor: '#1e3a8a', // bg-blue-900
                            borderBottomColor: '#cbd5e1', // border-slate-300
                            width: '100%',
                        }}>
                            <Logo />
                        </SafeAreaView>
                }}
            />
            <Tabs.Screen
                name="CreatePost"
                options={{
                    title: 'Crear Post',
                    tabBarIcon: ({ color }) => (
                        <Icon name="plus" color={color} size={30} />
                    ),
                    header: () =>
                        <SafeAreaView style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.25rem',
                            borderBottomWidth: 1,
                            borderBottomStyle: 'solid',
                            backgroundColor: '#1e3a8a', // bg-blue-900
                            borderBottomColor: '#cbd5e1', // border-slate-300
                            width: '100%',
                        }}>
                            <Logo />
                        </SafeAreaView>
                }}
            />


        </Tabs>
    );
}