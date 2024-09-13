import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useMemo } from 'react';
import { Animated, View, TouchableOpacity, Dimensions } from 'react-native';
import { Daily, Monthly, Notifications, User } from 'screens';
import { TWColors } from 'twrn-styles';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: width * 0.2, marginVertical: 20, borderWidth: 1, borderColor: TWColors.GREYD9, borderRadius: 50 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
                });

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ opacity, flex: 1, alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 50, backgroundColor: isFocused ? '#5A91FF' : 'transparent' }}
                    >
                        <Animated.View style={{ opacity }}>

                            <Animated.Text style={{ opacity, color: isFocused ? TWColors.WHITE : TWColors.GREY7F }}>
                                {label}
                            </Animated.Text>
                        </Animated.View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const HomeDateTabs = () => {
    const menu = useMemo(() => [
        {
            id: '3',
            name: 'Monthly',
            component: Monthly,
        },
        {
            id: '4',
            name: 'Daily',
            component: Daily,
        }
    ], [])
    
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            {menu?.map(item => (
                <Tab.Screen
                    key={item.id}
                    name={item.name}
                    component={item.component}
                />
            ))}
        </Tab.Navigator>
    )

}

export default HomeDateTabs