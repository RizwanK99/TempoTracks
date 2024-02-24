import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Image } from "react-native";
import { useTheme, ActivityIndicator } from "react-native-paper";
import { PlaylistView } from "../Music/Playlist/PlaylistView";
import { usePlaylists } from "../../api/Music";
import { Tables } from "../../lib/db.types";
import { Text } from "react-native-paper";
import { SongItem } from "../../components/Music/Library/SongList";
import { useGetPlaylistById } from "../../api/Music";
import { LineChart } from "react-native-gifted-charts";

interface WorkoutInProgressSongPlayerProps {
  playlistId: string;
}

export const WorkoutInProgressSongPlayer: React.FC<
  WorkoutInProgressSongPlayerProps
> = ({ playlistId }) => {
  const theme = useTheme();
  const { data: playlist, isPending } = useGetPlaylistById(playlistId);

  if (isPending) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  const demoSong = playlist.songs[0];
  const lineData = [
    {
      value: 133,
    },
    {
      value: 134,
      dataPointText: "134",
      textColor: theme.colors.mutedWhite,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 138,
      dataPointText: "138",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 142,
      dataPointText: "142",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 146,
      dataPointText: "146",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 144,
      dataPointText: "144",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 150,
      dataPointText: "150",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 155,
      dataPointText: "155",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 153,
      dataPointText: "153",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 150,
      dataPointText: "150",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 155,
      dataPointText: "155",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    {
      value: 152,
      dataPointText: "152",
      textColor: theme.colors.text,
      dataPointRadius: 3,
      dataPointColor: theme.colors.bluePrimaryForeground,
    },
    { value: 140 },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          padding: 24,
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 4, marginTop: 8, alignItems: "center" }}>
          <View>
            <Image
              source={{ uri: playlist.artwork_url }}
              height={200}
              width={200}
              style={{ marginBottom: 16, borderRadius: theme.roundness }}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {playlist.name}
          </Text>
          <Text style={{ color: theme.colors.foregroundMuted }}>{`${
            playlist.songs.length
          } song${playlist.songs.length > 1 ? `s` : ``}`}</Text>
        </View>
        <ScrollView style={{ width: "100%" }}>
          {playlist.songs.map((song) => (
            <SongItem key={song.apple_music_id} song={song} />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 8,
          gap: 8,
          marginTop: -8,
        }}
      >
        <Text
          style={{
            alignSelf: "start",
            marginLeft: 4,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          BPM Map
        </Text>
        <LineChart
          initialSpacing={0}
          data={lineData}
          curved
          spacing={30}
          textShiftY={-2}
          textColor1={theme.colors.text}
          textFontSize={11}
          thickness={2}
          width={336}
          height={150}
          hideRules
          hideYAxisText
          yAxisColor={theme.colors.foregroundMuted}
          showVerticalLines
          verticalLinesColor={theme.colors.border}
          xAxisColor={theme.colors.foregroundMuted}
          color={theme.colors.bluePrimary}
          yAxisOffset={130}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 1.5,
          width: "100%",
          paddingHorizontal: 8,
        }}
      >
        <View
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.foregroundMuted,
            opacity: 0.9,
            width: "100%",
            height: 64,
            borderRadius: 6,
            alignContent: "center",
            justifyContent: "center",
            padding: 8,
          }}
        >
          <View style={{ paddingBottom: 2 }}>
            <SongItem song={demoSong} hideDivider showControls />
          </View>
          <View
            style={{
              position: "absolute",
              paddingBottom: 4,
              bottom: 0,
              height: 2,
              width: "98%",
              borderRadius: 4,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: theme.colors.foregroundMutedDark,
            }}
          ></View>
          <View
            style={{
              position: "absolute",
              paddingBottom: 4,
              bottom: 0,
              height: 2,
              width: "44%",
              borderRadius: 4,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: theme.colors.mutedWhite,
            }}
          ></View>
        </View>
      </View>
    </SafeAreaView>
  );
};
