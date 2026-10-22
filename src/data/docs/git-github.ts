import { TopicDocumentation } from "./types";

export const GIT_GITHUB_DOCS: TopicDocumentation[] = [
  // 1. Introduction to Git and GitHub
  {
    id: "git-fundamentals-setup",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.1",
    title: "Introduction to Git and GitHub",
    readTimeMinutes: 5,
    why: "Engineering projects evolve over time. Version control is the essential safety net that tracks every change, provides a complete undo history, and allows developers to manage projects without losing working code.",
    need: "Without version control, developers resort to renaming folders manually: project_v1, project_final, project_really_FINAL. This creates confusion, risks data loss, and makes collaboration nearly impossible.",
    whatYouWillLearn: [
      "What version control systems do and why they matter",
      "How Git operates on your local computer",
      "What GitHub is and how it hosts your projects online",
      "Why every developer and engineer needs Git and GitHub",
    ],
    prerequisites: "Basic familiarity with using a computer terminal or command prompt.",
    conceptExplanation:
      "**Git** is a distributed version control tool that runs directly on your computer. It records snapshots of your files over time so you can review changes, undo mistakes, and keep a clean history of your project.\n\n**GitHub** is a cloud-based hosting service for Git repositories. It lets you upload your code to the web, share your work with others, collaborate on projects, and build a portfolio of your engineering work.",
    howItWorks: [
      {
        step: "Local Versioning with Git",
        detail: "Git tracks file modifications locally on your machine inside a hidden `.git` folder.",
      },
      {
        step: "Cloud Backup & Sharing with GitHub",
        detail: "GitHub provides remote storage where you can push your local Git repositories to the internet.",
      },
    ],
    practicalExample: {
      title: "Checking Git on Your System",
      description: "Verify that Git is recognized in your terminal or command prompt.",
      codeOrSpec: `$ git --version
git version 2.44.0`,
      language: "bash",
      output: "git version 2.44.0",
      explanation: "Running `git --version` confirms that Git is installed and available in your command line.",
    },
    commonMistakes: [
      {
        mistake: "Assuming Git and GitHub are the exact same thing.",
        fix: "Remember: Git is the software tool installed locally; GitHub is the cloud platform where repositories are hosted.",
      },
    ],
    quickRevision: [
      "Git tracks changes locally on your machine.",
      "GitHub hosts your Git repositories online in the cloud.",
      "Version control provides history, safety, and collaboration.",
    ],
    checkUnderstanding: [
      {
        question: "What is the primary role of Git on a developer's computer?",
        options: [
          "To design circuit schematics",
          "To track changes and version history of project files",
          "To host websites on public cloud servers",
          "To compile C code into machine binaries",
        ],
        answer: "To track changes and version history of project files",
        explanation: "Git is a version control system dedicated to tracking changes and history across your files.",
      },
    ],
    prevTopicId: "c-preprocessor-file-io",
    prevTopicTitle: "File Handling and File I/O Operations",
    nextTopicId: "git-vs-github-diff",
    nextTopicTitle: "Difference Between Git and GitHub",
  },

  // 2. Difference Between Git and GitHub
  {
    id: "git-vs-github-diff",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.2",
    title: "Difference Between Git and GitHub",
    readTimeMinutes: 5,
    why: "Beginners frequently confuse Git and GitHub. Understanding their distinct roles prevents confusion when working in the terminal versus browsing repositories in the web browser.",
    need: "If you don't understand the boundary between Git and GitHub, you won't understand why local commands work offline while pushing and pulling require an internet connection.",
    whatYouWillLearn: [
      "Core differences between Git (tool) and GitHub (service)",
      "Which actions happen offline and which happen online",
      "How Git and GitHub work together seamlessly",
    ],
    prerequisites: "Introduction to Git and GitHub (Topic 2.1).",
    conceptExplanation:
      "| Feature | Git | GitHub |\n| :--- | :--- | :--- |\n| **Type** | Command-line software tool | Cloud web service & platform |\n| **Installation** | Installed locally on your computer | Accessed via web browser / API |\n| **Internet Requirement** | Works completely offline | Requires internet connection |\n| **Key Functions** | Tracks commits, diffs, branches | Hosts repositories, pull requests, issues |\n| **Created By** | Linus Torvalds (2005) | Chris Wanstrath, PJ Hyett, Tom Preston-Werner (2008) |\n\nIn short: **Git is the engine; GitHub is the garage where you store and showcase your car.**",
    howItWorks: [
      {
        step: "Offline Operations (Git)",
        detail: "Initializing repositories, staging files, and committing happen locally on your hard drive with Git.",
      },
      {
        step: "Online Operations (GitHub)",
        detail: "Pushing code to the cloud, viewing repositories online, and sharing links happen on GitHub.",
      },
    ],
    practicalExample: {
      title: "Local vs Remote Operations",
      description: "Illustrating which commands run offline vs online.",
      codeOrSpec: `# Runs 100% offline via Git:
git init
git add .
git commit -m "Initial commit"

# Requires internet connection to talk to GitHub:
git push -u origin main
git pull origin main`,
      language: "bash",
      output: "Local operations complete instantly without internet; network commands connect to GitHub servers.",
      explanation: "Git tracks your history locally even if your computer has no internet access.",
    },
    commonMistakes: [
      {
        mistake: "Thinking you need internet access to make a Git commit.",
        fix: "Commits are created locally on your computer by Git without needing internet or GitHub.",
      },
    ],
    quickRevision: [
      "Git is local and works offline.",
      "GitHub is a cloud platform for storing and sharing Git repos.",
      "You use Git commands to send your code to GitHub.",
    ],
    checkUnderstanding: [
      {
        question: "Can you create a Git repository and commit changes if your computer has no internet connection?",
        options: [
          "No, Git requires an active GitHub server connection",
          "Yes, Git works completely offline on your local computer",
          "Only if you have an active GitHub student pack",
          "No, commits must be verified by GitHub",
        ],
        answer: "Yes, Git works completely offline on your local computer",
        explanation: "Git is a local version control system; internet is only needed when syncing with a remote platform like GitHub.",
      },
    ],
    prevTopicId: "git-fundamentals-setup",
    prevTopicTitle: "Introduction to Git and GitHub",
    nextTopicId: "git-installation-config",
    nextTopicTitle: "Installing Git on Your Computer",
  },

  // 3. Installing Git on Your Computer
  {
    id: "git-installation-config",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.3",
    title: "Installing Git on Your Computer",
    readTimeMinutes: 5,
    why: "Git must be installed on your operating system before you can use version control commands in your terminal, PowerShell, or VS Code.",
    need: "Without installing Git, commands like `git init` or `git status` will return `'git' is not recognized as an internal or external command`.",
    whatYouWillLearn: [
      "How to download and install Git on Windows, macOS, and Linux",
      "Using Git Bash on Windows for a Unix-like command-line experience",
      "Verifying successful installation in the terminal",
    ],
    prerequisites: "Basic computer literacy and administrator access to install software.",
    conceptExplanation:
      "Git is freely available for all major operating systems:\n\n- **Windows**: Download the official installer from [git-scm.com](https://git-scm.com/download/win). This installs **Git Bash**, a Unix shell environment with Git tools built-in.\n- **macOS**: Install via Xcode Command Line Tools (`xcode-select --install`) or Homebrew (`brew install git`).\n- **Linux (Ubuntu/Debian)**: Install via the package manager (`sudo apt update && sudo apt install git`).",
    howItWorks: [
      {
        step: "Download Installer",
        detail: "Download the installer from git-scm.com and run the setup wizard.",
      },
      {
        step: "Default Settings",
        detail: "For beginners, the default installer options work well. Ensure 'Git from the command line and also from 3rd-party software' is selected.",
      },
      {
        step: "Verify in Terminal",
        detail: "Open Command Prompt, PowerShell, or Git Bash and run `git --version`.",
      },
    ],
    practicalExample: {
      title: "Verifying Installation in Terminal",
      description: "Test that Git is correctly recognized in your command line.",
      codeOrSpec: `$ git --version
git version 2.44.0.windows.1`,
      language: "bash",
      output: "Displays the installed version of Git.",
      explanation: "If you see a version number, Git is properly installed and configured in your system PATH.",
    },
    commonMistakes: [
      {
        mistake: "Opening a command prompt that was open before installation and thinking Git didn't install.",
        fix: "Close and reopen your terminal or VS Code after installing Git so the newly updated system PATH is recognized.",
      },
    ],
    quickRevision: [
      "Download Git from git-scm.com.",
      "Windows users get Git Bash, which provides a convenient Linux-style shell.",
      "Check installation with `git --version`.",
    ],
    checkUnderstanding: [
      {
        question: "Which command confirms that Git is installed and working in your terminal?",
        options: ["git start", "git check", "git --version", "git run"],
        answer: "git --version",
        explanation: "`git --version` prints the active Git binary version if Git is in your system PATH.",
      },
    ],
    prevTopicId: "git-vs-github-diff",
    prevTopicTitle: "Difference Between Git and GitHub",
    nextTopicId: "git-config-user-email",
    nextTopicTitle: "Configuring Git Username and Email",
  },

  // 4. Configuring Git Username and Email
  {
    id: "git-config-user-email",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.4",
    title: "Configuring Git Username and Email",
    readTimeMinutes: 5,
    why: "Git attaches author identity (name and email) to every commit you make. Setting this up is a mandatory one-time configuration.",
    need: "If you don't configure your name and email, Git will display an error message and refuse to commit your changes.",
    whatYouWillLearn: [
      "Setting global username with `git config --global user.name`",
      "Setting global email with `git config --global user.email`",
      "Configuring the default branch name to `main`",
      "Checking your active Git configuration with `git config --list`",
    ],
    prerequisites: "Git installed on your computer (Topic 2.3).",
    conceptExplanation:
      "Git stores your configuration in a global configuration file (`~/.gitconfig`).\n\nThe `--global` flag tells Git to apply these settings across all repositories on your computer, so you only have to do this once.\n\nMake sure the email you configure here matches the email address you use (or will use) for your GitHub account, so your commits link to your profile.",
    howItWorks: [
      {
        step: "Set Name",
        detail: "Run `git config --global user.name \"Your Name\"`.",
      },
      {
        step: "Set Email",
        detail: "Run `git config --global user.email \"your.email@example.com\"`.",
      },
      {
        step: "Set Default Branch",
        detail: "Run `git config --global init.defaultBranch main`.",
      },
    ],
    practicalExample: {
      title: "One-Time Global Configuration",
      description: "Commands to configure your identity.",
      codeOrSpec: `$ git config --global user.name "Alex Kumar"
$ git config --global user.email "alex.kumar@example.com"
$ git config --global init.defaultBranch main

# Verify settings
$ git config --list`,
      language: "bash",
      output: "user.name=Alex Kumar\nuser.email=alex.kumar@example.com\ninit.defaultbranch=main",
      explanation: "These values are saved globally on your machine and will be stamped on all future commits.",
    },
    commonMistakes: [
      {
        mistake: "Using a different email address than your GitHub account.",
        fix: "Use the same email address registered on GitHub so your commits show up on your GitHub contribution graph.",
      },
    ],
    quickRevision: [
      "`git config --global user.name \"Name\"` sets your author name.",
      "`git config --global user.email \"email\"` sets your author email.",
      "`git config --list` displays current configurations.",
    ],
    checkUnderstanding: [
      {
        question: "Why should your Git config email match your GitHub account email?",
        options: [
          "Otherwise Git will fail to compile your code",
          "So your commits are correctly linked and attributed to your GitHub profile",
          "GitHub deletes repositories with different emails",
          "It is required by your computer's operating system",
        ],
        answer: "So your commits are correctly linked and attributed to your GitHub profile",
        explanation: "GitHub matches the email in your Git commits with your GitHub account to attribute the commits and show your contribution squares.",
      },
    ],
    prevTopicId: "git-installation-config",
    prevTopicTitle: "Installing Git on Your Computer",
    nextTopicId: "git-init-clone",
    nextTopicTitle: "Creating Your First Git Repository (git init)",
  },

  // 5. Creating Your First Git Repository (git init)
  {
    id: "git-init-clone",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.5",
    title: "Creating Your First Git Repository (git init)",
    readTimeMinutes: 5,
    why: "To start tracking a project with Git, you must initialize it as a Git repository. This turns a normal directory into a version-controlled workspace.",
    need: "Without initializing a repository, Git cannot track your files or record commits.",
    whatYouWillLearn: [
      "What a Git repository actually is",
      "Using the `git init` command in a project folder",
      "The role of the hidden `.git` folder",
    ],
    prerequisites: "Configuring Git Username and Email (Topic 2.4).",
    conceptExplanation:
      "A **Git repository** (or 'repo') is simply a folder that Git is monitoring.\n\nWhen you run `git init` inside a folder, Git creates a hidden directory called `.git`.\n\nThis hidden `.git` folder contains the internal database, commit history, configuration, and references for your project. You should never manually edit or delete the `.git` folder unless you want to stop tracking the project with Git.",
    howItWorks: [
      {
        step: "Create a Project Folder",
        detail: "Create or navigate into the folder containing your code or project files.",
      },
      {
        step: "Initialize Git",
        detail: "Run `git init` in your terminal inside that folder.",
      },
      {
        step: "Git is Active",
        detail: "Git creates the `.git` metadata folder and begins monitoring file changes.",
      },
    ],
    practicalExample: {
      title: "Initializing a New Repository",
      description: "Steps to create and initialize a project directory.",
      codeOrSpec: `$ mkdir my-first-project
$ cd my-first-project
$ git init
Initialized empty Git repository in /home/user/my-first-project/.git/`,
      language: "bash",
      output: "Initialized empty Git repository in .../.git/",
      explanation: "`git init` creates the hidden `.git` folder and prepares the directory for tracking.",
    },
    commonMistakes: [
      {
        mistake: "Running `git init` inside your computer's Desktop, Home, or Downloads folder.",
        fix: "Always create a dedicated project folder first (`mkdir my-project && cd my-project`) and run `git init` inside that specific folder.",
      },
    ],
    quickRevision: [
      "`git init` turns the current folder into a Git repository.",
      "Git creates a hidden `.git` folder to store history.",
      "Never delete `.git` unless you want to remove all version history.",
    ],
    checkUnderstanding: [
      {
        question: "What does running `git init` create inside your project folder?",
        options: [
          "A `README.md` file",
          "A hidden `.git` folder containing version history and metadata",
          "A remote repository on GitHub",
          "An executable application file",
        ],
        answer: "A hidden `.git` folder containing version history and metadata",
        explanation: "`git init` creates the hidden `.git` directory which stores Git's tracking database and commit objects.",
      },
    ],
    prevTopicId: "git-config-user-email",
    prevTopicTitle: "Configuring Git Username and Email",
    nextTopicId: "git-working-staging-repo",
    nextTopicTitle: "Understanding the Working Directory, Staging Area, and Repository",
  },

  // 6. Understanding the Working Directory, Staging Area, and Repository
  {
    id: "git-working-staging-repo",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.6",
    title: "Understanding the Working Directory, Staging Area, and Repository",
    readTimeMinutes: 6,
    why: "Git uses a 3-stage model that sets it apart from simple backup tools. Understanding these three stages is the key to mastering Git.",
    need: "If you don't understand the staging area, you will wonder why editing a file doesn't automatically save it to your Git history.",
    whatYouWillLearn: [
      "The Working Directory (where you edit code)",
      "The Staging Area (where you prepare changes for the next commit)",
      "The Repository (where committed snapshots are permanently stored)",
      "How files transition between these three areas",
    ],
    prerequisites: "Creating Your First Git Repository (Topic 2.5).",
    conceptExplanation:
      "Git manages your files across **three main areas**:\n\n1. **Working Directory**: The actual files on your computer that you open and edit in VS Code or another editor.\n2. **Staging Area (Index)**: A preparation area where you select exactly which modified files you want to include in your next snapshot (`git add`).\n3. **Repository (Local History)**: The permanent database in `.git` where snapshots are stored forever as commits (`git commit`).\n\n```\n[ Working Directory ]  ---> git add --->  [ Staging Area ]  ---> git commit --->  [ Repository (.git) ]\n (Editing files)                        (Prepared changes)                       (Saved history)\n```",
    howItWorks: [
      {
        step: "Edit Files",
        detail: "You write code in your working directory.",
      },
      {
        step: "Stage Changes",
        detail: "`git add` moves specific changes into the staging area.",
      },
      {
        step: "Commit Snapshot",
        detail: "`git commit` takes everything in the staging area and permanently records it in the repository.",
      },
    ],
    practicalExample: {
      title: "The Three-Stage Flow",
      description: "How a file moves from editing to permanent history.",
      codeOrSpec: `# 1. Create/edit file in working directory
echo "Hello World" > main.c

# 2. Add file to staging area
git add main.c

# 3. Permanently record into repository
git commit -m "Add main.c with greeting"`,
      language: "bash",
      output: "[main (root-commit) a1b2c3d] Add main.c with greeting\n 1 file changed, 1 insertion(+)",
      explanation: "Editing happens in the working tree, `git add` stages it, and `git commit` stores it permanently.",
    },
    commonMistakes: [
      {
        mistake: "Modifying a file after `git add` and assuming the new edits are already staged.",
        fix: "If you edit a file again after staging it, you must run `git add` again to stage the newest edits.",
      },
    ],
    quickRevision: [
      "Working Directory: where you write and edit code.",
      "Staging Area: where you gather files to be committed.",
      "Repository: where commits are permanently saved.",
    ],
    checkUnderstanding: [
      {
        question: "What is the purpose of the staging area in Git?",
        options: [
          "To delete unused files automatically",
          "To preview and select exactly which changes to include in the next commit",
          "To upload code directly to GitHub servers",
          "To compile code before running",
        ],
        answer: "To preview and select exactly which changes to include in the next commit",
        explanation: "The staging area allows developers to carefully curate which modified files will be part of the next commit snapshot.",
      },
    ],
    prevTopicId: "git-init-clone",
    prevTopicTitle: "Creating Your First Git Repository (git init)",
    nextTopicId: "git-status-check",
    nextTopicTitle: "Checking File Status (git status)",
  },

  // 7. Checking File Status (git status)
  {
    id: "git-status-check",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.7",
    title: "Checking File Status (git status)",
    readTimeMinutes: 5,
    why: "`git status` is the most frequently used command in Git. It gives you immediate clarity on what has changed in your project and what needs to be done next.",
    need: "Without `git status`, you are working blindly, unaware of which files are untracked, modified, or ready to be committed.",
    whatYouWillLearn: [
      "How to run `git status`",
      "Understanding Untracked files (red)",
      "Understanding Changes not staged for commit (red)",
      "Understanding Changes to be committed (green)",
    ],
    prerequisites: "Understanding the Working Directory, Staging Area, and Repository (Topic 2.6).",
    conceptExplanation:
      "`git status` inspects your working directory and staging area, reporting:\n\n- **Untracked files**: New files that Git has never tracked before.\n- **Modified files**: Existing tracked files that you have modified since the last commit.\n- **Changes to be committed**: Files that have been staged with `git add` and are ready for `git commit`.\n\nWhenever you are unsure what to do in Git, run `git status`!",
    howItWorks: [
      {
        step: "Run Command",
        detail: "Execute `git status` in your project folder.",
      },
      {
        step: "Read Color Output",
        detail: "Red text usually indicates unstaged/untracked changes; green text indicates staged changes ready to commit.",
      },
      {
        step: "Follow Suggestions",
        detail: "Git status often prints helpful hints, such as `use \"git add <file>...\" to include in what will be committed`.",
      },
    ],
    practicalExample: {
      title: "Reading git status Output",
      description: "Example output of git status after creating a file.",
      codeOrSpec: `$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	main.c

nothing added to commit but untracked files present (use "git add" to track)`,
      language: "bash",
      output: "Shows that main.c is untracked and suggests running git add.",
      explanation: "Git informs you that `main.c` exists in your folder but is not yet tracked.",
    },
    commonMistakes: [
      {
        mistake: "Ignoring `git status` and assuming commands worked without checking.",
        fix: "Make it a habit to run `git status` before and after staging or committing.",
      },
    ],
    quickRevision: [
      "`git status` shows the state of your working directory and staging area.",
      "Red = modified or untracked (not staged).",
      "Green = staged and ready to commit.",
    ],
    checkUnderstanding: [
      {
        question: "What does 'untracked file' mean in `git status`?",
        options: [
          "The file has a syntax error",
          "The file is new and Git is not currently tracking its history",
          "The file has already been pushed to GitHub",
          "The file is corrupted",
        ],
        answer: "The file is new and Git is not currently tracking its history",
        explanation: "Untracked files are files in your working directory that are not yet part of Git's tracked repository database.",
      },
    ],
    prevTopicId: "git-working-staging-repo",
    prevTopicTitle: "Understanding the Working Directory, Staging Area, and Repository",
    nextTopicId: "git-add-staging",
    nextTopicTitle: "Staging Files (git add)",
  },

  // 8. Staging Files (git add)
  {
    id: "git-add-staging",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.8",
    title: "Staging Files (git add)",
    readTimeMinutes: 5,
    why: "`git add` lets you select which files to include in your next commit. It gives you full control over crafting clean, logical commits.",
    need: "Files you edit will not be committed until you stage them with `git add`.",
    whatYouWillLearn: [
      "Staging a single file with `git add filename`",
      "Staging all modified and new files with `git add .`",
      "Verifying staged files in `git status`",
    ],
    prerequisites: "Checking File Status (Topic 2.7).",
    conceptExplanation:
      "When you edit or create files, Git detects the changes but keeps them in your working directory.\n\nRunning `git add` copies those changes into the **Staging Area**.\n\n- To stage one specific file: `git add filename.c`\n- To stage all files in the current folder: `git add .` (the dot means 'current directory').",
    howItWorks: [
      {
        step: "Identify Files",
        detail: "Run `git status` to see what files have been created or modified.",
      },
      {
        step: "Stage Files",
        detail: "Run `git add <filename>` or `git add .` to move changes to the staging area.",
      },
      {
        step: "Verify",
        detail: "Run `git status` again; the staged files will now appear in green under 'Changes to be committed'.",
      },
    ],
    practicalExample: {
      title: "Staging Files with git add",
      description: "Adding files to the staging area.",
      codeOrSpec: `$ git add main.c
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   main.c`,
      language: "bash",
      output: "main.c is now listed under Changes to be committed (green).",
      explanation: "`main.c` is now staged and ready to be saved permanently with `git commit`.",
    },
    commonMistakes: [
      {
        mistake: "Typing `git add` without specifying a file name or a dot (`.`).",
        fix: "Always provide the target file or use `git add .` to add all files.",
      },
    ],
    quickRevision: [
      "`git add <file>` stages a specific file.",
      "`git add .` stages all changed and new files in the current folder.",
      "Staged files appear green in `git status`.",
    ],
    checkUnderstanding: [
      {
        question: "What does the dot (`.`) represent in `git add .`?",
        options: [
          "Delete all files",
          "The current directory and all subdirectories",
          "Send files to GitHub",
          "Commit with an empty message",
        ],
        answer: "The current directory and all subdirectories",
        explanation: "In command-line conventions, `.` refers to the current directory, so `git add .` stages all changes in the current directory.",
      },
    ],
    prevTopicId: "git-status-check",
    prevTopicTitle: "Checking File Status (git status)",
    nextTopicId: "git-staging-commits",
    nextTopicTitle: "Committing Changes (git commit)",
  },

  // 9. Committing Changes (git commit)
  {
    id: "git-staging-commits",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.9",
    title: "Committing Changes (git commit)",
    readTimeMinutes: 5,
    why: "A commit is a permanent snapshot of your project at a specific moment. Commits form the permanent history of your project, allowing you to track progress and revert if necessary.",
    need: "If you never commit, your work has no version history. If you accidentally delete files, you cannot recover them.",
    whatYouWillLearn: [
      "How to commit staged changes using `git commit -m \"message\"`",
      "Writing clear, meaningful commit messages",
      "Understanding commit hashes (IDs)",
    ],
    prerequisites: "Staging Files with git add (Topic 2.8).",
    conceptExplanation:
      "When you run `git commit`, Git takes everything currently in the staging area and packages it into a permanent, cryptographic snapshot.\n\nEvery commit includes:\n- A unique SHA ID (e.g. `e4f1a23`)\n- The author's name and email\n- The timestamp\n- A commit message explaining what changed\n\nThe `-m` flag allows you to write the commit message directly in your terminal command: `git commit -m \"Initial commit\"`.",
    howItWorks: [
      {
        step: "Stage Changes",
        detail: "Make sure your changes are staged using `git add`.",
      },
      {
        step: "Execute Commit",
        detail: "Run `git commit -m \"Descriptive message about what you did\"`.",
      },
      {
        step: "Snapshot Created",
        detail: "Git creates the commit object and reports the number of files changed.",
      },
    ],
    practicalExample: {
      title: "Creating Your First Commit",
      description: "Committing staged files with a clear message.",
      codeOrSpec: `$ git commit -m "Create main.c and initialize project structure"
[main (root-commit) 3d7a8f1] Create main.c and initialize project structure
 1 file changed, 10 insertions(+)
 create mode 100644 main.c`,
      language: "bash",
      output: "Reports the commit ID, branch (main), and file changes.",
      explanation: "Your project is now officially saved as a permanent snapshot in your local Git repository.",
    },
    commonMistakes: [
      {
        mistake: "Writing meaningless commit messages like 'fixed', 'changes', or 'asdf'.",
        fix: "Write clear, concise messages describing what was done, such as 'Add student grade calculation logic'.",
      },
    ],
    quickRevision: [
      "`git commit -m \"message\"` saves staged changes permanently.",
      "Each commit gets a unique cryptographic hash ID.",
      "Good commit messages make history easy to understand.",
    ],
    checkUnderstanding: [
      {
        question: "What does the `-m` flag stand for in `git commit -m \"My message\"`?",
        options: ["Merge", "Message", "Modify", "Main"],
        answer: "Message",
        explanation: "The `-m` flag allows you to specify the commit log message inline from the command line.",
      },
    ],
    prevTopicId: "git-add-staging",
    prevTopicTitle: "Staging Files (git add)",
    nextTopicId: "git-log-diff",
    nextTopicTitle: "Viewing Commit History (git log)",
  },

  // 10. Viewing Commit History (git log)
  {
    id: "git-log-diff",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.10",
    title: "Viewing Commit History (git log)",
    readTimeMinutes: 5,
    why: "Once you have made commits, you need to be able to review the timeline of your project to see who made changes, when, and why.",
    need: "Without `git log`, you have no way to inspect past versions or find previous commit hashes.",
    whatYouWillLearn: [
      "Viewing the complete history using `git log`",
      "Using `git log --oneline` for a clean, compact view",
      "Exiting the log view (pressing `q`)",
    ],
    prerequisites: "Committing Changes (Topic 2.9).",
    conceptExplanation:
      "`git log` displays the chronological list of commits in your repository, starting with the most recent.\n\nFor each commit, it displays:\n- The full 40-character commit hash\n- Author name and email\n- Date and time\n- The commit message\n\nFor a simpler, one-line summary per commit, use `git log --oneline`.",
    howItWorks: [
      {
        step: "Run git log",
        detail: "Run `git log` to see full details or `git log --oneline` for a compact view.",
      },
      {
        step: "Navigate History",
        detail: "Use the Up/Down arrow keys to scroll through history if it exceeds one screen.",
      },
      {
        step: "Exit Log",
        detail: "Press `q` on your keyboard to quit the log viewer and return to your terminal prompt.",
      },
    ],
    practicalExample: {
      title: "Viewing Commit Logs",
      description: "Standard and compact log commands.",
      codeOrSpec: `$ git log --oneline
3d7a8f1 (HEAD -> main) Create main.c and initialize project structure
a2b3c4d Initial commit with README

$ git log
commit 3d7a8f1b6e4d5c2a1b9f8e7d6c5b4a3f2e1d0c9b (HEAD -> main)
Author: Alex Kumar <alex.kumar@example.com>
Date:   Wed Oct 21 14:30:00 2026 +0530

    Create main.c and initialize project structure`,
      language: "bash",
      output: "Displays the commit history timeline.",
      explanation: "`--oneline` is especially helpful for beginners because it displays the short hash and message on a single clean line.",
    },
    commonMistakes: [
      {
        mistake: "Getting stuck in the `git log` screen and not knowing how to exit.",
        fix: "Press `q` on your keyboard to exit the pager and return to the command prompt.",
      },
    ],
    quickRevision: [
      "`git log` shows the full history of commits.",
      "`git log --oneline` shows a clean, concise single-line view.",
      "Press `q` to exit the log.",
    ],
    checkUnderstanding: [
      {
        question: "Which keyboard key exits the `git log` screen when viewing long history?",
        options: ["Ctrl + C", "q", "Esc", "Enter"],
        answer: "q",
        explanation: "Git displays long logs using a terminal pager (like `less`), where pressing `q` quits the view.",
      },
    ],
    prevTopicId: "git-staging-commits",
    prevTopicTitle: "Committing Changes (git commit)",
    nextTopicId: "github-account-creation",
    nextTopicTitle: "Creating a GitHub Account",
  },

  // 11. Creating a GitHub Account
  {
    id: "github-account-creation",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.11",
    title: "Creating a GitHub Account",
    readTimeMinutes: 5,
    why: "GitHub is the worldwide standard platform where engineers store code, showcase projects to recruiters, and collaborate with teams.",
    need: "You cannot upload code to GitHub or create remote repositories without a free GitHub account.",
    whatYouWillLearn: [
      "Signing up on github.com",
      "Choosing a professional username",
      "Verifying your email address",
      "Understanding your GitHub profile page",
    ],
    prerequisites: "A valid email address and web browser.",
    conceptExplanation:
      "Creating a GitHub account is free:\n\n1. Go to [github.com](https://github.com).\n2. Click **Sign up**.\n3. Enter your email, create a secure password, and choose a **professional username** (e.g., `alexkumar` or `alex-kumar-dev`). Avoid unprofessional nicknames, as recruiters and interviewers will review your GitHub profile.\n4. Complete the verification puzzle and verify the email sent to your inbox.\n\nYour profile will now be available at `https://github.com/your-username`.",
    howItWorks: [
      {
        step: "Sign Up",
        detail: "Register on github.com with your preferred developer email.",
      },
      {
        step: "Verify Email",
        detail: "Confirm the verification code sent to your inbox.",
      },
      {
        step: "Profile Ready",
        detail: "Your GitHub profile is ready to host public and private repositories.",
      },
    ],
    practicalExample: {
      title: "Your GitHub Profile URL",
      description: "How your profile and repositories appear.",
      codeOrSpec: `Profile URL:
https://github.com/your-username

Repository URL format:
https://github.com/your-username/my-project.git`,
      language: "bash",
      output: "Standard URL pattern used for all GitHub profiles and projects.",
      explanation: "Anyone with your profile link can see your public projects, code contributions, and activity graph.",
    },
    commonMistakes: [
      {
        mistake: "Choosing an unprofessional or silly username.",
        fix: "Use a clean, professional name (like `firstname-lastname`) that you can put on your resume.",
      },
    ],
    quickRevision: [
      "Sign up for free at github.com.",
      "Pick a professional username for resumes and portfolios.",
      "Verify your email to activate repository creation.",
    ],
    checkUnderstanding: [
      {
        question: "Why should you choose a professional username on GitHub?",
        options: [
          "Git commands will fail if usernames contain numbers",
          "GitHub is frequently shared on resumes and reviewed by engineering recruiters",
          "GitHub charges a fee for usernames longer than 8 characters",
          "It is required by the Git CLI installer",
        ],
        answer: "GitHub is frequently shared on resumes and reviewed by engineering recruiters",
        explanation: "Your GitHub profile serves as your software/hardware engineering portfolio during placements and job applications.",
      },
    ],
    prevTopicId: "git-log-diff",
    prevTopicTitle: "Viewing Commit History (git log)",
    nextTopicId: "github-create-new-repo",
    nextTopicTitle: "Creating a New Repository on GitHub",
  },

  // 12. Creating a New Repository on GitHub
  {
    id: "github-create-new-repo",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.12",
    title: "Creating a New Repository on GitHub",
    readTimeMinutes: 5,
    why: "Before you can push code from your computer to GitHub, you need an empty remote repository on GitHub to receive your code.",
    need: "Without a remote repository on GitHub, there is no online destination to push your local code.",
    whatYouWillLearn: [
      "Navigating the GitHub dashboard to create a repo",
      "Choosing a repository name",
      "Public vs. Private repositories",
      "Why to leave README, .gitignore, and license unchecked when pushing existing local code",
    ],
    prerequisites: "A registered GitHub account (Topic 2.11).",
    conceptExplanation:
      "To create a repository on GitHub:\n\n1. Click the **+** icon in the top-right corner of GitHub and select **New repository**.\n2. Enter a **Repository name** (e.g. `student-grade-calculator`).\n3. Choose **Public** (visible to everyone) or **Private** (visible only to you).\n4. **CRITICAL STEP FOR BEGINNERS**: If you already initialized your project locally on your computer with `git init`, **do NOT** check 'Add a README file', 'Add .gitignore', or 'Choose a license'. Leave them unchecked so GitHub creates an empty repository without merge conflicts.\n5. Click **Create repository**.",
    howItWorks: [
      {
        step: "Click New Repo",
        detail: "Go to github.com/new.",
      },
      {
        step: "Name Your Project",
        detail: "Give it a clear, kebab-case name like `first-verilog-project`.",
      },
      {
        step: "Leave Empty",
        detail: "Do not add template files if you already have local files ready to push.",
      },
    ],
    practicalExample: {
      title: "GitHub Quick Setup Instructions",
      description: "GitHub displays helpful commands immediately after creating an empty repository.",
      codeOrSpec: `...or push an existing repository from the command line:

git remote add origin https://github.com/your-username/my-project.git
git branch -M main
git push -u origin main`,
      language: "bash",
      output: "GitHub provides the exact commands needed to link your local repository.",
      explanation: "GitHub shows these exact commands on the screen as soon as you create the empty repository.",
    },
    commonMistakes: [
      {
        mistake: "Checking 'Add a README file' on GitHub when you already have files on your computer.",
        fix: "Leave it unchecked! If GitHub creates a README on the server, you will get an error when trying to push your local files due to unrelated histories.",
      },
    ],
    quickRevision: [
      "Click '+' -> 'New repository' on GitHub.",
      "Choose a clear repository name.",
      "Leave README unchecked when pushing existing local projects.",
    ],
    checkUnderstanding: [
      {
        question: "When creating a new GitHub repo for code that already exists on your computer, what should you do regarding the README option?",
        options: [
          "Always check 'Add a README file'",
          "Leave 'Add a README file' unchecked so the repository starts completely empty",
          "Delete your local files and retype them on GitHub",
          "Convert the repository to private",
        ],
        answer: "Leave 'Add a README file' unchecked so the repository starts completely empty",
        explanation: "Starting with a completely empty repo prevents merge conflicts when you push your local commits for the first time.",
      },
    ],
    prevTopicId: "github-account-creation",
    prevTopicTitle: "Creating a GitHub Account",
    nextTopicId: "git-remotes-github",
    nextTopicTitle: "Connecting a Local Repository to GitHub (git remote add origin)",
  },

  // 13. Connecting a Local Repository to GitHub (git remote add origin)
  {
    id: "git-remotes-github",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.13",
    title: "Connecting a Local Repository to GitHub (git remote add origin)",
    readTimeMinutes: 5,
    why: "Your local Git repository on your laptop needs to know the internet address (URL) of your GitHub repository so they can communicate.",
    need: "Without setting a remote, `git push` has no destination URL to send your files to.",
    whatYouWillLearn: [
      "What a Git 'remote' is",
      "Why the default remote is called `origin`",
      "Running `git remote add origin <URL>`",
      "Verifying connected remotes with `git remote -v`",
    ],
    prerequisites: "Creating a New Repository on GitHub (Topic 2.12).",
    conceptExplanation:
      "A **remote** is a bookmark or shortcut name that points to a repository hosted on the internet or a network.\n\nBy convention in Git, the main remote repository is named **`origin`**.\n\nThe command:\n```bash\ngit remote add origin https://github.com/your-username/my-project.git\n```\ntells your local Git: *'Save the shortcut name `origin` pointing to this GitHub repository URL.'*",
    howItWorks: [
      {
        step: "Copy URL from GitHub",
        detail: "Copy the HTTPS URL of your newly created GitHub repository.",
      },
      {
        step: "Add Remote",
        detail: "Run `git remote add origin <copied-url>` in your local project folder.",
      },
      {
        step: "Verify Remote",
        detail: "Run `git remote -v` to confirm the fetch and push URLs.",
      },
    ],
    practicalExample: {
      title: "Adding and Verifying Remote",
      description: "Connecting local repository to GitHub.",
      codeOrSpec: `$ git remote add origin https://github.com/alexkumar/my-first-project.git

# Verify that origin is registered:
$ git remote -v
origin  https://github.com/alexkumar/my-first-project.git (fetch)
origin  https://github.com/alexkumar/my-first-project.git (push)`,
      language: "bash",
      output: "origin points to your GitHub repository for both fetch and push.",
      explanation: "`origin` is now configured as the remote target for all push and pull operations.",
    },
    commonMistakes: [
      {
        mistake: "Getting `error: remote origin already exists` when retyping the command.",
        fix: "If you made a typo in the URL, remove the old one with `git remote remove origin` and add the correct URL again.",
      },
    ],
    quickRevision: [
      "`git remote add origin <url>` connects your local repo to GitHub.",
      "`origin` is the standard name for your main remote repository.",
      "`git remote -v` lists all configured remote URLs.",
    ],
    checkUnderstanding: [
      {
        question: "What is `origin` in the command `git remote add origin <url>`?",
        options: [
          "The author's username",
          "A shortcut alias/name pointing to the remote repository URL",
          "The branch name",
          "A command to create an account",
        ],
        answer: "A shortcut alias/name pointing to the remote repository URL",
        explanation: "`origin` is the conventional shortcut name that Git assigns to your default remote repository.",
      },
    ],
    prevTopicId: "github-create-new-repo",
    prevTopicTitle: "Creating a New Repository on GitHub",
    nextTopicId: "git-push-first-time",
    nextTopicTitle: "Pushing Code to GitHub for the First Time (git push)",
  },

  // 14. Pushing Code to GitHub for the First Time (git push)
  {
    id: "git-push-first-time",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.14",
    title: "Pushing Code to GitHub for the First Time (git push)",
    readTimeMinutes: 5,
    why: "Pushing uploads your local commits to your GitHub repository in the cloud, making your project visible online.",
    need: "Until you push, all your commits exist solely on your local hard drive and are not backed up or visible on GitHub.",
    whatYouWillLearn: [
      "Renaming the local branch to `main` with `git branch -M main`",
      "Pushing with upstream tracking using `git push -u origin main`",
      "Authenticating with GitHub (Browser login or Personal Access Token)",
      "Viewing your uploaded code live on GitHub",
    ],
    prerequisites: "Connecting a Local Repository to GitHub (Topic 2.13).",
    conceptExplanation:
      "To upload your code to GitHub for the first time, run:\n\n```bash\ngit branch -M main\ngit push -u origin main\n```\n\n- `git branch -M main`: Ensures your active branch is named `main` (the current industry standard).\n- `git push`: Sends your local commits to the remote server.\n- `-u` (or `--set-upstream`): Sets `origin/main` as the default destination for future pushes, so in the future you only need to type `git push`.\n- When prompted, sign in via your web browser to authenticate.",
    howItWorks: [
      {
        step: "Rename Branch to main",
        detail: "Run `git branch -M main`.",
      },
      {
        step: "Push with Upstream",
        detail: "Run `git push -u origin main`.",
      },
      {
        step: "Authenticate",
        detail: "Complete the quick browser login popup from GitHub.",
      },
      {
        step: "Refresh GitHub",
        detail: "Refresh your repository page on github.com to see all your files and commits live!",
      },
    ],
    practicalExample: {
      title: "First Push to GitHub",
      description: "Uploading your code to GitHub.",
      codeOrSpec: `$ git branch -M main
$ git push -u origin main
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 240 bytes | 240.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/alexkumar/my-first-project.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.`,
      language: "bash",
      output: "Reports successful upload of objects and sets up tracking.",
      explanation: "Your code and commit history are now published on GitHub!",
    },
    commonMistakes: [
      {
        mistake: "Entering your GitHub account password in the terminal when prompted on older Git versions.",
        fix: "GitHub no longer accepts account passwords for Git CLI; authenticate via the browser popup or generate a Personal Access Token (PAT) under GitHub Settings -> Developer settings.",
      },
    ],
    quickRevision: [
      "`git branch -M main` sets the branch name to main.",
      "`git push -u origin main` uploads your code and sets default tracking.",
      "Future pushes only require typing `git push`.",
    ],
    checkUnderstanding: [
      {
        question: "What does the `-u` flag do in `git push -u origin main`?",
        options: [
          "Undoes the last commit",
          "Sets the upstream tracking reference so future pushes only require typing `git push`",
          "Updates the Git software version",
          "Unlocks private repository settings",
        ],
        answer: "Sets the upstream tracking reference so future pushes only require typing `git push`",
        explanation: "The `-u` (upstream) flag links your local `main` branch to `origin/main` so subsequent pushes require only `git push`.",
      },
    ],
    prevTopicId: "git-remotes-github",
    prevTopicTitle: "Connecting a Local Repository to GitHub (git remote add origin)",
    nextTopicId: "git-push-pull-fetch",
    nextTopicTitle: "Pulling Changes from GitHub (git pull) — basic introduction",
  },

  // 15. Pulling Changes from GitHub (git pull) — basic introduction
  {
    id: "git-push-pull-fetch",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.15",
    title: "Pulling Changes from GitHub (git pull) — basic introduction",
    readTimeMinutes: 5,
    why: "If code is added or edited on GitHub (e.g. editing a README on the website or working from a second computer), you must download those changes to keep your local machine up to date.",
    need: "If the remote repository has commits that your local computer doesn't have, GitHub will reject new pushes until you pull the latest changes first.",
    whatYouWillLearn: [
      "What `git pull` does",
      "How `git pull` downloads and merges changes into your working directory",
      "When and why you should run `git pull`",
    ],
    prerequisites: "Pushing Code to GitHub (Topic 2.14).",
    conceptExplanation:
      "`git push` sends changes **up** to GitHub.\n`git pull` brings changes **down** from GitHub.\n\n`git pull` does two things under the hood:\n1. **Fetches** the new commits from GitHub (`git fetch`).\n2. **Merges** them directly into your current local branch (`git merge`).\n\nIt is good practice to run `git pull` before you start writing new code each day.",
    howItWorks: [
      {
        step: "Remote Has Changes",
        detail: "A file was edited on github.com or pushed from another computer.",
      },
      {
        step: "Run git pull",
        detail: "Execute `git pull` in your terminal.",
      },
      {
        step: "Local Files Updated",
        detail: "Git downloads the new changes and updates your local files automatically.",
      },
    ],
    practicalExample: {
      title: "Pulling Updates from GitHub",
      description: "Syncing your local repo with remote changes.",
      codeOrSpec: `$ git pull
Updating 3d7a8f1..9b8c7d6
Fast-forward
 README.md | 5 +++++
 1 file changed, 5 insertions(+)`,
      language: "bash",
      output: "Reports which files were updated from the remote branch.",
      explanation: "Your local files are now synchronized with the latest version on GitHub.",
    },
    commonMistakes: [
      {
        mistake: "Trying to push when GitHub has changes you don't have locally, resulting in `[rejected - non-fast-forward]`.",
        fix: "Run `git pull` first to incorporate the remote changes, then push again with `git push`.",
      },
    ],
    quickRevision: [
      "`git push` uploads local commits to GitHub.",
      "`git pull` downloads remote commits from GitHub to your computer.",
      "Run `git pull` regularly to stay up to date.",
    ],
    checkUnderstanding: [
      {
        question: "When should a developer run `git pull`?",
        options: [
          "Only when uninstalling Git",
          "Before starting work or when remote changes need to be downloaded to the local computer",
          "Immediately before running `git init`",
          "To delete a remote repository",
        ],
        answer: "Before starting work or when remote changes need to be downloaded to the local computer",
        explanation: "`git pull` ensures your local copy contains the latest changes made on the remote repository.",
      },
    ],
    prevTopicId: "git-push-first-time",
    prevTopicTitle: "Pushing Code to GitHub for the First Time (git push)",
    nextTopicId: "git-clone-existing-repo",
    nextTopicTitle: "Cloning an Existing Repository (git clone)",
  },

  // 16. Cloning an Existing Repository (git clone)
  {
    id: "git-clone-existing-repo",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.16",
    title: "Cloning an Existing Repository (git clone)",
    readTimeMinutes: 5,
    why: "Cloning allows you to download an entire existing project from GitHub onto your computer, including its complete history and branches.",
    need: "When starting to work on an existing project or downloading code onto a new computer, cloning is the standard starting point.",
    whatYouWillLearn: [
      "What `git clone` does",
      "Finding the clone URL on any GitHub repository",
      "Cloning a repository into a local folder",
      "Navigating into the cloned project",
    ],
    prerequisites: "Creating a New Repository on GitHub (Topic 2.12).",
    conceptExplanation:
      "**`git clone`** downloads a complete copy of a remote repository from GitHub to your computer.\n\nUnlike downloading a `.zip` file from the website:\n- `git clone` preserves the entire Git history and all commits.\n- It automatically configures `origin` pointing to the GitHub repository.\n- You can immediately make edits, commit them, and push back to GitHub.",
    howItWorks: [
      {
        step: "Get Clone URL",
        detail: "On GitHub, click the green **<> Code** button and copy the HTTPS URL.",
      },
      {
        step: "Run git clone",
        detail: "Open your terminal and run `git clone <URL>`.",
      },
      {
        step: "Enter Folder",
        detail: "Navigate into the newly created folder with `cd <project-name>`.",
      },
    ],
    practicalExample: {
      title: "Cloning a Project to Your Machine",
      description: "Cloning a repository using its HTTPS link.",
      codeOrSpec: `$ git clone https://github.com/alexkumar/my-first-project.git
Cloning into 'my-first-project'...
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (4/4), done.
Receiving objects: 100% (6/6), done.

$ cd my-first-project
$ git status
On branch main
Your branch is up to date with 'origin/main'.`,
      language: "bash",
      output: "Downloads the repo and initializes origin automatically.",
      explanation: "You now have a fully functioning local copy of the project ready for development.",
    },
    commonMistakes: [
      {
        mistake: "Running `git init` inside a folder after running `git clone`.",
        fix: "`git clone` already initializes the repository for you! Do not run `git init` inside a cloned repository.",
      },
    ],
    quickRevision: [
      "`git clone <url>` downloads a repository and its full history.",
      "Origin is configured automatically.",
      "Always `cd` into the cloned folder before running Git commands.",
    ],
    checkUnderstanding: [
      {
        question: "How is `git clone` different from downloading a ZIP file from GitHub?",
        options: [
          "It is identical with no difference",
          "`git clone` preserves the complete Git version history and automatically sets up the remote connection",
          "`git clone` only downloads the README file",
          "ZIP downloads run faster on Linux",
        ],
        answer: "`git clone` preserves the complete Git version history and automatically sets up the remote connection",
        explanation: "`git clone` copies the entire `.git` history database and configures the `origin` remote for syncing.",
      },
    ],
    prevTopicId: "git-push-pull-fetch",
    prevTopicTitle: "Pulling Changes from GitHub (git pull) — basic introduction",
    nextTopicId: "git-update-and-push",
    nextTopicTitle: "Updating Code and Pushing New Changes",
  },

  // 17. Updating Code and Pushing New Changes
  {
    id: "git-update-and-push",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.17",
    title: "Updating Code and Pushing New Changes",
    readTimeMinutes: 5,
    why: "Software development is an iterative cycle: you write code, test it, commit the changes, and push them to GitHub. Mastering this daily routine is essential.",
    need: "You will repeat this exact 3-step workflow every single day as a developer.",
    whatYouWillLearn: [
      "The standard daily cycle: Edit -> Add -> Commit -> Push",
      "Using `git diff` to review modified lines before committing",
      "Pushing incremental updates with a simple `git push`",
    ],
    prerequisites: "Committing Changes (Topic 2.9) and Pushing Code (Topic 2.14).",
    conceptExplanation:
      "Once your repository is linked to GitHub with `git push -u origin main`, your standard daily workflow for any change is:\n\n1. **Edit**: Modify or add files in your project.\n2. **Review & Stage**: Run `git status` and `git add .`.\n3. **Commit**: Run `git commit -m \"Clear description of what was changed\"`.\n4. **Push**: Run `git push`.\n\nBecause upstream tracking was already set, you no longer need to type `origin main`—just `git push`!",
    howItWorks: [
      {
        step: "Make Changes",
        detail: "Write your code, fix bugs, or add features.",
      },
      {
        step: "Stage & Commit",
        detail: "`git add .` followed by `git commit -m \"...\"`.",
      },
      {
        step: "Push",
        detail: "`git push` uploads the new commit to GitHub.",
      },
    ],
    practicalExample: {
      title: "The Standard Daily Update Workflow",
      description: "Editing a file and pushing the update to GitHub.",
      codeOrSpec: `# 1. Check what changed
$ git status

# 2. Stage all modifications
$ git add .

# 3. Commit with a meaningful description
$ git commit -m "Add calculate_average function to main.c"

# 4. Push to GitHub
$ git push`,
      language: "bash",
      output: "Counting objects: 3, done.\nWriting objects: 100% (3/3), done.\nTo https://github.com/alexkumar/my-first-project.git\n   9b8c7d6..4e5f6a7  main -> main",
      explanation: "This 4-step sequence is the standard workflow you will use every day to keep your GitHub project up to date.",
    },
    commonMistakes: [
      {
        mistake: "Running `git push` without running `git add` and `git commit` first.",
        fix: "`git push` only uploads committed snapshots. You must stage and commit changes locally before pushing.",
      },
    ],
    quickRevision: [
      "Daily cycle: Edit -> `git add .` -> `git commit -m \"...\"` -> `git push`.",
      "Check progress anytime with `git status`.",
      "After the first push, you only need to type `git push`.",
    ],
    checkUnderstanding: [
      {
        question: "If you modify a file in VS Code and immediately run `git push`, what happens?",
        options: [
          "The modified file is uploaded to GitHub automatically",
          "Nothing is uploaded because changes must first be staged with `git add` and committed with `git commit`",
          "Git deletes the modified file",
          "GitHub creates a pull request",
        ],
        answer: "Nothing is uploaded because changes must first be staged with `git add` and committed with `git commit`",
        explanation: "`git push` only sends committed history. Uncommitted edits in the working directory are not pushed.",
      },
    ],
    prevTopicId: "git-clone-existing-repo",
    prevTopicTitle: "Cloning an Existing Repository (git clone)",
    nextTopicId: "git-ignore",
    nextTopicTitle: "Understanding .gitignore — basic introduction",
  },

  // 18. Understanding .gitignore — basic introduction
  {
    id: "git-ignore",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.18",
    title: "Understanding .gitignore — basic introduction",
    readTimeMinutes: 5,
    why: "Projects generate temporary files, compiled binaries (`.exe`, `.o`), and editor caches (`.vscode`) that should never be tracked or uploaded to GitHub.",
    need: "Without a `.gitignore` file, repositories become cluttered with huge binaries, temporary build artifacts, or secret passwords that do not belong in version control.",
    whatYouWillLearn: [
      "What a `.gitignore` file is and where it lives",
      "Common files to ignore (binaries, build folders, OS files)",
      "Basic pattern syntax (`*.o`, `build/`, `.env`)",
    ],
    prerequisites: "Staging Files with git add (Topic 2.8).",
    conceptExplanation:
      "A **`.gitignore`** file is a plain text file placed in the root directory of your repository.\n\nEach line in the file tells Git which files or patterns to completely ignore.\n\nGit will never track, show in `git status`, or commit files matching `.gitignore` rules.\n\n### Common Examples for Engineering Students:\n- Compiled binaries: `*.exe`, `*.o`, `*.out`\n- Build directories: `build/`, `dist/`\n- Editor settings: `.vscode/`, `.idea/`\n- OS metadata: `.DS_Store`, `Thumbs.db`\n- Secret keys and passwords: `.env`",
    howItWorks: [
      {
        step: "Create .gitignore",
        detail: "Create a file named `.gitignore` (with a leading dot) in your project root.",
      },
      {
        step: "Add Patterns",
        detail: "Add one file or extension pattern per line.",
      },
      {
        step: "Commit .gitignore",
        detail: "Stage and commit `.gitignore` like any other project file so team members share the same rules.",
      },
    ],
    practicalExample: {
      title: "Sample .gitignore for a C / Electronics Project",
      description: "Typical rules to exclude build artifacts.",
      codeOrSpec: `# Ignore compiled executables and object files
*.exe
*.o
*.out
a.out

# Ignore build directory
build/

# Ignore editor settings
.vscode/

# Ignore OS files
.DS_Store
Thumbs.db`,
      language: "bash",
      output: "Git automatically ignores all files matching these patterns in git status.",
      explanation: "Even if you run `git add .`, files matching `.gitignore` rules will remain untracked and clean.",
    },
    commonMistakes: [
      {
        mistake: "Naming the file `gitignore.txt` instead of `.gitignore`.",
        fix: "The file must be named `.gitignore` with the leading dot and no `.txt` extension.",
      },
    ],
    quickRevision: [
      "`.gitignore` tells Git which files never to track.",
      "Keep compiled binaries, large outputs, and secrets out of Git.",
      "Commit your `.gitignore` file so everyone benefits from the rules.",
    ],
    checkUnderstanding: [
      {
        question: "Which of the following should almost always be listed in `.gitignore`?",
        options: [
          "Source code files (`main.c`, `counter.v`)",
          "Compiled executable binaries (`*.exe`, `*.out`) and temporary build folders",
          "The `README.md` documentation file",
          "The project license",
        ],
        answer: "Compiled executable binaries (`*.exe`, `*.out`) and temporary build folders",
        explanation: "Version control tracks human-written source code, not generated compiler output or machine binaries.",
      },
    ],
    prevTopicId: "git-update-and-push",
    prevTopicTitle: "Updating Code and Pushing New Changes",
    nextTopicId: "git-readme-markdown",
    nextTopicTitle: "Writing a Simple README.md",
  },

  // 19. Writing a Simple README.md
  {
    id: "git-readme-markdown",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.19",
    title: "Writing a Simple README.md",
    readTimeMinutes: 5,
    why: "A README file is the front door of your project. When anyone visits your GitHub repository, GitHub automatically renders the README on the homepage.",
    need: "A repository without a README looks abandoned and unprofessional. Nobody knows what the project does, how to run it, or who built it.",
    whatYouWillLearn: [
      "What a `README.md` file is",
      "Basic Markdown formatting (headings, bold, lists, code blocks)",
      "Essential sections every beginner README should have",
    ],
    prerequisites: "Creating Your First Git Repository (Topic 2.5).",
    conceptExplanation:
      "A **`README.md`** file is written in **Markdown** (`.md`), a lightweight markup language that formats plain text into beautiful HTML headings, bullet lists, code blocks, and links.\n\n### Essential Sections for a Beginner Project:\n1. **Project Title**: Name of your project.\n2. **Description**: What problem does it solve?\n3. **Features / Concepts**: What did you learn or implement?\n4. **How to Run**: Step-by-step instructions to compile and execute the code.\n5. **Author**: Your name and contact link.",
    howItWorks: [
      {
        step: "Create File",
        detail: "Create `README.md` in the root folder of your project.",
      },
      {
        step: "Write in Markdown",
        detail: "Use `#` for headings, `*` for bullets, and backticks (`` `code` ``) for commands.",
      },
      {
        step: "Commit & Push",
        detail: "Commit and push; GitHub immediately renders it on your repository homepage.",
      },
    ],
    practicalExample: {
      title: "Clean Starter README.md Template",
      description: "A simple template you can adapt for any college project.",
      codeOrSpec: `# Student Grade Calculator

A simple C program to calculate total marks, percentage, and assign letter grades based on student test scores.

## Features
- Calculates total marks and percentage across 5 subjects
- Validates student inputs (0 to 100)
- Assigns grades (A, B, C, D, F) using structured if-else logic

## How to Compile and Run
\`\`\`bash
# 1. Compile with GCC
gcc -Wall main.c -o grade_calculator

# 2. Run the executable
./grade_calculator
\`\`\`

## Author
Developed by Alex Kumar (ECE Sophomore).`,
      language: "markdown",
      output: "Renders cleanly on GitHub with formatted titles, code blocks, and lists.",
      explanation: "Having this README makes your GitHub repository look polished and ready for recruiters.",
    },
    commonMistakes: [
      {
        mistake: "Writing a README in Microsoft Word or saving it as `README.docx`.",
        fix: "Save it as plain text named `README.md` using Markdown formatting.",
      },
    ],
    quickRevision: [
      "`README.md` is automatically displayed on your GitHub repository homepage.",
      "Use Markdown (`#` for headings, `*` for lists, ``` for code).",
      "Include a project description, features, run instructions, and your name.",
    ],
    checkUnderstanding: [
      {
        question: "What does the `.md` file extension stand for in `README.md`?",
        options: ["Machine Data", "Markdown", "Main Directory", "Module Description"],
        answer: "Markdown",
        explanation: "`.md` stands for Markdown, a plain-text formatting syntax that GitHub renders as formatted HTML.",
      },
    ],
    prevTopicId: "git-ignore",
    prevTopicTitle: "Understanding .gitignore — basic introduction",
    nextTopicId: "git-complete-beginner-workflow",
    nextTopicTitle: "A Complete Beginner Workflow: Create, Commit, and Push a Project to GitHub",
  },

  // 20. A Complete Beginner Workflow: Create, Commit, and Push a Project to GitHub
  {
    id: "git-complete-beginner-workflow",
    stageId: "git-github",
    stageTitle: "Git & GitHub",
    serial: "2.20",
    title: "A Complete Beginner Workflow: Create, Commit, and Push a Project to GitHub",
    readTimeMinutes: 6,
    why: "This final topic connects everything you have learned into a single, cohesive, step-by-step checklist. You can follow this every time you build a new project.",
    need: "Beginners often forget the exact order of steps. Having a single reference workflow guarantees you can publish your project without errors.",
    whatYouWillLearn: [
      "The complete end-to-end command sequence from empty folder to live GitHub repository",
      "Best practices for everyday version control",
      "How to share your repository link with peers, professors, and recruiters",
    ],
    prerequisites: "Topics 2.1 through 2.19.",
    conceptExplanation:
      "Here is the complete **10-Step Beginner Master Workflow**:\n\n1. **Create local project folder**: `mkdir my-project && cd my-project`\n2. **Initialize Git**: `git init`\n3. **Create files**: write your code (`main.c`, `README.md`, `.gitignore`)\n4. **Check status**: `git status`\n5. **Stage files**: `git add .`\n6. **Commit snapshot**: `git commit -m \"Initial commit: Add project files and README\"`\n7. **Create empty repo on GitHub**: name it on github.com (leave README unchecked)\n8. **Connect remote**: `git remote add origin https://github.com/your-username/my-project.git`\n9. **Rename branch to main**: `git branch -M main`\n10. **Push code**: `git push -u origin main`\n\nCongratulations! Your project is now live on GitHub!",
    howItWorks: [
      {
        step: "Local Setup",
        detail: "Steps 1–6 happen entirely on your computer offline.",
      },
      {
        step: "GitHub Linking",
        detail: "Steps 7–8 connect your computer to the GitHub cloud repository.",
      },
      {
        step: "First Push",
        detail: "Steps 9–10 publish your project to the world.",
      },
    ],
    practicalExample: {
      title: "The 10-Step Cheat Sheet",
      description: "Copy-pasteable reference for your next project.",
      codeOrSpec: `# Step 1: Open terminal in your project directory
cd my-project

# Step 2: Initialize Git
git init

# Step 3 & 4: Check status
git status

# Step 5: Stage all files
git add .

# Step 6: Commit
git commit -m "Initial commit with project source code and README"

# Step 7: Create empty repo on GitHub (in web browser)

# Step 8: Add the remote link (replace with YOUR repo URL)
git remote add origin https://github.com/your-username/my-project.git

# Step 9: Set main branch
git branch -M main

# Step 10: Push to GitHub!
git push -u origin main`,
      language: "bash",
      output: "To https://github.com/your-username/my-project.git\n * [new branch] main -> main\nBranch 'main' set up to track remote branch 'main' from 'origin'.",
      explanation: "Follow this exact recipe for every new college assignment or personal project to upload it to GitHub seamlessly.",
    },
    commonMistakes: [
      {
        mistake: "Panicking when Git asks for credentials.",
        fix: "Simply follow the browser login prompt to authorize Git to communicate with your GitHub account.",
      },
    ],
    quickRevision: [
      "Initialize locally -> Stage -> Commit -> Link Remote -> Push.",
      "Always include a `.gitignore` and `README.md` with your code.",
      "Share your GitHub repository URL on your resume and portfolio.",
    ],
    checkUnderstanding: [
      {
        question: "Which command uploads your committed project to GitHub for the first time?",
        options: [
          "git init",
          "git commit -m \"Initial commit\"",
          "git push -u origin main",
          "git clone",
        ],
        answer: "git push -u origin main",
        explanation: "`git push -u origin main` uploads your local commits to the `origin` remote on branch `main` and sets default tracking.",
      },
    ],
    prevTopicId: "git-readme-markdown",
    prevTopicTitle: "Writing a Simple README.md",
    nextTopicId: "analog-semiconductor-basics",
    nextTopicTitle: "Semiconductor Physics & PN Junction Diodes",
  },
];
