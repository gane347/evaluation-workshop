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
        this.sortByPopularityButton = page.getByRole('button', { name: 'POPULIARUMAS' });
        this.sortAlphabeticallyButton = page.getByRole('button', { name: 'ABĖCĖLĖ' });
        this.sortByPriceButton = page.getByRole('button', { name: 'KAINA' });
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
        const categories = await this.page.locator('.v-subheader').all();
        for (const category of categories) {
            const prices = await category
            .locator('.dish-card:not(.opacue) .v-avatar .grey--text:not(.pl-1)')
            .allInnerTexts();
        
            const numericPrices = prices.map(price => parseFloat(price));
            const sortedPrices = [...numericPrices].sort((a, b) => a - b);
            
            expect(numericPrices).toEqual(sortedPrices);
        }
}

    async validateCategory(title: string, items: string[]) {
        const categoryHeader = this.page.locator('.v-subheader', { hasText: title });
        await expect(categoryHeader).toBeVisible();

        const categorySection = categoryHeader.locator('xpath=../..');
        const dishNames = await categorySection
            .locator('.dish-card .v-card__text .non-selectable')
            .allInnerTexts();

        const normalizedDishNames = dishNames.map(name => name.trim());
        
        for (const item of items) {
            expect(normalizedDishNames).toContain(item);
        }

        expect(normalizedDishNames.length).toBe(items.length);
    }
}