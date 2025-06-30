const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy({
    "./css": "css",
    "./img": "img",
    "./js": "js",
    "./lib": "lib",
    "./admin": "admin",
  });

  // Pre-process blog posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("blog/*.md").sort(function (a, b) {
      return b.date - a.date;
    });
  });

  // Date formatting filter
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Custom filter for downcasing strings
  eleventyConfig.addFilter("downcase", function (value) {
    if (value && typeof value.toLowerCase === "function") {
      return value.toLowerCase();
    }
    return value;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
