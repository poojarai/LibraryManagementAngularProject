import { LibManagementPage } from './app.po';

describe('lib-management App', function() {
  let page: LibManagementPage;

  beforeEach(() => {
    page = new LibManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
