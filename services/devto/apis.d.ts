import { DevtoArticle, DevtoOptions } from "./type";
export declare const devtoRecentArticles: ({ userName, devtoOptions }: {
    userName: string;
    devtoOptions: DevtoOptions;
}) => Promise<DevtoArticle[]>;
export declare const devtoArticleByUsernameAndId: ({ userName, articleId }: {
    userName: string;
    articleId: string;
}) => Promise<DevtoArticle>;
