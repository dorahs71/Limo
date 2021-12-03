import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  'CORYYY7FXZ',
  process.env.REACT_APP_SEARCH_ONLY_API_KEY
);

const algolia = client.initIndex('limo');

export default algolia;
