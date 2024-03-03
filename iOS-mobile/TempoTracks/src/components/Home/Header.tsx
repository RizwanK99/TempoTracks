import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { endOfDay, format } from "date-fns";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppTheme } from "../../provider/PaperProvider";
import { Tables } from "../../lib/db.types";
import { saved_user_data } from "../../api/Globals";

export const HomePageHeader = ({ navigation }) => {
  const theme = useAppTheme();
  const formattedDate = format(endOfDay(new Date()), "MMMM d, yyyy");
  const [user, setUser] = useState<Tables<"users"> | null>(null);

  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem("user_data");
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    }
    fetchData();
  }, []);

  return (
    <Appbar.Header
      mode="small"
      statusBarHeight={0}
      elevated
      style={{ backgroundColor: theme.colors.background, paddingBottom: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View>
          <Appbar.Content
            title={formattedDate.toUpperCase()}
            titleStyle={{ fontSize: 14 }}
          />
          {user && (
            <Appbar.Content
              title={"Good Afternoon, " + saved_user_data.first_name}
              titleStyle={{ fontSize: 25 }}
            />
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Avatar.Text size={40} label={saved_user_data.first_name ?? ""} />
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};
