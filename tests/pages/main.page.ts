import { browser } from '@wdio/globals';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends Page {
  /**
     * define selectors using getter methods
     */

  get outlayRow() {
    return browser.$('#outlayRow64480');
  }

  get outlayRows() {
    return browser.$$('[id*=outlayRow]');
  }

  get addRow() {
    return browser.$('#addRow');
  }

  async loadData() {
    try {
      this.open();
      await this.outlayRow.waitForDisplayed({ timeout: 2000 });
    } catch (e) {
      throw new Error('Не удалось загрузить данные');
    }
  }

  async updateItem(title:string) {
    try {
      await this.loadData();
      const itemCount = await this.outlayRows.length;
      const rowNameCell = await this.outlayRows[itemCount - 1].$('#rowName');
      await rowNameCell.doubleClick();
      const rowNameInput = await this.outlayRows[itemCount - 1].$('#rowNameInput');
      await rowNameInput.waitForDisplayed({ timeout: 2000 });
      await rowNameInput.setValue(title);
      await browser.keys('Enter');
      await rowNameCell.waitForDisplayed({ timeout: 2000 });
      expect(await rowNameCell.getText()).toBe(title);
    } catch (e) {
      throw new Error('Не удалось изменить данные');
    }
  }

  async removeItem() {
    try {
      await this.loadData();
      const itemCount = await this.outlayRows.length;
      const lastItem = await this.outlayRows[itemCount - 1];
      const deleteBtn = await lastItem?.$('#deleteBtn');
      await deleteBtn?.click();
      await browser.pause(2000);
      const itemCountAfterDelete = await this.outlayRows.length;
      if (itemCount - itemCountAfterDelete !== 1) {
        throw new Error('Удаление не произошло, либо был удалена более, чем одна задача');
      }
    } catch (e) {
      throw new Error('Не удалось удалить задачу');
    }
  }

  async addItem(title:string) {
    try {
      await this.loadData();
      const itemCount = await this.outlayRows.length;
      const inputs = await this.addRow.$$('input');
      await inputs[0].setValue(title);
      await inputs[1].setValue(111);
      await inputs[2].setValue(222);
      await inputs[3].setValue(333);
      await inputs[4].setValue(444);
      await browser.keys('Enter');
      await browser.pause(2000);
      await browser.waitUntil(async () => (await this.outlayRows.length === itemCount + 1), { timeout: 2000 });
    } catch (e) {
      throw new Error('Не удалось добавить задачу');
    }
  }

  open() {
    return super.open('');
  }
}

export default new MainPage();
