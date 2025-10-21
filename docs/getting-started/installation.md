# Installation

Install Oaktis SDKs for your preferred platform.

## JavaScript/TypeScript

### npm

```bash
npm install @oaktis/sdk
```

### yarn

```bash
yarn add @oaktis/sdk
```

### pnpm

```bash
pnpm add @oaktis/sdk
```

### Requirements

- Node.js 16.x or higher
- TypeScript 5.x (for TypeScript projects)

## Python

### pip

```bash
pip install oaktis
```

### poetry

```bash
poetry add oaktis
```

### uv

```bash
uv add oaktis
```

### Requirements

- Python 3.9 or higher
- pip 21.x or higher

## CLI

### npm (Global)

```bash
npm install -g oaktis-cli
```

### npx (No Installation)

```bash
npx oaktis-cli video "your prompt"
```

### Homebrew (Coming Soon)

```bash
brew install oaktis-cli
```

## Docker

### Pull from Docker Hub

```bash
docker pull oaktis/cli:latest
```

### Specific Version

```bash
docker pull oaktis/cli:0.1.0
```

### Build from Source

```bash
git clone https://github.com/oaktis/oaktis-sdk
cd oaktis-sdk
docker build -t oaktis/cli -f docker/oaktis-cli/Dockerfile .
```

## Verify Installation

### JavaScript/TypeScript

```bash
node -e "console.log(require('@oaktis/sdk').OaktisClient)"
```

### Python

```bash
python -c "from oaktis import OaktisClient; print(OaktisClient)"
```

### CLI

```bash
oaktis --version
```

### Docker

```bash
docker run oaktis/cli --version
```

## Updating

### npm

```bash
npm update @oaktis/sdk
```

### pip

```bash
pip install --upgrade oaktis
```

### Docker

```bash
docker pull oaktis/cli:latest
```

## Uninstallation

### npm

```bash
npm uninstall @oaktis/sdk
```

### pip

```bash
pip uninstall oaktis
```

### CLI

```bash
npm uninstall -g oaktis-cli
```

## Next Steps

- 🔑 [Authentication](authentication.md) - Set up your API key
- 📖 [Quick Start](quickstart.md) - Your first API call
