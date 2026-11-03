import AppLoader from './appLoader';
import type { NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'mocks/sources',
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        const eventTarget = e.target;

        if (!(eventTarget instanceof HTMLElement)) {
            return;
        }

        let target: HTMLElement = eventTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) {
                    return;
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'mocks/everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            const parent = target.parentElement;

            if (!parent) {
                return;
            }

            target = parent;
        }
    }
}

export default AppController;
