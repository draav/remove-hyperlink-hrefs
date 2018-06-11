# Remove Links

An extension that allows you to disable certain hyperlink protocols on a page. The main purpose is to disable the mailto protocol. But I figured I would try to add the feature to just list whatever protocols you don't like (http, tel, whatever).

Current Features:

- Can turn it on and off
- Disables all links in the source page
- Get all the links to turn off, like all the ones added by other scripts
- Restore links back to the way they were after disabling the extension
- Add a list of protocol to ignore, have it default to mailto

Next:

- allow user to set protocol list in popup

Future:

- White/Black listing sites?
- Update README to have development instructions (tools needed, how to run locally, etc.)
- give protocol list a nice interface, autofill from [URI scheme list](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)