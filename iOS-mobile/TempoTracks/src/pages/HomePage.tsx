import * as React from 'react';
import { ScrollView, SafeAreaView, } from 'react-native';
import { useTheme } from 'react-native-paper';
import { HomePageHeader } from '../components/Home/Header';
import { Analytics } from '../components/Home/Analytics';
import { MonthGoals } from '../components/Home/MonthGoals';
import { DailyGoals } from '../components/Home/DayGoals';

// Watch Hooks
import { IS_WATCH_ENABLED, sendSongsToWatch, sendWorkoutTemplatesToWatch } from "../module/WatchManager";
import { Icon } from 'react-native-elements';


const HomePage = ({ navigation }) => {
  const theme = useTheme();

  if (IS_WATCH_ENABLED) {
    //sendSongsToWatch();
    sendWorkoutTemplatesToWatch();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <HomePageHeader navigation={navigation} />
        <DailyGoals/>
        <Analytics/>
        <MonthGoals/>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomePage;
