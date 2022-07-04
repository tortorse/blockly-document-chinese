# Contributing

Blockly is an open-source project with a strong community, and we welcome your contributions.

### How you can help

- [File bugs](/guides/modify/contribute/write_a_good_issue)

- [File feature requests](/guides/modify/contribute/write_a_good_issue.html#feature_request)

- [Fix bugs](/guides/modify/contribute/write_a_good_pr)

- [Add tests](/guides/modify/web/unit-testing)

- [Write codelabs](/guides/modify/contribute/write_a_codelab)

- [Write plugins](/guides/modify/contribute/write_a_codelab)

- [Answer questions](https://groups.google.com/forum/#!forum/blockly)

If you're not sure where to start, or if you're new to our codebase, take a look at [cleanup bugs](https://github.com/google/blockly/issues?q=is%3Aopen+is%3Aissue+label%3A%22type%3A+cleanup%22+-label%3A%22type%3A+internal%22+). These bugs are often easy to chip away at and can help you explore our codebase.

### Some rules

- All pull requests in core must be made against the develop branch.

- You must fill out the pull request template with relevant details.

- All code must conform to [Google's JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml). We are pedantic about consistency.

- Any new code files must be prefixed with the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). We won't mix licenses.

- User-visible strings must be in the `/msg` directory so they may be translated. Less than 6% of the world speaks English natively.

- Text on blocks should generally be all lowercase (just like the keywords in most programming languages).

- Maintain backwards compatibility. There are a *lot* of Blockly apps out there, don't break everyone else.

### Talk to us!

Help us focus our development efforts by telling us [what you are doing with Blockly](https://goo.gl/forms/kZTsO9wGLmpoPXC02). The questionnaire only takes a few minutes and will help us better support the Blockly community.

Or join our [newsgroup for developers](https://groups.google.com/forum/#!forum/blockly) and say hello. Show us your prototypes early; collectively we have a lot of experience and can offer hints which will save you time. Plus, we always love to hear about new projects and use cases for Blockly!