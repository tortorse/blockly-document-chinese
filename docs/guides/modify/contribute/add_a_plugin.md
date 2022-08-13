# Adding a first-party plugin

Read more about [plugins](/guides/plugins/overview)

# The process

Plugins go through four stages: [suggestion](/guides/contribute/get-started/pr_review_process#suggestion), [discussion](/guides/contribute/get-started/pr_review_process#discussion), [implementation](/guides/contribute/get-started/pr_review_process#implementation), and [publishing](/guides/contribute/get-started/pr_review_process#publishing).

## Suggestion

A plugin starts as a **suggestion**. You can suggest a plugin by creating a new issue with the [Feature Request](https://github.com/google/blockly-samples/issues/new?assignees=&labels=type%3A+feature+request%2C+triage&template=feature_request.md) template.

Read up on [how to write a feature request](/guides/modify/contribute/write_a_good_issue#feature-request)

In addition to the basic feature request information, a plugin suggestion should include:

-   The API the plugin would expose.
-   APIs that need to be added or changed in core Blockly to support the plugin.
-   Screenshots, GIFs, or mock-ups if the plugin includes UI features.
-   An explanation of why it should be a first-party plugin rather than a third-party plugin.

The Blockly team reviews suggestions as they come in and either closes the issue or adds the [status: discussion](https://github.com/google/blockly-samples/labels/status%3A%20implementation) label.

## Discussion

Next, a plugin goes into the **discussion** phase. This phase includes:

-   Clarification of the desired functionality.
-   Clarification of the plugin's API.
-   Planning for implementation.
-   Planning for tests.
-   Discussion of API changes in core Blockly.
-   Breaking large plugins into implementation steps.
-   Plugin naming, based on our [naming conventions](/guides/plugins/naming).
-   Confirming all first party criteria will be met.

This discussion generally happens on the GitHub issue. The smaller the scope of the plugin, the faster the discussion phase can be. Larger plugins may attract community attention and strong opinions about the Right Solution. If this happens on your issue, congratulations! You have found something that people care about.

The goal is that at the end of the discussion phase, all major design decisions have been made and there is a clear list of implementation steps. Both should be documented in comments on the issue.

During discussion we may decide that a plugin should be a third-party plugin, and not be published under the `@blockly` scope. In that case we will explain why and close the issue.

When discussion is complete a Blockly team member adds the [status: implementation](https://github.com/google/blockly-samples/labels/status%3A%20implementation) label to the issue.

## Implementation

**Implementation** steps include:

-   Running `npx @blockly/create-package` to set up the plugin and its directory from a template.
-   Implementing core logic for the plugin.
-   Implementing a UI, if needed.
-   Testing the plugin, using mocha.
-   Documenting the plugin, including the `README`.

If a plugin's issue has the [status: implementation](https://github.com/google/blockly-samples/labels/status%3A%20implementation) label, it is either ready for implementation or actively being implemented. To avoid duplicating efforts, anyone interested should comment on the issue and ask if it's still open for contributions.

Implementation may be done by multiple contributors in parallel. You may implement a plugin collaboratively on your own fork, or through pull requests against this repository. If you want to collaborate on a plugin in this repository, ask the Blockly team to create a feature branch for you.

Plugins are not published while they are under initial construction.

## Publishing

Finally, **publishing**. The Blockly team uses [Lerna](https://lerna.js.org/) to manage versioning and publishing for all plugins.

Every Thursday a member of the Blockly team uses Lerna to check for changes in all published plugins, and republishes any that have changed. If you need a change to be published sooner, please note it on your pull request.

Plugins that are not ready for publishing should be marked `private` in their `package.json`. This may happen if a plugin relies on a not-yet-published change in [core Blockly](https://github.com/google/blockly). Core Blockly is published in the last week of each quarter (once every three months).