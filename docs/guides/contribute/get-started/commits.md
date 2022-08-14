# 提交消息指南

## 提交消息

清晰的提交消息使拉取请求更容易审查，并且更容易生成发布说明。Blockly 项目使用 [传统的提交](https://www.conventionalcommits.org/en/v1.0.0/)来帮助解决这个问题。

每个提交应具有以下格式：

```bash
<type>: <description>
[optional body][optional footer(s)]
```

请注意，核心 Blockly repo 有一个提交 linter 来帮助执行此操作。如果您的拉取请求有多个提交，则 linter 将检查标题。如果它有一个提交，它将检查该提交。最好是您的个人提交和拉取请求标题都遵循这些准则。

### 类型

类型必须是非空的，并且全部小写。以下是接受类型的列表。

<dl>
<dt>chore</dt>
<dd>用于完成例行/自动化任务的提交，例如升级依赖项。
</dd>
<dt>deprecate</dt>
<dd>对于不推荐使用功能的提交。</dd>
<dt>feat</dt>
<dd>对于向 Blockly 添加新功能的提交。
</dd>
<dt>fix</dt>
<dd>对于修复 Blockly 中的错误/错误的提交。
</dd>
<dt>release</dt>
<dd>对于与新版本发布相关的提交。</dd>
</dl>

#### 重大变化

进行重大更改的提交应`!`在提交类型之后附加 a。重大更改是可能会破坏开发人员在其应用程序中使用 Blockly 的更改，导致他们不得不做额外的工作。

例如： `fix!: return type of workspace.paste`

重大更改可能具有上述任何有效类型。

### 描述

描述不得为空，且不得超过 256 个字符。

### 主体

主体是可选的。如果提供了它，它和描述之间应该有一个空行。它必须分成不超过 256 个字符的行。

请注意，通常建议将此类信息放在您的拉取请求描述中，而不是直接放在提交中。

### 结尾

结尾是可选的。如果提供了它，它和正文之间应该有一个空行。它必须分成不超过 256 个字符的行。

## 修复非常规提交

如果您在进行修改时没有使用[常规提交](/guides/contribute#commit_messages) ，则有两种修复消息的选项，具体取决于您有多少提交：

1.  如果您的拉取请求有多个提交，请编辑拉取请求标题以符合要求。合并拉取请求时，您的其他提交将被 [压缩](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits) ，以便标题成为提交消息。

2.  如果您的拉取请求有一个提交，请使用 修改您的提交消息 `git commit --amend`，然后强制将您的更改推送到您的 Blockly 分支。这将自动更新与此分支关联的任何打开的拉取请求。`git push --force origin my-branch`.
