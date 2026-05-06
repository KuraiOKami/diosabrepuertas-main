// Netlify Function: fetches form submissions from Netlify Forms API
// Required env vars in Netlify dashboard:
//   NETLIFY_API_TOKEN  — Personal access token from app.netlify.com/user/applications
//   NETLIFY_SITE_ID    — Found in Site Settings > General > Site ID
//   ADMIN_SECRET       — Must match the admin password used in admin.html

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  // Validate the admin token sent from the browser
  const token = event.headers['x-admin-token'];
  const secret = process.env.ADMIN_SECRET;
  if (secret && token !== secret) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'UNAUTHORIZED' }) };
  }

  const apiToken = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!apiToken || !siteId) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ error: 'NOT_CONFIGURED' })
    };
  }

  try {
    // Locate the preventa form
    const formsRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms`,
      { headers: { Authorization: `Bearer ${apiToken}` } }
    );
    if (!formsRes.ok) throw new Error(`Forms API returned ${formsRes.status}`);

    const forms = await formsRes.json();
    const form = forms.find(f => f.name === 'preventa');

    if (!form) {
      return { statusCode: 200, headers, body: JSON.stringify([]) };
    }

    // Fetch up to 200 most recent submissions
    const subsRes = await fetch(
      `https://api.netlify.com/api/v1/forms/${form.id}/submissions?per_page=200`,
      { headers: { Authorization: `Bearer ${apiToken}` } }
    );
    if (!subsRes.ok) throw new Error(`Submissions API returned ${subsRes.status}`);

    const submissions = await subsRes.json();
    return { statusCode: 200, headers, body: JSON.stringify(submissions) };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'API_ERROR', message: err.message })
    };
  }
};
