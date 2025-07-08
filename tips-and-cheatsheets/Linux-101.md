# Linux 101 (PACE - Georgia Tech)

# PACE - Georgia Tech

- Provides the Phoenix HPC Cluster for GT researchers at no cost (Free Tier)
- See [PACE](https://pace.gatech.edu/training) for PACE cluster workshops
- For more details, see `linux101.pdf` in the `private` folder

# Accessing PACE cluster

- PACE cluster can be accessed via SSH
    - ssh: remote login client
    - scp: a tool for copying files between computers (local or remote)
    - sftp: a tool for transferring files between computers (local or remote)
    - ssh-keygen: key generation tool
- Windows users: you can install a Bash shell (e.g., Git Bash, Cygwin, etc.) or use PuTTY
- Off-campus users: connect to the GT VPN first before connecting to the cluster
- To login, enter this ssh command in your terminal: `ssh <username>@<hostname>`
    - e.g.  To log into PACE's ICE cluster: `ssh <username>@login-ice.pace.gatech.edu`
    - If you want to use the graphical interface, use the `-X` flag (`ssh -X <username>@<hostname>`)
    - Alternatively, you can also use the Open OnDemand web interface to access the cluster

# Bash shell basics 

## keyboard shortcuts

- Ctrl + A: Move to the beginning of the line
- Ctrl + E: Move to the end of the line
- Ctrl + K: delete all characters after the cursor
- Ctrl + U: delete all characters before the cursor
- Ctrl + W: delete the word before the cursor
- Ctrl + L: clear the screen (= `clear`)
- Ctrl + C: kill the current process
- Ctrl + D: log out of the current session (= `exit` or `logout`)
- Ctrl + Z: pause the current process

## Basic commands

- To get help on a command, use `man <command>` or `<command> --help`

### Navigating directories

- `pwd`: print current working directory
- `ls`: list files and directories IN the current directory
    - To enable color option, use `ls --color=auto`
        (Blue: directory, Green: executable file, White: other files)
    - To show hidden files, use `ls -a`
- `cd`: change directory
    - `cd <directory>`: move to the specified directory in the current directory
    - `cd ..`: move up one directory
    - `cd -`: Go back to the previous directory
    - `cd ~`: move to the home directory

## File and directory management

- `touch <file>`: create an empty file
- `mkdir <directory>`: create a directory
- To create a new file and a new directory at the same time, use `&&`
    - `touch <file> && mkdir <directory>`
- `file <file>`: determine the file content type
- `mv <source> <destination>`: move or rename a file or directory
- `cp <source> <destination>`: copy a file or directory
    - To copy a directory and its contents, use the `-r` flag (`cp -r <source> <destination>`)
- `rm <file>`: remove a file
    - To remove a directory and its contents, use the `-r` flag (`rm -r <directory>`)
- Use Globbing patterns to select multiple files or directories
    - `*`: any number of characters (including 0) (copy all files with the `.txt` extension: `cp *.txt <destination>`)
    - `?`: any single character
    - `[]`: a list of allowed characters (e.g., `[0-9]` for numbers)
    - `{}`: a group of patterns (e.g., `cp file{1,2,3}.txt <destination>` copies `file1.txt`, `file2.txt`, and `file3.txt` to the destination)
    - `[^]`: a list of characters not to match (e.g., `ls [^a].txt` lists all files that do not start with `a` and end with `.txt`)
    - `\`: escape character


### Managing ownership and permissions

- `ls -l`: list files and directories with detailed information (permissions, owner, group, size, last modification time, and name)
- The first field in the output of `ls -l` indicates the permissions:
    - First character: file type (`d`: directory, `-`: file, `l`: link)
    - Next 9 characters (three triplets): file permissions
        - The first triplet: owner's permissions
        - The second triplet: group's permissions
        - The third triplet: everyone else's permissions
    - Each triplet consists of three characters, representing read, write, and execute permissions:
        - `r`: read permission
        - `w`: write permission
        - `x`: execute permission
        - `-`: no permission
    - Example: `drwxr-xr-x` indicates a directory with read, write, and execute permissions for the owner, and read and execute permissions for the group and everyone else
- `chmod`: change file permissions ("change mode")
    - `chmod <permissions> <file>`: change the file permissions
    - The code for permissions is a 3-digit number
        - First digit: owner's permissions
        - Second digit: group's permissions
        - Third digit: everyone else's permissions
        - Each digit is a *sum* of the following values:
            - 4: read permission
            - 2: write permission
            - 1: execute permission
        - So, the possible values are 0-7 (0: no permission, 7: all permissions, 6: `rw-`, 5: `r-x`, 4: `r--`, 3: `-wx`, 2: `-w-`, 1: `--x`)
        - Example: `chmod 755 <file>` gives read, write, and execute permissions to the owner, and read and execute permissions to the group and everyone else
    - Common permission codes:
        - 777: `rwxrwxrwx` (full permissions for everyone)
        - 755: `rwxr-xr-x`
        - 700: `rwx------`
        - 644: `rw-r--r--`
        - 600: `rw-------`
- `chown`: change file ownership
    - `chown <owner>:<group> <file>`: change the file ownership

## Viewing and editing files

### Viewing files

- `cat <file>`: display the contents of a file
    - `head <file>`: display the first 10 lines of a file
    - `tail <file>`: display the last 10 lines of a file
    - To specify the number of lines, use the `-n` flag. For example, `head -n 5 <file>` displays the first 5 lines
- `less <file>`: display the contents one page at a time
    - To navigate, use the arrow keys to scroll, the space bar to go to the next page, the `b` key to go back, and the `q` key to quit

- `grep <pattern> <file>`: search for a pattern (regex) in a file
    - This prints the lines that contain the pattern
    - use the `-i` flag to ignore case
    - regex:
        - `.`: any character
        - `*`: zero or more occurrences of the previous character
        - `^`: start of the line
        - `$`: end of the line
        - `[]`: a set of characters
        - `[^]`: a set of characters not to match
        - `|`: or
        - `\`: escape character

### File editing

- Example: `nano`, a simple text editor
    - `nano <file>`: open a file in nano
    - To save the file, press `Ctrl + O`
    - To exit, press `Ctrl + X`
- Example: `vim`, a more advanced text editor
    - `vim <file>`: open a file in vim
    - To enter the insert mode, press `i`
    - To save the file and exit, press `Esc` and type `:wq`
    - To exit without saving, press `Esc` and type `:q!`

# Environment variables

- Environment variables are variables that are set in the shell and are accessible to all processes started from that shell
- The variable name can contain any characters except for `=` and `NUL`
- `printenv`: print all environment variables
- `printenv <variable>`: print the value of the environment variable
- `echo $<variable>`: print the value of the environment variable
- Some important environment variables:
    - `PATH`: a colon-separated list of directories that the shell searches for executable files
    - `HOME`: the path to the home directory
    - `USER`: the username of the current user
    - `SHELL`: the path to the shell
    - `PWD`: the current working directory
    - and many more...
- `VARIABLE="NEWVALUE"`: set an environment variable
- `VARIABLE="NEWVALUE:$VARIABLE"`: prepend the current value of the variable to the new value
- `VARIALBE="$VARIABLE:NEWVALUE"`: append the new value to the current value of the variable
- To make the user defined variables available to all processes (including child processes started by the shell), export them using `export <variable>`
    - Note: changes to a global variable will already be exported
- To make variables persistent across sessions, add them to the your shell configuration file (e.g., `~/.bash_profile`)

# PACE software modules

- Pre-compiled and configured

# Automation with shell scripts

- A shell script is a file that contains a sequence of shell commands
- Commands are separated by newlines, semicolons, or `&&`
- To create a shell script, create a file with the `.sh` extension. Start the file with the following line:
    ```bash
    #!/bin/bash
    ```

For loops:

```bash
for i in {1..5}
do
    echo "Number $i"
done
```

Or in one line:

```bash
for i in {1..5}; do echo "Number $i"; done
```

While loops:

```bash
while [ $i -le 5 ]; do echo "Number $i"; i=$((i+1)); done
```

Conditional statements:

```bash
if [ $i -eq 5 ]; then echo "Number is 5"; else echo "Number is not 5"; fi
```

To create a function, use the following syntax:

```bash
function my_function {
    # Do something
}
```

Note: Declaration is optional:

```bash
my_function() {
    # Do something
}
```


- To define a variable in a shell script, use `VAR="value"`
- To read a variable, prefix it with `$` (e.g., `echo $VAR`)
- To run a shell script, use `bash <script.sh>` or make it executable and run it directly (`./script.sh`)
    - To make a script executable, use `chmod +x <script.sh>`
- To pass arguments to a shell script, use the positional variables `$1`, `$2`, etc.
For example:
    
    Bash script:

    ```bash
    #!/bin/bash
    echo "Hello, $1! This is a shell $2."
    ```

    Run the script: `./script.sh World script`

    Output: `Hello, World! This is a shell script.`


# Passing notes with I/O redirection

# Shell customization

## `~/.bash_profile`

## `~/.bashrc`

## `~/.bash_logout`

- This file is executed when the user logs out
- Nice to keep the environment clean for the next session
- Not commonly used