import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: unknown) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: unknown) => void): void {
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
                    super.getResp(
                        {
                            endpoint: 'everything',
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
