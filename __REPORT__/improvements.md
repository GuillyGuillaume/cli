## System Improvements
- Remove dead code:
    - Location of the code smell: cli/lib/utils/did-you-mean.js/line 6. 
    - Deleted the following line of code: `const cmd = await npm.cmd(str)`
- Decompose conditional
    - Location of the code smell: cli/lib/utils/display.js/lines 43-47.


| ![Conditional decomposed](images/if_refactor.png) |
| :-: |
| Figure x.2: Picture of if statement after refactoring |