class IndentationParser {
    parse(code) {
      const lines = code.split('\n');
      const blocks = [];
      const stack = [{ indent: -1, block: blocks }];
  
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const leadingSpacesMatch = line.match(/^(\s*)/);
        const leadingSpaces = leadingSpacesMatch ? leadingSpacesMatch[1] : '';
  
        // Verify only leading spaces
        if (/[\t]/.test(leadingSpaces)) {
          throw new Error(`Invalid indentation at line ${i + 1}: Mixed spaces and tabs.`);
        }
  
        const indent = leadingSpaces.length;
        const trimmedLine = line.trim();
  
        if (trimmedLine === '') {
          continue; // Skip empty lines
        }
  
        // While the current line's indentation is less than or equal to the
        // indentation of the last block on the stack, pop from the stack.
        // This means the current line is at the same level or a higher level
        // (less indented) than the previous block, so we need to go up the
        // parent tree until we find the correct parent.
        while (indent <= stack[stack.length - 1].indent) {
          stack.pop();
        }
  
        // Create a new block object for the current line. It includes the
        // trimmed line content and an empty array to hold its children.
        const currentBlock = { line: trimmedLine, children: [] };

        // Add the new block as a child to the block at the top of the stack.
        // The top of the stack now represents the correct parent for the current line.
        stack[stack.length - 1].block.push(currentBlock);

        // Push the new block onto the stack. This block is now the current
        // parent for any subsequent lines that are more indented.
        stack.push({ indent, block: currentBlock.children });
      }
  
      return blocks;
    }
  }
  
  // Example Usage:
  const code = `
 Block 1
  Block 1.1
    Block 1.1.1
    Block 1.1.2
       Block 1.1.1.1
      Block 1.1.3
    Block 1.2
         Block 1.2.1
Block 2
    Block 2.1
  `;
  
  const blocksParser = new IndentationParser();
  try {
    const ast = blocksParser.parse(code);
    console.log("AST ok: ", ast, JSON.stringify(ast, null, 2));
  } catch (error) {
    console.error("ERROR in IndentationParser: ", error.message);
  }
  
  // Example with invalid indentation (mixed spaces and tabs)
  const invalidCode = `
  Block 1
    Block 1.1
      Block 1.1.1
   \t Block 1.2
  Block 2
  `;
  
  try {
    const ast = blocksParser.parse(invalidCode);
    console.log("this should NOT happened... ", JSON.stringify(ast, null, 2));
  } catch (error) {
    console.error("ERROR in IndentationParser: ", error.message);
  }
  
///////////////////////////////////////////////////////

const regex = /(".*?"|'.*?'|`.*?`)|(\/\/.*|\/\*[\s\S]*?\*\/)/g;
const source = `
// This is a single-line comment
const name = "John Doe";
const message = 'Hello, world!';
const template = \`User: \${name}\`; /* This is a
multi-line comment */
const regexLiteral = /[a-z]+/g; // This is a regex literal
`;

let match;
while ((match = regex.exec(source)) !== null) {
  if (match[1] !== undefined) {
    // Group 1 (strings) matched
    console.log("Matched a string:", match[1]);
  } else if (match[2] !== undefined) {
    // Group 2 (comments) matched
    console.log("Matched a comment:", match[2]);
  }
}

//////////////////////////////////////////////////////
//change source and lastIndex dynamically
const regex2 = /abc/g;
let source2 = "abc def abc ghi abc";

let match2;
while ((match2 = regex2.exec(source2)) !== null) {
  console.log("Found match:", match2[0], "at index:", match2.index);

  // Remove the matched part from the source string
  source2 = source2.substring(0, match2.index) + source2.substring(regex2.lastIndex);

  // IMPORTANT: Reset lastIndex because the string length and indices have changed
  regex2.lastIndex = 0;

  console.log("Source string after modification:", source2);
}

console.log("Final source string:", source2);

//////////////////////// replace matches ///////////////////////////

const sourceX = "abc def abc ghi abc";
const regexX = /abc/g;

const resultX = sourceX.replace(regexX, (match, ...args) => {
  // match: The full matched substring ("abc" in this case)
  // args: An array containing captured groups (if any), the index of the match, and the original string

  // You can perform your interpretations here based on the 'match' or captured groups
  // For example, let's replace each "abc" with "xyz"
  return "huhu(" + match + ")";
});
console.log("sourceX: ", sourceX)
console.log(resultX); // Output: "xyz def xyz ghi xyz"

/////////////////// replace groups /////////////////////////////////

const codeG = `...`; // Your code string
const regexG = /(".*?"|'.*?'|`.*?`)|(\/\/.*|\/\*[\s\S]*?\*\/)/g;

const codeWithoutComments = codeG.replace(regexG, (fullMatch, stringMatch, commentMatch, offset, originalString) => {
  // Now you have clear variable names for your captured groups:
  // fullMatch: The entire matched text
  // stringMatch: The content of the first capturing group (strings)
  // commentMatch: The content of the second capturing group (comments)
  // offset: The index of the match
  // originalString: The original string

  if (stringMatch !== undefined) {
    return fullMatch; // Keep the string
  }

  if (commentMatch !== undefined) {
    return ""; // Remove the comment
  }

  // Should not be reached with this regex
  return fullMatch;
});

console.log(codeWithoutComments);
