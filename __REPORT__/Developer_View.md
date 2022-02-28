#

## Developer View

### Module organization and Codeline organization

The production modules of the npm CLI are organized in a rather flat manner, considering the amount of code supporting the application.

| ![existing module organization](images/Directory-Structure.png) |
| :-: |
| Figure x.1: A module organization diagram for the npm cli. Each node, except for `root`, represents both a directory and a module |

The three top-level modules are `bin`, `lib`, and `workspaces`. 

`bin` is where the different npm and npx executables are kept, with different versions for each of the supported command line platforms.

`workspaces` contains ...

`lib` is where the majority of the cli's production code is found.
This module contains user-exectuable commands and the code that supports those commands in their use of workspaces and platform-specific tasks.
Conceptually, there are three groups of submodules in the `lib` module.

Group A contains the meat of the work, with the `commands`, `utils`, and `auth` submodules.
`auth`, as expected, contains authentication work.
`utils` contains platform-specific work, error handling, file reading and similar work.
`commands` is unsurprisingly where npm commands such as `install`, `start`, and `search` are found.

Group C contains a single submodule that contains a single function - one that facilitates communication between the top-level workspaces module and commands.

The final group consists of submodules that provide supporting code used for specific commands - `search` and `exec`.
These commands are the only commands that make use of their corresponding supporting submodule.

The `commands` submodule depends on every other module in the `lib` module.

### Common processing

### Standardization of design

### Standardization of testing

### Instrumentation
