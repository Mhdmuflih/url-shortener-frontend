export const isValidURL = (url: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)' + // must start with http:// or https://
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})' + // domain
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query
    '(\\#[-a-zA-Z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(url);
};
