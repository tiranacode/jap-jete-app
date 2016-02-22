# JapJete Mobile Application

## Structure
- **assets** - Public assets (Fonts, Images)
- **src** - App Files
    - **Components**
        - **UI** - UI Components (Btns, Layouts etc)
        - **Util** - Utilizing Components (Network, Data)
    - **Configs** - Configurations (Labels, Urls, etc)
    - **Data** - Local JSONS
    - **Domain** - Entities / Entity UI Schemas
    - **Styles** - Reusable styles
    - **Views** - Application Views (Activities)
    - **Util** - Utilizing / Helper Functions
    - **App.jsx** - Entry application point

## Run
If you have a react-native environment ready use the following commands to run the applicaion, otherwise follow the steps described in [Installation](#installation) section.

```
- npm install
- react-native start
- react-native run-android
```

## Installation

```
sudo apt-get update

mkdir ~/.local
echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc

# could also fork, and then clone your own fork instead of the official one

git clone git://github.com/joyent/node.git
cd node
git checkout tags/v5.6.0
./configure --prefix=~/.local
make install -j5
cd ..

git clone https://github.com/npm/npm
cd npm
git checkout tags/v3.7.3
make install -j5

sudo apt-get install automake
sudo apt-get install python2.7-dev
cd ~/.local/src/node_modules/
npm install watchman
npm install react-native-cli

ln -s ~/.local/src/node_modules/.bin/watchman ~/.local/bin/watchman
ln -s ~/.local/src/node_modules/.bin/react-native ~/.local/bin/react-native


react-native init AwesomeProject
# install android-studio (!! All Android Studio Packages)
# Update sdk
export ANDROID_HOME=~/Android/Sdk  # or location of android sdk. Also add this in bash profile

# from android-studio, install api level 21, 22, 23
cd $ANDROID_HOME/tools
./android update sdk # install build tools 23.0.1

# if ubuntu 64bit
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install libncurses5:i386 libstdc++6:i386 zlib1g:i386
#endif

./emulator -avd Nexus_5_API_21_x86 # you've created the avd beforehand

cd AwesomeProject
react-native start
react-native run-android
```
