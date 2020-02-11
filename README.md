# Deno Importmap Helper
A simple way to list all modules and update impormap.json based on standard and third party modules for Deno.

## Permissions
### Read
To read an existing importmap

### Net
To search for dependencies on Deno.land

### Write
To create and update importmap.json

## How to install
Run the following command
```
deno install importmap_helper --allow-read --allow-net --allow-write importmap.ts https://raw.githubusercontent.com/imaginamundo/dih/master/importmap.json
```

And then you'll gain access to importmap_helper on terminal.

## Command interface
`importmap_helper path_to_importmap --method`

 - **importmap_helper:** Installed command;
 - **path_to_importmap (optional):** importmap that will be updated;
 - **--method (optional):** The action you want to process to importmap.json.

If there's no path_to_importmap, the default will be in the folder that you ran the command.

If there's no method, the default will be `-h`, which is the Help method.

## Methods

### Help (--help or -h)
Show help assistent.
```
importmap_helper -h
```

### Init (--init)
Will create an empty importmap at the current folder.

```
importmap_helper --init
```

### Install (--install)
Will verify if the module exists and add to importmap.json.
```
importmap_helper --install abc
```

### Uninstall (--uninstall)
Will remove a module from importmap.json.
```
importmap_helper --uninstall abc
```

### Installed (--instaled)
Will list the current modules on package.json
```
importmap_helper --installed
```

### List (--list or -ls)
Will list the standard and third party modules of Deno based on Deno.land.
```
importmap_helper -ls
```