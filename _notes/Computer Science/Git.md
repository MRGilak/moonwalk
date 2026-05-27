---
layout: note
title: "Git"
date: 2026-04-10
excerpt: "#computer-science"
---

#computer-science 

Git is a _version control_ program. Its intended use is to keep a track of the history of a project. Although it is often associated with [GitHub](https://www.github.com) or [GitLab](https://www.gitlab.com), it can actually be used offline as well to manage any project. Note that the project doesn't even have to be a programming project per se; it can be used for any project in general.
In this note, I am going to explain the basics of git and how to use it.
# Set Up Git
As I said before, git is used to keep track of changes in a project. All of this information is stored in a `.git` folder in the project's path (The dot is used because folders starting with `.` are hidden on Linux OS).
To start using git, you have to install it first. On Linux, you can install git with

```bash
sudo apt install git
```

Then, go to any project folder on your system and type

```bash
git init
```

This tells git to start in this folder and create the `.git` folder. After that, you can continue working as normal.
Now let's say after making changes to a bunch of files, you want to _save_ the current status of the files. For that, you have to `stage` and `commit` your changes. What do these terms mean?
_Committing_ means saving the current status of the project. That's it. _Staging_ basically means that the file is ready to be committed, but has not yet been committed. 
To stage your files, just use `git add`. In front of this, you have to specify which files or folder to commit. For example

```bash
git add file_a folder_d
```

stages `file_a` and `folder_d`.
You can also use

```bash
git add .
```

to stage the entire contents of the current folder (`.` basically refers to the current folder).
After you are done with staging, you commit with

```bash
git commit -m "commit message"
```

where you can enter any message for this commit. 
_Note_: This is actually a very helpful feature, because it shows exactly what has changed since the last commit. Later if you want to review the history of changes, meaningful commit messages come in very handy.
That's basically it. You can now change any file, stage it and commit it. You can even change some files and not stage them. This way, when you commit, they are not going to be added to the commit (no change will be recorded for them).
If you want to stage and commit everything, you can simply use

```bash
git commit -A -m "commit message"
```

This might save you a few seconds :)
_Note_: This command does stage and commit everything that was being tracked, but if you have added new files that are yet untracked by git, you necessarily have to first stage them.
_Note_: You can always check the history of changes with

```bash
git log
```

# Git Remote
As I stated at the beginning, git is usually used in pair with [GitHub](https://www.github.com) or [GitLab](https://www.gitlab.com). These are websites that not only store the changes, so you can work on multiple devices, but also enable multiple people to work together on a single project. Basically, one project is defined and everyone works on the same project and can make changes and commit.
_Side Note_: Funny story, git is actually developed by _Linus Torvalds_, the guy who created Linux. Apparently, as the project grew bigger and bigger, he got frustrated and decided to dedicate some time to create git to organize his project :)
Git remote refers to using a remote server for the purpose of storing or sharing the project. The fundamental commands related to this topic are `remote`, `push`, `pull` and `clone`.
As its name suggests, _cloning_ refers to creating an exact copy of a _git repository_ (often called a _repo_ for short) for yourself. You might find a project on [GitHub](https://www.github.com) that you would like to have. Well, you could just download the `.zip` file and unzip it and use the files, but an easier and cleaner approach it to just clone it for yourself with

```bash
git clone remote_address foldername
```

where `remote_address` refers to the address of the project, for example `https://github.com/...` and `foldername` is the destination folder.
Now let's say you have created a github page for your own project. You might want to work on that project with several devices or with other people. How do you sync your local device with the version on [GitHub](https://www.github.com)? That's where _pulling_ and _pushing_ come in. To _pull_ means to get the latest version from the remote address and update your local project.

```bash
git pull
```

To _push_ means to update the remote version from the local files.
Therefore, the usual flow of working is like this: you first _pull_ (with `git pull`) to make sure you are working on the latest version of the project. The you make your changes to the files. After that, you _stage_ the changes (with `git add`). Then you _commit_ the changes (with `git commit`). Finally, you _push_ the changes (with `git push`).
You can see the list of the remote copies of a project with

```bash
git remote -v
```

If you want to add [GitHub](https://www.github.com) as a remote for your local project, you can use

```bash
git remote add origin remote_address
```

where `remote_address` is the address of the github repository and `origin` is just a name you assign to this remote (so for example, if you ever have two remotes you can use `git push origin` to indicate this is the one you intend. Using the name `origin` is a convention).
# Git Branches
Another very useful feature of git is that you can have different branches. As you can imagine, this helps a lot to keep a big project organized, especially if several people are working on the same project.
Using branches is very easy. You can view the branches of a project with

```bash
git branch
```

You can create a new branch with

```bash
git branch branch_name
```

and if you want to work on a specific branch, you use

```bash
git checkout branch_name
```

There is always one branch named `main` (now you know what `git push origin main` means. It means pushing to the `main` branch of the `origin` remote).
Let's say you want to work on a new feature for your project. You create a new branch (with `git branch`) and starting working on that branch instead of the `main` branch (with `git checkout`). Later, when the changes are final and you want to update the `main` branch, you use `git merge` to _merge_ the changes (`merge` is actually an advanced feature and you are not going to use it much. It is enough to know that when you _pull_, the systems actually does a _fetch_ and a _merge_ back to back). 

That's basically all the features you are ever going to use with git. There are many more commands, but they are very specific commands used for very specific cases.