import MainPage from '../pages/main.page';

describe('MainPage', () => {
  it('Should load data', async () => {
    await MainPage.loadData();
  });
  it('Should add row', async () => {
    await MainPage.addItem('WDIO Test');
  });
  it('Should update row', async () => {
    await MainPage.updateItem('WDIO Test Changed');
  });
  it('Should remove row', async () => {
    await MainPage.removeItem();
  });
});
