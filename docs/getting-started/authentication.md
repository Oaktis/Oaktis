# Authentication

Learn how to authenticate your requests to the Oaktis API.

## Get Your API Key

Get your API key from:

👉 **[oaktis.com/dashboard/api-keys](https://oaktis.com/?utm_source=docs&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=auth)**

## Using Environment Variables

The recommended way to store your API key is using environment variables.

### Unix/macOS/Linux

```bash
export OAKTIS_API_KEY=your-api-key
```

Add to your shell profile (~/.bashrc, ~/.zshrc) to persist:

```bash
echo 'export OAKTIS_API_KEY=your-api-key' >> ~/.zshrc
source ~/.zshrc
```

### Windows

#### PowerShell

```powershell
$env:OAKTIS_API_KEY="your-api-key"
```

#### Command Prompt

```cmd
set OAKTIS_API_KEY=your-api-key
```

## Using .env Files

Create a `.env` file in your project root:

```env
OAKTIS_API_KEY=your-api-key
```

### JavaScript/TypeScript

Install dotenv:

```bash
npm install dotenv
```

Load environment variables:

```typescript
import 'dotenv/config';
import { OaktisClient } from '@oaktis/sdk';

const client = new OaktisClient({
  apiKey: process.env.OAKTIS_API_KEY!
});
```

### Python

Install python-dotenv:

```bash
pip install python-dotenv
```

Load environment variables:

```python
import os
from dotenv import load_dotenv
from oaktis import OaktisClient

load_dotenv()

client = OaktisClient(api_key=os.getenv("OAKTIS_API_KEY"))
```

## SDK Configuration

### JavaScript/TypeScript

```typescript
import { OaktisClient } from '@oaktis/sdk';

const client = new OaktisClient({
  apiKey: 'your-api-key',  // Required
  baseUrl: 'https://api.oaktis.com',  // Optional
  timeout: 60000  // Optional (milliseconds)
});
```

### Python

```python
from oaktis import OaktisClient

client = OaktisClient(
    api_key="your-api-key",  # Required
    base_url="https://api.oaktis.com",  # Optional
    timeout=60.0  # Optional (seconds)
)
```

## Security Best Practices

### ✅ Do

- Store API keys in environment variables
- Use `.env` files for local development
- Add `.env` to `.gitignore`
- Rotate API keys regularly
- Use separate keys for development/production
- Revoke compromised keys immediately

### ❌ Don't

- Hardcode API keys in source code
- Commit API keys to version control
- Share API keys in public channels
- Use production keys in development
- Expose API keys in client-side code

## Key Management

### Creating API Keys

1. Go to [oaktis.com/dashboard/api-keys](https://oaktis.com)
2. Click "Create New API Key"
3. Give it a descriptive name
4. Copy and store the key securely

### Rotating API Keys

1. Create a new API key
2. Update your application configuration
3. Verify the new key works
4. Revoke the old key

### Revoking API Keys

1. Go to [oaktis.com/dashboard/api-keys](https://oaktis.com)
2. Find the key to revoke
3. Click "Revoke"
4. Confirm the action

## CI/CD Integration

### GitHub Actions

```yaml
- name: Generate Video
  env:
    OAKTIS_API_KEY: ${{ secrets.OAKTIS_API_KEY }}
  run: |
    oaktis video "test video"
```

Add the secret in:
Settings → Secrets and variables → Actions → New repository secret

### GitLab CI

```yaml
variables:
  OAKTIS_API_KEY: $OAKTIS_API_KEY

generate_video:
  script:
    - oaktis video "test video"
```

Add the variable in:
Settings → CI/CD → Variables → Add variable

### Docker

```bash
docker run -e OAKTIS_API_KEY=$OAKTIS_API_KEY \
  oaktis/cli video "test"
```

## Troubleshooting

### "API key is required" Error

Make sure the environment variable is set:

```bash
echo $OAKTIS_API_KEY  # Should print your key
```

### "Invalid API key" Error

- Check that you copied the key correctly
- Verify the key hasn't been revoked
- Ensure you're using the right key for the environment

### Key Not Found in CI/CD

- Verify the secret/variable is added in CI/CD settings
- Check the variable name matches exactly
- Ensure the key is accessible in the job scope

## Next Steps

- 📖 [Quick Start Guide](quickstart.md) - Make your first API call
- 🔧 [JavaScript SDK](https://github.com/Oaktis/Oaktis/tree/main/packages/js-sdk) - Full SDK reference
- 🐍 [Python SDK](https://github.com/Oaktis/Oaktis/tree/main/packages/py-sdk) - Python documentation
