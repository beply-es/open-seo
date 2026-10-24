# Temporary hosted runner exception for the Node security candidate

Owner: codex-137 (TAREA-245). Valid through **2026-10-25T00:00:00Z**.
This exception is part of the candidate and requires explicit fork maintainer
review with the `.github/**` changes before merge. Technical review alone does
not establish that role. It grants no additional deployment or publication authority.

The existing `ubuntu-latest` jobs are retained for this one security candidate:

| Workflow | Jobs | Existing effect retained |
| --- | --- | --- |
| `ci.yml` | `ci`, `docker-build` | Tests, worker/web builds; Docker AMD64 validation without push or load |
| `pr-preview.yml` | `preview` | Existing upstream-only, same-repository guard; inert for the Beply fork |
| `sourcemaps.yml` | `upload` | Existing push-to-main trigger and repository guard |
| `docker-image.yml` | `docker` | Existing Beply-only GHCR publisher; AMD64 and ARM64 |

ARC is the canonical baseline. Moving public untrusted pull-request code to the
shared ARC set requires a verified isolation and permissions contract; this
candidate does not provide that proof. The canonical DEV ARC workers are ARM64,
while the existing Docker check validates AMD64 and the publisher builds both
architectures. Changing runner architecture or enabling privileged QEMU on the
shared set would add another security and build change to the runtime patch.
This exception preserves the existing runner boundary while pinning all actions
by immutable commit and selecting Node24 for JavaScript actions. Application
Node remains 22.23.4. It does not claim that ARC lacks the necessary capability.

Before expiry, move these jobs to a reviewed, suitable ARC route with public-PR
isolation and equivalent architecture/build proof, or obtain a new explicitly
bounded, reviewed exception. Do not silently extend this deadline or reuse an
expired exception for another candidate. Keep the existing guards, permissions,
secret references, test selection and publishing destinations unchanged.

The repository is public. Standard hosted compute is free for public repositories
under [GitHub's documented billing model](https://docs.github.com/en/billing/concepts/product-billing/github-actions);
this does not assert that storage, caches or larger runners are free. No larger
runner or new cache entitlement is introduced here.

Rollback: revert the workflow hygiene commit. That restores the exact previous
workflow boundary but reopens the action hygiene findings; it is not permission
to publish an unreviewed candidate. No application, lockfile or deployment state
is changed by this correction.
