import { DevtoOptions } from "./type";
export declare const articlesTemplateByUserName: ({ userName, devtoOptions }: {
    userName: string;
    devtoOptions?: DevtoOptions;
}) => Promise<string>;
export declare const articleTemplateByUserNameAndIndex: ({ userName, articleIndex }: {
    userName: string;
    articleIndex: number;
}) => Promise<string>;
export declare const articleTemplateByUserNameAndArticleId: ({ userName, articleId }: {
    userName: string;
    articleId: string;
}) => Promise<string>;
