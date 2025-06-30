const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { user } = JSON.parse(event.body);
  const { identity, user: user_data } = user.user_metadata;
  const netlifyApiToken = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.SITE_ID; // or your site ID

  if (!netlifyApiToken) {
    console.error("Netlify API token is not set.");
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server configuration error: Missing API token.",
      }),
    };
  }

  const url = `https://api.netlify.com/api/v1/sites/${siteId}/identity/${user.id}`;
  const adminAuthHeader = `Bearer ${netlifyApiToken}`;

  const roles = ["admin"]; // The role to assign

  const body = {
    app_metadata: {
      ...user.app_metadata,
      roles: roles,
    },
    user_metadata: {
      ...user.user_metadata,
    },
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: adminAuthHeader,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Netlify API error: ${await response.text()}`);
    }

    console.log(
      `User ${user.email} has been assigned the role: ${roles.join(", ")}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `User role assigned: ${roles.join(", ")}`,
      }),
    };
  } catch (error) {
    console.error("Error assigning user role:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to assign user role.",
        details: error.message,
      }),
    };
  }
};
