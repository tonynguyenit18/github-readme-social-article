import { VibloOptions } from "./type";
export declare const articlesTemplateByUserName: ({ username, vibloOptions }: {
    username: string;
    vibloOptions?: VibloOptions;
}) => Promise<string>;
export declare const articleTemplateByUserNameAndIndex: ({ username, articleIndex }: {
    username: string;
    articleIndex: number;
}) => Promise<any>;
export declare const articleTemplateByUserNameAndArticleId: ({ username, articleId }: {
    username: string;
    articleId: string;
}) => Promise<any>;
