import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import About from './pages/About';
import Watched from './pages/Watched';
import Movies from './pages/Movies';

const Routes = createAppContainer(
  createBottomTabNavigator(
    {
      Movies,
      Watched,
      About,
    },
    {
      initialRouteName: 'Movies',
      tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: '#000',
        inactiveTintColor: '#ccc',
        style: {
          backgroundColor: '#fff',
          paddingVertical: 5,
        },
      },
    }
  )
);

export default Routes;
