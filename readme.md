## Installation Steps:

### 1. Open a Terminal:

Open the terminal on your Linux system.

### 2. Add the Postman Repository:

Run the following command in the terminal to add the Postman repository:

- sudo sh -c 'echo "deb https://dl.pstmn.io/download/latest/linux64" > /etc/apt/sources.list.d/postman.list'

### 3. Import the Postman GPG Key:

Import the Postman GPG key to verify packages:

- sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61

### 4. Update the Package List:

Update the list of available packages:

- sudo apt-get update

### 5. Install Postman:

Finally, install Postman by executing the following command:

- sudo apt-get install postman
