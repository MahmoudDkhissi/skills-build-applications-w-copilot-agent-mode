import './config/database';
import app from './app';

function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

const port = Number(process.env.PORT || 8000);

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});