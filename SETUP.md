# Development setup for the nodejs workshop

My asumptions about your current setup are, that you currently don't 
have Node installed, and you have no strong preferences for the way
you want to have it installed.

If you do, to participate in the course you should have on your machine
* working Node 8.x 
* latest Visual Studio Code (because it has good integration for node debugging)

If you have strong objections against using VSCode, I still urge you to install it,
because otherwise you won't be able to follow along when we are debugging nodejs application.

# How to setup?

## Install Node Version Manager

Node version manager is a command-line utility that helps you switch your node version.
There is different project that provides this for windows and linux/macOS, I will start with the linux version first

If you encounter problems with this guide, please [file a new issue in the project](https://github.com/feedhenry/nodeschool/issues/new), or you could try to find Adam Saleh in the [gitter chat lobby](https://gitter.im/fhnodeschool/Lobby).

### on Linux/macOS

To install, it should be sufficient to:
* Open a new terminall window
* Paste in `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash`
* Close the terminal window and open it again, so that new environment variables are present

Now you should be able to use this to install the nodejs runtime itself:
* In running terminal, paste in `nvm install 8.4.0`
* Wait for installation to complete
* Now, when you run `node -v` in your terminal, you should be able to see ""v8.4.0"
* To check, that it can execute javascript, paste in `node -e 'console.log("Hello World!")'`
* You should see 'Hello World!' in your terminal window

You could read the [full installation instructions](https://github.com/creationix/nvm#installation) 
in the nvm creators [github repository](https://github.com/creationix/nvm).

### on Windows

To install, it should be sufficient to:
* Download [nvm-windows installer](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-setup.zip).
* Unzip the archive, and run the nvm-setup.exe
* In running cmd.exe, paste in `nvm install 8.4.0`
* Wait for installation to complete
* Now, when you run `node -v` in your cmd.exe, you should be able to see ""v8.4.0"
* To check, that it can execute javascript, paste in `node -e "console.log('Hello World!')"`
* You should see 'Hello World!' in your cmd.exe window

You could read the [full installation instructions](https://github.com/coreybutler/nvm-windows#installation--upgrades) 
in the nvm-windows creators [github repository](https://github.com/coreybutler/nvm-windows).

## Install visual studio code

You should be able to find the installer for your system on https://code.visualstudio.com/,
or for all of the available systems on https://code.visualstudio.com/download,
there even is an [installation video-guide](https://code.visualstudio.com/docs/introvideos/basics).

It is sufficient to have the editor installed, the setup for development of nodejs project
will be done at the beginning of the course.

