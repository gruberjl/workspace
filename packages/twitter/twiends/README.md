# Twiends

Automatic tasks for Twiends.

## login

logs into Twiends.

### Parameters

* email: email address to login using.
* password: password used for login.
* driver: (optional) selenium webdriver to use to login to Twiends.

### Returns

* Driver: The selenium-webdriver. Will be logged into Twiends.

## follow

Follows one set of people

### Parameters

* driver: selenium webdriver that's logged into Twiends.

### Returns

* driver: selenium webdriver

## Start

Logs into twiends, follows one set of people, quits the driver.

### Parameters

* username: username to login using.
* password: password used for login.

### Returns

Nothing
