import LinksService from './links-service';

describe('LinksService', () => {
  describe('#getId', () => {
    it('returns a string composed as `{source}-{target}` from the given link', () => {
      const id = LinksService.getId({ source: 'foo', target: 'bar' });
      expect(id).toEqual('foo-bar');
    });
  });
});
