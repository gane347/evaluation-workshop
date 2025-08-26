import { Page, expect, Locator } from '@playwright/test';

export class OrderMenu {
    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
        this.dishCards = page.locator('.dish-card');
    }
    async checkDish(text: string) {
        await this.dishCards.filter({ hasText: text }).click();
    }