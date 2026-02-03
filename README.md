# Washing Machine Simulator-Logic Flow
## User Actions
 - User selects water supply option (yes/no)
 - User enters cloth load in kilograms.
 - User clicks the start button
##Machine Behavior
  -If water supply is yes and cloth load is within limit:
    - Machine starts.
    - washing process begins.
    - After washing,machine moves to spin.
    - Machine stops after completing all stages.
##Error Handling:
 - If water supply is No:
     - Machine does not start.
     - A voice message plays to inform the user about water issue.
 - If cloth load exceeds the limit:
     - Machine stops.
     - A voice message alerts about overload error.

