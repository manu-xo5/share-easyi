export const RestApi = {
  get: (url: string) =>
    fetch(import.meta.env.VITE_SERVER_BASE_URL + '/api' + url, {
      method: 'GET',
    }),
}
