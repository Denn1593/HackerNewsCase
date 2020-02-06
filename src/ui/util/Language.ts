interface Language
{
    randomize: string;
    errorOpenUrl: string;
    errorFetchingStories: string;
}

class LanguageManager
{
    private static english: Language = {
        randomize: "Show 10 random stories",
        errorFetchingStories: "Failed to fetch stories",
        errorOpenUrl: "Could not open url"
    }
    
    private static danish: Language = {
        randomize: "Vis 10 tilfældige nyheder",
        errorFetchingStories: "Kunne ikke hente nyhederne",
        errorOpenUrl: "Kunne ikke åbne url"
    }

    static getString(language: string, str: string): string
    {
        if(this[language])
        {
            if(this[language][str])
            {
                return this[language][str];
            }
            else
            {
                return "string *str* not found"
            }
        }
        else
        {
            return "language *" + language + "* is not found";
        }
    }
}



export default LanguageManager;