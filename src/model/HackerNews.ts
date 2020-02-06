interface Story
{
    title: string;
    url: string;
    timestamp: string;
    score: number;
    authorId: number;
    authorKarma: number;
}

interface HNItem
{
    id: number; 	
    deleted: boolean; 	
    type: string;
    by: string;
    time: number;
    text: string;
    dead: boolean;
    parent: number;
    poll: number;
    kids: number[];
    url: string;
    score: number;
    title: string;
    parts: number[];
    descendants: number;
}

interface HNUser
{
    id: number;
    delay: number;
    created: number;
    karma: number;
    about: string;
    submitted: number[];
}

export {Story, HNItem, HNUser};