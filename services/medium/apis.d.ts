export declare type MediumArticle = {
    title: string;
    thumbnail: string;
    url: string;
    date: string;
    description: string;
};
export declare const mediumRecentArticles: ({ userName, index }: {
    userName: string;
    index: number;
}) => Promise<MediumArticle[]>;
export declare const mediumArticleById: ({ userName, articleId }: {
    userName: string;
    articleId: string;
}) => Promise<MediumArticle>;
