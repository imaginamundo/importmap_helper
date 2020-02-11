export default function getConfig() {
  return {
    modules: {
      standard: 'https://api.github.com/repos/denoland/deno/contents/std',
      thirdParty: 'https://raw.githubusercontent.com/denoland/deno_website2/master/src/database.json'
    },
    path: {
      standard: 'https://deno.land/std',
      thirdParty: 'https://deno.land/x'
    }
  };
};