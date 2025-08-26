// @ts-check
import { test, expect } from '@playwright/test';
import { OrderMenu } from './pom/OrderMenu.page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://lunch.devbstaging.com/login-password');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin2@sft.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin110');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('order soup and main dish', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
  await orderMenu.checkDish('soup1');
  await orderMenu.checkDish('main1');
  await orderMenu.validateItems(['soup1', 'main1']);
  await orderMenu.submitOrder();
  await orderMenu.validateItems(['soup1', 'main1']);
  await orderMenu.validateSubmitButtonDisabled();
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
});
test('order only soup', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.deleteAllItems();
  await orderMenu.checkDish('soup1');
  await orderMenu.validateItems(['soup1']);
  await orderMenu.submitOrder();
  await orderMenu.validateItems(['soup1']);
  await orderMenu.validateSubmitButtonDisabled();
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
});
test('order only main dish', async ({ page }) => {
  const orderMenu = new OrderMenu(page);
  await orderMenu.deleteAllItems();
  await orderMenu.checkDish('main1');
  await orderMenu.validateItems(['main1']);
  await orderMenu.submitOrder();
  await orderMenu.validateItems(['main1']);
  await orderMenu.validateSubmitButtonDisabled();
  await orderMenu.deleteAllItems();
  await orderMenu.submitOrder();
});

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

//This test was generated mostly by Playwright codegen. The site should be in lithuanian and there should be an empty provider named '111'
test('add new dish', async ({ page }) => {
  await page.getByText('mode_editPatiekalų Redagavimas').click();
  await page.getByText('check111 0').click();
  await page.getByRole('button').filter({ hasText: 'add' }).click();
  await page.getByRole('textbox', { name: 'Kateg. Pavadinimas' }).fill('main');
  await page.getByRole('textbox', { name: 'Vertimas' }).click();
  await page.getByRole('textbox', { name: 'Vertimas' }).fill('pagrindinis patiekalas');
  await page.getByRole('button', { name: 'Išsaugoti' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Patiekalo pavadinimas' }).click();
  await page.getByRole('textbox', { name: 'Patiekalo pavadinimas' }).fill('main1');
  await page.getByRole('textbox', { name: 'Vertimas' }).first().click();
  await page.getByRole('textbox', { name: 'Vertimas' }).fill('patiekalas1');
  await page.getByRole('spinbutton', { name: 'Kaina' }).click();
  await page.getByRole('spinbutton', { name: 'Kaina' }).fill('10');
  await page.getByRole('spinbutton', { name: 'Kiekis' }).click();
  await page.getByRole('spinbutton', { name: 'Kiekis' }).fill('8');
  await page.getByRole('button', { name: 'Patiekalas' }).click();
  await page.getByRole('textbox', { name: 'Patiekalo pavadinimas' }).nth(1).fill('main2');
  await page.getByRole('spinbutton', { name: 'Kiekis' }).nth(1).click();
  await page.getByRole('spinbutton', { name: 'Kiekis' }).nth(1).fill('2');
  await page.getByRole('spinbutton', { name: 'Kaina' }).nth(1).click();
  await page.getByRole('spinbutton', { name: 'Kaina' }).nth(1).fill('5');
  await page.getByRole('textbox', { name: 'Vertimas' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Vertimas' }).nth(1).fill('patiekalas2');
  await page.getByRole('button').filter({ hasText: /^add$/ }).click();
  await page.locator('div').filter({ hasText: /^check_box_outline_blankSriuboseditKateg\. PavadinimastranslateVertimas$/ }).locator('a').click();
  await page.getByRole('textbox', { name: 'Kateg. Pavadinimas' }).click();
  await page.getByRole('textbox', { name: 'Kateg. Pavadinimas' }).fill('Sriubos');
  await page.locator('div').filter({ hasText: /^check_boxSriuboseditKateg\. PavadinimastranslateVertimas$/ }).getByLabel('Vertimas').click();
  await page.getByRole('textbox', { name: 'Kateg. Pavadinimas' }).click();
  await page.getByRole('textbox', { name: 'Kateg. Pavadinimas' }).fill('Soups');
  await page.locator('div').filter({ hasText: /^check_boxSriuboseditKateg\. PavadinimastranslateVertimas$/ }).getByLabel('Vertimas').click();
  await page.locator('div').filter({ hasText: /^check_boxSriuboseditKateg\. PavadinimastranslateVertimas$/ }).getByLabel('Vertimas').fill('sriubos');
  await page.getByRole('button', { name: 'Išsaugoti' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Patiekalo pavadinimas' }).nth(2).click();
  await page.getByRole('textbox', { name: 'Patiekalo pavadinimas' }).nth(2).fill('soup1');
  await page.getByRole('textbox', { name: 'Vertimas' }).nth(2).click();
  await page.getByRole('textbox', { name: 'Vertimas' }).nth(2).fill('sriuba1');
  await page.getByRole('spinbutton', { name: 'Kiekis' }).nth(2).dblclick();
  await page.getByRole('spinbutton', { name: 'Kiekis' }).nth(2).fill('5');
  await page.getByRole('spinbutton', { name: 'Kaina' }).nth(2).click();
  await page.getByRole('spinbutton', { name: 'Kaina' }).nth(2).fill('4');
  await page.getByRole('button', { name: 'Patiekalas' }).nth(1).click();
  await page.getByRole('spinbutton', { name: 'Kaina' }).nth(3).click();
  await page.locator('div').filter({ hasText: /^KainaKiekisPatiekalo pavadinimasRequired\.Vertimas$/ }).getByLabel('Kaina').fill('5');
  await page.locator('div').filter({ hasText: /^KainaKiekisPatiekalo pavadinimasRequired\.Vertimas$/ }).getByLabel('Kiekis').click();
  await page.locator('div').filter({ hasText: /^KainaKiekisPatiekalo pavadinimasRequired\.Vertimas$/ }).getByLabel('Kiekis').fill('4');
  await page.locator('div').filter({ hasText: /^KainaKiekisPatiekalo pavadinimasRequired\.Vertimas$/ }).getByLabel('Patiekalo pavadinimas').click();
  await page.locator('div').filter({ hasText: /^KainaKiekisPatiekalo pavadinimasRequired\.Vertimas$/ }).getByLabel('Patiekalo pavadinimas').fill('soup2');
  await page.getByRole('textbox', { name: 'Vertimas' }).nth(3).click();
  await page.getByRole('textbox', { name: 'Vertimas' }).nth(3).fill('sriuba2');
  await page.getByRole('button', { name: 'Išsaugoti' }).click();
  
  await page.goto('https://lunch.devbstaging.com/dishes/tuesday/111');
  const orderMenu = new OrderMenu(page);
  orderMenu.validateCategory('Soups', ['soup1', 'soup2']);
  orderMenu.validateCategory('Main', ['main1', 'main2']);
  
  await page.getByText('mode_editPatiekalų Redagavimas').click();
  await page.getByText('check111 0').click();
  await page.getByRole('button').filter({ hasText: 'more_vert' }).first().click();
  await page.getByText('deleteIštrinti').nth(1).click();
  await page.getByRole('button', { name: 'Išsaugoti' }).click();

});