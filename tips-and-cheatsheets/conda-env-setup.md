# Command Conda commands related to environments

```bash

# Create a new environment with a specific version of Python
conda create --name MYENV python=3.6

# List all environments
conda env list

# Activate an environment
conda activate MYENV

# Deactivate an environment
conda deactivate

# Remove an environment
conda remove --name MYENV --all

# Create an environment from a file
conda env create -f environment.yml

# --- After activating an environment ---

# To use pip in the activated conda environment, install it first
conda install pip

# Use pip to install requirements.txt in conda environment
pip install -r requirements.txt

# Export an environment to a file
conda env export > environment.yml

# Install a package in an environment
conda install -n MYENV PACKAGE -c CHANNEL

# List all packages in an environment
conda list -n MYENV

# Add a channel to an environment
conda config --add channels CHANNEL

# Add conda-forge to an environment
conda config --add channels conda-forge

# Create new environment with pip
conda create -n MYENV pip

# Install python in an environment
conda install -n MYENV python

```

# Example of creating a new environment

```bash
conda create -n MYENV python=3.10 pip # using a specific version of Python and installing pip
conda activate MYENV
conda config --add channels conda-forge # adding conda-forge to the environment before installing packages
pip install -r requirements.txt
conda install -n MYENV ipykernel # To use the environment in Jupyter Notebook

```