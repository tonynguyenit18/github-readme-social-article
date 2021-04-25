import { VibloArticle } from "src/services/viblo/type";
export declare const generateVibloTemplate: ({ vibloArticles, styles }: {
    vibloArticles: VibloArticle[];
    styles?: {
        width: number;
        height: number;
    };
}) => string;
export declare const generateNotFoundVibloTemplate: (styles?: {
    width: number;
    height: number;
}) => string;
export declare const generateUserNotFoundVibloTemplate: ({ username }: {
    username: string;
}) => string;
