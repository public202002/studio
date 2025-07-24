class CommandParserEvented {
  constructor() {
    this.steps = {};
  }

  on(event, regex, func) {
    if (!this.steps[event]) {
      this.steps[event] = [];
    }
    this.steps[event].push({ regex, func });
  }

  async parse(command) {
    for (const event in this.steps) {
      for (const step of this.steps[event]) {
        const match = command.match(step.regex);
        if (match) {
          // Assuming the function takes the matched groups as arguments
          await step.func(...match.slice(1));
          console.log( "RAISED EVENT ",{ event, match: match[1] }); // raise event and matched command
        }
      }
    }
    //return null; // No matching step found
  }
}

// Instantiate the parser
const parserEvented = new CommandParserEvented();

// Define some steps with namespaced events
parserEvented.on('Given.Command', /a user exists with the name "([^"]+)"/, 
           (name) => {
  console.log(`Given Command Evented: A user exists with name ${name}`);
});

parserEvented.on('When.Command', /the user logs in with password "([^"]+)"/, 
           (password) => {
  console.log(`When Command Evented: User logs in with password ${password}`);
});

parserEvented.on('Then.Command', /the user should be redirected to the dashboard/, 
           () => {
  console.log("Then Command Evented: User is redirected to the dashboard");
});

parserEvented.parse('a user exists with the name "John Doe", When the user logs in with password "secret123", Then the user should be redirected to the dashboard');