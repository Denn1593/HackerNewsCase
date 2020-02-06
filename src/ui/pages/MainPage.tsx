import React from "react";
import { Button, View, ScrollView, Linking, StyleSheet, ActivityIndicator, Text, Picker } from "react-native";
import StoryContainer from "../components/StoryContainer";
import LanguageManager from "../util/Language";
import {connect} from "react-redux"; 
import { ApplicationState} from "../../state/Reducers";
import {Story} from "../../model/HackerNews";
import { get10RandomTopStories } from "../../services/HackerNewsService";
import { Action } from "../../state/Actions";
import { ActionType } from "../../state/Actions";


interface MainPageProps
{
    errorMessage: string;
    stories: Story[];
    language: string;
    fetching: boolean;
    dispatch?: (action: Action)=>void; //temporary dirty hack
}

class MainPage extends React.Component<MainPageProps, {}>
{
    openUrl = (url: string)=>
    {
        Linking.canOpenURL(url).then((supported: boolean)=>
        {
            if(supported)
            {
                Linking.openURL(url);
            }
            else
            {
                this.props.dispatch({type: ActionType.SET_ERROR_MESSAGE, payload: {errorMessage: LanguageManager.getString(this.props.language, "errorOpenUrl")}})
            }
        });
    }

    randomize = ()=>
    {
        this.props.dispatch({type: ActionType.SET_FECTHING, payload: {fetching: true}});
        get10RandomTopStories((error: Error, data?: Story[])=>
        {
            console.log(error);
            console.log(data);
            if(error)
            {
                this.props.dispatch({type: ActionType.SET_ERROR_MESSAGE, payload: {errorMessage: error.message}});
            }
            else
            {
                if(data)
                {
                    this.props.dispatch({type: ActionType.SET_STORIES, payload: {stories: data}});
                }
                else
                {
                    this.props.dispatch({type: ActionType.SET_ERROR_MESSAGE, payload: {errorMessage: LanguageManager.getString(this.props.language, "errorFetchingStories")}});
                }
            }
        })
    }

    changeLanguage = (itemValue: string, itemIndex: number)=>
    {
        this.props.dispatch({type: ActionType.SET_LANGUAGE, payload: {language: itemValue}});
    }

    render()
    {
        let stories: JSX.Element[] = [];

        console.log(this.props);

        for(let i: number = 0; i < this.props.stories.length; i++)
        {
            stories.push(<StoryContainer key={i} story={this.props.stories[i]} openUrl={this.openUrl}></StoryContainer>);
        }

        return <View style={containerStyle.container}>
            <View>
                <Picker selectedValue={this.props.language} onValueChange={this.changeLanguage}>
                    <Picker.Item label="English" value="english"/>
                    <Picker.Item label="Dansk" value="danish" />
                </Picker>
                <Button title={LanguageManager.getString(this.props.language, "randomize")} onPress={this.randomize}/>
            </View>
            {
                this.props.fetching ? 
                <View>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
                :
                this.props.errorMessage ?
                <Text>{this.props.errorMessage}</Text>
                :
                <ScrollView>
                    {stories}
                </ScrollView>
            }
            
        </View>
    }
}

const containerStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        padding: 5,
        backgroundColor: "#ff6600"
    }
});

const mapStateToProps = (state: ApplicationState)=>
{
    const props: MainPageProps = {
        errorMessage: state.errorMessage,
        stories: state.stories,
        language: state.language,
        fetching: state.fetching
    }

    return props;
}

export default connect(mapStateToProps)(MainPage);