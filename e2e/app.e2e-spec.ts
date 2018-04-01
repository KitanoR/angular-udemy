import { AdminproPage } from './app.po';

describe('adminpro App', () => {
  let page: AdminproPage;

  beforeEach(() => {
    page = new AdminproPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
