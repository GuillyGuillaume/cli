
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

- There are clear boundaries between different components.
- In general, auth is only responsible for the credentials. 
- Commands are the set of resources for achieving functionalities. 
- Util is composed of a set of developing tools for commands.
- Search is only responsible for searching functionality in the commands resources. 
- Workspace is solely responsible for the actual user-interface implementation.

It is like a precise machine that consists of parts for different functionalities. And there is a clear division of responsibilities and goals between them. It is easier to understand, maintain and is more reusable. 

- **Open-closed principle**: The architecture scales seamlessly; can add functionality without modifying the code. E.g., npm usage is auto-generated for each new command (cli/scripts/config-doc-command.js).

Open-closed principle says “software entities should be open for extension, but closed for modification”
The whole idea of npm is to better manage the node.js packages. The functionality “install” helps users to install more dependencies. The “install” functionality opens for possibilities to extend. And Search facilitates users to look up and manage dependencies. However, the development side of npm cli is closed to users. Users could not modify the util component. They can’t use these tools to develop more packages or functionalities. In this way, the npm cli maintains the design modules the same. But when there are new situations, you could just extend the behavior to more modules. It have stability and flexibility at the same time.

- **Interface Segregation Principle**. Interfaces are not cluttered with unnecessary methods. In a sense te codebase is designed a minimalistic manner because each function only implements the methods and parameters that it needs. This way, the user isn't coerced to implement useless code.
- ISP says that the client should not be forced to implement/depend on methods that are not used. Examples of modules that follow this principle are access, adduser, and birthday (in the commands directory).

- **Dependency Inversion Principle**. Low-level modules depend on high-level modules, and not on abstractions thus violating the principle. 

- DIP states that high-level modules _and_ low-level modules should depend on abstractions. Also, abstractions should not depend on details. Details should depend on abstractions. Our codebase has numerous examples of this: High-level modules such as base-command and arborist-cmd are easily reusable and are not affected by modification to low-level modules.
- Many lower-level modules rely heavily on base-command. There in no "middle man" interface.
