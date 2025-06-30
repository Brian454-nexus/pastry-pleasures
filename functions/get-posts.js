const fetch = require("node-fetch");

// Helper function to parse front matter
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const matches = content.match(frontMatterRegex);

  if (!matches) {
    // Return default structure if no front matter
    return { data: {}, content: content.trim() };
  }

  const [, frontMatter, body] = matches;
  const data = {};

  frontMatter.split("\n").forEach((line) => {
    const [key, ...values] = line.split(":");
    if (key && values.length) {
      let value = values.join(":").trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      data[key.trim()] = value;
    }
  });

  return { data, content: body.trim() };
}

exports.handler = async function (event, context) {
  const GITHUB_API_URL =
    "https://api.github.com/repos/Brian454-nexus/pastry-pleasures/contents/blog";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // For private repos

  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
    };
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    // Fetch the list of files in the blog directory
    const response = await fetch(GITHUB_API_URL, { headers });
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Failed to fetch blog posts list: ${response.statusText}`,
        }),
      };
    }

    const files = await response.json();
    if (!Array.isArray(files)) {
      // The path might not be a directory or is empty.
      // Or maybe an error object was returned.
      console.log("No files found or an error occurred:", files);
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    const markdownFiles = files.filter((file) => file.name.endsWith(".md"));

    // Fetch and parse each markdown file
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const contentResponse = await fetch(file.download_url);
        if (!contentResponse.ok) {
          console.error(`Failed to fetch ${file.name}`);
          return null;
        }

        const content = await contentResponse.text();
        const { data, content: body } = parseFrontMatter(content);

        return {
          id: file.sha,
          title: data.title,
          excerpt: data.excerpt,
          category: data.category,
          author: data.author,
          authorImage: data.authorImage,
          date: data.date,
          image: data.image,
          slug: file.name.replace(/\.md$/, ""),
          content: body,
          tags: data.tags || [],
          draft: data.draft || false,
        };
      })
    );

    const validPosts = posts.filter((p) => p !== null);

    // Sort posts by date (newest first) and filter out drafts
    const sortedPosts = validPosts
      .filter((post) => !post.draft)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
      },
      body: JSON.stringify(sortedPosts),
    };
  } catch (error) {
    console.error("Error in get-posts function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
