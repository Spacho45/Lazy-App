export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "lazyapp.fr") {
      url.hostname = "www.lazyapp.fr";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
