import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");

const CustomCarousel = ({ carouselData, handleItemTap }) => {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentlySelected, setCurrentlySelected] = useState(0);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
    const roundedIndex = Math.round(currentIndex);

    if (activeIndex !== roundedIndex) {
      setActiveIndex(roundedIndex);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handleItemTap(item.apple_music_id);
          setCurrentlySelected(index);
        }}
      >
        <View style={styles.carouselItem}>
          <Image
            source={{ uri: item.artwork_url }}
            style={styles.carouselImage}
          />
          <View style={styles.carouselTextContainer}>
            <Text style={styles.carouselTitle}>{item.name}</Text>
            <Text style={styles.carouselDescription}>
              {index === currentlySelected ? "Currently Selected" : ""}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const PaginationBar = () => (
    <View style={styles.paginationContainer}>
      {carouselData.map((_, index) => (
        <TouchableWithoutFeedback key={index}>
          <Text
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : {},
              index !== 0 ? { marginLeft: 8 } : {},
            ]}
          >
            ⬤
          </Text>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );

  const PaginationNumericDisplay = () => (
    <View style={styles.paginationContainer}>
      <Text style={{ color: theme.colors.foregroundMuted }}>{`${
        activeIndex + 1
      } / ${carouselData.length}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={carouselRef}
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => ({
          length: width * 0.8,
          offset: width * 0.8 * index,
          index,
        })}
        contentContainerStyle={styles.carouselContainer}
      />
      {carouselData.length <= 5 && <PaginationBar />}
      {carouselData.length > 5 && <PaginationNumericDisplay />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    alignItems: "center",
  },
  carouselItem: {
    width: width * 0.8,
    height: 350,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: (width * 0.1) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  carouselTextContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  carouselDescription: {
    fontSize: 14,
    color: "#888",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    fontSize: 10,
    color: "#bbb",
  },
  activeDot: {
    color: "#555",
  },
});

export default CustomCarousel;
