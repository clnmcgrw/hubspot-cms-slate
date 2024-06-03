
const DOMAINS = {
  qa: 'https://magneticcreative-2661418.hs-sites.com',
  prod: 'https://magneticcreative.com',
};

module.exports = {
  dist: '_build',
  hubspot: {
    pages: [
      '/demo-page',
      {
        title: 'Homepage',
        pathname: '',
        chunks: [],
      }
    ],
    tables: [],
  },
  theme: {
    name: 'HubSpot CMS Slate',
    folder: 'hubspot-cms-slate'
  },
  domains: DOMAINS,
};
