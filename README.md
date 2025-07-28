## Overview

If you use an extension like dash-to-panel, windows frequently move around when the screen is locked and unlocked.
This is because extensions are (generally) disabled when the screen is locked and reenabled when it's unlocked.
In the case of dash-to-dock, it changes the available work area of the screen and windows move to accomodate.

Workarea is affected by struts, which is the GNOME term for rectangles in the screen where windows generally shouldn't go.
In the default GNOME setup, there is one big strut across the top of the screen, 32 pixels high.

This extension is a huge hack that catches when struts are being set to one long 32 pixel high strut and ignores those calls.
Unlike most extensions, this extension stays enabled during the lock screen.

## Install

Clone the repo, cd into it, and run `make install`
