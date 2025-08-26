// @ts-check
import { test, expect } from '@playwright/test';
import { OrderMenu } from './pom/OrderMenu.page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://lunch.devbstaging.com/login-password');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('agne.mileryte@sft.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('student781');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('order soup and main dish', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
  await orderMenu.checkDish('sriuba1');
  await orderMenu.checkDish('patiekalas1');
  await orderMenu.validateItems(['sriuba1', 'patiekalas1']);
  await orderMenu.submitOrder();
  await orderMenu.validateItems(['sriuba1', 'patiekalas1']);
  await orderMenu.validateSubmitButtonDisabled();
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
});
test('order only soup', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.deleteAllItems();
  await orderMenu.checkDish('sriuba1');
  await orderMenu.validateItems(['sriuba1']);
  await orderMenu.submitOrder();
  await orderMenu.validateItems(['sriuba1']);
  await orderMenu.validateSubmitButtonDisabled();
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
});
test('order only main dish', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.deleteAllItems();
  await orderMenu.checkDish('patiekalas1');
  await orderMenu.validateItems(['patiekalas1']);
  await orderMenu.submitOrder();
  await orderMenu.validateItems(['patiekalas1']);
  await orderMenu.validateSubmitButtonDisabled();
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
});
/*
test('sort items alphabetically', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.sortAlphabetically();
  await orderMenu.validateItemsOrderAlphabetically();
});
test('sort items by price', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.sortByPrice();
  await orderMenu.validateItemsOrderByPrice();
});
test('sort items by popularity', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.sortByPopularity();
  await orderMenu.validateItemsOrderByPopularity();
});*/