# Writing a Good Codelab

## Introduction

A codelab is an interactive tutorial written in markdown syntax. We publish our codelabs at [blocklycodelabs.dev](https://www.blocklycodelabs.dev). Codelabs use a mix of natural language, code samples, and screenshots to create a more interesting tutorial experience. The target user of a codelab is following along and running the code as they read.

Writing a codelab is a great way to contribute to the community. It's a way to share your knowledge and make life easier for the next developer who runs into the same problem.

### What makes a great codelab?

A great codelab is focused and readable. It clearly tell the user what they will build and what they will learn, and it walks the user through writing and understanding code to complete a specific task.

### Process

If you have an idea for a codelab, you can tell us about it by making a [feature request](/guides/contribute/get-started/write_a_good_issue#feature-request) in the blockly-samples repository. Include a description of what you want to teach and what you will build in the codelab. We'll discuss and refine the idea. Then you can write it up and [submit a pull request](/guides/contribute/get-started/contribute/write_a_good_pr) for it. Once it's been through [review](/guides/contribute/get-started/pr_review_process), a member of the Blockly team will publish it.

## Writing tips

The rest of this page is a set of tips and questions to guide you through writing a codelab.

read_more Check out [Technical Writing One](https://developers.google.com/tech-writing/one) for a quick introduction to technical writing.

### Audience

- Who is the target reader?
- What do they already know about using Blockly?
- What are they trying to learn?

### Setup

- What is the minimum setup required for the user to run your code?

If helpful, you can publish [starter code](https://github.com/google/blockly-samples/tree/master/examples/context-menu-codelab/starter-code) and [completed code](https://github.com/google/blockly-samples/tree/master/examples/context-menu-codelab/complete-code) in the `examples` directory.

### Structure

As with any writing, start with an outline. This is a good structure for most codelabs:

- Introduction
  - What you'll learn
  - What you'll build
  - What you need to know
  - Setup instructions
- Step one: \[Title goes here\]
  - Explanation/motivation
  - Code sample
  - Expected results
  - (Optional) More explanation
- ...
- Step ten: \[Title goes here\]
- Summary
  - What you learned
  - What you built
  - Additional resources
  - Link to completed code (if available)

While you can have more than ten steps, if you're hitting twenty you should consider breaking it into two codelabs.

### Writing style

- Use a conversational writing style.
- Use headings to make the organization clear.
- Use bulleted lists to break up walls of texts.
- Use images and gifs!

### Code style

- You can write in ES5, ES6, or TypeScript, but tell the reader which it is at the beginning.
- Follow the [Google style guide](https://google.github.io/styleguide/jsguide.html)
