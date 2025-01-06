const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

// Middleware to parse and inject interactivity script
const modifyResponse = (proxyRes, req, res) => {
  let body = Buffer.from('');

  proxyRes.on('data', (chunk) => {
    body = Buffer.concat([body, chunk]);
  });

  proxyRes.on('end', () => {
    const html = body.toString();
    // Inject a custom script for tracking button clicks and interactions
    const modifiedHtml = html.replace(
      '</body>',
      `
      <script>
        let submitCounter = 0;
        document.addEventListener('click', (event) => {
          if (event.target && event.target.type === 'submit') {
            submitCounter++;
            console.log('Submit clicked:', submitCounter);
            window.parent.postMessage({ type: 'submitClick', count: submitCounter }, '*');
          }
        });

        // Send input field value to parent
        document.addEventListener('input', (event) => {
          if (event.target && event.target.tagName === 'INPUT') {
            const inputValue = event.target.value;
            window.parent.postMessage({ type: 'inputChange', value: inputValue }, '*');
          }
        });
      </script>
      </body>`
    );
    res.send(modifiedHtml);
  });
};

// Proxy route for interactivity
app.use(
  '/proxy',
  createProxyMiddleware({
    target: 'https://docs.google.com',
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes: modifyResponse,
    pathRewrite: {
      '^/proxy': '',
    },
  })
);

// Start the proxy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
