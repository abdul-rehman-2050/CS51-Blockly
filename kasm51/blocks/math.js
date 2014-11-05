/**
 * @fileoverview Math blocks for Blockly.
 * @author supermind2002@gmail.com (Abdul Rehman)
 */
'use strict';

goog.provide('Blockly.Blocks.math');

goog.require('Blockly.Blocks');




Blockly.Blocks['math_number'] = {
  /**
   * Block for numeric value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
    this.setColour(130);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.numberValidator), 'NUM');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};


Blockly.Blocks['math_arithmetic'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
         [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
         [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
         [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE']
       ];
    this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(130);
    this.setOutput(true, 'Number');
    this.appendValueInput('A')
        .setCheck('Number');
    this.appendValueInput('B')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE
       
      };
      return TOOLTIPS[mode];
    });
  }
};



//------------------------------------------------------------


Blockly.Blocks['math_modulo'] = {
  
  /**
   * Block for remainder of a division.
   * @this Blockly.Block
   */
  init: function() {
     this.setHelpUrl(Blockly.Msg.MATH_MODULO_HELPURL);
     this.setColour(130);
     this.setOutput(true, 'Number');
     this.interpolateMsg(Blockly.Msg.MATH_MODULO_TITLE,
                        ['DIVIDEND', 'Number', Blockly.ALIGN_RIGHT],
                        ['DIVISOR', 'Number', Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
     this.setInputsInline(true);
     this.setTooltip(Blockly.Msg.MATH_MODULO_TOOLTIP);
  }

  
};
//================================================================================

Blockly.Blocks['ALU_INS'] = {
  
  
  init: function() {
  
		var dropdown = new Blockly.FieldDropdown([ ['ADD    A,','ADD'],['SUBB    A,', 'SUBB'],['MUL    A', 'MUL']
		    ,['DIVIDE    A', 'DIV']
			,['INCREMENT', 'INC']
			,['DECREMENT', 'DEC']
			,['AND    A,', 'ANL']
			,['OR    A,', 'ORL']
			,['X-OR    A,', 'XRL']
			,['ADD_WITH_CARRY     A,', 'ADDC']
			
			
			
			]);
  
    var textInput = new Blockly.FieldTextInput('B');
  
     
     this.setColour(230);
this.appendDummyInput()
        .appendField('ALU Operations:');
		
		
		this.appendDummyInput()
	    .appendField(dropdown, 'MODE')
		//.appendField('B');
		.appendField(textInput,'B');
   	
	
	     
	
     
	 this.setPreviousStatement(true);
	 this.setNextStatement(true);
    
     this.setTooltip("All Operations will be done with A and in most cases with B");
  }

  
};



