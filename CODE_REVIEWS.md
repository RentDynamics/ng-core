# Code reviews
[<- Back to README.md](README.md)

* Before any coding begins on new, large, or breaking work, a design discussion should take place.
* All code changes require a review and approval.
* All behaviors should be covered by unit tests in the same PR.
* Authors should attempt to keep PRs to 200 - 300 line changes.

## Workflow
1. The code author sends a PR for review. This request should include:
  * A mention of the intended reviewer(s) (e.g., `@jelbourn`)
  * A high-level description of the change being made.
  * Links to any relevant issues.
  * Screenshots (for visual changes or new additions)
2. Reviews provide comments and the author responds / makes changes. Repeat until LGTM.
3. One or more of the reviewers applies the "LGTM" label.
4. Once the LGTM label is applied, either the author or the reviewer can add the "merge-ready"
   label to indicate that the PR is ready to be merged.
5. The party responsible for merging PRs will do so.
