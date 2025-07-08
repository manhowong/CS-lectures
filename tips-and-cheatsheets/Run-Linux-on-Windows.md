# Running Ubuntu on Windows and environment setup

We will use WSL (Windows Subsystem for Linux) to run Ubuntu on Windows.

## Install WSL

1. Open PowerShell or Windows Command Prompt as Administrator.

2. Run the following command:

    ```powershell
    wsl --install
    ```

This will enable the WSL feature and install the default Linux distribution, Ubuntu.

For for information, see [the official documentation](https://learn.microsoft.com/en-us/windows/wsl/install).

## Install Miniconda

1. Download the Miniconda installer (.sh file) *for Linux*.
    - You can download the installer from website or use `wget` command in WSL:

        ```bash
        wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

        ```

2. Run the installer as follow (assuming that you are in the same directory as the installer):

    ```bash
    bash Miniconda3-latest-Linux-x86_64.sh
    ```

3. Follow the instructions to install Miniconda.
4. Remove the installer file (optional):

    ```bash
    rm Miniconda3-latest-Linux-x86_64.sh
    ```
5. *Restart the terminal.* (You need to do this make the `conda` command available)

    Note: To open the Ubuntu terminal, you can search for "Ubuntu" in the Windows search bar. You can also open the command prompt and run `ubuntu` to open the Ubuntu terminal.

## Create a Conda environment

- Create a new Conda environment with an environment file. For example:

    ```bash
    conda env create --file environment.yml
    ```
 
    Replace `environment.yml` with the path to your environment file (*To access files in the Windows file system, see the section below*).

- The name of the environment will be the name specified in the `environment.yml` file. To activate the environment, run:

    ```bash
    conda activate YourEnvironmentName
    ```


## Using Ubuntu on Windows

- To access the Windows file system, you can navigate to `/mnt/c/` to access the `C:` drive. For example:

    ```bash
    cd /mnt/c/Users/YourUsername/
    ```
- You can also access the Ubuntu files from the Windows File Explorer by typing `\\wsl$` in the address bar.
    - The root directory of the Ubuntu file system is located at `\\wsl$\Ubuntu\`.
    - The home directory of the Ubuntu file system is located at `\\wsl$\Ubuntu\home\YourUsername\`.
- The Ubuntu file system is located at `/`. You can navigate to your home directory using:

    ```bash
    cd ~
    ```

## Developing in WSL

- See https://code.visualstudio.com/docs/remote/wsl for setting up Visual Studio Code for WSL.