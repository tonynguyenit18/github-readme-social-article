import { DevtoArticle } from "../services/devto/type";
import { MediumArticle } from "../services/medium/apis";
export declare const generateMediumTemplate: ({ mediumArticles, styles }: {
    mediumArticles: MediumArticle[];
    styles?: {
        width: number;
        height: number;
    };
}) => string;
export declare const generateDevtoTemplate: ({ devtoArticles, styles }: {
    devtoArticles: DevtoArticle[];
    styles?: {
        width: number;
        height: number;
    };
}) => string;
