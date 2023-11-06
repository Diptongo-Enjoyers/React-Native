import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BottomTabBarBenef({ selectedTab }) {
  const router = useRouter();

  const handleTabSelect = (route) => {
    router.replace(route);
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabSelect("/perfilBenef")}
      >
        <MaterialCommunityIcons
          name="account"
          size={24}
          color={selectedTab === "perfilBenef" ? "#e91e63" : "gray"}
        />
        <Text
          style={[
            styles.tabText,
            selectedTab === "perfilBenef" ? styles.activeTabText : {},
          ]}
        >
          Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabSelect("/noticiasBenef")}
      >
        <MaterialCommunityIcons
          name="newspaper"
          size={24}
          color={selectedTab === "noticiasBenef" ? "#e91e63" : "gray"}
        />
        <Text
          style={[
            styles.tabText,
            selectedTab === "noticiasBenef" ? styles.activeTabText : {},
          ]}
        >
          Noticias
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "gray",
    backgroundColor: "#fff",
  },
  tab: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  tabText: {
    marginTop: 4,
    color: "gray",
  },
  activeTabText: {
    color: "#e91e63",
  },
});
