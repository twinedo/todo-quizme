import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useMemo } from 'react';
import { Animated, View, TouchableOpacity, Dimensions } from 'react-native';
import { Daily, Monthly } from 'screens';
import { TWColors, TWStyles } from 'twrn-styles';
import { styles } from './home-date-tabs.style';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    const width = Dimensions.get('window').width;
    return (
        <View 
            key={state.key} 
            style={[styles.container, TWStyles.row, { marginHorizontal: width * 0.2 }]}>
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
                        style={[
                            styles.containerTabItem, 
                            TWStyles.displayFlex, 
                            TWStyles.alignCenter, 
                            TWStyles.justifyCenter, 
                            { opacity, backgroundColor: isFocused ? '#5A91FF' : 'transparent' }
                        ]}
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