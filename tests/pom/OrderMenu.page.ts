import { Page, expect, Locator } from '@playwright/test';

export class OrderMenu {
    readonly page : Page;
    readonly dishCards: Locator;
    readonly orderedDishes: Locator;
    readonly orderedDishesClearButtons: Locator;
    readonly submitButton: Locator;
    readonly deleteItemButton: Locator;
    readonly sortAlphabeticallyButton: Locator;
    readonly sortByPriceButton: Locator;
    readonly sortByPopularityButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dishCards = page.locator('.dish-card');
        this.orderedDishes = page.locator('.v-chip__content');
        this.orderedDishesClearButtons = page.getByText('clear');
        this.submitButton = page.locator('.orders-list-button');
        this.sortByPopularityButton = page.getByRole('button', { name: 'Popularity' });
        this.sortAlphabeticallyButton = page.getByRole('button', { name: 'Alphabetical' });
        this.sortByPriceButton = page.getByRole('button', { name: 'Price' });
    }
    async checkDish(text: string) {
        await this.dishCards.filter({ hasText: text }).click();
    }
    async submitOrder() {
        if (await this.submitButton.count() > 0) {
            await this.submitButton.click();
        }

    }
    async deleteAllItems() {
        try {
            await this.orderedDishesClearButtons.first().waitFor({ state: 'visible', timeout: 2000 });
            while (await this.orderedDishesClearButtons.count() > 0) {
                await this.orderedDishesClearButtons.first().click();
            }

            } catch (e) {
            }
    }
    async sortByPopularity() {
        await this.sortByPopularityButton.click();
    }

    async sortAlphabetically() {
        await this.sortAlphabeticallyButton.click();
    }

    async sortByPrice() {
        await this.sortByPriceButton.click();
    }
    async validateItems(dishes: string[]) {
        for (const dish of dishes) {
            await expect(this.orderedDishes.filter({ hasText: dish })).toBeVisible();
        }
    }
    async validateSubmitButtonDisabled() {
        await expect(this.submitButton).toBeDisabled();
    }
    async validateItemsOrderAlphabetically() {
        const items = await this.dishCards
            .locator('.v-card__text .non-selectable')
            .allInnerTexts(); // cleaner than textContent()

        const normalized = items.map(t => t.trim().toLowerCase());
        const sorted = [...normalized].sort((a, b) => a.localeCompare(b));

        expect(normalized).toEqual(sorted);
    }

    
    async validateItemsOrderByPrice() {
        const dishCards = await this.dishCards.all();
        const items = await Promise.all(dishCards.map(async (card) => {
            const name = await card.locator('.v-card__text .non-selectable').textContent() || '';
            const priceText = await card.locator('span.grey--text:not(.pl-1)').textContent() || '0';
            return { name: name.trim(), price: parseFloat(priceText.trim()) };
        }));

        const sortedItems = [...items].sort((a, b) => a.price - b.price);
        expect(items.map(item => item.name)).toEqual(sortedItems.map(item => item.name));
    }

    
    async validateItemsOrderByPopularity() {
        const dishCards = await this.dishCards.all();
        const items = await Promise.all(dishCards.map(async (card) => {
            const name = await card.locator('.v-card__text .non-selectable').textContent() || '';
            const popularityText = await card.locator('span.grey--text.pl-1').textContent() || '0';
            return { name: name.trim(), popularity: parseInt(popularityText.trim(), 10) };
        }));

        const sortedItems = [...items].sort((a, b) => b.popularity - a.popularity);
        expect(items.map(item => item.name)).toEqual(sortedItems.map(item => item.name));
    }
}