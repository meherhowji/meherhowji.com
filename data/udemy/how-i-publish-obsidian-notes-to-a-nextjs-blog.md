---
title: 'How I Publish Obsidian Notes to a NextJS Blog'
excerpt: 'Publishing posts becomes seamless as everything is in the same world of consuming, evolving and publishing.'
publishedTime: '2023-07-16T01:19:06'
modifiedTime: '2023-12-16T06:21:38'
author: 'Meher Howji'
tags: 'blog'
draft: 'false'
publishTo: 'meherhowji.com'
---

To publish from Obsidian, a few prerequisites need to be in place.

- Obsidian is configured to be able to push to GitHub using the Obsidian Git plugin
- Next.js or Gatsby site has a directory from which you are reading your markdown files for rendering. I use [Contentlayer](https://contentlayer.dev/) to simplify this process.

You can set up a GitHub Action with the following script. Although the script looks pretty long, it’s pretty simple if you look at each step.

```yml
name: Publish Posts

on:
  push:
    branches:
      - master

jobs:
  copy-files:
    runs-on: ubuntu-latest

    steps:
    - name: Check out Obsidian Vault
      uses: actions/checkout@v3

    - name: Find .md files tagged with 'meherhowji.com'
      run: |
        rm -rf publish_ready
        mkdir publish_ready
        find . -type f -name "*.md" -exec grep -l "meherhowji.com" {} \; -exec cp {} publish_ready/ \;
        
    - name: Rename .md to .mdx and filename to dashed lowercase
      run: |
        find publish_ready -type f -name "*.md" -exec sh -c 'mv "$0" "${0%.md}.mdx"' {} \;
        find publish_ready -type f -exec bash -c 'dir=$(dirname "$0"); base=$(basename "$0"); newbase=${base,,}; newbase=${newbase// /-}; mv "$0" "$dir/$newbase"' {} \;
        
    - name: Check if files exist for publishing
      id: check-files
      run: |
        echo "files_exist=$(ls -A publish_ready | wc -l | tr -s ' ')" >> $GITHUB_OUTPUT
    
    - name: Status in Obsidian
      run: |
        echo "Publish Page Count: ${{ steps.check-files.outputs.files_exist }}"
        echo "Publishing following pages: "
        ls -A publish_ready | sed 's/^/   /'

    - name: Clone aerosailor-next.git
      if: steps.check-files.outputs.files_exist != 0
      run: |
        git config user.name "Meher Howji"
        git config user.email "test@gmail.com"
        git clone https://meherranjan:<your-personal-github-token>@github.com/meherranjan/aerosailor-next.git

    - name: Copy files to aerosailor-next
      if: steps.check-files.outputs.files_exist != 0
      run: cp -r publish_ready/* aerosailor-next/data/articles/

    - name: Check git status
      if: steps.check-files.outputs.files_exist != 0
      id: git-status
      run: |
        cd aerosailor-next
        git config user.name "Meher Howji"
        git config user.email "test@gmail.com"
        echo "files_exist=$(ls -A publish_ready | wc -l | tr -s ' ')" >> $GITHUB_OUTPUT
        git_status_output=$(git status 2>&1)
        if [[ $git_status_output == *"nothing to commit"* ]]; then
          echo "staged=false" >> $GITHUB_OUTPUT
        else
          echo "staged=true" >> $GITHUB_OUTPUT
        fi
        
    - name: Publish to MeherHowji.com
      if: steps.git-status.outputs.staged == 'true'
      run: |
        cd aerosailor-next
        git config user.name "Meher Howji"
        git config user.email "test@gmail.com"
        git add .
        git commit -m "Auto publish markdown files from Obsidian"
        git push
```

Here's a step-by-step explanation of what it does:

1. The workflow is triggered when a push event occurs on the “master” branch.
2. The "copy-files" job runs on the latest Ubuntu environment.
3. Check out the Obsidian Vault using the actions/checkout@v3 action.
4. Find all Markdown files tagged with 'meherhowji.com' in the repository and copy them to the "publish_ready" directory.
5. Rename the copied .md files to .mdx and convert their filenames to lowercase with dashes instead of spaces.
6. Check if there are any files in the "publish_ready" directory, and the count is saved as an output.
7. The "Status in Obsidian" step displays the number of pages to be published and lists their names.
8. If there are files to publish, it clones the "aerosailor-next.git" repository.
9. The files from "publish_ready" are copied to the "aerosailor-next/data/articles/" directory.
10. Check the git status of the "aerosailor-next" repository and determine if any changes are to be committed.
11. If changes are staged, the "Publish to MeherHowji.com" step pushes the changes to the "aerosailor-next" repository with a commit message indicating automatic publication from Obsidian.

In summary, this GitHub Actions workflow automates the process of publishing Markdown files tagged with 'meherhowji.com' to the MeherHowji.com website. It checks for changes in the files, copies them to the target repository, and commits the changes if necessary, triggering the deployment to the website.

Check out the [[how-i-built-my-website|How I Built My Website]] post for more details on the libraries and utilities I have used.
