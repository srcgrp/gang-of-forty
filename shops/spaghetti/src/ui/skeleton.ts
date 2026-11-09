import { createEl } from './dom';

// اسکلتون لودینگ برای شگفت‌انگیز
export function renderOffersSkeletonLoading(container: HTMLElement | null, count = 5): void {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const card = createEl('div', 'amazing-offer-box');
        card.style.opacity = '0.6';
        card.style.pointerEvents = 'none';

        const imgDiv = createEl('div', 'amazing-offer-box-image-div');
        imgDiv.style.background = '#e2e8f0';

        const t = createEl('div');
        t.style.height = '16px';
        t.style.background = '#cbd5e1';
        t.style.borderRadius = '4px';
        t.style.marginBlock = '6px';

        const w = createEl('div');
        w.style.height = '12px';
        w.style.width = '50%';
        w.style.background = '#e2e8f0';
        w.style.borderRadius = '4px';

        card.appendChild(imgDiv);
        card.appendChild(t);
        card.appendChild(w);
        container.appendChild(card);
    }
}

// اسکلتون لودینگ برای محصولات کاروسل
export function renderSkeletonLoading(container: HTMLElement | null, count = 6): void {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skelCard = createEl('article', 'product-box');
        skelCard.style.opacity = '0.6';
        skelCard.style.pointerEvents = 'none';

        const skelImg = createEl('div', 'product-box-image');
        skelImg.style.background = '#e2e8f0';
        skelImg.style.borderRadius = '8px';

        const skelInfo = createEl('div', 'product-box-info');
        const skelTitle = createEl('div');
        skelTitle.style.height = '18px';
        skelTitle.style.background = '#cbd5e1';
        skelTitle.style.marginBottom = '8px';
        skelTitle.style.borderRadius = '4px';

        const skelUnit = createEl('div');
        skelUnit.style.height = '14px';
        skelUnit.style.width = '60%';
        skelUnit.style.background = '#e2e8f0';
        skelUnit.style.borderRadius = '4px';

        skelInfo.appendChild(skelTitle);
        skelInfo.appendChild(skelUnit);

        skelCard.appendChild(skelImg);
        skelCard.appendChild(skelInfo);
        container.appendChild(skelCard);
    }
}
