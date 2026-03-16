#!/bin/bash
mkdir -p ~/.local/bin
ARCH=$(uname -m)
[ "$ARCH" = "x86_64" ] && ARCH="amd64"
[ "$ARCH" = "aarch64" ] && ARCH="arm64"
GH_VERSION=$(curl -s https://api.github.com/repos/cli/cli/releases/latest | grep '"tag_name"' | sed 's/.*"v\([^"]*\)".*/\1/')
curl -sL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${ARCH}.tar.gz" -o /tmp/gh.tar.gz
tar -xzf /tmp/gh.tar.gz -C /tmp
cp -r /tmp/gh_${GH_VERSION}_linux_${ARCH}/bin/* ~/.local/bin/
rm -rf /tmp/gh.tar.gz /tmp/gh_${GH_VERSION}_linux_${ARCH}
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
