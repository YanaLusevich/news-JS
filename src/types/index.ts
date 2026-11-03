export interface NewsSource {
    id: string | null;
    name: string;
}

export interface SourceItem {
    id: string;
    name: string;
}

export interface NewsArticle {
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    source: NewsSource;
}

export interface NewsResponse {
    articles: NewsArticle[];
}

export interface SourcesResponse {
    sources: SourceItem[];
}
