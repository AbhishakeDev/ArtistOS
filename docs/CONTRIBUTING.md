# Artist OS - Contributing & Branching Guide

## Branching Strategy

Artist OS uses a modified Git Flow strategy optimized for continuous delivery.

### Branch Structure

```
main (production-ready)
  │
  └── develop (integration branch)
       │
       ├── feature/spotify-analytics
       ├── feature/instagram-connector
       ├── bugfix/dashboard-charts
       ├── docs/setup-guide
       └── release/v0.2.0
```

### Branch Naming Conventions

| Type | Pattern | Example | Purpose |
|------|---------|---------|---------|
| Feature | `feature/*` | `feature/song-analytics` | New features |
| Bugfix | `bugfix/*` | `bugfix/chart-rendering` | Bug fixes |
| Documentation | `docs/*` | `docs/api-reference` | Documentation |
| Release | `release/*` | `release/v0.2.0` | Release preparation |
| Hotfix | `hotfix/*` | `hotfix/critical-bug` | Critical fixes to main |

## Conventional Commits

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that don't affect code meaning (formatting, whitespace)
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Code change that improves performance
- `test:` Adding or updating tests
- `chore:` Changes to build process or dependencies
- `ci:` Changes to CI/CD configuration

### Scopes

- `backend` - Backend/API changes
- `frontend` - Frontend/UI changes
- `db` - Database/migrations
- `docker` - Docker configuration
- `docs` - Documentation
- `ci` - CI/CD configuration

### Examples

```
feat(backend): add spotify data sync service

- Implement OAuth2 flow for Spotify authentication
- Create scheduler for periodic sync
- Add error handling and retry logic

Closes #42
```

```
fix(frontend): resolve chart rendering on mobile

Fixes issue where recharts were not responsive on small screens.

Closes #55
```

```
docs: add database schema documentation

- Document all tables and relationships
- Add ER diagram
- Include sample queries
```

## Development Workflow

### 1. Create Feature Branch

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Or with issue reference
git checkout -b feature/123-your-feature-name
```

### 2. Make Changes

```bash
# Make your changes
# Commit frequently with meaningful messages

git add .
git commit -m "feat(backend): implement new service"
git commit -m "fix(frontend): resolve styling issue"
```

### 3. Keep Branch Updated

```bash
# Fetch latest changes
git fetch origin

# Rebase on develop (preferred over merge)
git rebase origin/develop

# If conflicts occur, resolve them, then:
git add .
git rebase --continue
```

### 4. Push and Create Pull Request

```bash
# Push feature branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Link any related issues: "Closes #42"
```

### 5. Code Review Process

- ✅ At least one approval required
- ✅ All checks must pass (tests, linting, type checking)
- ✅ No conflicts with develop
- ✅ Changes follow code style guidelines
- ✅ Documentation updated if needed

### 6. Merge to Develop

- Use "Squash and merge" for clean history
- Or "Create a merge commit" for feature branches
- Delete branch after merge

### 7. Release Process

```bash
# Create release branch from develop
git checkout -b release/v0.2.0 develop

# Update version numbers
# Update CHANGELOG
# Prepare release notes

git commit -m "chore: prepare v0.2.0 release"

# Create Pull Request to main
# After approval and merge, tag the release

git checkout main
git pull origin main
git tag -a v0.2.0 -m "Release version 0.2.0"
git push origin v0.2.0
```

## Code Quality Standards

### Backend (Python)

**Type Hints:**
```python
def process_song(song_id: int) -> SongResponse:
    """Process a song and return analytics."""
    pass
```

**Documentation:**
```python
def calculate_growth_rate(current: float, previous: float) -> float:
    """
    Calculate percentage growth between two values.
    
    Args:
        current: Current value
        previous: Previous value for comparison
        
    Returns:
        Growth rate as percentage
        
    Raises:
        ValueError: If previous is zero
    """
    pass
```

**Formatting:**
```bash
# Run before committing
black app/
isort app/
flake8 app/
mypy app/
```

### Frontend (TypeScript/React)

**Type Safety:**
```typescript
interface SongAnalytics {
  id: string
  title: string
  streams: number
  listeners: number
  saveRate: number
}

async function fetchSongAnalytics(id: string): Promise<SongAnalytics> {
  // Implementation
}
```

**Component Pattern:**
```typescript
interface CardProps {
  title: string
  value: number
  change: number
}

export function MetricCard({ title, value, change }: CardProps) {
  return (
    // Component JSX
  )
}
```

**Formatting:**
```bash
# Run before committing
npm run format
npm run lint
npm run type-check
```

## Testing Requirements

### Backend

```bash
# Unit tests
pytest tests/unit/

# Integration tests
pytest tests/integration/

# With coverage
pytest --cov=app tests/

# Minimum coverage: 80%
```

### Frontend

```bash
# Run tests (when test suite exists)
npm test

# With coverage
npm test -- --coverage

# Minimum coverage: 70%
```

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Branch is up-to-date with develop
- [ ] All tests pass locally
- [ ] Code is formatted (`black`, `npm run format`)
- [ ] Type checking passes (`mypy`, `npm run type-check`)
- [ ] Linting passes (`flake8`, `npm run lint`)
- [ ] Documentation is updated if needed
- [ ] CHANGELOG.md is updated
- [ ] PR title follows conventional commits
- [ ] PR description explains changes clearly
- [ ] Related issues are linked with `Closes #XXX`
- [ ] No secrets or API keys in code

## Issue Reporting

### Bug Report Template

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Expected behavior

## Actual Behavior
What actually happens

## Environment
- OS: macOS/Linux/Windows
- Browser/Python version: 
- Node version (frontend):
- Python version (backend):

## Screenshots
If applicable, add screenshots

## Additional Context
Any other context
```

### Feature Request Template

```markdown
## Description
Brief description of the feature

## Motivation
Why is this feature needed?

## Proposed Solution
How should this be implemented?

## Alternatives
Any alternative approaches?

## Additional Context
Any other context
```

## Release Process

### Version Numbering (Semantic Versioning)

Format: `MAJOR.MINOR.PATCH`

- `MAJOR`: Breaking changes (e.g., API structure changes)
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes (backward compatible)

Example: `v0.2.1` → `v0.3.0` (new features)

### Release Checklist

- [ ] Update version in `package.json` and `pyproject.toml`
- [ ] Update `CHANGELOG.md` with all changes
- [ ] Ensure all tests pass
- [ ] Create release branch `release/vX.Y.Z`
- [ ] Create PR to main with release notes
- [ ] Get approval and merge
- [ ] Tag release: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
- [ ] Push tag: `git push origin vX.Y.Z`
- [ ] Create GitHub Release with changelog

### CHANGELOG Format

```markdown
## [0.2.0] - 2026-06-20

### Added
- New AI insights dashboard
- Spotify data sync functionality
- Dark mode support

### Changed
- Improved chart performance
- Refactored API structure
- Updated dependencies

### Fixed
- Fixed dashboard layout on mobile
- Resolved database connection issues
- Fixed sorting in song analytics

### Deprecated
- Old metrics API (use v2 instead)

### Removed
- Legacy batch processing

### Security
- Updated authentication flow
- Fixed SQL injection vulnerability
```

## Code Review Guidelines

### As a Reviewer

✅ **Check:**
- Code follows project conventions
- Changes accomplish stated goals
- Tests are adequate
- No performance regressions
- Documentation is updated
- No security concerns

❌ **Reject if:**
- Tests don't pass
- Linting fails
- Type checking fails
- Code style inconsistent
- Documentation missing
- Security issues present

### As an Author

✅ **Respond to feedback:**
- Address all comments
- Make requested changes
- Request re-review when done
- Be open to suggestions

❌ **Don't:**
- Dismiss feedback without discussion
- Make unrelated changes
- Force merge without approval

## Communication

### Getting Help

- **Slack/Discord**: Real-time communication
- **GitHub Issues**: Bug reports and features
- **GitHub Discussions**: General questions
- **Pull Request Comments**: Code-specific discussion

### Meetings

- **Weekly Standup**: Progress updates (optional)
- **Sprint Planning**: Quarterly (when needed)
- **Code Review**: Asynchronous + comments

## Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Assume good intentions
- Focus on code, not people
- Help others learn and grow
- Report inappropriate behavior

---

**Thank you for contributing to Artist OS! 🎵**
