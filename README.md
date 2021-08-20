<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Setup plan9port

setup-plan9port is a GitHub Action to setup [plan9port](https://9fans.github.io/plan9port/) environment.
It sets *$PLAN9* environment variable and appends *$PLAN9/bin* to *$PATH*.

## Usage

```yaml
- uses: lufia/setup-plan9port@v1
  with:
    environment: ubuntu-20.04
```

Then, for scripts:

```yaml
- shell: rc {0}
  run: |
    echo `{pwd}
```
