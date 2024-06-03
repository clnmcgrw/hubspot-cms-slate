
// Hubspot API domain + paths
const API_BASE = 'https://api.hubapi.com/';
const API_PATHS = {
  pages: 'content/api/v4/pages',
  sitePages: 'cms/v3/pages/site-pages',
  updatePage: id => `cms/v3/pages/site-pages/${id}`,
  batchSitePages: 'cms/v3/pages/site-pages/batch/create',
  domains: 'cms/v3/domains/',
  designManager: 'designmanager/v1/raw-assets/by-path/',
  designManagerMeta: path => `/cms/v3/source-code/published/metadata/${path}`,
  fileMetadata: 'cms/v3/source-code/published/metadata/',
  hubDB: 'cms/v3/hubdb/tables/',
};

module.exports = {
  API_BASE,
  API_PATHS,
};
