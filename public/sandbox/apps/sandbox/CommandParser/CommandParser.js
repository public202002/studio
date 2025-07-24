class CommandParser {
  constructor() {
    this.steps = [];
  }

  Given(regex, func) {
    this.steps.push({ type: 'Given', regex, func });
  }

  When(regex, func) {
    this.steps.push({ type: 'When', regex, func });
  }

  Then(regex, func) {
    this.steps.push({ type: 'Then', regex, func });
  }

  async parse(command) {
    for (const step of this.steps) {
      const match = command.match(step.regex);
      if (match) {
        // Assuming the function takes the matched groups as arguments
        await step.func(...match.slice(1));
        return true; // Found a matching step
      }
    }
    return false; // No matching step found
  }
}

////////// example of use  ////////////////////////////////////////////

// Instantiate the parser
const parser = new CommandParser();

// Define some steps
parser.Given(/^Given a user exists with the name "([^"]+)"$/, (name) => {
  console.log(`Given a user exists with the name ´${name}´`);
  // Logic to create or find the user
});

parser.When(/^When the user logs in with password "([^"]+)"$/, (password) => {
  console.log(`When the user logs in with password ´${password}´`);
  // Logic to log in the user
});

parser.Then(/^Then the user should be redirected to the dashboard$/, () => {
  console.log("Then the user should be redirected to the dashboard");
  // Logic to verify the redirection
});

// Example usage
async function runCommands() {
  await parser.parse('Given a user exists with the name "John Doe"');
  await parser.parse('When the user logs in with password "secret123"');
  await parser.parse('Then the user should be redirected to the dashboard');
  await parser.parse('Given a user exists with the name "Jane Smith"');
}

runCommands();

console.log("Commands executed successfully.")
