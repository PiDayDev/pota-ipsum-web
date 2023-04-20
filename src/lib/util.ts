import data from '../../package.json';

const dependency = data.dependencies["pota-ipsum"];

export const getVersion = (): string => dependency.replace(/[^0-9.]/g, '')
