import React from "react";
import {Story} from "../../model/HackerNews";
import { View, Text, Linking, StyleSheet } from "react-native";

interface StoryProps
{
    story: Story;
    openUrl: (url: string)=>void;
}

class StoryContainer extends React.Component<StoryProps, {}>
{
    render()
    {
        return <View style={containerStyle.container}>
            <Text style={boldText.container}>{this.props.story.title}</Text>
            <Text>{this.props.story.timestamp}</Text>
            <Text style={spacing.container}>{"Score: " + this.props.story.score}</Text>
            <Text>{"By: " + this.props.story.authorId}</Text>
            <Text style={spacing.container}>{"Karma: " + this.props.story.authorKarma}</Text>
            <Text style={urlText.container} onPress={()=>this.props.openUrl(this.props.story.url)}>{this.props.story.url}</Text>
        </View>
    }
}

const spacing = StyleSheet.create({
    container: {
        marginBottom: 12
    }
});

const boldText = StyleSheet.create({
    container: {
        fontWeight: "bold",
    }
});

const urlText = StyleSheet.create({
    container: {
        textDecorationLine: "underline"
    }
})

const containerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 2
    },
});

export default StoryContainer;