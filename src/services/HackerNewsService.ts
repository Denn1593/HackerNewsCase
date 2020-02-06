import axios, { AxiosResponse, AxiosError } from "axios";
import { shuffleArray } from "../ui/util";
import {Story, HNItem, HNUser} from "../model/HackerNews";

const url: string = "https://hacker-news.firebaseio.com/v0";

const get10RandomTopStories = async (callback: (error?: Error, data?: Story[])=>void)=>
{
    axios.get(url + "/topstories.json").then(async (response: AxiosResponse<number[]>)=>
    {
        let storyIds: number[] = response.data;
        let stories: Story[] = [];

        let promises: any[] = [];

        let items: HNItem[] = [];

        storyIds = shuffleArray(storyIds);

        for(let i = 0; i < 10; i++)
        {
            promises.push(axios.get(url + "/item/" + storyIds[i] + ".json").then((response: AxiosResponse<HNItem>)=>
            {
                items.push(response.data);
            }));
        }

        await axios.all(promises);
        promises = [];

        for(let i: number = 0; i < items.length; i++)
        {
            promises.push(axios.get(url + "/user/" + items[i].by + ".json").then((response: AxiosResponse<HNUser>)=>
            {
                stories.push({
                    authorId: response.data.id,
                    authorKarma: response.data.karma,
                    score: items[i].score,
                    timestamp: new Date(items[i].time).toISOString(),
                    title: items[i].title,
                    url: items[i].url
                });
            }));
        }

        await axios.all(promises);

        callback(undefined, stories);

    }).catch((error: AxiosError)=>
    {
        callback(error, undefined);
    });
}

export {get10RandomTopStories}