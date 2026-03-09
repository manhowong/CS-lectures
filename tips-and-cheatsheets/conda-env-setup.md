# Conda Environments

## Comman Conda commands for managing environments

```bash
# List all environments
conda env list

# Activate an environment
conda activate MYENV

# Deactivate an environment
conda deactivate

# Remove an environment
conda remove --name MYENV --all

# Exporting a Conda Environment to YAML
conda env export > environment.yml

##############################################################
# Create a new environment

# Create a new environment (with a specific version of Python)
conda create --name MYENV python=3.11

# Create an new environment from a file
conda env create -f environment.yml

# Create new environment with pip
conda create -n MYENV pip
```

## Comman Conda commands for managing packages

```bash
# List all packages in an environment
conda list -n MYENV

# Install python in an environment
conda install -n MYENV python=3.11

# Install a package in an environment
conda install -n MYENV PACKAGE -c CHANNEL

# Add a channel to an environment
conda config --add channels CHANNEL

# Add conda-forge to an environment
conda config --add channels conda-forge
```

## Installing packages after creating a Conda environment

General rules: **Conda first, then Pip**
- Install all Conda packages first: Use conda install for all major libraries (like numpy, pandas, or scikit-learn).
- Install Pip inside the environment: Ensure you have a local version of pip so it doesn't install packages into your global system.
- Install remaining packages with Pip: Only now should you use pip install for niche libraries not found on conda channels. 
- If you use conda install after you've already used pip, conda might overwrite pip-installed dependencies, causing errors.
- Don't use pip in the base environment: Only use pip inside specialized environments to keep your main installation clean.
- Best practice: use an `environment.yml` file!

`environment.yml` example:

```yml
name: MYENV
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - numpy
  - pandas
  - pip:
    - some-niche-pip-package
    - another-library==1.2.3
```

## Using Pip

- Activate the Conda environment first.
- Install pip in the activated environment:

    ```bash
    conda install pip
    ```

- To install `requirements.txt`:

    ```bash
    pip install -r requirements.txt
    ```

# Example of creating a common environment

```bash
conda create -n MYENV python=3.10 pip # using a specific version of Python and installing pip
conda activate MYENV
conda config --add channels conda-forge # adding conda-forge to the environment before installing packages
pip install -r requirements.txt
conda install -n MYENV ipykernel # To use the environment in Jupyter Notebook
```