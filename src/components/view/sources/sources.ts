import './sources.css';
import { SourceItem } from '../../../types';

class Sources {
    public draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const soursesContainer = document.querySelector<HTMLElement>('.sourses');

        if (!sourceItemTemp || !soursesContainer) {
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const source = sourceClone.querySelector<HTMLElement>('.source__item');

            if (!name || !source) {
                return;
            }

            name.textContent = item.name;
            source.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        soursesContainer.append(fragment);
    }
}

export default Sources;
