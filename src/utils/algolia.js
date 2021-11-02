import algoliasearch from 'algoliasearch';

const client = algoliasearch('CORYYY7FXZ', 'd19752ba68789ab108e07f62142d0c73');

const algolia = client.initIndex('limo');

export default algolia;
