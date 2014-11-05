
/**
 * @fileoverview Utility functions for generating executable code from
 * Blockly code.
 * @author supermind2002@gmail.com (Abdul Rehman, Lahore, Pakistan)
 */
'use strict';

goog.provide('Blockly.Kasm51');

goog.require('Blockly.Generator');

Blockly.Kasm51 = new Blockly.Generator('Kasm51');

Blockly.Kasm51.addReservedWords(
'Blockly,' +  // In case JS is evaled in the current window.
  'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
    'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
    'const,null,true,false,' +
	
	'cpl,clr,setb,equ,djnz,mov,cmp,jmp,ajmp,sjmp,ljmp,acall,lcall,call,acc,b,B,C,c,a,A,R0,R1,R2,R3,R4,R5,R6,R7,r0,r1,r2,r3,r4,r5,r6,r7,dptr,th0,th1,tl0,tl1,TH0,TH1,TL0,TL1,'+
	'SCON,SBUF,IP,SP,DP,DPTH,DB,DW,'
	
	);
	

Blockly.Kasm51.ControllerName = 'C51';
Blockly.Kasm51.Crystal = 12;	
	
	
Blockly.Kasm51.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Kasm51.ORDER_MEMBER = 1;         // . []
Blockly.Kasm51.ORDER_NEW = 1;            // new
Blockly.Kasm51.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.Kasm51.ORDER_INCREMENT = 3;      // ++
Blockly.Kasm51.ORDER_DECREMENT = 3;      // --
Blockly.Kasm51.ORDER_LOGICAL_NOT = 4;    // !
Blockly.Kasm51.ORDER_BITWISE_NOT = 4;    // ~
Blockly.Kasm51.ORDER_UNARY_PLUS = 4;     // +
Blockly.Kasm51.ORDER_UNARY_NEGATION = 4; // -
Blockly.Kasm51.ORDER_TYPEOF = 4;         // typeof
Blockly.Kasm51.ORDER_VOID = 4;           // void
Blockly.Kasm51.ORDER_DELETE = 4;         // delete
Blockly.Kasm51.ORDER_MULTIPLICATION = 5; // *
Blockly.Kasm51.ORDER_DIVISION = 5;       // /
Blockly.Kasm51.ORDER_MODULUS = 5;        // %
Blockly.Kasm51.ORDER_ADDITION = 6;       // +
Blockly.Kasm51.ORDER_SUBTRACTION = 6;    // -
Blockly.Kasm51.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.Kasm51.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.Kasm51.ORDER_IN = 8;             // in
Blockly.Kasm51.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.Kasm51.ORDER_EQUALITY = 9;       // == != === !==
Blockly.Kasm51.ORDER_BITWISE_AND = 10;   // &
Blockly.Kasm51.ORDER_BITWISE_XOR = 11;   // ^
Blockly.Kasm51.ORDER_BITWISE_OR = 12;    // |
Blockly.Kasm51.ORDER_LOGICAL_AND = 13;   // &&
Blockly.Kasm51.ORDER_LOGICAL_OR = 14;    // ||
Blockly.Kasm51.ORDER_CONDITIONAL = 15;   // ?:
Blockly.Kasm51.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.Kasm51.ORDER_COMMA = 17;         // ,
Blockly.Kasm51.ORDER_NONE = 99;          // (...)




/**
 * Initialise the database of variable names.
 */
Blockly.Kasm51.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Kasm51.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Kasm51.functionNames_ = Object.create(null);

  if (!Blockly.Kasm51.variableDB_) {
    Blockly.Kasm51.variableDB_ =
        new Blockly.Names(Blockly.Kasm51.RESERVED_WORDS_);
  } else {
    Blockly.Kasm51.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables();
  for (var x = 0; x < variables.length; x++) {
    defvars[x] = 'var ' +
        Blockly.Kasm51.variableDB_.getName(variables[x],
        Blockly.Variables.NAME_TYPE) + ';';
  }
  Blockly.Kasm51.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Kasm51.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Kasm51.definitions_) {
    definitions.push(Blockly.Kasm51.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Kasm51.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Kasm51 string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Kasm51 string.
 * @private
 */
Blockly.Kasm51.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Kasm51 from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Kasm51 code created for this block.
 * @return {string} Kasm51 code with comments and subsequent blocks added.
 * @private
 */
Blockly.Kasm51.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Kasm51.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Kasm51.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Kasm51.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Kasm51.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
