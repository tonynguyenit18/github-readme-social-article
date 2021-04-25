import { VibloArticle, VibloOptions } from "./type";
export declare const vibloRecentArticles: ({ username, vibloOptions }: {
    username: string;
    vibloOptions?: VibloOptions;
}) => Promise<VibloArticle[]>;
export declare const vibloArticleByUsernameAndId: ({ username, articleId }: {
    username: string;
    articleId: string;
}) => Promise<VibloArticle>;
