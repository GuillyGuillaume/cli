
## Archhitectural Assessment

### Principles:
- **Separation of concerns**: Each element is independent from each other.
    - Including various aspects of the system on a single representation will result in miscommunication between sections, and even leads to chaos in the model. 

    - In the npm cli model, in the library, it has different modules for different responsibilities. In total, it has 6 modules(auth, commands, exec, search, util and workspaces). 
    - Auth is mainly responsible for setting the credentials in npm to authenticate any npm repository.  
    - Commands are a set of npm actions. For example, npm access could set access levels on published packages. 
    - Exec module is used to run commands in the package. Json file, meaning they can’t run scripts that are not in the local project dependencies. To run commands not in local dependencies, you have to install dependencies first. 
    - Search module is to search any packages in local project dependencies matching the keywords. To use this module, simply put npm search
    - Workspace means installed packages are being auto-symlinked as a single workspace. It refers to the nested packages in the package.json. You could initiate a new workspace using npm init. This is where you could execute your commands, search dependences and verify credentials.
    - The clear definition of responsibilities of modules allow the smooth data flow and prevent future chaos. 

- **Single Responsibility Principle**: Each element is responsible to one and only one actor as is responsible for one simple task. This improves debuggability.



- **Open-closed principle**: The architecture scales seamlessly; can add functionality without modifying the code. E.g., npm usage is auto-generated for each new command (cli/scripts/config-doc-command.js).