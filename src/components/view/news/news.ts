import './news.css';
import { NewsArticle } from '../../../types';

class News {
    public draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.slice(0, 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsItemTemp || !newsContainer) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                newsClone.querySelector('.news__item')?.classList.add('alt');
            }

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');

            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            const description = newsClone.querySelector<HTMLElement>('.news__description-content');
            const link = newsClone.querySelector<HTMLElement>('.news__read-more a');

            if (!photo || !author || !date || !title || !source || !description || !link) {
                return;
            }

            photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            author.textContent = item.author || item.source.name;
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            title.textContent = item.title;
            source.textContent = item.source.name;
            description.textContent = item.description;
            link.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
