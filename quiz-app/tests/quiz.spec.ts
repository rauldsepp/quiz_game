import { test, expect } from '@playwright/test';

test.describe('Eesti viktoriin', () => {
  test.beforeEach(async( { page }) => {
    await page.goto('/');
  });

  test('avab rakenduse ja näitab algvaadet', async ({ page }) => {
    await expect(page.getByTestId('start-button')).toBeVisible();
    await expect(page.getByText('Alusta mängu')).toBeVisible();
  });

  test('vastab kõigile küsimustele õigesti', async ({ page }) => {
    await page.getByTestId('start-button').click();

    // Mis on Eesti pealinn? -> Tallinn (0)
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti pealinn?');
    await page.getByTestId('answer-0').click();

    // Mis on Eesti rahvusloom? -> Hunt (2)
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvusloom?');
    await page.getByTestId('answer-2').click();

    // Mis on Eesti rahvuskala? -> Räim (0)
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvuskala?');
    await page.getByTestId('answer-0').click();

    await expect(page.getByTestId('game-over-title')).toHaveText('Mäng läbi!');
    await expect(page.getByTestId('score')).toHaveText('Tulemus: 3 / 3');
    await expect(page.getByTestId('results-table')).toBeVisible();
  });

  test('vastused on vastava ikooniga märgistatud ja tulemus on madalam', async ({ page }) => {
    await page.getByTestId('start-button').click();

    // vale vastus
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti pealinn?');
    await page.getByTestId('answer-1').click();

    // vale vastuse ikoon
    await expect(page.getByTestId('wrong-icon-1')).toBeVisible();

    // õige vastuse ikoon päris vastuse juures
    await expect(page.getByTestId('correct-icon-0')).toBeVisible();

    // ülejäänud vastused õiged
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvusloom?');
    await page.getByTestId('answer-2').click();

    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvuskala?');
    await page.getByTestId('answer-0').click();

    await expect(page.getByTestId('score')).toHaveText('Tulemus: 2 / 3');
  });

  test('tabel näitab õigeid ja mängija vastuseid', async ({ page }) => {
    await page.getByTestId('start-button').click();

    // vastused: vale, õige, vale
    await page.getByTestId('answer-1').click();
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvusloom?');

    await page.getByTestId('answer-2').click();
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvuskala?');

    await page.getByTestId('answer-2').click();

    await expect(page.getByTestId('game-over-title')).toBeVisible();
    await expect(page.getByTestId('score')).toHaveText('Tulemus: 1 / 3');

    // tabeli kontroll
    await expect(page.getByText('Mis on Eesti pealinn?')).toBeVisible();
    await expect(page.getByText('Tallinn')).toBeVisible();
    await expect(page.getByText('Tartu')).toBeVisible();

    await expect(page.getByText('Mis on Eesti rahvuskala?')).toBeVisible();
    await expect(page.getByText('Räim')).toBeVisible();
    await expect(page.getByText('Haug')).toBeVisible();
  });

  test('restart nupp viib tagasi algvaatele', async ({ page }) => {
    await page.getByTestId('start-button').click();

    await page.getByTestId('answer-0').click();
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvusloom?');

    await page.getByTestId('answer-2').click();
    await expect(page.getByTestId('question-text')).toHaveText('Mis on Eesti rahvuskala?');

    await page.getByTestId('answer-0').click();

    await expect(page.getByTestId('game-over-title')).toBeVisible();

    await page.getByRole('button', { name: 'Mängi uuesti' }).click();

    await expect(page.getByTestId('start-button')).toBeVisible();
  });
});
