# Dependabot and Auto-merge Setup

This document explains the Dependabot configuration and auto-merge workflow for the nodejs-kitchen monorepo.

## Overview

The repository is configured with:
1. **Dependabot** - Automated dependency updates
2. **Auto-merge workflow** - Automatically merge safe dependency updates

## Dependabot Configuration

### Schedule
- **Day**: Every Tuesday
- **Time**: 02:00 AM
- **Timezone**: Asia/Bangkok

### Monitored Directories
- Root directory (`/`)
- `packages/masterchef`
- `packages/covid19vaccine`
- `packages/patcard`
- `packages/vaccine-barcode`

### Grouped Updates
Dependencies are grouped by category to reduce PR noise:
- **Webpack packages**: webpack*, html-webpack-plugin, *-loader
- **Babel packages**: @babel/*
- **ESLint packages**: eslint*
- **Development dependencies**: All other dependencies (minor/patch only)

### Labels
All Dependabot PRs are automatically labeled with:
- `dependencies`
- `automated`
- `workspace:packages` (for package-specific updates)

### PR Limits
Maximum 10 open PRs per directory to avoid overwhelming the repository.

## Auto-merge Workflow

### Behavior
The workflow automatically:
1. **Detects** Dependabot PRs
2. **Approves** patch and minor updates
3. **Enables auto-merge** with squash strategy
4. **Adds comment** confirming auto-merge is enabled
5. **Skips** major updates (requires manual review)

### Update Types Handled
- ✅ **Patch updates** (e.g., 1.0.0 → 1.0.1) - Auto-merged
- ✅ **Minor updates** (e.g., 1.0.0 → 1.1.0) - Auto-merged
- ⚠️ **Major updates** (e.g., 1.0.0 → 2.0.0) - Requires manual review

### Permissions
The workflow requires:
- `pull-requests: write` - To approve and comment on PRs
- `contents: write` - To merge PRs

## Repository Setup Requirements

To enable this functionality, ensure the following settings are configured in your GitHub repository:

### 1. Enable Auto-merge
Go to **Settings** → **General** → **Pull Requests** and check:
- ☑️ Allow auto-merge

### 2. Branch Protection (Recommended)
For the main/master branch, configure:
- ☑️ Require status checks to pass before merging (if you have CI)
- ☑️ Require branches to be up to date before merging
- ☑️ Allow specified actors to bypass required pull requests (for Dependabot)

### 3. Dependabot Settings
Go to **Settings** → **Code security and analysis**:
- ☑️ Enable Dependabot alerts
- ☑️ Enable Dependabot security updates

### 4. GitHub Actions Permissions
Go to **Settings** → **Actions** → **General**:
- Under "Workflow permissions", select:
  - ☑️ Read and write permissions
  - ☑️ Allow GitHub Actions to create and approve pull requests

## How It Works

### Weekly Updates
1. Every Tuesday at 02:00 AM (Bangkok time), Dependabot checks for updates
2. Creates PRs for outdated dependencies
3. Groups related dependencies together
4. Applies appropriate labels

### Auto-merge Process
1. When a Dependabot PR is created:
   - Auto-merge workflow is triggered
   - Fetches metadata about the update
   - Checks if it's a patch or minor update
   
2. For patch/minor updates:
   - PR is automatically approved
   - Auto-merge is enabled with squash strategy
   - A comment is added to the PR
   - PR merges automatically when CI passes (if configured)

3. For major updates:
   - Workflow logs a message
   - PR remains open for manual review
   - Requires manual approval and merge

## Manual Override

### Disabling Auto-merge for Specific PRs
If you need to disable auto-merge for a specific Dependabot PR:
```bash
gh pr merge --disable-auto <PR_NUMBER>
```

### Merging Major Updates
1. Review the CHANGELOG/release notes
2. Run tests locally if needed
3. Approve and merge manually through GitHub UI or CLI

## Troubleshooting

### Auto-merge Not Working
1. Check if auto-merge is enabled in repository settings
2. Verify GitHub Actions permissions are set correctly
3. Ensure branch protection rules allow Dependabot to merge
4. Check workflow logs for errors

### Too Many PRs
If Dependabot creates too many PRs:
1. Adjust `open-pull-requests-limit` in `.github/dependabot.yml`
2. Add more dependency groups to consolidate updates
3. Consider changing schedule to less frequent intervals

### CI Failures
If auto-merge is blocked by CI failures:
1. Fix the failing tests
2. Push changes to the Dependabot branch
3. Auto-merge will proceed when CI passes

## Maintenance

### Adding New Packages
When adding new packages to the monorepo:
1. Edit `.github/dependabot.yml`
2. Add a new update configuration for the package directory
3. Configure appropriate groups and labels

### Modifying Groups
To change how dependencies are grouped:
1. Edit the `groups` section in `.github/dependabot.yml`
2. Adjust patterns to match your needs
3. Commit and push changes

## Security

- Dependabot PRs are created by `dependabot[bot]`
- Auto-merge only applies to patch/minor updates
- Major updates always require manual review
- All PRs go through CI checks (if configured)
- Security updates are prioritized by Dependabot

## References

- [Dependabot configuration options](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)
- [GitHub Actions auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
- [Dependabot fetch-metadata action](https://github.com/dependabot/fetch-metadata)
